<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted } from "vue";
import { useProductStore } from "@/stores/product";
import { useRouter } from "vue-router";
import { ErrorMessage } from "vee-validate";
import { useBrandStore } from "@/stores/brand";
import { useCategoryStore } from "@/stores/category";
import { useSupplierStore } from "@/stores/supplier";

/* All Instance*/
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const brandStore = useBrandStore();
const supplierStore = useSupplierStore();

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
  supplier_id: "required",
  code: "required|min:4|max:25",
  original_price: "required|min:1|max:10|min_value:0",
  sale_price: "required|min:1|max:10|min_value:0",
  stock: "required|min_value:1|min:1",
});

/* All Methods */
const onFileChange = (e) => {
  formData.file = e.target.files[0];
};

const saveProduct = () => {
  productStore.storeProduct(formData);
};
/* Hooks and Computed Property */
onMounted(() => {
  brandStore.getAllBrands();
  categoryStore.getAllCategories();
  supplierStore.getAllSuppliers();
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
                    <div class="col-md-4 mb-4">
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

                    <div class="col-md-4 mb-4">
                      <label for="product-code" class="form-label"
                        >Product Code</label
                      >
                      <vee-field
                        type="text"
                        name="code"
                        class="form-control"
                        v-model="formData.code"
                        placeholder="Enter Product Code"
                      />
                      <ErrorMessage class="text-danger" name="code" />
                    </div>

                    <div class="col-md-4 mb-4">
                      <label for="category-name" class="form-label"
                        >Category Name</label
                      >
                      <vee-field
                        as="select"
                        name="cat_id"
                        class="form-select"
                        v-model="formData.cat_id"
                      >
                        <option value="">Select Category</option>
                        <option
                          :value="category.category_id"
                          v-for="(category, index) in categoryStore.categories"
                          :key="category.category_id"
                        >
                          {{ index + 1 }} . {{ category.category_name }}
                        </option>
                      </vee-field>
                      <ErrorMessage class="text-danger" name="cat_id" />
                    </div>

                    <div class="col-md-4 mb-4">
                      <label for="Brand-name" class="form-label"
                        >Brand Name</label
                      >
                      <vee-field
                        as="select"
                        class="form-select"
                        name="brand_id"
                        v-model="formData.brand_id"
                      >
                        <option value="">Select Brand Name</option>
                        <option
                          :value="brand.brand_id"
                          v-for="(brand, index) in brandStore.brands"
                          :key="brand.brand_id"
                        >
                          {{ index + 1 }}. {{ brand.brand_name }}
                        </option>
                      </vee-field>
                      <ErrorMessage class="text-danger" name="brand_id" />
                    </div>

                    <div class="col-md-4 mb-4">
                      <label for="supplier-name" class="form-label"
                        >Supplier Name</label
                      >
                      <vee-field
                        as="select"
                        class="form-select"
                        name="supplier_id"
                        v-model="formData.supplier_id"
                      >
                        <option value="">Select Supplier Name</option>
                        <option
                          :value="supplier.id"
                          v-for="(supplier, index) in supplierStore.suppliers"
                          :key="supplier.id"
                        >
                          {{ index + 1 }}. {{ supplier.name }}
                        </option>
                      </vee-field>
                      <ErrorMessage class="text-danger" name="supplier_id" />
                    </div>

                    <div class="col-md-4 mb-4">
                      <label for="original-price" class="form-label"
                        >Original Price</label
                      >
                      <vee-field
                        type="text"
                        name="original_price"
                        class="form-control"
                        v-model="formData.original_price"
                        placeholder="Enter Original Price"
                        min="0"
                      />
                      <ErrorMessage class="text-danger" name="original_price" />
                    </div>

                    <div class="col-md-4 mb-4">
                      <label for="sale-price" class="form-label"
                        >Sale Price</label
                      >
                      <vee-field
                        type="text"
                        name="sale_price"
                        class="form-control"
                        v-model="formData.sale_price"
                        placeholder="Enter Sale Price"
                        min="0"
                      />
                      <ErrorMessage class="text-danger" name="sale_price" />
                    </div>

                    <div class="col-md-4 mb-4">
                      <label for="stock" class="form-label"
                        >Product Stock</label
                      >
                      <vee-field
                        type="number"
                        name="stock"
                        class="form-control"
                        v-model="formData.stock"
                        placeholder="Enter Product Stock"
                        min="0"
                      />
                      <ErrorMessage class="text-danger" name="stock" />
                    </div>

                    <div class="col-md-4 mb-4">
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
                      <textarea
                        name="description"
                        id="description"
                        class="form-control"
                        cols="30"
                        rows="2"
                        v-model="formData.description"
                        placeholder="Enter Product Description"
                      ></textarea>
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
