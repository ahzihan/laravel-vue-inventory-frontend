<script setup>
/* All Library Import */
import { ref, reactive, inject } from "vue";
import { useProductStore } from "@/stores/product";
import { useRouter } from "vue-router";
import { ErrorMessage } from "vee-validate";

/* All Instance*/
const productStore = useProductStore();
const router = useRouter();
const swal = inject("$swal");

productStore.router = router;
productStore.swal = swal;

/* All Variables */
const formData = reactive({
  name: "",
  cat_id: "",
  brand_id: "",
  unit_id: "",
  supplier_id: "",
  code: "",
  original_price: 0,
  sale_price: 0,
  stock: 1,
  description: "",
  file: null,
});

const schema = reactive({
  name: "required",
  cat_id: "required",
  brand_id: "required",
  unit_id: "required",
  supplier_id: "required",
  code: "required",
});

/* All Methods */
const onFileChange = (e) => {
  formData.file = e.target.files[0];
};

const saveProduct = () => {
  productStore.storeProduct(formData);
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
                <h4 class="card-title fw-bold">Add New Product</h4>
                <router-link
                  :to="{ name: 'product-index' }"
                  class="btn btn-sm btn-primary fw-bold text-white"
                  ><i class="fas fa-arrow-left"></i> Product List</router-link
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
                  @submit="saveProduct"
                  enctype="multipart/form-data"
                >
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <label for="product-name" class="form-label"
                        >Product Name</label
                      >
                      <vee-field
                        type="text"
                        name="name"
                        class="form-control"
                        v-model="formData.name"
                        placeholder="Enter Product Name"
                      />
                      <ErrorMessage class="text-danger" name="name" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="product-code" class="form-label">Code</label>
                      <vee-field
                        type="text"
                        name="code"
                        class="form-control"
                        v-model="formData.code"
                        placeholder="Enter code number"
                      />
                      <ErrorMessage class="text-danger" name="code" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="product-image" class="form-label"
                        >Product Image</label
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

                    <div class="col-md-12 mb-4">
                      <label for="product-description" class="form-label"
                        >Description</label
                      >
                      <vee-field
                        type="text"
                        name="description"
                        class="form-control"
                        v-model="formData.description"
                        placeholder="Enter description"
                      />
                      <ErrorMessage class="text-danger" name="description" />
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
