<template>
<div class="login-page">
    <section class="login-section d-flex justify-content-center align-items-center">
        <div class="login-container">
            <h2 class="text-center text-white mb-4">Login to Your Account</h2>
            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label for="username" class="form-label text-white">Username</label>
                    <input type="text" id="username" class="form-control" v-model="username" placeholder="Enter your username" required />
                </div>
                <div class="mb-4">
                    <label for="password" class="form-label text-white">Password</label>
                    <input type="password" id="password" class="form-control" v-model="password" placeholder="Enter your password" required />
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
export default {
    name: 'LoginPage',
    data() {
        return {
            username: '',
            password: '',
            rememberMe: false,
        };
    },
    methods: {
        handleLogin() {
            // Logic for handling the login form submission
            console.log('Login successful for:', this.username);
            // You can add authentication logic here
        },
    },
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
