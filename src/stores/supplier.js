
import config from "@/utils/config";
import { inventoryAxiosClient } from "@/utils/systemaxios";
import { defineStore } from "pinia";


export const useSupplierStore = defineStore('supplier', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        suppliers: [],
        supplier: null,
        errors: [],
        swal: null,
        router: null,
        is_loading: false,
        pagination: {
            current_page: 1,
            last_page: 0,
            totalCount: 0,
        },
        editFormData: {
            name: null,
            designation: null,
            phone: null,
            email: null,
            nid: null,
            tread_name: null,
            address: null,
            image: null,
            _method: 'PUT'
        }
    }),

    getters: {
        getTotalCount(state) {
            return state.pagination.totalCount;
        }
    },

    actions: {
        async getAllSuppliers() {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/all-supplier');
                console.log(data);
                this.rawData = data;
                this.suppliers = data.data;
                this.pagination.totalCount = data.metadata?.count;
                this.is_loading = false;
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response?.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went Wrong!',
                    text: this.errors?.message
                });
            }
        },
        async getSuppliers(page=1,limit=this.dataLimit,search="") {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/suppliers', {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search,
                    }
                });
                // console.log(data);
                this.rawData = data.data;
                this.suppliers = data.data?.data;
                this.pagination.current_page = data.data?.current_page;
                this.pagination.last_page = data.data?.last_page;
                this.pagination.totalCount = data.data?.total;
                this.is_loading = false;
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response?.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went Wrong!',
                    text: this.errors?.message
                });
            }
        },
        
        async storeSupplier(formData) {
            this.is_loading = true;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };
                const { data } = await inventoryAxiosClient.post('/suppliers', formData, config);

                this.swal({
                    icon: 'success',
                    title: 'Supplier Inserted Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'supplier-index' });
            } catch (error) {
                this.errors = error.response?.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!',
                    timer: 1000,
                    text: this.errors?.message
                });
                this.is_loading = false;
            }
        },

        async getSupplierById(supplier_id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/suppliers/${supplier_id}`);
                // console.log(data.data);

                this.editFormData.name = data.data?.name;
                this.editFormData.designation = data.data?.designation;
                this.editFormData.phone = data.data?.phone;
                this.editFormData.email = data.data?.email;
                this.editFormData.nid = data.data?.nid;
                this.editFormData.tread_name = data.data?.tread_name;
                this.editFormData.address = data.data?.address;
                this.editFormData.image = data.data?.image;
                this.editFormData.phone = data.data?.phone;
                this.is_loading = false;
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response?.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went Wrong!',
                    text: this.errors?.message
                });
            }
        },
        async updateSupplier(formData, supplier_id) {
            this.is_loading = true;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };
                const { data } = await inventoryAxiosClient.post(`/suppliers/${supplier_id}`,formData,config);
                this.swal({
                    icon: 'success',
                    title: 'Supplier Updated Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'supplier-index' });
            } catch (error) {
                this.errors = error.response?.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!',
                    timer: 1000,
                    text: this.errors?.message
                });
                this.is_loading = false;
            }
        },
        async deleteSupplier(supplier_id, callback) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.delete(`/suppliers/${supplier_id}`);
                callback('success');
                this.swal({
                    title: "Deleted!",
                    text: "Supplier has been deleted.",
                    icon: "success"
                });
                this.is_loading = false;
            } catch (error) {
                this.errors = error.response?.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!',
                    timer: 1000,
                    text: this.errors?.message
                });
                callback('error');
                this.is_loading = false;
            }
        },
        async changeStatus(supplier_id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/suppliers/status/${supplier_id}`);
                this.is_loading = false;
                this.swal({
                    icon: 'success',
                    title: 'Status Changed!',
                    timer: 1000,
                });
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response?.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!',
                    timer: 1000,
                    text: this.errors?.message
                });
            }
        },
    }
});