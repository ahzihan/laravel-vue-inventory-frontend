<script setup>
/* All Library Import */
import { ref, reactive, inject } from "vue";
import { useCustomerStore } from "@/stores/customer";
import { useRouter } from "vue-router";
import { ErrorMessage } from "vee-validate";

/* All Instance*/
const customerStore = useCustomerStore();
const router = useRouter();
const swal = inject("$swal");

customerStore.router = router;
customerStore.swal = swal;

/* All Variables */
const formData = reactive({
  name: null,
  phone: null,
  email: null,
  address: null,
  file: null,
});

const schema = reactive({
  name: "required",
  phone: "required",
});

/* All Methods */
const onFileChange = (e) => {
  formData.file = e.target.files[0];
};

const saveCustomer = () => {
  customerStore.storeCustomer(formData);
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
                <h4 class="card-title fw-bold">Add New Customer</h4>
                <router-link
                  :to="{ name: 'customer-index' }"
                  class="btn btn-sm btn-primary fw-bold text-white"
                  ><i class="fas fa-arrow-left"></i> Customer List</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <!-- Statistic Part -->

        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <vee-form
                  :validation-schema="schema"
                  @submit="saveCustomer"
                  enctype="multipart/form-data"
                >
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <label for="customer-name" class="form-label"
                        >Customer Name</label
                      >
                      <vee-field
                        type="text"
                        name="name"
                        class="form-control"
                        v-model="formData.name"
                        placeholder="Enter Customer Name"
                      />
                      <ErrorMessage class="text-danger" name="name" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="customer-phone" class="form-label"
                        >Customer Phone</label
                      >
                      <vee-field
                        type="text"
                        name="phone"
                        class="form-control"
                        v-model="formData.phone"
                        placeholder="Enter phone number"
                      />
                      <ErrorMessage class="text-danger" name="phone" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="customer-email" class="form-label"
                        >Email Address</label
                      >
                      <vee-field
                        type="email"
                        name="email"
                        class="form-control"
                        v-model="formData.email"
                        placeholder="Enter email address"
                      />
                      <ErrorMessage class="text-danger" name="email" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="customer-image" class="form-label"
                        >Customer Image</label
                      >
                      <vee-field
                        type="file"
                        @change="onFileChange"
                        name="image"
                        class="form-control"
                        accept="image/*"
                      />
                      <ErrorMessage class="text-danger" name="image" />
                    </div>

                    <div class="col-md-12 mb-4">
                      <label for="customer-address" class="form-label"
                        >Address</label
                      >
                      <vee-field
                        type="text"
                        name="address"
                        class="form-control"
                        v-model="formData.address"
                        placeholder="Enter Address"
                      />
                      <ErrorMessage class="text-danger" name="address" />
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
