<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted } from "vue";
import { useStaffStore } from "@/stores/staff";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage } from "vee-validate";

/* All Instance*/
const staffStore = useStaffStore();
const router = useRouter();
const route = useRoute();
const swal = inject("$swal");

staffStore.router = router;
staffStore.swal = swal;

/* All Variables */
const schema = reactive({
  name: "required",
  phone: "required",
  nid: "required",
});

/* All Methods */
const onFileChange = (e) => {
  staffStore.editFormData.file = e.target.files[0];
};

const UpdateStaff = () => {
  staffStore.updateStaff(staffStore.editFormData, route.params.id);
};

/* Hooks and Computed Property */

onMounted(() => {
  staffStore.getStaffById(route.params.id);
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
                <h4 class="card-title fw-bold">Update Staff</h4>
                <router-link
                  :to="{ name: 'staff-index' }"
                  class="btn btn-sm btn-primary fw-bold text-white"
                  ><i class="fas fa-arrow-left"></i> Staff List</router-link
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
                  @submit="UpdateStaff"
                  enctype="multipart/form-data"
                >
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <label for="staff-name" class="form-label"
                        >Staff Name</label
                      >
                      <vee-field
                        type="text"
                        name="name"
                        class="form-control"
                        v-model="staffStore.editFormData.name"
                        placeholder="Enter staff Name"
                      />
                      <ErrorMessage class="text-danger" name="name" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="staff-designation" class="form-label"
                        >Designation</label
                      >
                      <vee-field
                        type="text"
                        name="designation"
                        class="form-control"
                        v-model="staffStore.editFormData.designation"
                        placeholder="Enter staff designation"
                      />
                      <ErrorMessage class="text-danger" name="designation" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="staff-phone" class="form-label"
                        >Phone Number</label
                      >
                      <vee-field
                        type="text"
                        name="phone"
                        class="form-control"
                        v-model="staffStore.editFormData.phone"
                        placeholder="Enter phone number"
                      />
                      <ErrorMessage class="text-danger" name="phone" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="staff-email" class="form-label"
                        >Email Address</label
                      >
                      <vee-field
                        type="email"
                        name="email"
                        class="form-control"
                        v-model="staffStore.editFormData.email"
                        placeholder="Enter email address"
                      />
                      <ErrorMessage class="text-danger" name="email" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="staff-nid" class="form-label"
                        >NID Number</label
                      >
                      <vee-field
                        type="text"
                        name="nid"
                        class="form-control"
                        v-model="staffStore.editFormData.nid"
                        placeholder="Enter nid number"
                      />
                      <ErrorMessage class="text-danger" name="nid" />
                    </div>

                    <div class="col-md-6 mb-4">
                      <label for="staff-image" class="form-label"
                        >Staff Image</label
                      >
                      <template v-if="staffStore.editFormData.file != null">
                        <img
                          :src="staffStore.editFormData.file"
                          alt="cat-img"
                          class="img-fluid"
                          style="width: 80px; height: 80px"
                        />
                      </template>
                      <vee-field
                        type="file"
                        @change="onFileChange"
                        name="image"
                        class="form-control"
                        accept="image/*"
                      />
                      <ErrorMessage class="text-danger" name="image" />
                    </div>

                    <div class="col-md-12 mb-4">
                      <label for="staff-address" class="form-label"
                        >Address</label
                      >
                      <vee-field
                        type="text"
                        name="address"
                        class="form-control"
                        v-model="staffStore.editFormData.address"
                        placeholder="Enter Address"
                      />
                      <ErrorMessage class="text-danger" name="address" />
                    </div>
                  </div>
                  <div
                    class="d-flex justify-content-end align-items-center mt-3"
                  >
                    <button
                      class="btn btn-primary fw-bold text-white"
                      type="submit"
                    >
                      Update
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
