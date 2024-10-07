
import config from "@/utils/config";
import { inventoryAxiosClient } from "@/utils/systemaxios";
import { defineStore } from "pinia";


export const useStaffStore = defineStore('staff', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        staffs: [],
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
            address: null,
            image: null,
            nid: null,
            _method: 'PUT'
        }
    }),

    getters: {
        getTotalCount(state) {
            return state.pagination.totalCount;
        }
    },

    actions: {
        async getAllStaffs() {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/all-staff');
                console.log(data);
                this.rawData = data;
                this.staffs = data.data;
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
        async getStaffs(page=1,limit=this.dataLimit,search="") {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/staffs', {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search,
                    }
                });
                // console.log(data);
                this.rawData = data.data;
                this.staffs = data.data?.data;
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
        
        async storeStaff(formData) {
            this.is_loading = true;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };
                const { data } = await inventoryAxiosClient.post('/staffs', formData, config);

                this.swal({
                    icon: 'success',
                    title: 'Staff Inserted Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'staff-index' });
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

        async getStaffById(id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/staffs/${id}`);
                // console.log(data.data);

                this.editFormData.name = data.data?.name;
                this.editFormData.designation = data.data?.designation;
                this.editFormData.phone = data.data?.phone;
                this.editFormData.email = data.data?.email;
                this.editFormData.address = data.data?.address;
                this.editFormData.image = data.data?.image;
                this.editFormData.nid = data.data?.nid;
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
        async updateStaff(formData, id) {
            this.is_loading = true;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };
                const { data } = await inventoryAxiosClient.post(`/staffs/${id}`,formData,config);
                this.swal({
                    icon: 'success',
                    title: 'Staff Updated Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'staff-index' });
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
        async deleteStaff(id, callback) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.delete(`/staffs/${id}`);
                callback('success');
                this.swal({
                    title: "Deleted!",
                    text: "Staff has been deleted.",
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
                const { data } = await inventoryAxiosClient.get(`/staffs/status/${id}`);
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