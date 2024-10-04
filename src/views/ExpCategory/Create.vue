<script setup>
/* All Library Import */
import { ref, reactive, inject } from "vue";
import { useRouter } from "vue-router";
import { ErrorMessage } from "vee-validate";
import { useExpCategoryStore } from "@/stores/expCategory";

/* All Instance*/
const expCategory = useExpCategoryStore();
const router = useRouter();
const swal = inject("$swal");

expCategory.router = router;
expCategory.swal = swal;

/* All Variables */
const formData = reactive({
  name: null,
});

const schema = reactive({
  name: "required",
});

/* All Methods */
const saveExpCategory = () => {
  expCategory.storeExpCategory(formData);
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
                <h4 class="card-title fw-bold">Add New</h4>
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
                <vee-form :validation-schema="schema" @submit="saveExpCategory">
                  <div class="row">
                    <div class="col-md-12 mb-4">
                      <label for="expense-category-name" class="form-label"
                        >Expense Category Name</label
                      >
                      <vee-field
                        type="text"
                        name="name"
                        class="form-control"
                        v-model="formData.name"
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
