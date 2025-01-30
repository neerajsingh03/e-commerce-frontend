<template>
<div class="categories-page">
    <!-- Category Section -->
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

    <!-- Filters and Search Section -->
    <section class="filters-search py-4">
        <div class="container">
            <div class="row">
                <!-- Search Bar -->
                <div class="col-lg-8">
                    <input type="text" class="form-control" v-model="searchQuery" @keyup="searchCategory" placeholder="Search Categories" />
                </div>
                <!-- Category Filter -->
                <div class="col-lg-4">
                    <select class="form-select" v-model="selectedCategory" @change="applyFilters">
                        <option value="">All Categories</option>
                        <option v-for="category in allCategories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </section>
    <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-if="errorMessage && errorMessage.trim() !== ''" class="alert alert-danger text-center">
        {{ errorMessage }}
    </div>
    <!-- Categories Grid Section -->
    <section class="categories py-5">
        <div class="container" v-if="!loading && filterSubCategories.length > 0">
            <h2 class="text-center mb-5">Shop by Categories</h2>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                <!-- Category Item -->
                <div class="col" v-for="category in filterSubCategories" :key="category.id">
                    <div class="card category-card shadow-sm">
                        <img :src="getImageUrl(category.image)" class="card-img-top" alt="Category Image">
                        <div class="card-body text-center">
                            <h5 class="card-title">{{ category.name }}</h5>
                            <a :href="category.link" class="btn btn-category" @click="fetchProductsByCategory(category.id)">Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h3 v-else-if="!loading" class="er text-center text-danger">
            No subcategories found.
        </h3>
    </section>
</div>
</template>

<script>
import {ref,onMounted,computed} from 'vue';
import {getImageUrl} from '@/utils/Helper';
import {useRoute,useRouter} from 'vue-router';
import apiClient from '@/service/Index';
export default {
    name: 'SubCategories',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const searchQuery = ref('');
        const allCategories = ref([]);
        const selectedCategory = ref('');
        const loading = ref(true);
        const categoryId = route.params.categoryId;
        const subCategories = ref([]);
        const errorMessage = ref('');
         
        const fetchSubCategories = async () => {
            try {
                const responseSubCategories = await apiClient.get(`fetch-sub-category/${categoryId}`);
                if (responseSubCategories.data.success) {
                    subCategories.value = responseSubCategories.data.subcategory;
                    allCategories.value =  responseSubCategories.data.subcategory;
                    loading.value = false;
                }
                else {
                    throw new Error('Failed to load subcategories. Please try again later.');
                }
            } catch (error) {
                console.error('Error fetching subcategories:', error);
                errorMessage.value = 'There was an issue loading the subcategories. Please try again later.';
                loading.value = false;
            }
        };
        const fetchProductsByCategory = async (catId) => {
            try {
                const responseProduct = await apiClient.get(`fetch-porduct/${catId}`);
                if(responseProduct.data && responseProduct.data.success){
                    router.push({ name: 'product', params: { subCatId: catId } });
                    console.log(responseProduct.data);
                } else {
                    throw new Error('No products available for this category.');
                }
            } catch (error) {
                errorMessage.value = 'Sorry, there are no products available for this category.';
                console.error('Error fetching products:', error);
            }
            
        };
        const filterSubCategories = computed (() => {
           
            const filtered = subCategories.value.filter((subCategory) => {
                const searchCategory  = subCategory.name.toLowerCase().includes(searchQuery.value.toLowerCase());
                const matchCategory  = selectedCategory.value ? subCategory.id === Number(selectedCategory.value) : true;
                return searchCategory && matchCategory;
            });
            if (filtered.length === 0 && !searchQuery.value && !selectedCategory.value) {
                return [];
            }
            return filtered;
        });
        
        onMounted(() => {
            fetchSubCategories();
        });
        return {
            subCategories,
            categoryId,
            getImageUrl,
            loading,
            fetchProductsByCategory,
            searchQuery,
            allCategories,
            filterSubCategories,
            selectedCategory,
            errorMessage        
        };
    }
}
</script>

<style scoped>
section.categories.py-5 {
    /* padding-top: 208px; */
    margin-top: 53px;
    margin-bottom: 136px;
}

.btn-category {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    border-radius: 25px;
    transition: background-color 0.3s, border-color 0.3s;
}

.btn-category:hover {
    background-color: #28a745;
    border-color: #28a745;
}

/* .btn-category[data-v-636ec3fa] {
    background-color: #28a745;
    border-color: #28a745;
    transition: background-color 0.3s;
} */
section.categories.py-5 {
    background-color: azure;
}
img.card-img-top {
    width: 300px;
    height: 201px;
}
h3.er.text-center.text-danger {
    margin-top: 67px;
    margin-bottom: 51px;
}
.filters-search {
    background-color: #f7f7f7;
    padding: 20px 0;
}

.filters-search input,
.filters-search .form-select {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 30px;
    border: 1px solid #ccc;
    width: 100%;
}
</style>
