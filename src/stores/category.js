
import config from "@/utils/config";
import { inventoryAxiosClient } from "@/utils/systemaxios";
import { defineStore } from "pinia";


export const useCategoryStore = defineStore('category', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        categories: [],
        category: null,
        errors: [],
        swal: null,
        router: null,
        is_loading: false,
        pagination: {
            first_page: 1,
            last_page: 0,
            totalCount: 0
        }
    }),

    getters: {
        getTotalCount(state) {
            return state.pagination.totalCount;
        }
    },

    actions: {
        async getAllCategories() {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/all-category');
                // console.log(data);
                this.rawData = data;
                this.categories = data.data;
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
        async getCategories(page=1,limit=this.dataLimit,search="") {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/categories', {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search
                    }
                });
                console.log(data);
                this.rawData = data.data;
                this.categories = data.data.data;
                this.pagination.current_page = data.data?.current_page;
                this.pagination.last_page = data.data?.last_page;
                this.pagination.totalCount = data.data.total;
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
        async getCategoryById(){},
        async storeCategory(){},
        async editCategory(){},
        async changeStatus(){},
    }
});