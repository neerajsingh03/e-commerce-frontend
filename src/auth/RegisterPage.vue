<template>
<div class="register-page">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card shadow-sm">
                    <div class="card-header text-center">
                        <h2>Create an Account</h2>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="submitForm">
                            <!-- Row for all input fields -->
                            <div class="row g-9">
                                <!-- Input Field 1: First Name -->
                                <div class="col-3 col-md-6">
                                    <label for="firstName" class="form-label">First Name</label>
                                    <input type="text" class="form-control" id="firstName" v-model="form.firstName" required />
                                </div>

                                <!-- Input Field 2: Last Name -->
                                <div class="col-3 col-md-6">
                                    <label for="lastName" class="form-label">Last Name</label>
                                    <input type="text" class="form-control" id="lastName" v-model="form.lastName" required />
                                </div>
                                <!-- Input Field 3: Email -->
                                <div class="col-3 col-md-6">
                                    <label for="email" class="form-label">Email Address</label>
                                    <input type="email" class="form-control" id="email" v-model="form.email" required />
                                </div>

                                <!-- Input Field 4: Phone Number -->
                                <div class="col-3 col-md-6">
                                    <label for="phone" class="form-label">Phone Number</label>
                                    <input type="tel" class="form-control" id="phone" v-model="form.phone" required />
                                </div>

                                <!-- Input Field 5: Password -->
                                <div class="col-3 col-md-6">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password" v-model="form.password" required />
                                </div>

                                <!-- Input Field 6: Confirm Password -->
                                <div class="col-3 col-md-6">
                                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                                    <input type="password" class="form-control" id="confirmPassword" v-model="form.confirmPassword" required />
                                </div>

                                <!-- Input Field 7: Address -->
                                <div class="col-3 col-md-6">
                                    <label for="address" class="form-label">Address</label>
                                    <input type="text" class="form-control" id="address" v-model="form.address" required />
                                </div>

                                <!-- Input Field 8: City -->
                                <div class="col-3 col-md-6">
                                    <label for="city" class="form-label">City</label>
                                    <input type="text" class="form-control" id="city" v-model="form.city" required />
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="text-center mt-4">
                                <button type="submit" class="btn btn-primary w-100">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'RegisterPage',
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                address: '',
                city: '',
            },
        };
    },
    methods: {
        submitForm() {
            // Logic for form submission goes here (e.g., API call or validation)
            console.log(this.form);
        },
    },
};
</script>

<style scoped>
/* Background styles inherited from login page */
.register-page {
    background-image: url('@/assets/loginImg2.jpg'); /* Replace with the correct path */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed; /* Makes the background fixed */
    height: 100vh; /* Full height of the viewport */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; /* Ensures it takes up the full width of the viewport */
}

/* Card container styles aligned with login container */
.card {
    background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent dark background */
    border-radius: 10px;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 600;
    color: #fff;
    background-color: transparent; /* Blend with the card background */
    border-bottom: none;
}

.card-body {
    padding: 40px;
}

.form-label {
    color: white;
    font-weight: 500;
    font-size: 1rem;
}

.form-control {
    border-radius: 5px;
    padding: 12px;
    margin-bottom: 20px;
    background-color: #333; /* Match dark theme */
    color: white;
    border: 1px solid #555;
}

.form-control:focus {
    box-shadow: none;
    border-color: #0056b3;
}

/* Button styles aligned with login page */
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

/* Text styles */
.text-white {
    color: white !important;
}

a {
    text-decoration: none;
    color: white;
}

a:hover {
    text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .register-page {
        background-attachment: scroll; /* Fallback for mobile devices */
        padding: 20px;
    }

    .card-body {
        padding: 20px;
    }
}
</style>
