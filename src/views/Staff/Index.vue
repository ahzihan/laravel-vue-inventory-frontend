<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useStaffStore } from "@/stores/staff";
import { useRouter } from "vue-router";
import _ from "lodash";

/* All Instance*/
const staffStore = useStaffStore();
const router = useRouter();
const swal = inject("$swal");

staffStore.router = router;
staffStore.swal = swal;

/* All Variables */
const searchKeyWord = ref("");

/* All Methods */

const DeleteStaff = (id, name) => {
  swal({
    title: `Are you sure? Do you want to delete this ${name} staff?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      staffStore.deleteStaff(id, (status) => {
        if ((status = "success")) {
          staffStore.getStaffs(
            staffStore.pagination.current_page,
            staffStore.dataLimit
          );
        }
      });
    }
  });
};

/* Hooks and Computed Property */

onMounted(() => {
  staffStore.getStaffs(
    staffStore.pagination.current_page,
    staffStore.dataLimit
  );
});

watch(
  searchKeyWord,
  _.debounce((current, previous) => {
    staffStore.getStaffs(
      staffStore.pagination.current_page,
      staffStore.dataLimit,
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
                <h4 class="card-title fw-bold">All Staffs</h4>
                <router-link
                  :to="{ name: 'staff-create' }"
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
                  <span class="fw-bold">{{ staffStore.getTotalCount }}</span>
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
                          <th>Staff Name</th>
                          <th>Designation</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>NID</th>
                          <th>Image</th>
                          <th>Ref</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(staff, index) in staffStore.staffs"
                          :key="staff.id"
                        >
                          <td>
                            {{
                              staffStore.pagination.current_page *
                                staffStore.dataLimit -
                              staffStore.dataLimit +
                              index +
                              1
                            }}
                          </td>
                          <td>{{ staff.name }}</td>
                          <td>{{ staff.designation }}</td>
                          <td>{{ staff.phone }}</td>
                          <td>{{ staff.email }}</td>
                          <td>{{ staff.nid }}</td>
                          <td>
                            <template v-if="staff.image != null">
                              <img
                                :src="staff.image"
                                alt="cat-img"
                                class="img-fluid"
                                style="width: 80px; height: 80px"
                              />
                            </template>
                          </td>
                          <td>
                            <template v-if="staff.image != null">
                              <a target="_blank" :href="staff.image">
                                <i class="fas fa-download"></i>
                              </a>
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
                                :checked="staff.is_active"
                                @change.prevent="
                                  staffStore.changeStatus(staff.id)
                                "
                              />
                            </div>
                          </td>
                          <td>
                            <router-link
                              :to="{
                                name: 'staff-edit',
                                params: { id: staff.id },
                              }"
                              class="btn btn-info btn-sm"
                              ><i class="fas fa-edit"></i
                            ></router-link>

                            <a
                              @click.prevent="DeleteStaff(staff.id, staff.name)"
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
            v-model="staffStore.pagination.current_page"
            :pages="staffStore.pagination.last_page"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="
              staffStore.getStaffs(
                staffStore.pagination.current_page,
                staffStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
