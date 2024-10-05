<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ErrorMessage } from "vee-validate";
import { useExpenseStore } from "@/stores/expense";
import { useExpCategoryStore } from "@/stores/expCategory";
import { useStaffStore } from "@/stores/staff";

/* All Instance*/
const expenseStore = useExpenseStore();
const expCategoryStore = useExpCategoryStore();
const staffStore = useStaffStore();

const router = useRouter();
const swal = inject("$swal");

expenseStore.router = router;
expenseStore.swal = swal;

/* All Variables */
const formData = reactive({
  exp_cat_id: "",
  staff_id: "",
  amount: "",
  notes: "",
  file: null,
});

const schema = reactive({
  exp_cat_id: "required",
  staff_id: "required",
  amount: "required",
  notes: "required",
});

/* All Methods */
const onFileChange = (e) => {
  formData.file = e.target.files[0];
};

const saveExpense = () => {
  expenseStore.storeExpense(formData);
};
/* Hooks and Computed Property */
onMounted(() => {
  expCategoryStore.getAllExpenseCategories();
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
                <h4 class="card-title fw-bold">Add New Expense</h4>
                <router-link
                  :to="{ name: 'expense-index' }"
                  class="btn btn-sm btn-primary fw-bold text-white"
                  ><i class="fas fa-arrow-left"></i> Expense List</router-link
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
                  @submit="saveExpense"
                  enctype="multipart/form-data"
                >
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <label for="category-name" class="form-label"
                        >Expense Category</label
                      >
                      <vee-field
                        as="select"
                        name="exp_cat_id"
                        class="form-select"
                        v-model="formData.exp_cat_id"
                      >
                        <option value="">Select Category</option>
                        <option
                          v-for="(
                            expCat, index
                          ) in expCategoryStore.expCategories"
                          :key="expCat.id"
                          :value="expCat.id"
                        >
                          {{ index + 1 }} . {{ expCat.name }}
                        </option>
                      </vee-field>
                      <ErrorMessage class="text-danger" name="cat_id" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="staff-name" class="form-label"
                        >Staff Name</label
                      >
                      <vee-field
                        as="select"
                        class="form-select"
                        name="staff_id"
                        v-model="formData.staff_id"
                      >
                        <option value="">Select Staff</option>
                        <option
                          v-for="(staff, index) in staffStore.staffs"
                          :key="staff.id"
                          :value="staff.id"
                        >
                          {{ index + 1 }}. {{ staff.name }}
                        </option>
                      </vee-field>
                      <ErrorMessage class="text-danger" name="staff_id" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="amount" class="form-label">Amount</label>
                      <vee-field
                        type="text"
                        name="amount"
                        class="form-control"
                        v-model="formData.amount"
                        placeholder="Enter Amount"
                        min="0"
                      />
                      <ErrorMessage class="text-danger" name="amount" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="file" class="form-label">File</label>
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
                      <label for="notes" class="form-label">Notes</label>
                      <textarea
                        name="notes"
                        id="notes"
                        class="form-control"
                        cols="30"
                        rows="2"
                        v-model="formData.notes"
                        placeholder="Enter notes"
                      ></textarea>
                      <ErrorMessage class="text-danger" name="notes" />
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
