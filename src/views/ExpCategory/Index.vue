<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import _ from "lodash";
import { useExpCategoryStore } from "@/stores/expCategory";

/* All Instance*/
const expCategoryStore = useExpCategoryStore();
const router = useRouter();
const swal = inject("$swal");

expCategoryStore.router = router;
expCategoryStore.swal = swal;

/* All Variables */
const searchKeyWord = ref("");

/* All Methods */

/* Hooks and Computed Property */

onMounted(() => {
  expCategoryStore.getAllExpenseCategories(
    expCategoryStore.pagination.current_page,
    expCategoryStore.dataLimit
  );
});

watch(
  searchKeyWord,
  _.debounce((current, previous) => {
    expCategoryStore.getExpCategories(
      expCategoryStore.pagination.current_page,
      expCategoryStore.dataLimit,
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
                <h4 class="card-title fw-bold">Expense Categories</h4>
                <router-link
                  :to="{ name: 'expense-category-create' }"
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
                  <span class="fw-bold">{{
                    expCategoryStore.getTotalCount
                  }}</span>
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
                          <th>Expense Category Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(
                            expCat, index
                          ) in expCategoryStore.expCategories"
                          :key="expCat.id"
                        >
                          <td>
                            {{
                              expCategoryStore.pagination.current_page *
                                expCategoryStore.dataLimit -
                              expCategoryStore.dataLimit +
                              index +
                              1
                            }}
                          </td>
                          <td>{{ expCat.name }}</td>
                          <td>
                            <div
                              class="form-check form-switch d-flex justify-content-center"
                            >
                              <input
                                type="checkbox"
                                class="form-check-input fs-5"
                                role="switch"
                                id="changeStatus"
                                :checked="expCat.is_active"
                                @change.prevent="
                                  expCategoryStore.changeStatus(expCat.id)
                                "
                              />
                            </div>
                          </td>
                          <td>
                            <router-link
                              :to="{
                                name: 'expense-category-edit',
                                params: { id: expCat.id },
                              }"
                              class="btn btn-info btn-sm"
                              ><i class="fas fa-edit"></i
                            ></router-link>
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
            v-model="expCategoryStore.pagination.current_page"
            :pages="expCategoryStore.pagination.last_page"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="
              expCategoryStore.getExpCategories(
                expCategoryStore.pagination.current_page,
                expCategoryStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
