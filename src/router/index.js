import AuthLayout from '@/layouts/AuthLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      redirect: '/dashboard',
      component: DefaultLayout,
      meta:{requiresAuth: true},
      children: [
        { path: '/dashboard', name: 'dashboard', component: () => import('@/views/Dashboard.vue') },
        
        /** Category Route */
        { path: '/category', name: 'category-index', component: () => import('@/views/Category/Index.vue')},
        { path: '/category/create', name: 'category-create', component: () => import('@/views/Category/Create.vue')},
        { path: '/category/edit/:id', name: 'category-edit', component: () => import('@/views/Category/Edit.vue') },
        

      ],
    },

    {
      path: '/auth',
      redirect: '/login',
      component: AuthLayout,
      meta:{isGuest: true},
      children: [
        {path: '/login', name: 'login',component: () => import('@/views/Auth/Login.vue')}
      ],
    }
    
  ]
});

//Middleware

router.beforeEach((to,form,next) => {
  if(to.meta.requiresAuth && !localStorage.getItem('token')){
    next({name: 'login'});
  }else if(to.meta.isGuest && localStorage.getItem('token')){
    next({name: 'dashboard'})
  }else{
    next();
  }
})

export default router
