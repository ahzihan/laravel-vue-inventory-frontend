
import { inventoryAxiosClient } from "@/utils/systemaxios";
import { defineStore } from "pinia";


export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        rawData: [],
        errors: [],
        dashboardInfo:[],
        notifications:[],
        swal: null,
        router: null,
        is_loading: false,
        
    }),

    getters: {
        getUnReadNotificationCount(state) {
            return state.notifications.length;
        }
    },

    actions: {
        async getDashboardInfo() {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/dashboard-info');
                // console.log(data);
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
        },
        async getNotifications() {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/get-notifications');
                // console.log(data);
                this.rawData = data;
                this.notifications = data.data;
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
        async markAsReadAll() {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/mark-as-readall');
                // console.log(data);
                this.rawData = data;
                this.notifications = data.data;
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