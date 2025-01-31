<template>
<div class="categories-page">
    <section id="carouselSection" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="@/assets/img2.webp" class="d-block w-100" alt="Promo Image 1">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Big Sale on All Products</h5>
                    <p>Hurry up! Limited time offers on all categories.</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="@/assets/img2.webp" class="d-block w-100" alt="Promo Image 2">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Electronics Sale</h5>
                    <p>Get the best deals on top electronics.</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="@/assets/img1.webp" class="d-block w-100" alt="Promo Image 3">
                <div class="carousel-caption d-none d-md-block">
                    <h5>New Collection of Fashion</h5>
                    <p>Explore the latest fashion trends at amazing prices.</p>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselSection" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselSection" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </section>
    <section class="filters-search py-4">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <input type="text" class="form-control" v-model="searchQuery" placeholder="Search Categories" />
                </div>
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
    <div v-if="errorMessage && errorMessage.trim() !== ''" class="alert alert-danger text-center">
        {{ errorMessage }}
    </div>
    <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <section class="categories py-5" v-if="categories.length > 0">
        <div class="container">
            <h2 class="text-center mb-5">Shop by Categories</h2>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                <div class="col" v-for="category in categories" :key="category.id">
                    <div class="card category-card shadow-sm">
                        <img :src="getImageUrl(category.image)" class="card-img-top" alt="Category Image">
                        <div class="card-body text-center">
                            <h5 class="card-title">{{ category.name }}</h5>
                                <a href="javascript:void(0)" class="btn btn-primary" @click.prevent="handleFetchSubCategory(category.slug,category.id)">Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
     <h3 v-else-if="!loading" class="er text-center text-danger">
        No Categoires found.
    </h3>
</div>
</template>
<script>
import {ref,onMounted,computed} from 'vue';
import {getImageUrl} from '@/utils/Helper.js';
import apiClient from '@/service/Index';
import {useRouter} from 'vue-router';

export default {
    name: 'Index',
    setup() {
        const categories = ref([]);
        const selectedCategory = ref('');
        const router           = useRouter();
        let loading = ref(true);
        const errorMessage = ref('');
        const allCategories = computed(() => categories.value);
  
        onMounted(() => {
            fetchCategories();
        });
        const fetchCategories = async ()=> {
            try {
            const response = await apiClient.get('/fetch-categories');
            if (response.data.success) {
                loading.value= false;
                categories.value = response.data.allCategories;
            }
            else {
                throw new Error('Failed to fetch categories');
            }
            } catch (error) {
            console.error('Error fetching categories:', error);
                loading.value= false;
            throw error;
            }
        };

       const  handleFetchSubCategory = async (categorySlug,categoryId) => {
            
        try {
          const responseSubCategory = await apiClient.get(`fetch-sub-category/${categoryId}`);
          if(responseSubCategory.data.success)
          {
            router.push({ name: 'sub-categories',  params: { categorySlug, categoryId } });
            // console.log(responseSubCategory.data);
          }
        } catch (error) {
          alert('This category does not have sub-categories');
          console.log('something wrong' , error);
        }
      };
        return {
            categories,
            getImageUrl,
            loading,
            allCategories,
            fetchCategories,
            selectedCategory,
            handleFetchSubCategory,
            errorMessage
        };
    }

};
</script>

<style scoped>
/* Carousel */
.carousel-inner img {
    max-height: 500px;
    object-fit: cover;
}

/* Filters Search Section */
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

/* Categories Section */
.categories {
    background-color: #f7f7f7;
    padding: 40px 0;
}

.card.category-card {
    border: none;
    border-radius: 15px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card.category-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-img-top {
    border-radius: 15px 15px 0 0;
    object-fit: cover;
    height: 200px;
}

.card-body {
    padding: 1.5rem;
    background-color: #fff;
}

.card-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #333;
}

.card-text {
    color: #777;
    font-size: 0.9rem;
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
    background-color: #0056b3;
    border-color: #004085;
}

.categories h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #444;
    text-align: center;
    margin-bottom: 40px;
}

/* Media Queries for Responsiveness */

/* For tablets and larger devices */
@media (max-width: 1024px) {
    .card-img-top {
        height: 180px;
    }

    .card-title {
        font-size: 1.2rem; /* Slightly smaller text for medium screens */
    }

    .filters-search {
        padding: 15px 0;
    }

    .filters-search input,
    .filters-search .form-select {
        padding: 0.75rem 1rem;
    }

    .categories h2 {
        font-size: 1.8rem;
    }

    /* Adjust columns for smaller devices */
    .row-cols-md-2 {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* For mobile devices (smaller than tablets) */
@media (max-width: 768px) {
    .carousel-inner img {
        max-height: 200px; /* Reduce carousel image size */
    }

    .filters-search {
        padding: 10px 0;
    }

    .card-img-top {
        height: 140px; /* Reduce card image height */
    }

    .card-title {
        font-size: 1rem; /* Reduce font size further */
    }

    .btn-category {
        padding: 0.5rem 1rem; /* Smaller button for mobile */
    }

    .categories h2 {
        font-size: 1.4rem;
    }

    /* Adjust the grid layout for tablets and smaller devices */
    .row-cols-1 {
        grid-template-columns: 1fr; /* 1 column for very small devices */
    }

    .row-cols-md-2 {
        grid-template-columns: repeat(2, 1fr); /* 2 columns for medium screens */
    }

    .row-cols-lg-4 {
        grid-template-columns: repeat(2, 1fr); /* 2 columns for larger screens (768px or below) */
    }

    .card.category-card {
        margin-bottom: 20px;
    }
}

@media (max-width: 480px) {
    .carousel-inner img {
        max-height: 200px; /* Further reduce carousel image size */
    }

    .filters-search {
        padding: 10px 0;
    }

    .card-img-top {
        height: 140px; /* Reduce card image height */
    }

    .card-title {
        font-size: 1rem; /* Reduce font size further */
    }

    .btn-category {
        padding: 0.5rem 1rem; /* Smaller button for mobile */
    }

    .categories h2 {
        font-size: 1.4rem;
    }
}
</style>
