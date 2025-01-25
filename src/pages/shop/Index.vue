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
            <p>Max Price: ${{ priceRange }}</p>
          </div>
          <div class="col-lg-6 text-center text-lg-end">
            <button class="btn btn-success" @click="applyFilters">Apply Filters</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Grid Section -->
    <section class="products-grid py-5">
      <div class="container">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          <div class="col" v-for="product in filteredProducts" :key="product.id">
            <div class="card product-card shadow-sm">
              <img src="../../assets/loginImg.jpg" class="card-img-top" alt="Product Image" />
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="price">$ {{ product.price }}</p>
                  <button class="btn btn-primary" @click="addToCart(product)">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ShopPage",
  data() {
    return {
      products: [
        { id: 1, name: "Product 1", description: "High-quality product", price: 99.99, image: "https://via.placeholder.com/300x200", category: 1 },
        { id: 2, name: "Product 2", description: "Best-selling product", price: 149.99, image: "https://via.placeholder.com/300x200", category: 2 },
        { id: 3, name: "Product 3", description: "Top-rated product", price: 199.99, image: "https://via.placeholder.com/300x200", category: 1 },
        { id: 4, name: "Product 4", description: "Affordable product", price: 79.99, image: "https://via.placeholder.com/300x200", category: 3 },
      ],
      categories: [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Clothing" },
        { id: 3, name: "Home Appliances" },
        { id: 4, name: "Health & Beauty" },
      ],
      selectedCategory: "",
      priceRange: 500,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        const withinPriceRange = product.price <= this.priceRange;
        const categoryMatches = this.selectedCategory ? product.category === Number(this.selectedCategory) : true;
        return withinPriceRange && categoryMatches;
      });
    },
  },
  methods: {
    applyFilters() {
      // Filters will automatically update as the model changes
    },
    addToCart(product) {
      console.log("Added to cart:", product);
      // Handle cart logic here
    },
  },
};
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background-color: #007bff;
  color: white;
}

.hero-section h1 {
  font-size: 2.5rem;
  font-weight: 600;
}

.hero-section p {
  font-size: 1.2rem;
  margin-top: 10px;
}

/* Filters Section */
.filters-section {
  background-color: #f1f1f1;
}

.filters-section .form-select,
.filters-section .form-range {
  width: 100%;
}

.filters-section h4 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.filters-section .btn {
  font-weight: 600;
}

/* Product Grid Section */
.products-grid {
  background-color: #f9fafb; /* Soft light gray background */
}

.products-grid .product-card {
  border: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #ffffff;
  border-radius: 10px;
}

.products-grid .product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.products-grid .product-card img {
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.products-grid .card-body {
  padding: 15px;
}

.products-grid .price {
  font-size: 1.25rem;
  font-weight: 600;
  color: #28a745;
}

.products-grid .btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  transition: background-color 0.3s;
  font-weight: 600;
  border-radius: 30px;
}

.products-grid .btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}
.products-grid[data-v-5864ea2c] {
    background-color: #e9e3e3;
}
.filters-section[data-v-5864ea2c] {
    background-color: #f1f1f1;
    padding-bottom: 120PX!important;
    margin-top: 20px;
}
.products-grid[data-v-5864ea2c][data-v-5864ea2c] {
    background-color: #e9e3e3;
    padding-bottom: 185px!important;
}
</style>
