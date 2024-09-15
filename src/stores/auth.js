import { ref, computed } from 'vue';
import {defineStore} from 'pinia';
import { baseClient, inventoryAxiosClient } from '@/utils/systenaxios';


export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || 0,
    username: localStorage.getItem('username') || 0,
    error: [],
    message: []
  }),

  getters: {
    getToken: (state) =>state.token,
    getUserName: (state) =>state.username,
  },

  actions: {
    setToken(token){
      this.token=token
      localStorage.setItem('token',token)
    },
    setUserName(name){
      this.username=name
      localStorage.setItem('username',name)
    },
    removeToken: () => localStorage.removeItem('token'),
    removeUserName: () => localStorage.removeItem('username'),

    async login(formData, callback){
      try {
        const response = await baseClient.get('/sanctum/csrf-cookie');
        console.log(response);
      } catch (error) {
        
      }
    }
  }

});