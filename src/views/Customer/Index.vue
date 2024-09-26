<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useCustomerStore } from "@/stores/customer";
import { useRouter } from "vue-router";
import _ from "lodash";

/* All Instance*/
const customerStore = useCustomerStore();
const router = useRouter();
const swal = inject("$swal");

customerStore.router = router;
customerStore.swal = swal;

/* All Variables */
const searchKeyWord = ref("");

/* All Methods */

const DeleteCustomer = (id, name) => {
  swal({
    title: `Are you sure? Do you want to delete this ${name} customer?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      customerStore.deleteCustomer(id, (status) => {
        if ((status = "success")) {
          customerStore.getCustomers(
            customerStore.pagination.current_page,
            customerStore.dataLimit
          );
        }
      });
    }
  });
};

/* Hooks and Computed Property */

onMounted(() => {
  customerStore.getCustomers(
    customerStore.pagination.current_page,
    customerStore.dataLimit
  );
});

watch(
  searchKeyWord,
  _.debounce((current, previous) => {
    customerStore.getCustomers(
      customerStore.pagination.current_page,
      customerStore.dataLimit,
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
                <h4 class="card-title fw-bold">Customers</h4>
                <router-link
                  :to="{ name: 'customer-create' }"
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
                  <span class="fw-bold">{{ customerStore.getTotalCount }}</span>
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
                          <th>Customer</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Image</th>
                          <th>Ref</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(customer, index) in customerStore.customers"
                          :key="customer.id"
                        >
                          <td>
                            {{
                              customerStore.pagination.current_page *
                                customerStore.dataLimit -
                              customerStore.dataLimit +
                              index +
                              1
                            }}
                          </td>
                          <td>{{ customer.name }}</td>
                          <td>{{ customer.phone }}</td>
                          <td>{{ customer.email }}</td>
                          <td>
                            <template v-if="customer.image != null">
                              <img
                                :src="customer.image"
                                alt="cat-img"
                                class="img-fluid"
                                style="width: 80px; height: 80px"
                              />
                            </template>
                          </td>
                          <td>
                            <template v-if="customer.image != null">
                              <a target="_blank" :href="customer.image">
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
                                :checked="customer.is_active"
                                @change.prevent="
                                  customerStore.changeStatus(customer.id)
                                "
                              />
                            </div>
                          </td>
                          <td>
                            <router-link
                              :to="{
                                name: 'customer-edit',
                                params: { id: customer.id },
                              }"
                              class="btn btn-info btn-sm"
                              ><i class="fas fa-edit"></i
                            ></router-link>

                            <a
                              @click.prevent="
                                DeleteCustomer(customer.id, customer.name)
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
            v-model="customerStore.pagination.current_page"
            :pages="customerStore.pagination.last_page"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="
              customerStore.getCustomers(
                customerStore.pagination.current_page,
                customerStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
