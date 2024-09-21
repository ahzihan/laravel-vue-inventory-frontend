import config from "@/utils/config";
import { defineStore } from "pinia";


export const useCategoryStore = defineStore('category', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        categories: [],
        category: null,
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
        async getAllCategories(){},
        async getCategories(){},
        async getCategoryById(){},
        async storeCategory(){},
        async editCategory(){},
        async changeStatus(){},
    }
});