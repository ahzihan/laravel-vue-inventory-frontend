<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage } from "vee-validate";
import { useExpCategoryStore } from "@/stores/expCategory";

/* All Instance*/
const expCategoryStore = useExpCategoryStore();
const router = useRouter();
const route = useRoute();
const swal = inject("$swal");

expCategoryStore.router = router;
expCategoryStore.swal = swal;

/* All Variables */
const schema = reactive({
  name: "required",
});

/* All Methods */
const UpdateExpCategory = () => {
  expCategoryStore.updateExpCategory(
    expCategoryStore.editFormData,
    route.params.id
  );
};

/* Hooks and Computed Property */
onMounted(() => {
  expCategoryStore.getExpCategoryById(route.params.id);
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
                <h4 class="card-title fw-bold">Update Expense Category</h4>
                <router-link
                  :to="{ name: 'expense-category-index' }"
                  class="btn btn-sm btn-primary fw-bold text-white"
                  ><i class="fas fa-arrow-left"></i> Expense Category
                  List</router-link
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
                  @submit="UpdateExpCategory"
                  enctype="multipart/form-data"
                >
                  <div class="row">
                    <div class="col-md-12 mb-4">
                      <label for="expense-category-name" class="form-label"
                        >Expense Category Name</label
                      >
                      <vee-field
                        type="text"
                        name="name"
                        class="form-control"
                        v-model="expCategoryStore.editFormData.name"
                        placeholder="Enter Expense Category Name"
                      />
                      <ErrorMessage class="text-danger" name="name" />
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
