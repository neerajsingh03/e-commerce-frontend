const auth = [
    {
        path: '/login',
        name: 'Login',
        // component: LoginPage
        component: () => import ('@/auth/LoginPage.vue'),
    },
    { path: '/sign-up',
      name: 'signUp',
        //   component: RegisterPage
      component: () => import ('@/auth/RegisterPage.vue'),
    },
];
export default auth;
