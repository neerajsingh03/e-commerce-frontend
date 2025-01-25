const websiteRoute = [
    {   path: '/',
        name: 'Home',
        component:() => import('@/pages/HomePage.vue'),
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/pages/users/CartPage.vue'),
    },
    {
        path: '/shop',
        name: 'shopPage',
        component: () => import('@/pages/shop/Index.vue'),
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import('@/pages/categories/Index.vue'),
    },
    {
        path: '/deal',
        name: 'deal',
        component: () => import('@/pages/deals/Index.vue')
    },
]
export default websiteRoute;