
import config from "@/utils/config";
import { inventoryAxiosClient } from "@/utils/systemaxios";
import { defineStore } from "pinia";


export const useCartStore = defineStore('cart', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        carts: [],
        errors: [],
        swal: null,
        router: null,
        is_loading: false,
        subtotal: 0,
        cartCount: 0,
        
    }),

    getters: {
        getTotalCount(state) {
            return state.cartCount;
        },
        getSubTotal(state) {
            return state.subtotal;
        }
    },

    actions: {
        async getAllCartItems() {
            this.is_loading = true;
            try {
                const { data,status } = await inventoryAxiosClient.get('/carts');
                console.log(data,status);
                this.rawData = data;
                this.carts = data.data;
                this.subtotal=data.metadata.subtotal,
                this.cartCount=data.metadata.total_items,
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
        
        
        async storeCart(formData) {
            this.is_loading = true;
            try {
                
                const { data } = await inventoryAxiosClient.post('/add-to-cart', formData);

                this.swal({
                    icon: 'success',
                    title: 'Cart Item Inserted Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'pos' });
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

        
        
        async removeCartItem(id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/remove-cart-item/${id}`);
                
                this.swal({
                    title: "Removed!",
                    text: "Item has been Removed.",
                    icon: "success"
                });
                this.getAllCartItems();
                this.is_loading = false;
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

         async increaseCartItem(id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/increase-cart-item/${id}`);
                
                this.swal({
                    title: "Increase!",
                    text: "Item has been increase.",
                    icon: "success"
                });
                this.getAllCartItems();
                this.is_loading = false;
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
         
          async decreaseCartItem(id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/decrease-cart-item/${id}`);
                
                this.swal({
                    title: "Decrease!",
                    text: "Item has been decrease.",
                    icon: "success"
                });
                this.getAllCartItems();
                this.is_loading = false;
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
        
    }
});