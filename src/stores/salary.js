
import config from "@/utils/config";
import { inventoryAxiosClient } from "@/utils/systemaxios";
import { defineStore } from "pinia";


export const useSalaryStore = defineStore('salary', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        salaries: [],
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
            staff_id: '',
            salary: 0,
            date: '',
            month: '',
            year: '',
            type: '',
            _method: 'PUT'
        }
    }),

    getters: {
        getTotalCount(state) {
            return state.pagination.totalCount;
        }
    },

    actions: {
        
        async getSalaries(page=1,limit=this.dataLimit,search="") {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/salary', {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search,
                    }
                });
                // console.log(data);
                this.rawData = data.data;
                this.salaries = data.data?.data;
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
        
        async storeSalary(formData) {
            this.is_loading = true;
            try {
                
                const { data } = await inventoryAxiosClient.post('/salary', formData);

                this.swal({
                    icon: 'success',
                    title: 'Salary Inserted Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'salary-index' });
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

        async getSalaryById(id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/salary/${id}`);
                // console.log(data.data);

                this.editFormData.staff_id = data.data?.staff_id;
                this.editFormData.date = data.data?.date;
                this.editFormData.month = data.data?.month;
                this.editFormData.year = data.data?.year;
                this.editFormData.salary = data.data?.salary;
                this.editFormData.type = data.data?.type;
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
        async updateSalary(formData, id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.post(`/salary/${id}`,formData);
                this.swal({
                    icon: 'success',
                    title: 'Salary Updated Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'salary-index' });
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
        async deleteSalary(id, callback) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.delete(`/salary/${id}`);
                callback('success');
                this.swal({
                    title: "Deleted!",
                    text: "Salary has been deleted.",
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
    }
});