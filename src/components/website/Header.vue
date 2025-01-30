<template>
<header>
    <nav class="navbar navbar-expand-lg navbar-light bg-neutral">
        <div class="container-fluid">
            <a class="navbar-brand logo" href="#">
                <img src="@/assets/e-img.webp" alt="E-Shop Icon" class="logo-icon" />
                our-shop
            </a>
            <button class="navbar-toggler" type="button" @click="toggleNavbar" aria-controls="navbarNav" :aria-expanded="isNavbarOpen ? 'true' : 'false'" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navbar items -->
            <div class="collapse navbar-collapse" :class="{ show: isNavbarOpen }" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/shop">Shop</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/categories">Categories</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/deal">Deals</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/cart">Carts <span v-if="token">{{ countUserItem }}</span></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login" v-if="!token">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0)" v-if="token" @click="handleLogout">LogOut</a>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/sign-up">Sign Up</router-link>
                    </li>
                    <!-- Search Bar -->
                    <li class="nav-item">
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
</template>

<script>
import apiClient from '@/service/Index';
import {useStore} from 'vuex';
import {ref,computed,onMounted} from 'vue';
import {useRouter} from 'vue-router';
export default {
    name: 'HeaderSection',
    setup() {
        const store = useStore();
        const router = useRouter();
        const isNavbarOpen = ref(false);
        const countUserItem = computed(() => store.getters['userCart/getUserCartItem']);
        const handleLogout = async () => {
            try {
                const response = await apiClient.post('/logout');
                console.log(response.data);
                if (response.data.status === 200) {
                    store.dispatch('auth/logout');
                    router.push('/');
                    alert('Logout successfully');
                }
            } catch (error) {
                console.log('Something went wrong during logout:', error);
            }
        };
        const toggleNavbar = () => {
            isNavbarOpen.value = !isNavbarOpen.value;
        };
        const resetNavbarState = () => {
            isNavbarOpen.value = false;
        };
        onMounted(() => {
            window.addEventListener("popstate", resetNavbarState);
        });
        const token = computed(() => store.getters['auth/getToken']);
        return {
            handleLogout,
            token,
            countUserItem,
            isNavbarOpen,
            toggleNavbar,
        }
    }
};
</script>

<style scoped>
/* .bg-neutral {
    background-color: #333333 !important;
    border-bottom: 2px solid #444444;
    padding: 10px 0;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1050;
}

.logo {
    font-size: 28px;
    font-weight: bold;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
    padding-left: 15px;
    display: flex;
    align-items: center;
}

.logo-icon {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.navbar-nav .nav-item .nav-link {
    color: #d1d1d1 !important;
    font-size: 16px;
    font-weight: 500;
    margin: 0 15px;
    text-transform: capitalize;
    transition: all 0.3s ease-in-out;
}

.navbar-nav .nav-item .nav-link:hover {
    color: #ff9f00 !important;
    text-decoration: underline;
}

.navbar-nav .nav-item .nav-link.active {
    color: #ff9f00 !important;
    font-weight: 600;
}

.navbar-nav .nav-item form .form-control {
    width: 200px;
    border-radius: 30px;
    border: 1px solid #ff9f00;
}

.navbar-nav .nav-item form .btn {
    background-color: #ff9f00;
    border-radius: 30px;
    color: #fff;
    padding: 6px 15px;
    margin-left: 10px;
    transition: all 0.3s ease;
}

.navbar-nav .nav-item form .btn:hover {
    background-color: #e68900;
}

.navbar-collapse {
    position: relative;
    z-index: 1051;
}

.navbar-toggler-icon {
    background-color: transparent;
    position: relative;
    width: 30px;
    height: 25px;
}

.navbar-toggler-icon::before,
.navbar-toggler-icon::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 3px;
    background-color: #ff9f00;
    transition: 0.3s ease;
}

.navbar-toggler-icon::before {
    top: 0;
}

.navbar-toggler-icon::after {
    bottom: 0;
}

.navbar-toggler.collapsed .navbar-toggler-icon::before {
    transform: rotate(45deg);
    top: 10px;
}

.navbar-toggler.collapsed .navbar-toggler-icon::after {
    transform: rotate(-45deg);
    bottom: 10px;
}
@media (max-width: 768px) {
    .navbar-nav {
        text-align: center;
        padding-top: 10px;
    }

    .navbar-nav .nav-item {
        margin: 10px 0;
    }

    .navbar-toggler {
        border-color: #ff9f00;
    }

    .navbar-toggler-icon {
        background-color: #ff9f00;
    }
}

@media (max-width: 480px) {
    .logo-text {
        font-size: 1rem;
    }

    .logo-icon {
        width: 25px;
    }
} */
 .bg-neutral {
    background-color: #333333 !important;
    border-bottom: 2px solid #444444;
    padding: 10px 0;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1050;
}

