
import { inventoryAxiosClient } from "@/utils/systemaxios";
import { defineStore } from "pinia";


export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        rawData: [],
        errors: [],
        dashboardInfo:[],
        swal: null,
        router: null,
        is_loading: false,
        
    }),

    getters: {},

    actions: {
        async getDashboardInfo() {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/dashboard-info');
                console.log(data);
                this.rawData = data;
                this.dashboardInfo = data.data;
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
        }
    }   
});