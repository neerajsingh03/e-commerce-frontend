const productRoutes = [
    {
        path: '/add-product',
        name: 'addProduct',
        component: () => import('@/pages/admin/products/AddProduct.vue'),
        meta: { requiresAuth: true, role: "admin" },
     
    }
];
export default productRoutes;