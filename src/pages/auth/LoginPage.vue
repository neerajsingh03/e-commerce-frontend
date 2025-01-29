<template>
<div class="login-page">
    <section class="login-section d-flex justify-content-center align-items-center">
        <div class="login-container">
            <h2 class="text-center text-white mb-4">Login to Your Account</h2>
            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label for="email" class="form-label text-white">Email</label>
                    <input type="email" id="email" class="form-control" v-model="formData.email" placeholder="Enter your email" />
                </div>
                <div class="mb-4">
                    <label for="password" class="form-label text-white">Password</label>
                    <input type="password" id="password" class="form-control" v-model="formData.password" placeholder="Enter your password" />
                </div>
                <div class="d-flex justify-content-between mb-4">
                    <div>
                        <input type="checkbox" id="rememberMe" v-model="rememberMe" />
                        <label for="rememberMe" class="text-white">Remember Me</label>
                    </div>
                    <a href="#" class="text-white">Forgot Password?</a>
                </div>
                <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
        </div>
    </section>
</div>
</template>

<script>
import apiClient from '@/service/Index';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
    name: 'LoginPage',
    setup() {
        const formData = ref({
            email: '',
            password: '',
        });
        const router = useRouter();
        const store = useStore();
        const handleLogin = async () => {
            try {
                const response = await apiClient.post('/login', formData.value);
                if (response.data && response.data.token && response.data.role) {
                    alert('Login successfully');
                    store.dispatch('auth/login', {
                        token: response.data.token,
                        role: response.data.role,
                        userId: response.data.userId,
                    });
                    console.log(response.data);
                    if (response.data.role === 'admin') {
                        router.push('/admin-dashboard');
                    } else {
                        router.push('/');
                    }
                } else {
                    console.log('something wrong');
                }
            } catch (error) {
                alert('Invalid login details');
                console.log('something wrong', error);
            }
        };
        return {
            handleLogin,
            formData,
        }
    }
};
</script>

<style scoped>
/* Add background image to the login-page */
.login-page {
    background-image: url('@/assets/loginImg2.jpg');
    /* Replace with the correct path */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    /* Makes the background fixed */
    height: 100vh;
    /* Full height of the viewport */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* Ensures it takes up the full width of the viewport */
}

/* Login Section Styles */
.login-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-container {
    background-color: rgba(0, 0, 0, 0.7);
    /* Semi-transparent dark background */
    padding: 40px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
}

h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #fff;
}

.form-label {
    font-size: 1rem;
    font-weight: 500;
}

.form-control {
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
}

.form-control:focus {
    box-shadow: none;
    border-color: #0056b3;
}

.btn-primary {
    background-color: #28a745;
    border-color: #28a745;
    font-weight: 600;
    border-radius: 5px;
    padding: 12px;
    transition: background-color 0.3s ease;
}

.btn-primary:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.text-white {
    color: white !important;
}

a {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .login-page {
        background-attachment: scroll;
        /* Fallback for mobile devices */
    }
}
</style>
