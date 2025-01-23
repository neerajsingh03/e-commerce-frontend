// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import CartPage from '@/pages/users/CartPage.vue';
import ShopPage from  '@/pages/shop/ShopPage.vue';
import CategoriesPage from '@/pages/categories/CategoriesPage.vue';
import DealsPage    from '@/pages/deals/DealsPage.vue';
import LoginPage    from '@/auth/LoginPage.vue';
import RegisterPage from '@/auth/RegisterPage.vue';
import AdminMain        from '@/components/admin/AdminMain.vue'
// Define the routes
const routes = [
  {path: '/',name: 'Home',component: HomePage},
  {path: '/cart',name: 'Cart',component: CartPage},
  {path: '/shop',name: 'shopPage',component: ShopPage},
  {path: '/categories',name: 'categories',component: CategoriesPage},
  {path: '/deal',name: 'deal',component: DealsPage},
  {path: '/login',name: 'login',component: LoginPage},
  {path: '/sign-up',name: 'signUp',component: RegisterPage},
  {path: '/admin-dashboard',name: 'adminDashboard',component: AdminMain},
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
