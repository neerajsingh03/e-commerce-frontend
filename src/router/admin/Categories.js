const categoriesRoute = [
  {
    path: '/category',
    name: 'category',
    component: () => import('@/pages/admin/categories/AddCategory.vue'),
    meta:{ requiresAuth: true, role: "admin" }
  },
  {
    path: '/sub-category',
    name: 'subCategory',
    component:() => import('@/pages/admin/categories/AddSubCategory.vue'),
    meta: { requiresAuth: true, role: "admin" }
  },
  {
    path: '/admin-dashboard',
    name: 'adminDashboard',
    component: () => import ('@/pages/admin/adminDashboard/Index.vue'),
    meta: { requiresAuth: true, role: "admin" }},

];

export default categoriesRoute;