<template>
    <div class="dropdown d-inline-block">
        <button type="button" class="btn header-item user text-start d-flex align-items-center"
            id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img class="rounded-circle header-profile-user" src="@/assets/images/users/avatar-3.jpg"
                alt="Header Avatar">
            <span class="ms-2 d-none d-xl-inline-block user-item-desc">
                <span class="user-name">{{ username }}<i class="mdi mdi-chevron-down"></i></span>
            </span>
        </button>
        <div class="dropdown-menu dropdown-menu-end pt-0">
            <h6 class="dropdown-header">Welcome {{ username }}</h6>
            <a class="dropdown-item" href="#"><i
                    class="mdi mdi-account-circle text-muted font-size-16 align-middle me-1"></i> <span
                    class="align-middle">Profile</span></a>

            <a class="dropdown-item" href="#" @click.prevent="logout"><i
                    class="mdi mdi-logout text-muted font-size-16 align-middle me-1"></i> <span
                    class="align-middle">Logout</span></a>
        </div>
    </div>
</template>

<script setup>
/* All Library Import */
import { useAuthStore } from '@/stores/auth';
import { ref, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';

/* All Instance */
const swal = inject('$swal');
const authStore = useAuthStore();
const router = useRouter();


/* All Variable */
const username=authStore.getUserName || 'Admin';

/* Methods */
const logout = () => {
    authStore.removeToken();

    swal({
        icon: 'success',
        timer: 2000,
        title: "Successfully Logout!"
    });
    router.push({name: 'login'});
}
/** All Hooks*/

</script>