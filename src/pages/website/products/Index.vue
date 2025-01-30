<template>
<div class="shop-page">
    <!-- Hero Section -->
    <section id="carouselSection" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
        <div class="carousel-inner">
            <!-- Carousel Item 1 -->
            <div class="carousel-item active">
                <img src="@/assets/img2.webp" class="d-block w-100" alt="Promo Image 1">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Big Sale on All Products</h5>
                    <p>Hurry up! Limited time offers on all categories.</p>
                </div>
            </div>
            <!-- Carousel Item 2 -->
            <div class="carousel-item">
                <img src="@/assets/img2.webp" class="d-block w-100" alt="Promo Image 2">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Electronics Sale</h5>
                    <p>Get the best deals on top electronics.</p>
                </div>
            </div>
            <!-- Carousel Item 3 -->
            <div class="carousel-item">
                <img src="@/assets/img1.webp" class="d-block w-100" alt="Promo Image 3">
                <div class="carousel-caption d-none d-md-block">
                    <h5>New Collection of Fashion</h5>
                    <p>Explore the latest fashion trends at amazing prices.</p>
                </div>
            </div>
        </div>
        <!-- Carousel Controls -->
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselSection" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselSection" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </section>

    <!-- Filters Section -->
    <section class="filters-section py-4">
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <h4>Filter by Categories</h4>
                    <select class="form-select" v-model="selectedCategory">
                        <option value="">All Categories</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                <div class="col-lg-3">
                    <h4>Filter by Price</h4>
                    <input type="range" class="form-range" v-model="priceRange" min="0" max="500" />
                    <p>Max Price: $ 500</p>
                </div>
                <div class="col-lg-6 text-center text-lg-end">
                    <button class="btn btn-success" @click="applyFilters">Apply Filters</button>
                </div>
            </div>
        </div>
    </section>
    <div class="loader">
        <div v-if="loading" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>

    <!-- Products Grid Section -->
    <section class="products-grid py-5" v-if="products.length > 0">
        <div class="container">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                <div class="col" v-for="product in products" :key="product.id">
                    <div class="card product-card shadow-sm">
                        <!-- Fixed Image Size -->
                        <img :src="getImageUrl(product.image)" class="card-img-top product-image" alt="Product Image">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title product-name">{{ product.name }}</h5>
                            <p class="card-text product-description">{{ product.description }}</p>
                            <p class="price">$ {{ product.discount_price }} <span class="dis">Offer Price</span> </p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <p class="price text-danger" style="text-decori">$ {{ product.price }}</p>
                                <div>
                                    <button class="btn btn-primary btn-sm" @click="handleAddToCart(product.id)">Add to Cart</button>
                                    <button class="btn btn-secondary btn-sm" @click="viewDetails(product)">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="container text-center text-danger" v-else>
        <h4 class="not-found">
            Product not found
        </h4>
    </div>
</div>
</template>

<script>
import {ref,onMounted,computed} from 'vue';
import {useRoute,useRouter } from 'vue-router'
import apiClient from '@/service/Index';
import {getImageUrl} from '@/utils/Helper';
import { useStore } from 'vuex';

export default {
    name: 'Index',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const id = route.params.subCatId;
        const products = ref([]);
        const loading = ref(true);
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get(`fetch-porduct/${id}`);
                if (response.data && response.data.success) {
                    products.value = response.data.products;
                    loading.value = false;
                }
            } catch (error) {
                console.log('product not fetch', error);
                loading.value = true;
            }
        }
        const token = computed(() => store.getters['auth/getToken']);
        const handleAddToCart = async (id) => {
            console.log(`this is guest user ${id}`);
            if (!token.value) {
                alert('Please log in to add items to the cart.');
                return router.push({ name: 'Login' });
            }
            try {
                const responseAddToCart = await apiClient.post('/add-to-cart', { productId: id });
                if (responseAddToCart?.data) {
                    const userItemCount = responseAddToCart.data.count;
                    console.log('Cart Response:', responseAddToCart.data);
                    store.dispatch('userCart/userCartItem',userItemCount);
                    alert(responseAddToCart.data.message);
                    if (responseAddToCart.data.message !== 'Product is already in the cart.') {
                        alert(responseAddToCart.data.message);  // Only show alert if the message is not 'already in cart'
                    }
                    return router.push({ name: 'Cart' });
                }
            } catch (error) {

                console.error('Error adding to cart:', error);
                alert('Failed to add item to cart. Please try again.');
            }
        }
        onMounted(() => {
            fetchProducts()
        });
        return {
            getImageUrl,
            products,
            loading,
            handleAddToCart,
        }
    }
}
</script>

<style scoped>
/* section.products-grid.py-5 {
    margin-bottom: 352px;
    padding-bottom: 215px;
} */
/* Ensure the images are of the same size */
.product-image {
    width: 100%;
    /* Makes sure image fills the card container */
    height: 200px;
    /* Set a fixed height for all images */
    object-fit: cover;
    /* Ensures the image doesn't stretch or skew */
}

/* Make sure all card bodies are the same size */
.product-card {
    display: flex;
    flex-direction: column;
    height: 100%;
}

/* Ensure the description and title take up space, and push the buttons to the bottom */
.product-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

/* Styling for the product name */
.product-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #1ca914;
}

/* Add some spacing to the description and ensure it's not too long */
.product-description {
    font-size: 0.9rem;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Price styling */
.price {
    font-size: 1.1rem;
    font-weight: bold;
}

/* Buttons at the bottom of the card */
button {
    margin-left: 5px;
}

.row.row-cols-1.row-cols-md-2.row-cols-lg-4.g-4 {
    padding-bottom: 4px;
}
p.price.text-danger {
    text-decoration: line-through;
}
</style>
