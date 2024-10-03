<script setup>
/* All Library Import */
import { ref, reactive, inject } from "vue";
import { useUnitStore } from "@/stores/unit";
import { useRouter } from "vue-router";
import { ErrorMessage } from "vee-validate";

/* All Instance*/
const unitStore = useUnitStore();
const router = useRouter();
const swal = inject("$swal");

unitStore.router = router;
unitStore.swal = swal;

/* All Variables */
const formData = reactive({
  unit_name: null,
});

const schema = reactive({
  unit_name: "required",
});

/* All Methods */
const saveUnit = () => {
  unitStore.storeUnit(formData);
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
                <h4 class="card-title fw-bold">Add New Unit</h4>
                <router-link
                  :to="{ name: 'unit-index' }"
                  class="btn btn-sm btn-primary fw-bold text-white"
                  ><i class="fas fa-arrow-left"></i> Unit List</router-link
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
                  @submit="saveUnit">
                  <div class="row">
                    <div class="col-md-12 mb-4">
                      <label for="unit-name" class="form-label"
                        >Unit Name</label
                      >
                      <vee-field
                        type="text"
                        name="name"
                        class="form-control"
                        v-model="formData.unit_name"
                        placeholder="Enter Unit Name"
                      />
                      <ErrorMessage class="text-danger" name="unit_name" />
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
