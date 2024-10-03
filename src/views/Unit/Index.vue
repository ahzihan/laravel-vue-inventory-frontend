<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useUnitStore } from "@/stores/unit";
import { useRouter } from "vue-router";
import _ from "lodash";

/* All Instance*/
const unitStore = useUnitStore();
const router = useRouter();
const swal = inject("$swal");

unitStore.router = router;
unitStore.swal = swal;

/* All Variables */
const searchKeyWord = ref("");

/* All Methods */

const DeleteUnit = (id, unit_name) => {
  swal({
    title: `Are you sure? Do you want to delete this ${unit_name} unit?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      unitStore.deleteUnit(id, (status) => {
        if ((status = "success")) {
          unitStore.getUnits(
            unitStore.pagination.current_page,
            unitStore.dataLimit
          );
        }
      });
    }
  });
};

/* Hooks and Computed Property */

onMounted(() => {
  unitStore.getUnits(
    unitStore.pagination.current_page,
    unitStore.dataLimit
  );
});

watch(
  searchKeyWord,
  _.debounce((current, previous) => {
    unitStore.getUnits(
      unitStore.pagination.current_page,
      unitStore.dataLimit,
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
                <h4 class="card-title fw-bold">Units</h4>
                <router-link
                  :to="{ name: 'unit-create' }"
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
                  <span class="fw-bold">{{ unitStore.getTotalCount }}</span>
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
                          <th>Unit Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(unit, index) in unitStore.units"
                          :key="unit.id"
                        >
                          <td>
                            {{
                              unitStore.pagination.current_page *
                                unitStore.dataLimit -
                              unitStore.dataLimit +
                              index +
                              1
                            }}
                          </td>
                          <td>{{ unit.unit_name }}</td>
                          <td>
                            <div
                              class="form-check form-switch d-flex justify-content-center"
                            >
                              <input
                                type="checkbox"
                                class="form-check-input fs-5"
                                role="switch"
                                id="changeStatus"
                                :checked="unit.is_active"
                                @change.prevent="
                                  unitStore.changeStatus(unit.id)
                                "
                              />
                            </div>
                          </td>
                          <td>
                            <router-link
                              :to="{
                                name: 'unit-edit',
                                params: { id: unit.id },
                              }"
                              class="btn btn-info btn-sm"
                              ><i class="fas fa-edit"></i
                            ></router-link>

                            <a
                              @click.prevent="
                                DeleteUnit(unit.id, unit.unit_name)
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
            v-model="unitStore.pagination.current_page"
            :pages="unitStore.pagination.last_page"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="
              unitStore.getCategories(
                unitStore.pagination.current_page,
                unitStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
