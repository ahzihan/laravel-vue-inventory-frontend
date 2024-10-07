<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ErrorMessage } from "vee-validate";
import { useSalaryStore } from "@/stores/salary";
import { useStaffStore } from "@/stores/staff";
import { getMonths, getYears } from "@/helpers/helper";


/* All Instance*/
const salaryStore = useSalaryStore();
const staffStore = useStaffStore();

const router = useRouter();
const swal = inject("$swal");

salaryStore.router = router;
salaryStore.swal = swal;

/* All Variables */
const formData = reactive({
  staff_id: "",
  salary: 0,
  date: "",
  month: "",
  year: "",
  type: "",
});

const schema = reactive({
  staff_id: "required",
  salary: "required|min:1|min_value:0",
  date: "required",
  month: "required",
  year: "required",
  type: "required",
});

/* All Methods */
const saveSalary = () => {
  salaryStore.storeSalary(formData);
};
/* Hooks and Computed Property */
onMounted(() => {
  staffStore.getAllStaffs();
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
                <h4 class="card-title fw-bold">Add New Salary</h4>
                <router-link
                  :to="{ name: 'salary-index' }"
                  class="btn btn-sm btn-primary fw-bold text-white"
                  ><i class="fas fa-arrow-left"></i> Salary List</router-link
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
                <vee-form :validation-schema="schema" @submit="saveSalary">
                  <div class="row">
                    
                    <div class="col-md-6 mb-4">
                      <label for="date" class="form-label">Date</label>
                      <vee-field
                        type="date"
                        name="date"
                        class="form-control"
                        v-model="formData.date"
                        placeholder="Enter Date"
                      />
                      <ErrorMessage class="text-danger" name="date" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="staff-name" class="form-label"
                        >Staff Name</label
                      >
                      <vee-field
                        as="select"
                        name="staff_id"
                        class="form-select"
                        v-model="formData.staff_id"
                      >
                        <option value="">Select Staff</option>
                        <option
                          :value="staff.id"
                          v-for="(staff, index) in staffStore.staffs"
                          :key="staff.id"
                        >
                          {{ staff.name }}
                        </option>
                      </vee-field>
                      <ErrorMessage class="text-danger" name="staff_id" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="month" class="form-label">Month</label>
                      <vee-field
                        as="select"
                        name="month"
                        class="form-select"
                        v-model="formData.month"
                      >
                        <option value="">Select Month</option>
                        <option
                          :value="month"
                          v-for="(month, index) in getMonths()"
                          :key="index"
                        >
                          {{ index + 1 }} . {{ month }}
                        </option>
                      </vee-field>
                      <ErrorMessage class="text-danger" name="month" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="year" class="form-label">Year</label>
                      <vee-field
                        as="select"
                        name="year"
                        class="form-select"
                        v-model="formData.year"
                      >
                        <option value="">Select Year</option>
                        <option
                          :value="year"
                          v-for="(year, index) in getYears(2010)"
                          :key="index"
                        >
                          {{ year }}
                        </option>
                      </vee-field>
                      <ErrorMessage class="text-danger" name="year" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="sale-price" class="form-label"
                        >Salary Amount</label
                      >
                      <vee-field
                        type="number"
                        name="salary"
                        class="form-control"
                        v-model="formData.salary"
                        placeholder="Enter Salary.."
                        min="0"
                      />
                      <ErrorMessage class="text-danger" name="salary" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="type" class="form-label">Type</label>
                      <vee-field
                        as="select"
                        name="type"
                        class="form-select"
                        v-model="formData.type"
                      >
                        <option value="">Select Type</option>
                        <option
                          :value="type"
                          v-for="(type, index) in salaryStore.salary_types"
                          :key="index"
                        >
                          {{ index + 1 }} . {{ type }}
                        </option>
                      </vee-field>
                      <ErrorMessage class="text-danger" name="type" />
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
