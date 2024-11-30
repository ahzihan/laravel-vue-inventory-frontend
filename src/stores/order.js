
import config from "@/utils/config";
import { inventoryAxiosClient } from "@/utils/systemaxios";
import { defineStore } from "pinia";


export const useOrderStore = defineStore('order', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        orders: [],
        order: null,
        errors: [],
        swal: null,
        router: null,
        is_loading: false,
        pagination: {
            current_page: 1,
            last_page: 0,
            totalCount: 0,
        },
        payment_methods: ['cash','card','bkash','nogad','bank']
    }),

    getters: {
        getTotalCount(state) {
            return state.pagination.totalCount;
        }
    },

    actions: {
        async getAllOrders() {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/all-orders');
                console.log(data);
                this.rawData = data;
                this.orders = data.data;
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
        async getOrders(page=1,limit=this.dataLimit,search="") {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/orders', {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search,
                    }
                });
                // console.log(data);
                this.rawData = data.data;
                this.orders = data.data?.data;
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

        async storeOrder(formData) {
            this.is_loading = true;
            try {
                
                const { data } = await inventoryAxiosClient.post('/orders', formData);
                console.log(data);
                this.swal({
                    icon: 'success',
                    title: 'Order Inserted Successfully!',
                    timer: 2000,
                });
                this.is_loading = false;
            } catch (error) {
                this.errors = error.response?.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!',
                    timer: 2000,
                    text: this.errors?.message
                });
                this.is_loading = false;
            }
        },

        async getOrderById(id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/orders/${id}`);
                // console.log(data.data);
                this.order = data.data;
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
    }
});