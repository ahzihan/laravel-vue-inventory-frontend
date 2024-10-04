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

        /** Supplier Route */
        { path: '/supplier', name: 'supplier-index', component: () => import('@/views/Supplier/Index.vue')},
        { path: '/supplier/create', name: 'supplier-create', component: () => import('@/views/Supplier/Create.vue')},
        { path: '/supplier/edit/:id', name: 'supplier-edit', component: () => import('@/views/Supplier/Edit.vue') },

        /** Customer Route */
        { path: '/customer', name: 'customer-index', component: () => import('@/views/Customer/Index.vue')},
        { path: '/customer/create', name: 'customer-create', component: () => import('@/views/Customer/Create.vue')},
        { path: '/customer/edit/:id', name: 'customer-edit', component: () => import('@/views/Customer/Edit.vue') },

        /** Staff Route */
        { path: '/staff', name: 'staff-index', component: () => import('@/views/Staff/Index.vue')},
        { path: '/staff/create', name: 'staff-create', component: () => import('@/views/Staff/Create.vue')},
        { path: '/staff/edit/:id', name: 'staff-edit', component: () => import('@/views/Staff/Edit.vue') },

        /** Staff Route */
        { path: '/unit', name: 'unit-index', component: () => import('@/views/Unit/Index.vue')},
        { path: '/unit/create', name: 'unit-create', component: () => import('@/views/Unit/Create.vue')},
        { path: '/unit/edit/:id', name: 'unit-edit', component: () => import('@/views/Unit/Edit.vue') },

        /** Product Route */
        { path: '/product', name: 'product-index', component: () => import('@/views/Product/Index.vue')},
        { path: '/product/create', name: 'product-create', component: () => import('@/views/Product/Create.vue')},
        { path: '/product/edit/:id', name: 'product-edit', component: () => import('@/views/Product/Edit.vue') },

        /** Expense Category Route */
        { path: '/expense-categories', name: 'expense-category-index', component: () => import('@/views/ExpCategory/Index.vue')},
        { path: '/expense-categories/create', name: 'expense-category-create', component: () => import('@/views/ExpCategory/Create.vue')},
        { path: '/expense-categories/edit/:id', name: 'expense-category-edit', component: () => import('@/views/ExpCategory/Edit.vue') },

        /** Expense Route */
        { path: '/expense', name: 'expense-index', component: () => import('@/views/Expense/Index.vue')},
        { path: '/expense/create', name: 'expense-create', component: () => import('@/views/Expense/Create.vue')},
        { path: '/expense/edit/:id', name: 'expense-edit', component: () => import('@/views/Expense/Edit.vue') },

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
