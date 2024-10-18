
<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useProductStore } from "@/stores/product";
import { useBrandStore } from "@/stores/brand";
import { useCategoryStore } from "@/stores/category";
import { useRouter } from "vue-router";
import _ from "lodash";
import { Modal } from "bootstrap";

/* All Instance*/
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const brandStore = useBrandStore();
const router = useRouter();
const swal = inject("$swal");

productStore.router = router;
productStore.swal = swal;

/* All Variables */
const searchKeyWord = ref("");

const filterFormData = reactive({
  cat_id: "",
  brand_id: "",
});

const cartFormData = reactive({
  product_id: "",
  quantity: 0,
  subtotal: 0,
});

let cartModal = ref("");
let cartModalObj = null;

/* All Methods */
const openCartModal = (product) => {
  console.log(product);
  productStore.product = product;
  cartModalObj.show();
};

/* Hooks and Computed Property */

onMounted(() => {
  cartModalObj = new Modal(cartModal.value);
  brandStore.getAllBrands();
  categoryStore.getAllCategories();
  productStore.getProducts(1, productStore.dataLimit);
});

watch(
  searchKeyWord,
  _.debounce((current, previous) => {
    productStore.getProducts(
      productStore.pagination.current_page,
      productStore.dataLimit,
      current,
      filterFormData
    );
  }, 500)
);
</script>


<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Product List</h4>
              <!-- Filter -->
              <div class="row mb-3">
                <div class="col-md-4">
                  <select
                    name="cat_id"
                    class="form-select"
                    v-model="filterFormData.cat_id"
                    @change="
                      productStore.getProducts(
                        productStore.pagination.current_page,
                        productStore.dataLimit,
                        searchKeyWord,
                        filterFormData
                      )
                    "
                  >
                    <option value="">Select Category</option>
                    <option
                      :value="category.category_id"
                      v-for="(category, index) in categoryStore.categories"
                      :key="category.category_id"
                    >
                      {{ index + 1 }}. {{ category.category_name }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <select
                    name="brand_id"
                    class="form-select"
                    v-model="filterFormData.brand_id"
                    @change="
                      productStore.getProducts(
                        productStore.pagination.current_page,
                        productStore.dataLimit,
                        searchKeyWord,
                        filterFormData
                      )
                    "
                  >
                    <option value="">Select Brand</option>
                    <option
                      :value="brand.brand_id"
                      v-for="(brand, index) in brandStore.brands"
                      :key="brand.brand_id"
                    >
                      {{ index + 1 }}. {{ brand.brand_name }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <input
                    type="search"
                    class="form-control"
                    v-model="searchKeyWord"
                    placeholder="Search Product.."
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Product List -->
          <div class="row">
            <div
              class="col-md-4"
              v-for="(product, index) in productStore.products"
              :key="product.id"
            >
              <a
                href=""
                class="btn btn-sm"
                @click.prevent="openCartModal(product)"
              >
                <div class="card">
                  <div class="card-content">
                    <img
                      :src="product.file"
                      alt="product-image img-fluid"
                      style="width: 50%; height: 50%"
                    />
                    <div class="card-body text-center">
                      <h4 class="card-title">{{ product.name }}</h4>
                      <span
                        class="badge"
                        :class="product.stock > 0 ? 'bg-success' : 'bg-danger'"
                      >
                        <span v-if="product.stock > 0">Available</span>
                        <span v-else>Out of Stock</span>
                        :{{ product.stock }}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4">Cart</div>
      </div>
    </div>
  </div>

  <!-- Product Modal -->

  <div
    class="modal fade"
    id="addToCartModal"
    tabindex="-1"
    aria-labelledby="addToCartModalLabel"
    aria-hidden="true"
    ref="cartModal"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addToCartModalLabel">
            {{ productStore.product?.name }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-content">
              <div class="row">
                <div class="col-md-4">
                  <img
                    :src="productStore.product?.file"
                    class="card-img-top img-fluid"
                    alt="product-image"
                  />
                </div>
                <div class="col-md-8">
                  <div class="row py-2">
                    <div class="col-md-6">
                      <label for="original-price" class="form-label"
                        >Original Price: (BDT)</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        :value="productStore.product?.original_price"
                        name="original_price"
                        disabled
                      />
                    </div>

                    <div class="col-md-6">
                      <label for="sale-price" class="form-label"
                        >Sale Price: (BDT)</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        :value="productStore.product?.sale_price"
                        name="sale_price"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label for="stock" class="form-label"
                        >Current Stock:</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        :value="productStore.product?.stock"
                        name="stock"
                        disabled
                      />
                    </div>

                    <div class="col-md-6">
                      <label for="sale-quantity" class="form-label"
                        >Sale Quantity:</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        value=""
                        name="quantity"
                        v-model="cartFormData.quantity"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>