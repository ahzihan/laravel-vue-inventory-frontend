<script setup>
    /* All Library Import */
    import {
        ref,
        reactive,
        inject,
        onMounted
    } from 'vue';
    import {
        useCategoryStore
    } from '@/stores/category';
    import {
        useRoute,
        useRouter
    } from 'vue-router';

    /* All Instance*/
    const categoryStore = useCategoryStore();
    const router = useRouter();
    const swal = inject('$swal');


    categoryStore.router = router;
    categoryStore.swal = swal;
    /* All Variables */
    const searchKeyWord = ref('');

    /* All Methods */


/* Hooks and Computed Property */

onMounted(() => {
    categoryStore.getCategories(1, 5, '');
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
                                <h4 class="card-title">Categories</h4>
                                <router-link :to="{ name: 'category-create' }" class="btn btn-sm btn-primary"><i
                                        class="fas fa-plus-circle"></i> Add New</router-link>
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
                                    Total Count: <span class="fw-bold">{{ categoryStore.getTotalCount }}</span>
                                </div>
                                <div class="col-md-4">
                                    <input type="search" class="form-control form-control-sm" name="" placeholder="Search..."
                                        v-model="searchKeyWord">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Category</th>
                                                    <th>Code</th>
                                                    <th>File</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
