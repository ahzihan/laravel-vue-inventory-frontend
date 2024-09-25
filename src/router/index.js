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
        
        /** Brand Route */
        { path: '/brand', name: 'brand-index', component: () => import('@/views/Brand/Index.vue')},
        { path: '/brand/create', name: 'brand-create', component: () => import('@/views/Brand/Create.vue')},
        { path: '/brand/edit/:id', name: 'brand-edit', component: () => import('@/views/Brand/Edit.vue') },

        /** Brand Route */
        { path: '/supplier', name: 'supplier-index', component: () => import('@/views/Supplier/Index.vue')},
        { path: '/supplier/create', name: 'supplier-create', component: () => import('@/views/Supplier/Create.vue')},
        { path: '/supplier/edit/:id', name: 'supplier-edit', component: () => import('@/views/Supplier/Edit.vue') },

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
