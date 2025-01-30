<template>
  <div class="main-page">
    <!-- Carousel Section (Hero Section) -->
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

    <!-- Category Section -->
    <div v-if="loading" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    <section class="categories py-5">
      <div class="container">
        <h2 class="text-center mb-4">Shop by Categories</h2>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          <div class="col" v-for="category in categories" :key="category.id">
            <div class="card category-card">
              <img :src="getImageUrl(category.image)" class="card-img-top" alt="Category Image">
              <div class="card-body text-center">
                <h5 class="card-title">{{ category.name }}</h5>
                <a :href="category.link" class="btn btn-primary" @click="handleFetchSubCategory(category.slug,category.id)">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="products py-5">
      <div class="container">
        <h2 class="text-center mb-4">Featured Products</h2>
        <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          <div class="col" v-for="product in products" :key="product.id">
            <div class="card product-card">
              <img src="@/assets/loginImg.jpg" class="card-img-top" alt="Product Image">
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <p class="price">${{ product.price }}</p>
                <button class="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Promotional Banner -->
    <section class="promo-banner bg-light py-4">
      <div class="container text-center">
        <h3>Special Discount on Electronics</h3>
        <p>Get up to 50% off on selected electronics. Don't miss out!</p>
        <button class="btn btn-success">Shop Now</button>
      </div>
    </section>
  </div>
</template>

<script>
import { ref,onMounted} from 'vue';
import apiClient from '@/service/Index';
import {getImageUrl} from '@/utils/Helper.js';
import { useRouter } from 'vue-router';
export default {
    name:'HomePage',
    setup(){
      // Reactive state
      const categories = ref([]);
      const router = useRouter();

      
      let loading = ref(true);
      const products = ref([
        { id: 1, name: 'Product 1', description: 'Description for product 1', price: 99.99  },
        { id: 2, name: 'Product 2', description: 'Description for product 2', price: 199.99 },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 299.99},
        { id: 4, name: 'Product 4', description: 'Description for product 4', price: 79.99 },
      ]);
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

        //  alert(`hey!! guys this is prodcut Id ${productId}`);
        //  console.log(`hey!! guys this is prodcut Id ${productId}`)
      };
       return {
        products,
        categories,
        getImageUrl,
        loading,
        handleFetchSubCategory,
        fetchCategories
      };
    }
}
</script>
<style scoped>
/* .carousel-inner img {
  max-height: 500px;
  object-fit: cover;
}
.carousel-caption {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 5px;
}
.carousel-control-prev-icon, .carousel-control-next-icon {
  background-color: #333;
  border-radius: 50%;
}
.categories {
  background-color: #f2f7fb;
  padding: 50px 0;
}
.card.category-card {
  border: none;
  transition: transform 0.3s ease;
}
.card.category-card:hover {
  transform: scale(1.05);
}
.card.category-card img {
  border-radius: 10px;
  max-height: 167px;
  object-fit: cover;
}
.card-body {
  padding: 1.25rem;
  background-color: #ffffff;
  border-radius: 10px;
}
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}
.btn-primary {
  background-color: #ff5733; 
  border-color: #ff5733;
  transition: background-color 0.3s;
}
.btn-primary:hover {
  background-color: #e84c2a;
  border-color: #d43d18;
}
.products {
  background-color: #fff8e1;
  padding: 50px 0;
}
.card.product-card {
  border: 1px solid #ddd;
  transition: transform 0.3s ease;
}
.card.product-card:hover {
  transform: translateY(-10px);
}
.card-img-top {
  max-height: 250px;
  object-fit: contain;
}
.card-body {
  padding: 1.25rem;
  background-color: #fff;
}
.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}
.btn-primary {
  background-color: #28a745;
  border-color: #28a745;
  transition: background-color 0.3s;
}
.btn-primary:hover {
  background-color: #218838;
  border-color: #1e7e34;
}
.promo-banner {
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.promo-banner h3 {
  font-size: 2rem;
  font-weight: 600;
  color: #e74c3c;
}
.promo-banner button {
  background-color: #28a745;
  border-color: #28a745;
}
.promo-banner button:hover {
  background-color: #218838;
  border-color: #1e7e34;
} */
.carousel-inner img {
  max-height: 500px;
  object-fit: cover;
}
.carousel-caption {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 5px;
}
.carousel-control-prev-icon, .carousel-control-next-icon {
  background-color: #333;
  border-radius: 50%;
}
.categories {
  background-color: #f2f7fb;
  padding: 50px 0;
}
.card.category-card {
  border: none;
  transition: transform 0.3s ease;
}
.card.category-card:hover {
  transform: scale(1.05);
}
.card.category-card img {
  border-radius: 10px;
  max-height: 167px;
  object-fit: cover;
}
.card-body {
  padding: 1.25rem;
  background-color: #ffffff;
  border-radius: 10px;
}
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}
.btn-primary {
  background-color: #ff5733; 
  border-color: #ff5733;
  transition: background-color 0.3s;
}
.btn-primary:hover {
  background-color: #e84c2a;
  border-color: #d43d18;
}
.products {
  background-color: #fff8e1;
  padding: 50px 0;
}
.card.product-card {
  border: 1px solid #ddd;
  transition: transform 0.3s ease;
}
.card.product-card:hover {
  transform: translateY(-10px);
}
.card-img-top {
  max-height: 250px;
  object-fit: contain;
}
.card-body {
  padding: 1.25rem;
  background-color: #fff;
}
.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}
.btn-primary {
  background-color: #28a745; /* Green button color */
  border-color: #28a745;
  transition: background-color 0.3s;
}
.btn-primary:hover {
  background-color: #218838; /* Darker green shade on hover */
  border-color: #1e7e34;
}
.promo-banner {
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.promo-banner h3 {
  font-size: 2rem;
  font-weight: 600;
  color: #e74c3c;
}
.promo-banner button {
  background-color: #28a745;
  border-color: #28a745;
}
.promo-banner button:hover {
  background-color: #218838;
  border-color: #1e7e34;
}


</style>
