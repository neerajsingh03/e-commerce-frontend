

const websiteRoute = [
    {   path: '/',
        name: 'Home',
        component:() => import('@/pages/website/home/Index.vue'),
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/pages/users/CartPage.vue'),
    },
    {
        path: '/shop',
        name: 'shopPage',
        component: () => import('@/pages/website/shop/Index.vue'),
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import('@/pages/website/categories/Index.vue'),
    },
    {
        path: '/deal',
        name: 'deal',
        component: () => import('@/pages/website/deals/Index.vue')
    },
    {
        path: '/sub-categories/:categorySlug/:categoryId',
        name: 'sub-categories',
        props: true,
        component: () => import('@/pages/website/categories/SubCategories.vue')
    },
    {
        path:'/product/:subCatId',
        name: 'product',
        props: true,
        component: () => import('@/pages/website/products/Index.vue'),
    },
    {
        path:'/checkout',
        name: 'Checkout',
        props: true,
        component: () => import('@/pages/checkout/Index.vue'),
    }
]
export default websiteRoute;