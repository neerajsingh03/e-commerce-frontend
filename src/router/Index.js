// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Cookies from "js-cookie";
import categoriesRoute   from '@/router/admin/Categories.js';
import Auth              from         '@/router/auth/Auth.js';
import websiteRoute     from '@/router/website/Website';

let routes = [];
routes = routes.concat(Auth,websiteRoute,categoriesRoute);

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
