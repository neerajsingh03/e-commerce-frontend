const auth = [
    {
        path: '/login',
        name: 'Login',
        // component: LoginPage
        component: () => import ('@/pages/auth/LoginPage.vue'),
    },
    { path: '/sign-up',
      name: 'signUp',
        //   component: RegisterPage
      component: () => import ('@/pages/auth/RegisterPage.vue'),
    },
];
export default auth;
