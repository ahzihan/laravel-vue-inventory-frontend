<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useProductStore } from "@/stores/product";
import { useRouter } from "vue-router";
import _ from "lodash";

/* All Instance*/
const productStore = useProductStore();
const router = useRouter();
const swal = inject("$swal");

productStore.router = router;
productStore.swal = swal;

/* All Variables */
const searchKeyWord = ref("");

/* All Methods */

const DeleteProduct = (id, name) => {
  swal({
    title: `Are you sure? Do you want to delete this ${name} product?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      productStore.deleteProduct(id, (status) => {
        if ((status = "success")) {
          productStore.getProducts(
            productStore.pagination.current_page,
            productStore.dataLimit
          );
        }
      });
    }
  });
};

/* Hooks and Computed Property */

onMounted(() => {
  productStore.getProducts(
    productStore.pagination.current_page,
    productStore.dataLimit
  );
});

watch(
  searchKeyWord,
  _.debounce((current, previous) => {
    productStore.getProducts(
      productStore.pagination.current_page,
      productStore.dataLimit,
      current
    );
  }, 500)
);
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
                <h4 class="card-title fw-bold">All Products</h4>
                <router-link
                  :to="{ name: 'product-create' }"
                  class="btn btn-sm btn-primary fw-bold text-white"
                  ><i class="fas fa-plus-circle"></i> Add New</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <!-- Statistic Part -->

        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-md-8">
                  Total Count:
                  <span class="fw-bold">{{ productStore.getTotalCount }}</span>
                </div>
                <div class="col-md-4">
                  <input
                    type="search"
                    class="form-control form-control-sm"
                    name=""
                    placeholder="Search..."
                    v-model="searchKeyWord"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Code</th>
                          <th>Original Price</th>
                          <th>Sale Price</th>
                          <th>Stock</th>
                          <th>Image</th>
                          <th>Barcode</th>
                          <th>QRcode</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(product, index) in productStore.products"
                          :key="product.id"
                        >
                          <td>
                            {{
                              productStore.pagination.current_page *
                                productStore.dataLimit -
                              productStore.dataLimit +
                              index +
                              1
                            }}
                          </td>
                          <td>{{ product.name }}</td>
                          <td>{{ product.code }}</td>
                          <td>{{ product.original_price }}</td>
                          <td>{{ product.sale_price }}</td>
                          <td>{{ product.stock }}</td>
                          <td>
                            <template v-if="product.file != null">
                              <img
                                :src="product.file"
                                alt="cat-img"
                                class="img-fluid"
                                style="width: 80px; height: 80px"
                              />
                            </template>
                          </td>
                          <td>
                            <template v-if="product.barcode != null">
                              <img
                                :src="product.barcode"
                                alt="cat-barcode"
                                class="img-fluid"
                                style="width: 80px; height: 80px"
                              />
                            </template>
                          </td>
                          <td>
                            <template v-if="product.qrcode != null">
                              <img
                                :src="product.qrcode"
                                alt="cat-qrcode"
                                class="img-fluid"
                                style="width: 80px; height: 80px"
                              />
                            </template>
                          </td>
                          <td>
                            <div
                              class="form-check form-switch d-flex justify-content-center"
                            >
                              <input
                                type="checkbox"
                                class="form-check-input fs-5"
                                role="switch"
                                id="changeStatus"
                                :checked="product.is_active"
                                @change.prevent="
                                  productStore.changeStatus(product.id)
                                "
                              />
                            </div>
                          </td>
                          <td>
                            <router-link
                              :to="{
                                name: 'product-edit',
                                params: { id: product.id },
                              }"
                              class="btn btn-info btn-sm"
                              ><i class="fas fa-edit"></i
                            ></router-link>

                            <a
                              @click.prevent="
                                DeleteProduct(product.id, product.name)
                              "
                              class="btn btn-sm btn-danger mt-2"
                              ><i class="fas fa-trash"></i
                            ></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <v-pagination
            v-model="productStore.pagination.current_page"
            :pages="productStore.pagination.last_page"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="
              productStore.getProducts(
                productStore.pagination.current_page,
                productStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
