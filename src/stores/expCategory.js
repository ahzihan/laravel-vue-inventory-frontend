
import config from "@/utils/config";
import { inventoryAxiosClient } from "@/utils/systemaxios";
import { defineStore } from "pinia";


export const useExpCategoryStore = defineStore('expCategory', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        expCategories: [],
        expCategory: null,
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
            _method: 'PUT'
        }
    }),

    getters: {
        getTotalCount(state) {
            return state.pagination.totalCount;
        }
    },

    actions: {
        async getAllExpenseCategories() {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/all-expense-categories');
                console.log(data);
                this.rawData = data;
                this.expCategories = data.data;
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
        async getExpCategories(page=1,limit=this.dataLimit,search="") {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/expense-categories', {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search,
                    }
                });
                // console.log(data);
                this.rawData = data.data;
                this.expCategory = data.data?.data;
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
        
        async storeExpCategory(formData) {
            this.is_loading = true;
            try {
                
                const { data } = await inventoryAxiosClient.post('/expense-categories', formData);

                this.swal({
                    icon: 'success',
                    title: 'Expense Category Inserted Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'expense-category-index' });
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

        async getExpCategoryById(exp_cat_id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/expense-categories/${exp_cat_id}`);
                // console.log(data.data);
                this.editFormData.name = data.data?.name;
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
        async updateUnit(formData, exp_cat_id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.post(`/expense-categories/${exp_cat_id}`, formData);
                
                this.swal({
                    icon: 'success',
                    title: 'Expense Category Updated Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'expense-category-index' });
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
        
        async changeStatus(exp_cat_id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/expenses-categories/status/${exp_cat_id}`);

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