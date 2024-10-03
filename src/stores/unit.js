
import config from "@/utils/config";
import { inventoryAxiosClient } from "@/utils/systemaxios";
import { defineStore } from "pinia";


export const useUnitStore = defineStore('unit', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        units: [],
        unit: null,
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
            unit_name: null,
            _method: 'PUT'
        }
    }),

    getters: {
        getTotalCount(state) {
            return state.pagination.totalCount;
        }
    },

    actions: {
        async getAllUnits() {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/all-unit');
                console.log(data);
                this.rawData = data;
                this.units = data.data;
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
        async getUnits(page=1,limit=this.dataLimit,search="") {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/units', {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search,
                    }
                });
                // console.log(data);
                this.rawData = data.data;
                this.units = data.data?.data;
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
        
        async storeUnit(formData) {
            this.is_loading = true;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };
                const { data } = await inventoryAxiosClient.post('/units', formData, config);

                this.swal({
                    icon: 'success',
                    title: 'Unit Inserted Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'unit-index' });
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

        async getUnitById(unit_id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/units/${unit_id}`);
                // console.log(data.data);
                this.editFormData.unit_name = data.data?.unit_name;
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
        async updateUnit(formData, unit_id) {
            this.is_loading = true;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };
                const { data } = await inventoryAxiosClient.post(`/units/${unit_id}`,formData,config);
                this.swal({
                    icon: 'success',
                    title: 'Unit Updated Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'unit-index' });
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
        async deleteUnit(unit_id, callback) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.delete(`/units/${unit_id}`);
                callback('success');
                this.swal({
                    title: "Deleted!",
                    text: "Unit has been deleted.",
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
        async changeStatus(unit_id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/units/status/${unit_id}`);
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