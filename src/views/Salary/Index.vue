<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useSalaryStore } from "@/stores/salary";
import { useRouter } from "vue-router";
import _ from "lodash";

/* All Instance*/
const salaryStore = useSalaryStore();
const router = useRouter();
const swal = inject("$swal");

salaryStore.router = router;
salaryStore.swal = swal;

/* All Variables */
const searchKeyWord = ref("");

/* All Methods */

const DeleteSalary = (id, name) => {
  swal({
    title: `Are you sure? Do you want to delete this ${name} Salary?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      salaryStore.deleteSalary(id, (status) => {
        if ((status = "success")) {
          salaryStore.getSalaries(
            salaryStore.pagination.current_page,
            salaryStore.dataLimit
          );
        }
      });
    }
  });
};

/* Hooks and Computed Property */

onMounted(() => {
  salaryStore.getSalaries(
    salaryStore.pagination.current_page,
    salaryStore.dataLimit
  );
});

watch(
  searchKeyWord,
  _.debounce((current, previous) => {
    salaryStore.getSalaries(
      salaryStore.pagination.current_page,
      salaryStore.dataLimit,
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
                <h4 class="card-title fw-bold">Salary Sheet</h4>
                <router-link
                  :to="{ name: 'salary-create' }"
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
                  <span class="fw-bold">{{ salaryStore.getTotalCount }}</span>
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
                          <th>Date</th>
                          <th>Staff Name</th>
                          <th>Month/Year</th>
                          <th>Salary Amount</th>
                          <th>Salary Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(salary, index) in salaryStore.salaries"
                          :key="salary.id"
                        >
                          <td>
                            {{
                              salaryStore.pagination.current_page *
                                salaryStore.dataLimit -
                              salaryStore.dataLimit +
                              index +
                              1
                            }}
                          </td>
                          <td>{{ salary.date }}</td>
                          <td>{{ salary.staff?.name }}</td>
                          <td>{{ salary.month }} - {{ salary.year }}</td>
                          <td>{{ salary.salary }}</td>
                          <td>{{ salary.type }}</td>
                          <td>
                            <router-link
                              :to="{
                                name: 'salary-edit',
                                params: { id: salary.id },
                              }"
                              class="btn btn-info btn-sm"
                              ><i class="fas fa-edit"></i
                            ></router-link>

                            <a
                              @click.prevent="
                                DeleteSalary(salary.id, salary.staff?.name)
                              "
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
            v-model="salaryStore.pagination.current_page"
            :pages="salaryStore.pagination.last_page"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="
              salaryStore.getSalaries(
                salaryStore.pagination.current_page,
                salaryStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
