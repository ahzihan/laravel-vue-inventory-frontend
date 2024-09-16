import { ref, computed } from 'vue';
import { baseClient, inventoryAxiosClient } from '@/utils/systemaxios'
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth',{
  state: () => ({
    token: localStorage.getItem('token') || 0,
    username: localStorage.getItem('username') || 0,
    error: [],
    message: [],
  }),
  getters: {
    getToken: (state) => state.token,
    getUserName: (state) => state.username,
  },
  actions: {
      setToken(token){
        this.token = token
        localStorage.setItem('token', token)
      },
      setUserName(name){
        this.username = name
        localStorage.setItem('username', name)
      },
      removeToken: () => localStorage.removeItem('token'),
      removeUserName: () => localStorage.removeItem('username'),


      async login(formData, callback){
        try {
          const response = await baseClient.get('/sanctum/csrf-cookie');
          const { data, status} = await inventoryAxiosClient.post('/login', formData);
          // console.log(data);
          if(data){
            this.setToken(data.data?.token)
            this.setUserName(data.data?.name)
            this.message = data.message
            callback(data.status);
          }
        } catch (error) {
          this.error = error.response?.data;
          this.removeToken();
          this.message = error.response?.data?.message
          callback(error);
        }
      }
  }
})
