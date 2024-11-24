
import config from "@/utils/config";
import { inventoryAxiosClient } from "@/utils/systemaxios";
import { defineStore } from "pinia";


export const useProductStore = defineStore('product', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        products: [],
        product: null,
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
            name: '',
            cat_id: '',
            brand_id: '',
            unit_id: '',
            supplier_id: '',
            code: '',
            original_price: 0,
            sale_price: 0,
            stock: 1,
            description: '',
            file: null,
            _method: 'PUT'
        }
    }),

    getters: {
        getTotalCount(state) {
            return state.pagination.totalCount;
        }
    },

    actions: {
        async getAllProducts() {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/all-product');
                console.log(data);
                this.rawData = data;
                this.products = data.data;
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
        async getProducts(page=1,limit=this.dataLimit,search="",filterFormData="") {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get('/products', {
                    params: {
                        page: page,
                        per_page: limit,
                        search: search,
                        cat_id: filterFormData.cat_id,
                        brand_id: filterFormData.brand_id,
                    }
                });
                // console.log(data);
                this.rawData = data.data;
                this.products = data.data?.data;
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
        
        async storeProduct(formData) {
            this.is_loading = true;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };
                const { data } = await inventoryAxiosClient.post('/products', formData, config);

                this.swal({
                    icon: 'success',
                    title: 'Product Inserted Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'product-index' });
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

        async getProductById(id) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.get(`/products/${id}`);
                // console.log(data.data);
                this.product = data.data;
                this.editFormData.name = data.data?.name;
                this.editFormData.cat_id = data.data?.cat_id;
                this.editFormData.brand_id = data.data?.brand_id;
                this.editFormData.unit_id = data.data?.unit_id;
                this.editFormData.supplier_id = data.data?.supplier_id;
                this.editFormData.code = data.data?.code;
                this.editFormData.original_price = data.data?.original_price;
                this.editFormData.sale_price = data.data?.sale_price;
                this.editFormData.stock = data.data?.stock;
                this.editFormData.description = data.data?.description;
                this.editFormData.file = data.data?.file;
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
        async updateProduct(formData, id) {
            this.is_loading = true;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };
                const { data } = await inventoryAxiosClient.post(`/products/${id}`,formData,config);
                this.swal({
                    icon: 'success',
                    title: 'Product Updated Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
                this.router.push({ name: 'product-index' });
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
        async deleteProduct(id, callback) {
            this.is_loading = true;
            try {
                const { data } = await inventoryAxiosClient.delete(`/products/${id}`);
                callback('success');
                this.swal({
                    title: "Deleted!",
                    text: "product has been deleted.",
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
                const { data } = await inventoryAxiosClient.get(`/products/status/${id}`);
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