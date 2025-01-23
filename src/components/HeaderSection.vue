<template>
<header>
    <nav class="navbar navbar-expand-lg navbar-light bg-neutral">
        <div class="container-fluid">
            <!-- Logo with image icon -->
            <a class="navbar-brand logo" href="#">
                <img src="@/assets/e-img.webp" alt="E-Shop Icon" class="logo-icon">
                our-shop
            </a>

            <!-- Toggler button for mobile view -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navbar items -->
            <div class="collapse navbar-collapse" id="navbarNav">
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
                        <router-link class="nav-link" to="/cart">Cart</router-link>
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
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
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
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
export default {
    name: 'HeaderSection',

    setup() {
        const store = useStore();
        const router = useRouter();
        const handleLogout = async () => {
            try {
                const response = await apiClient.post('/logout');
                console.log(response.data);
                if (response.data.status === 200) {
                    store.dispatch('logout');
                    router.push('/');
                    alert('Logout successfully');
                }
            } catch (error) {
                
               console.log('something wrong',error);
            }

        };
         const token = computed(() => store.getters.getToken);
        return {
            handleLogout,
            token, 
        }
    }
};
</script>

<style scoped>
/* Custom styles for the header section with neutral colors */
.bg-neutral {
    background-color: #333333 !important;
    /* Dark gray background for the navbar */
    border-bottom: 2px solid #444444;
    /* Slightly lighter gray bottom border */
    padding: 10px 0;
}

/* Logo (E-Shop Text) Styling */
.logo {
    font-size: 28px;
    font-weight: bold;
    color: #ffffff;
    /* White color for the logo text */
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
    padding-left: 15px;
    /* Padding for better spacing */
    display: flex;
    /* To display text and image horizontally */
    align-items: center;
    /* Vertically center the image and text */
}

.logo-icon {
    width: 40px;
    /* Adjust the size of the logo image */
    height: 40px;
    margin-right: 10px;
    /* Space between image and text */
}

/* Navbar items */
.navbar-nav .nav-item .nav-link {
    color: #d1d1d1 !important;
    /* Light gray color for links */
    font-size: 16px;
    font-weight: 500;
    margin: 0 15px;
    /* Spacing between links */
    text-transform: capitalize;
    transition: all 0.3s ease-in-out;
}

/* Navbar link hover effect */
.navbar-nav .nav-item .nav-link:hover {
    color: #ff9f00 !important;
    /* Orange color on hover for contrast */
    text-decoration: underline;
}

/* Navbar active link styling */
.navbar-nav .nav-item .nav-link.active {
    color: #ff9f00 !important;
    /* Orange color for active link */
    font-weight: 600;
}

/* Search Bar Styling */
.navbar-nav .nav-item form .form-control {
    width: 200px;
    /* Width of the search bar */
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
    /* Darker orange on hover */
}

/* Mobile view styling */
@media (max-width: 768px) {
    .navbar-nav {
        text-align: center;
        padding-top: 10px;
    }

    .navbar-nav .nav-item {
        margin: 10px 0;
        /* Increased spacing for mobile view */
    }

    .navbar-toggler {
        border-color: #ff9f00;
        /* Orange border for toggler button */
    }

    .navbar-toggler-icon {
        background-color: #ff9f00;
        /* Orange icon for toggler */
    }
}

/* Styling the collapsible menu */
.navbar-collapse {
    justify-content: flex-end;
    /* Align items to the right */
}

/* Logo Styling */
.navbar-brand {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    font-weight: 700;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 0;
}

.logo-icon[data-v-91cdb8d0] {
    width: 67px;
    height: auto;
    margin-right: 10px;
    border-radius: 50px;
}

.logo-text {
    color: #007bff;
    /* Blue color for text */
    font-family: 'Arial', sans-serif;
    font-size: 1.5rem;
    /* Adjust size as needed */
    letter-spacing: 1px;
    font-weight: 600;
}

.navbar-brand:hover {
    color: #0056b3;
    /* Change color on hover */
}

@media (max-width: 768px) {
    .logo-text {
        font-size: 1.2rem;
        /* Slightly smaller text on mobile devices */
    }

    .logo-icon {
        width: 30px;
        /* Adjust logo size for smaller screens */
    }
}
</style>
