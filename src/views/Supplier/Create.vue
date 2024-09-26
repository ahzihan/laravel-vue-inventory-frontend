<script setup>
/* All Library Import */
import { ref, reactive, inject } from "vue";
import { useSupplierStore } from "@/stores/supplier";
import { useRouter } from "vue-router";
import { ErrorMessage } from "vee-validate";

/* All Instance*/
const supplierStore = useSupplierStore();
const router = useRouter();
const swal = inject("$swal");

supplierStore.router = router;
supplierStore.swal = swal;

/* All Variables */
const formData = reactive({
  name: null,
  designation: null,
  phone: null,
  email: null,
  nid: null,
  trade_name: null,
  address: null,
  image: null,
});

const schema = reactive({
  name: "required",
  phone: "required",
  trade_name: "required",
});

/* All Methods */
const onFileChange = (e) => {
  formData.file = e.target.files[0];
};

const saveSupplier = () => {
  supplierStore.storeSupplier(formData);
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
                <h4 class="card-title fw-bold">Add New Supplier</h4>
                <router-link
                  :to="{ name: 'supplier-index' }"
                  class="btn btn-sm btn-primary fw-bold text-white"
                  ><i class="fas fa-arrow-left"></i> Supplier List</router-link
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
                  @submit="saveSupplier"
                  enctype="multipart/form-data"
                >
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <label for="supplier-name" class="form-label"
                        >Supplier Name</label
                      >
                      <vee-field
                        type="text"
                        name="name"
                        class="form-control"
                        v-model="formData.name"
                        placeholder="Enter Supplier Name"
                      />
                      <ErrorMessage class="text-danger" name="name" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="supplier-phone" class="form-label"
                        >Supplier Phone</label
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
                      <label for="supplier-email" class="form-label"
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
                      <label for="supplier-trade-name" class="form-label"
                        >Trade Name</label
                      >
                      <vee-field
                        type="text"
                        name="trade_name"
                        class="form-control"
                        v-model="formData.trade_name"
                        placeholder="Enter trade name"
                      />
                      <ErrorMessage class="text-danger" name="trade_name" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="supplier-phone" class="form-label">NID</label>
                      <vee-field
                        type="text"
                        name="nid"
                        class="form-control"
                        v-model="formData.nid"
                        placeholder="Enter nid number"
                      />
                      <ErrorMessage class="text-danger" name="nid" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="supplier-image" class="form-label"
                        >Supplier Image</label
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
                      <label for="supplier-address" class="form-label"
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
