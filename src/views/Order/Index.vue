<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import _ from "lodash";
import { useOrderStore } from "@/stores/order";

/* All Instance*/
const orderStore = useOrderStore();
const router = useRouter();
const swal = inject("$swal");

orderStore.router = router;
orderStore.swal = swal;

/* All Variables */
const searchKeyWord = ref("");

/* All Methods */

/* Hooks and Computed Property */

onMounted(() => {
  orderStore.getOrders(
    orderStore.pagination.current_page,
    orderStore.dataLimit
  );
});

watch(
  searchKeyWord,
  _.debounce((current, previous) => {
    orderStore.getOrders(
      orderStore.pagination.current_page,
      orderStore.dataLimit,
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
                <h4 class="card-title fw-bold">Sale History</h4>
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
                  Total Orders:
                  <span class="fw-bold">{{ orderStore.getTotalCount }}</span>
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
                          <th>OrderID</th>
                          <th>Customer Name</th>
                          <th>Bill Amt.</th>
                          <th>Payment Method</th>
                          <th>Payment Amt.</th>
                          <th>Due Amt.</th>
                          <th>Subtotal</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(order, index) in orderStore.orders"
                          :key="order.id"
                        >
                          <td>
                            {{
                              orderStore.pagination.current_page *
                                orderStore.dataLimit -
                              orderStore.dataLimit +
                              index +
                              1
                            }}
                          </td>
                          <td>{{ order.id }}</td>
                          <td>{{ order.customer?.name }}</td>
                          <td>{{ order.total }}</td>
                          <td>{{ order.payment_method }}</td>
                          <td>{{ order.pay_amt }}</td>
                          <td>{{ order.due_amt }}</td>
                          <td>{{ order.subtotal }}</td>

                          <td>
                            <router-link
                              :to="{
                                name: 'order-show',
                                params: { id: order.id },
                              }"
                              class="btn btn-info btn-sm"
                              ><i class="fas fa-eye"></i
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
            v-model="orderStore.pagination.current_page"
            :pages="orderStore.pagination.last_page"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="
              orderStore.getOrders(
                orderStore.pagination.current_page,
                orderStore.dataLimit
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
