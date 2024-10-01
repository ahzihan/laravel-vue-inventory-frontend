<script setup>
/* All Library Import */
import { ref, inject, onMounted } from "vue";
import { useDashboardStore } from "@/stores/dashboard";
import { useRouter } from "vue-router";

/* All Instance*/
const dashboardStore = useDashboardStore();
const router = useRouter();
const swal = inject("$swal");

dashboardStore.router = router;
dashboardStore.swal = swal;

/* All Variables */

/* All Methods */
onMounted(() => {
  dashboardStore.getDashboardInfo();
});
</script>

<template>
  <div class="collapse show dash-content" id="dashtoggle">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div
            class="page-title-box d-flex align-items-center justify-content-between"
          >
            <h4 class="mb-0 sub-title">Welcome !</h4>

            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item page-head">
                  <a href="javascript: void(0);">Dashboard</a>
                </li>
                <li class="breadcrumb-item page-head active">Welcome !</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <!-- end page title -->

      <!-- start dash info -->
      <div class="row">
        <div class="col-xl-12">
          <div class="card dash-header-box shadow-none border-0">
            <div class="card-body p-0">
              <div class="row row-cols-xxl-6 row-cols-md-3 row-cols-1 g-0">
                <div class="col-md-2">
                  <div class="mt-md-0 py-3 px-4 mx-2">
                    <p class="text-white-50 mb-2 text-truncate">Total Brands</p>
                    <h3 class="text-white mb-0">
                      {{ dashboardStore.dashboardInfo.total_brand }}
                    </h3>
                  </div>
                </div>
                <!-- end col -->

                <div class="col-md-2">
                  <div class="mt-3 mt-md-0 py-3 px-4 mx-2">
                    <p class="text-white-50 mb-2 text-truncate">
                      Total Category
                    </p>
                    <h3 class="text-white mb-0">
                      {{ dashboardStore.dashboardInfo.total_category }}
                    </h3>
                  </div>
                </div>
                <!-- end col -->

                <div class="col-md-2">
                  <div class="mt-3 mt-md-0 py-3 px-4 mx-2">
                    <p class="text-white-50 mb-2 text-truncate">
                      Total Suppliers
                    </p>
                    <h3 class="text-white mb-0">
                      {{ dashboardStore.dashboardInfo.total_supplier }}
                    </h3>
                  </div>
                </div>
                <!-- end col -->

                <div class="col-md-2">
                  <div class="mt-3 mt-md-0 py-3 px-4 mx-2">
                    <p class="text-white-50 mb-2 text-truncate">
                      Total Products
                    </p>
                    <h3 class="text-white mb-0">
                      {{ dashboardStore.dashboardInfo.total_product }}
                    </h3>
                  </div>
                </div>
                <!-- end col -->

                <div class="col-md-2">
                  <div class="mt-3 mt-lg-0 py-3 px-4 mx-2">
                    <p class="text-white-50 mb-2 text-truncate">
                      Total Customer
                    </p>
                    <h3 class="text-white mb-0">
                      {{ dashboardStore.dashboardInfo.total_customer }}
                    </h3>
                  </div>
                </div>
                <!-- end col -->

                <div class="col-md-2">
                  <div class="mt-3 mt-lg-0 py-3 px-4 mx-2">
                    <p class="text-white-50 mb-2 text-truncate">Total Sale</p>
                    <h3 class="text-white mb-0">
                      {{ dashboardStore.dashboardInfo.total_sale }}
                    </h3>
                  </div>
                </div>
                <!-- end col -->
              </div>
              <!-- end row -->
            </div>
            <!-- end card body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->
      </div>
      <!-- end dash info -->
    </div>
  </div>

  <!-- start dash toggle-icon -->
  <div>
    <a
      class="dash-troggle-icon"
      id="dash-troggle-icon"
      data-bs-toggle="collapse"
      href="#dashtoggle"
      aria-expanded="true"
      aria-controls="dashtoggle"
    >
      <i class="bx bx-up-arrow-alt"></i>
    </a>
  </div>
  <!-- end dash toggle-icon -->
</template>
