<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import _ from "lodash";
import { useExpenseStore } from "@/stores/expense";

/* All Instance*/
const expenseStore = useExpenseStore();
const router = useRouter();
const swal = inject("$swal");

expenseStore.router = router;
expenseStore.swal = swal;

/* All Variables */
const searchKeyWord = ref("");

/* All Methods */

/* Hooks and Computed Property */

onMounted(() => {
  expenseStore.getExpenses(
    expenseStore.pagination.current_page,
    expenseStore.dataLimit
  );
});

watch(
  searchKeyWord,
  _.debounce((current, previous) => {
    expenseStore.getExpenses(
      expenseStore.pagination.current_page,
      expenseStore.dataLimit,
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
                <h4 class="card-title fw-bold">All Expense</h4>
                <router-link
                  :to="{ name: 'expense-create' }"
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
                  <span class="fw-bold">{{ expenseStore.getTotalCount }}</span>
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
                          <th>Expense Category</th>
                          <th>Staff Name</th>
                          <th>Amount</th>
                          <th>Note</th>
                          <th>File</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(expense, index) in expenseStore.expenses"
                          :key="expense.id"
                        >
                          <td>
                            {{
                              expenseStore.pagination.current_page *
                                expenseStore.dataLimit -
                              expenseStore.dataLimit +
                              index +
                              1
                            }}
                          </td>
                          <td>{{ expense.exp_category?.name }}</td>
                          <td>{{ expense.staff?.name }}</td>
                          <td>{{ expense.amount }}</td>
                          <td>{{ expense.notes }}</td>
                          <td>
                            <template v-if="expense.file != null">
                              <img
                                :src="expense.file"
                                alt="expense-img"
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
                                :checked="expense.is_active"
                                @change.prevent="
                                  expenseStore.changeStatus(expense.id)
                                "
                              />
                            </div>
                          </td>
                          <td>
                            <router-link
                              :to="{
                                name: 'expense-edit',
                                params: { id: expense.id },
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
            v-model="expenseStore.pagination.current_page"
            :pages="expenseStore.pagination.last_page"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="
              expenseStore.getExpenses(
                expenseStore.pagination.current_page,
                expenseStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
