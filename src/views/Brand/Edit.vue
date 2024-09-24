<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted } from "vue";
import { useBrandStore } from "@/stores/brand";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage } from "vee-validate";

/* All Instance*/
const brandStore = useBrandStore();
const router = useRouter();
const route = useRoute();
const swal = inject("$swal");

brandStore.router = router;
brandStore.swal = swal;

/* All Variables */
const formData = reactive({
  name: null,
  code: null,
  file: null,
});

const schema = reactive({
  name: "required",
  code: "required",
});

/* All Methods */
const onFileChange = (e) => {
  brandStore.editFormData.file = e.target.files[0];
};

const UpdateBrand = () => {
  brandStore.updateBrand(brandStore.editFormData, route.params.id);
};

/* Hooks and Computed Property */

onMounted(() => {
  brandStore.getBrandById(route.params.id);
});
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
                <h4 class="card-title fw-bold">Update Brand</h4>
                <router-link
                  :to="{ name: 'brand-index' }"
                  class="btn btn-sm btn-primary fw-bold text-white"
                  ><i class="fas fa-arrow-left"></i> Brand List</router-link
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
                  @submit="UpdateBrand"
                  enctype="multipart/form-data"
                >
                  <div class="row">
                    <div class="col-md-12 mb-4">
                      <label for="brand-name" class="form-label"
                        >Brand Name</label
                      >
                      <vee-field
                        type="text"
                        name="name"
                        class="form-control"
                        v-model="brandStore.editFormData.name"
                        placeholder="Enter Brand Name"
                      />
                      <ErrorMessage class="text-danger" name="name" />
                    </div>
                    <div class="col-md-12 mb-4">
                      <label for="brand-code" class="form-label"
                        >Brand Code</label
                      >
                      <vee-field
                        type="text"
                        name="code"
                        class="form-control"
                        v-model="brandStore.editFormData.code"
                        placeholder="Enter brand code"
                      />
                      <ErrorMessage class="text-danger" name="code" />
                    </div>

                    <div class="col-md-12 mb-4">
                      <label for="brand-image" class="form-label"
                        >Brand Image</label
                      >
                      <template v-if="brandStore.editFormData.file != null">
                        <img
                          :src="brandStore.editFormData.file"
                          alt="cat-img"
                          class="img-fluid"
                          style="width: 80px; height: 80px"
                        />
                      </template>
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
                      Update
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
