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
                    <input type="text" class="form-control" v-model="searchQuery" placeholder="Search Categories" />
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

    <!-- Categories Grid Section -->
    <section class="categories py-5">
        <div class="container">
            <h2 class="text-center mb-5">Shop by Categories</h2>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                <!-- Category Item -->
                <div class="col" v-for="category in filteredCategories" :key="category.id">
                    <div class="card category-card shadow-sm">
                        <img src="@/assets/loginImg.jpg" class="card-img-top" alt="Category Image">
                        <div class="card-body text-center">
                            <h5 class="card-title">{{ category.name }}</h5>
                            <p class="card-text">{{ category.description }}</p>
                            <a :href="category.link" class="btn btn-category">Shop Now</a>
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
    name: 'Index',
    data() {
        return {
            searchQuery: '',
            selectedCategory: '',
            categories: [{
                    id: 1,
                    name: 'Electronics',
                    description: 'Latest gadgets and electronics.',
                    image: 'https://via.placeholder.com/300x200?text=Electronics',
                    link: '#'
                },
                {
                    id: 2,
                    name: 'Clothing',
                    description: 'Trendy fashion wear for all ages.',
                    image: 'https://via.placeholder.com/300x200?text=Clothing',
                    link: '#'
                },
                {
                    id: 3,
                    name: 'Home Appliances',
                    description: 'Quality appliances for your home.',
                    image: 'https://via.placeholder.com/300x200?text=Home+Appliances',
                    link: '#'
                },
                {
                    id: 4,
                    name: 'Beauty & Health',
                    description: 'Skincare, makeup, and wellness products.',
                    image: 'https://via.placeholder.com/300x200?text=Beauty+%26+Health',
                    link: '#'
                },
            ],
        };
    },
    computed: {
        allCategories() {
            return this.categories;
        },
        filteredCategories() {
            return this.categories.filter((category) => {
                const matchesSearch = category.name.toLowerCase().includes(this.searchQuery.toLowerCase());
                const matchesCategory = this.selectedCategory ? category.id === Number(this.selectedCategory) : true;
                return matchesSearch && matchesCategory;
            });
        },
    },
    methods: {
        applyFilters() {
            // Filters will be applied automatically based on user selection
        },
    },
};
</script>

<style scoped>
/* Filter and Search Section */
.filters-search {
    background-color: #f7f7f7;
    padding: 20px 0;
}

.filters-search input {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 30px;
    border: 1px solid #ccc;
}

.filters-search .form-select {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 30px;
    border: 1px solid #ccc;
}

/* Category Section */
.categories {
    background-color: #f7f7f7;
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
}

section.categories.py-5 {
    margin-top: 58px;
    padding-bottom: 167px !important;
    padding-top: 49px !important;
}
</style>
