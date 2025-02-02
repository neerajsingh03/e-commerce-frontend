// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Cookies from "js-cookie";
import categoriesRoute   from '@/router/admin/Categories.js';
import Auth              from         '@/router/auth/Auth.js';
import websiteRoute     from '@/router/website/Website';
import productRoutes from '@/router/admin/Products.js';
let routes = [];
routes = routes.concat(Auth,websiteRoute,categoriesRoute,productRoutes);

const router = createRouter({
    history:createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {

  const token = Cookies.get("token");

  const userRole = Cookies.get("role");

  
  if (token && (to.path === '/login' || to.path === '/sign-up')) {
    if(userRole === 'user'){
      next({ path: '/' });
    }else if(userRole === 'admin'){
      next({ path: '/admin-dashboard' });
    }
  
    return;
  }

  if (token && to.path === '/') {
    if (userRole === 'admin') {
      next({ path: '/admin-dashboard' }); // Redirect admin to dashboard
    } else {
      next(); // Allow user to stay on home page
    }
    return;
  }
  
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
