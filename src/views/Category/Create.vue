<script setup>
/* All Library Import */
import { ref, reactive, inject } from "vue";
import { useCategoryStore } from "@/stores/category";
import { useRouter } from "vue-router";
import { ErrorMessage } from "vee-validate";

/* All Instance*/
const categoryStore = useCategoryStore();
const router = useRouter();
const swal = inject("$swal");

categoryStore.router = router;
categoryStore.swal = swal;

/* All Variables */
const formData = reactive({
  name: null,
  code: null,
  file: null,
});

const schema = reactive({
  name: "required",
});

/* All Methods */
const onFileChange = (e) => {
  formData.file = e.target.files[0];
};

const saveCategory = () => {
  categoryStore.storeCategory(formData);
};
/* Hooks and Computed Property */
</script>

<template>
  <ShortDashboard />
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <!-- Header Part -->
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="card-title fw-bold">Add New Category</h4>
                <router-link
                  :to="{ name: 'category-index' }"
                  class="btn btn-sm btn-primary fw-bold text-white"
                  ><i class="fas fa-arrow-left"></i> Category List</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <!-- Statistic Part -->

        <div class="col-md-6 offset-3">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <vee-form
                  :validation-schema="schema"
                  @submit="saveCategory"
                  enctype="multipart/form-data"
                >
                  <div class="row">
                    <div class="col-md-12 mb-4">
                      <label for="category-name" class="form-label"
                        >Category Name</label
                      >
                      <vee-field
                        type="text"
                        name="name"
                        class="form-control"
                        v-model="formData.name"
                        placeholder="Enter Category Name"
                      />
                      <ErrorMessage class="text-danger" name="name" />
                    </div>
                    <div class="col-md-12 mb-4">
                      <label for="category-code" class="form-label"
                        >Category Code</label
                      >
                      <vee-field
                        type="text"
                        name="code"
                        class="form-control"
                        v-model="formData.code"
                        placeholder="Enter Category code"
                      />
                      <ErrorMessage class="text-danger" name="code" />
                    </div>

                    <div class="col-md-12 mb-4">
                      <label for="category-image" class="form-label"
                        >Category Image</label
                      >
                      <vee-field
                        type="file"
                        @change="onFileChange"
                        name="file"
                        class="form-control"
                        accept="image/*"
                      />
                      <ErrorMessage class="text-danger" name="file" />
                    </div>
                  </div>
                  <div
                    class="d-flex justify-content-end align-items-center mt-3"
                  >
                    <button
                      class="btn btn-primary fw-bold text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </vee-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
