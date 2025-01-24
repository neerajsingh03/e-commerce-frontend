// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Cookies from "js-cookie";
import HomePage from '@/pages/HomePage.vue';
import CartPage from '@/pages/users/CartPage.vue';
import ShopPage from  '@/pages/shop/ShopPage.vue';
import CategoriesPage from '@/pages/categories/CategoriesPage.vue';
import DealsPage    from '@/pages/deals/DealsPage.vue';
import LoginPage    from '@/auth/LoginPage.vue';
import RegisterPage from '@/auth/RegisterPage.vue';
import AdminMain        from '@/components/admin/AdminMain.vue';
import AddCategory            from  '@/pages/admin/categories/AddCategory.vue';
import AddSubCategory   from '@/pages/admin/categories/AddSubCategory.vue';

// Define the routes
const routes = [
  {path: '/',name: 'Home',component: HomePage},
  {path: '/cart',name: 'Cart',component: CartPage},
  {path: '/shop',name: 'shopPage',component: ShopPage},
  {path: '/categories',name: 'categories',component: CategoriesPage},
  {path: '/deal',name: 'deal',component: DealsPage},
  {path: '/login',name: 'Login',component: LoginPage},
  {path: '/sign-up',name: 'signUp',component: RegisterPage},
  {path: '/admin-dashboard',name: 'adminDashboard',component: AdminMain,meta: { requiresAuth: true, role: "admin" }},
  {path: '/category',name: 'category',component: AddCategory,meta: { requiresAuth: true, role: "admin" }},
  {path: '/sub-category',name: 'subCategory',component: AddSubCategory,meta: { requiresAuth: true, role: "admin" }},
 
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {

  const token = Cookies.get("token");

  const userRole = Cookies.get("role");
  
  if (token && (to.path === '/login' || to.path === '/sign-up')) {
    if(userRole === 'user'){
      next({ path: '/' });
    }else if(userRole === 'admin')
    next({ path: '/admin-dashboard' });
    return;
  }

  
  // if (token && to.path === '/') {
  //   next({ path: '/admin-dashboard' });
  //   return;
  // }
  if (to.meta.requiresAuth) {
    if (!token) {
      next({ name: "Login" });
    } else if (to.meta.role && to.meta.role !== userRole) {
      next({ name: "Home" });
    } else {
      next();
    }
  }
   else {
    next();
  }
});




export default router;
