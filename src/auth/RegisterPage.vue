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
.register-page {
    background-color: #f7f7f7;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
}

.card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: #007bff;
    color: white;
    border-radius: 10px 10px 0 0;
}

.card-header h2 {
    margin: 0;
    font-size: 1.8rem;
}

.form-label {
    font-weight: 500;
    font-size: 1rem;
}

.form-control {
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 15px;
    font-size: 1rem;
}

.row .col-md-6 {
    padding-right: 0 !important;
    padding-left: 0 !important;
}

.row.g-3 {
    gap: 1.5rem;
}

.btn-primary {
    background-color: #007bff;
    border: 1px solid #007bff;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 12px;
    border-radius: 10px;
    transition: background-color 0.3s ease;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}
.btn-primary[data-v-7c23d420] {
    background-color: #6483a3;
    border: 1px solid #21476e;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 12px;
    border-radius: 10px;
    transition: background-color 0.3s ease;
}
.card-header[data-v-7c23d420] {
    background-color: #5d7c9d;
    color: white;
    border-radius: 10px 10px 0 0;
}
</style>