/* Logo Styles */
.logo {
    font-size: 28px;
    font-weight: bold;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
    padding-left: 15px;
    display: flex;
    align-items: center;
}

.logo-icon {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

/* Navbar link styles */
.navbar-nav .nav-item .nav-link {
    color: #d1d1d1 !important;
    font-size: 16px;
    font-weight: 500;
    margin: 0 15px;
    text-transform: capitalize;
    transition: all 0.3s ease-in-out;
}

.navbar-nav .nav-item .nav-link:hover {
    color: #ff9f00 !important;
    text-decoration: underline;
}

.navbar-nav .nav-item .nav-link.active {
    color: #ff9f00 !important;
    font-weight: 600;
}

/* Navbar search form styles */
.navbar-nav .nav-item form .form-control {
    width: 200px;
    border-radius: 30px;
    border: 1px solid #ff9f00;
}

.navbar-nav .nav-item form .btn {
    background-color: #ff9f00;
    border-radius: 30px;
    color: #fff;
    padding: 6px 15px;
    margin-left: 10px;
    transition: all 0.3s ease;
}

.navbar-nav .nav-item form .btn:hover {
    background-color: #e68900;
}

/* Navbar collapse styles */
.navbar-collapse {
    position: relative;
    z-index: 1051;
}

.navbar-toggler-icon {
    background-color: transparent;
    position: relative;
    width: 30px;
    height: 25px;
}

.navbar-toggler-icon::before,
.navbar-toggler-icon::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 3px;
    background-color: #ff9f00;
    transition: 0.3s ease;
}

.navbar-toggler-icon::before {
    top: 0;
}

.navbar-toggler-icon::after {
    bottom: 0;
}

.navbar-toggler.collapsed .navbar-toggler-icon::before {
    transform: rotate(45deg);
    top: 10px;
}

.navbar-toggler.collapsed .navbar-toggler-icon::after {
    transform: rotate(-45deg);
    bottom: 10px;
}

/* Fixing Navbar Layout for 1024px screen */
@media (max-width: 1024px) {
    .navbar {
        width: 100%; /* Ensure navbar doesn’t overflow outside of the page */
        padding-left: 0; /* Remove any extra padding */
        padding-right: 0; /* Remove any extra padding */
    }

    .navbar-nav {
        display: flex;
        justify-content: center; /* Center nav items */
        padding-top: 10px;
        flex-wrap: wrap; /* Ensure it doesn’t overflow horizontally */
    }

    .navbar-nav .nav-item {
        margin: 10px 15px; /* Adjust margins between items */
    }

    .navbar-toggler {
        border-color: #ff9f00;
    }

    .navbar-toggler-icon {
        background-color: #ff9f00;
    }

    .navbar-nav .nav-item .nav-link {
        font-size: 14px; /* Adjust font size */
    }
}

/* For mobile devices (below 768px) */
@media (max-width: 768px) {
    .navbar-nav {
        text-align: center;
        padding-top: 10px;
    }

    .navbar-nav .nav-item {
        margin: 10px 0;
    }

    .navbar-toggler {
        border-color: #ff9f00;
    }

    .navbar-toggler-icon {
        background-color: #ff9f00;
    }
}

/* For very small screens (below 480px) */
@media (max-width: 480px) {
    .logo-text {
        font-size: 1rem;
    }

    .logo-icon {
        width: 25px;
    }

    .navbar-nav .nav-item .nav-link {
        font-size: 14px; /* Adjust font size for small screens */
    }

    .navbar-nav .nav-item form .form-control {
        width: 150px; /* Reduce search bar width on small screens */
    }
}

</style>
