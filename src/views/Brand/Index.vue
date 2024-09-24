<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useBrandStore } from "@/stores/brand";
import { useRouter } from "vue-router";
import _ from "lodash";

/* All Instance*/
const brandStore = useBrandStore();
const router = useRouter();
const swal = inject("$swal");

brandStore.router = router;
brandStore.swal = swal;

/* All Variables */
const searchKeyWord = ref("");

/* All Methods */

const DeleteBrand = (id, name) => {
  swal({
    title: `Are you sure? Do you want to delete this ${name} brand?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      brandStore.deleteBrand(id, (status) => {
        if ((status = "success")) {
          brandStore.getBrands(
            brandStore.pagination.current_page,
            brandStore.dataLimit
          );
        }
      });
    }
  });
};

/* Hooks and Computed Property */

onMounted(() => {
  brandStore.getBrands(
    brandStore.pagination.current_page,
    brandStore.dataLimit
  );
});

watch(
  searchKeyWord,
  _.debounce((current, previous) => {
    brandStore.getBrands(
      brandStore.pagination.current_page,
      brandStore.dataLimit,
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
                <h4 class="card-title fw-bold">Brands</h4>
                <router-link
                  :to="{ name: 'brand-create' }"
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
                  <span class="fw-bold">{{ brandStore.getTotalCount }}</span>
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
                          <th>Brand</th>
                          <th>Code</th>
                          <th>File</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(brand, index) in brandStore.brands"
                          :key="brand.id"
                        >
                          <td>
                            {{
                              brandStore.pagination.current_page *
                                brandStore.dataLimit -
                              brandStore.dataLimit +
                              index +
                              1
                            }}
                          </td>
                          <td>{{ brand.name }}</td>
                          <td>{{ brand.code }}</td>
                          <td>
                            <template v-if="brand.file != null">
                              <img
                                :src="brand.file"
                                alt="cat-img"
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
                                :checked="brand.is_active"
                                @change.prevent="
                                  brandStore.changeStatus(brand.id)
                                "
                              />
                            </div>
                          </td>
                          <td>
                            <router-link
                              :to="{
                                name: 'brand-edit',
                                params: { id: brand.id },
                              }"
                              class="btn btn-info btn-sm"
                              ><i class="fas fa-edit"></i
                            ></router-link>

                            <a
                              @click.prevent="DeleteBrand(brand.id, brand.name)"
                              class="btn btn-sm btn-danger ms-2"
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
            v-model="brandStore.pagination.current_page"
            :pages="brandStore.pagination.last_page"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="
              brandStore.getBrands(
                brandStore.pagination.current_page,
                brandStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
