
import config from "@/utils/config";
import { inventoryAxiosClient } from "@/utils/systemaxios";
import { defineStore } from "pinia";


export const useCustomerStore = defineStore('customer', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        customers: [],
        customer: null,
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
            phone: null,
            email: null,
            address: null,
            file: null,
            _method: 'PUT'
        }
    }),

    getters: {
        getTotalCount(state) {
            return state.pagination.totalCount;
        }
    },

    actions: {
        async getAllCustomers() {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/all-customer');
                console.log(data);
                this.rawData = data;
                this.customers = data.data;
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
        async getCustomers(page=1,limit=this.dataLimit,search="") {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/customers', {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search,
                    }
                });
                // console.log(data);
                this.rawData = data.data;
                this.customers = data.data?.data;
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
        
        async storeCustomer(formData) {
            this.is_loading = true;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };
                const { data } = await inventoryAxiosClient.post('/customers', formData, config);

                this.swal({
                    icon: 'success',
                    title: 'Customer Inserted Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'customer-index' });
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

        async getCustomerById(id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/customers/${id}`);
                // console.log(data.data);

                this.editFormData.name = data.data?.name;
                this.editFormData.phone = data.data?.phone;
                this.editFormData.email = data.data?.email;
                this.editFormData.address = data.data?.address;
                this.editFormData.file = data.data?.file;
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
        async updateCustomer(formData, id) {
            this.is_loading = true;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };
                const { data } = await inventoryAxiosClient.post(`/customers/${id}`,formData,config);
                this.swal({
                    icon: 'success',
                    title: 'Customer Updated Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'customer-index' });
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
        async deleteCustomer(id, callback) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.delete(`/customers/${id}`);
                callback('success');
                this.swal({
                    title: "Deleted!",
                    text: "Customer has been deleted.",
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
        async changeStatus(id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/customers/status/${id}`);
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