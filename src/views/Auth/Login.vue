<template>
    <div class="auth-bg-basic d-flex align-items-center min-vh-100">
        <div class="bg-overlay bg-light"></div>
        <div class="container">
            <div class="d-flex flex-column min-vh-100 py-5 px-3">
                <div class="row justify-content-center">
                    <div class="col-xl-5">
                        <div class="text-center text-muted mb-2">
                            <div class="pb-3">
                                <a href="index.html">
                                    <span class="logo-lg">
                                        <img src="@/assets/images/logo-sm.svg" alt="" height="24"> <span
                                            class="logo-txt">Inventory</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center my-auto">
                    <div class="col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-transparent shadow-none border-0">
                            <div class="card-body">
                                <div class="py-3">
                                    <div class="text-center">
                                        <h5 class="mb-0">Welcome To Login Page</h5>
                                        <p class="text-muted mt-2">Sign in to continue</p>
                                    </div>
                                    <form class="mt-4 pt-2">
                                        <div class="form-floating form-floating-custom mb-3">
                                            <input type="text" class="form-control" id="input-username"
                                                placeholder="Enter User Name">
                                            <label for="input-username">Username</label>
                                            <div class="form-floating-icon">
                                                <i class="uil uil-users-alt"></i>
                                            </div>
                                        </div>

                                        <div class="form-floating form-floating-custom mb-3 auth-pass-inputgroup">
                                            <input type="password" class="form-control" id="password-input"
                                                placeholder="Enter Password">

                                            <label for="password-input">Password</label>
                                            <div class="form-floating-icon">
                                                <i class="uil uil-padlock"></i>
                                            </div>
                                        </div>

                                        <div class="form-check form-check-primary font-size-16 py-1">
                                            <input class="form-check-input" type="checkbox" id="remember-check">
                                            <div class="float-end">
                                                <a href="auth-resetpassword-basic.html"
                                                    class="text-muted text-decoration-underline font-size-14">Forgot
                                                    your password?</a>
                                            </div>
                                            <label class="form-check-label font-size-14" for="remember-check">
                                                Remember me
                                            </label>
                                        </div>

                                        <div class="mt-3">
                                            <button class="btn btn-primary w-100" type="submit">Log In</button>
                                        </div>

                                        <div class="mt-4 pt-3 text-center">
                                            <p class="text-muted mb-0">Don't have an account ? <a
                                                    href="auth-signup-basic.html"
                                                    class="fw-semibold text-decoration-underline"> Signup Now </a> </p>
                                        </div>

                                    </form>
                                    <!-- end form -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- end row -->
            </div>
        </div>
    </div>
</template>

<script setup>
/** All Library Import*/
import { useAuthStore } from '@/stores/auth';
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/** All Instanse*/
const authStore = useAuthStore();
const router = useRouter();


/** All Variable*/
const loginForm = reactive({
    email: null,
    password: null,
});

/** All Methods*/
const login = () => {

}
/** All Hooks*/

</script>
