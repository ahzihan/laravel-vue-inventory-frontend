<script setup>
    /* All Library Import */
    import {
        ref,
        reactive,
        inject,
        onMounted,
        watch
    } from "vue";
    import {
        useSupplierStore
    } from "@/stores/supplier";
    import {
        useRouter
    } from "vue-router";
    import _ from "lodash";

    /* All Instance*/
    const supplierStore = useSupplierStore();
    const router = useRouter();
    const swal = inject("$swal");

    supplierStore.router = router;
    supplierStore.swal = swal;

    /* All Variables */
    const searchKeyWord = ref("");

    /* All Methods */

    const DeleteSupplier = (id, name) => {
        swal({
            title: `Are you sure? Do you want to delete this ${name} supplier?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                supplierStore.DeleteSupplier(id, (status) => {
                    if ((status = "success")) {
                        supplierStore.getSuppliers(
                            supplierStore.pagination.current_page,
                            supplierStore.dataLimit
                        );
                    }
                });
            }
        });
    };

    /* Hooks and Computed Property */

    onMounted(() => {
        supplierStore.getSuppliers(
            supplierStore.pagination.current_page,
            supplierStore.dataLimit
        );
    });

    watch(
        searchKeyWord,
        _.debounce((current, previous) => {
            supplierStore.getSuppliers(
                supplierStore.pagination.current_page,
                supplierStore.dataLimit,
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
                                <h4 class="card-title fw-bold">Suppliers</h4>
                                <router-link :to="{ name: 'supplier-create' }"
                                    class="btn btn-sm btn-primary fw-bold text-white"><i class="fas fa-plus-circle"></i>
                                    Add New</router-link>
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
                                    <span class="fw-bold">{{ supplierStore.getTotalCount }}</span>
                                </div>
                                <div class="col-md-4">
                                    <input type="search" class="form-control form-control-sm" name=""
                                        placeholder="Search..." v-model="searchKeyWord" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Supplier</th>
                                                    <th>Image</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(supplier, index) in supplierStore.suppliers"
                                                    :key="supplier.id">
                                                    <td>
                                                        {{ supplierStore .
                                                            pagination .
                                                            current_page * supplierStore .
                                                            dataLimit -
                                                            supplierStore .
                                                            dataLimit +
                                                            index +
                                                            1 }}
                                                    </td>
                                                    <td>{{ supplier.name }}</td>
                                                    <td>
                                                        <template v-if="supplier.image != null">
                                                            <img :src="supplier.image" alt="cat-img" class="img-fluid"
                                                                style="width: 80px; height: 80px" />
                                                        </template>
                                                    </td>
                                                    <td>
                                                        <div
                                                            class="form-check form-switch d-flex justify-content-center">
                                                            <input type="checkbox" class="form-check-input fs-5"
                                                                role="switch" id="changeStatus"
                                                                :checked="supplier.is_active"
                                                                @change.prevent="supplierStore.changeStatus(supplier.id)" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <router-link
                                                            :to="{
                                                                name: 'supplier-edit',
                                                                params: { id: supplier.id },
                                                            }"
                                                            class="btn btn-info btn-sm"><i
                                                                class="fas fa-edit"></i></router-link>

                                                        <a @click.prevent="DeleteSupplier(supplier.id, supplier.name)"
                                                            class="btn btn-sm btn-danger ms-2"><i
                                                                class="fas fa-trash"></i></a>
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
                    <v-pagination v-model="supplierStore.pagination.current_page"
                        :pages="supplierStore.pagination.last_page" :range-size="1" active-color="#DCEDFF"
                        @update:modelValue="supplierStore.getSuppliers(supplierStore.pagination.current_page,supplierStore.dataLimit)" />
                </div>
            </div>
        </div>
    </div>
</template>
