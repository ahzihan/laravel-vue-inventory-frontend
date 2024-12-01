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
  dashboardStore.getNotifications();
});
</script>

<template>
  <div class="dropdown d-inline-block">
    <button
      type="button"
      class="btn header-item noti-icon"
      id="page-header-notifications-dropdown"
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i class="bx bx-bell icon-sm"></i>
      <span class="noti-dot bg-danger rounded-pill">{{
        dashboardStore.getUnReadNotificationCount
      }}</span>
    </button>
    <div
      class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
      aria-labelledby="page-header-notifications-dropdown"
    >
      <div class="p-3">
        <div class="row align-items-center">
          <div class="col">
            <h5 class="m-0 font-size-15">Notifications</h5>
          </div>
          <div class="col-auto">
            <a
              href="javascript:void(0);"
              class="small"
              @click.prevent="dashboardStore.markAsReadAll()"
            >
              Mark all as read</a
            >
          </div>
        </div>
      </div>
      <div data-simplebar style="max-height: 250px">
        <h6 class="dropdown-header bg-light">New</h6>
        <template
          v-for="(notification, index) in dashboardStore.notifications"
          :key="index"
        >
          <a href="" class="text-reset notification-item">
            <div class="d-flex border-bottom align-items-start">
              <div class="flex-grow-1">
                <h6 class="mb-1">
                  {{ new Date(notification.created_at).toLocaleString() }}
                </h6>
                <div class="text-muted">
                  <p class="mb-1 font-size-13">
                    {{ notification.data.details["subject"] }}
                    <span
                      v-if="notification.read_at"
                      class="badge badge-soft-success"
                      >Review</span
                    >
                    <span v-else class="badge badge-soft-danger">{{
                      "Unread"
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </a>
        </template>
      </div>
      <div class="p-2 border-top d-grid">
        <a
          class="btn btn-sm btn-link font-size-14 btn-block text-center"
          href="javascript:void(0)"
        >
          <i class="uil-arrow-circle-right me-1"></i> <span>View More..</span>
        </a>
      </div>
    </div>
  </div>
</template>