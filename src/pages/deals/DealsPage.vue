<template>
  <div class="deal-page">
    <!-- Hero Section -->
    <section class="hero-section text-center py-5">
      <div class="container">
        <h1 class="display-4 fw-bold text-white">Exclusive Deals & Discounts</h1>
        <p class="lead text-white mb-4">Shop now to grab the best offers and limited-time deals on top products!</p>
        <button class="btn btn-deal btn-lg">Shop Now</button>
      </div>
    </section>

    <!-- Deals Grid Section -->
    <section class="deals-grid py-5">
      <div class="container">
        <h2 class="text-center mb-5">Featured Deals</h2>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div class="col" v-for="deal in deals" :key="deal.id">
            <div class="card deal-card shadow-lg">
              <img :src="deal.image" class="card-img-top" alt="Deal Image" />
              <div class="card-body">
                <h5 class="card-title">{{ deal.name }}</h5>
                <p class="card-text">{{ deal.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="price text-success fw-bold">${{ deal.price }}</p>
                  <button class="btn btn-primary" @click="addToCart(deal)">Add to Cart</button>
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
  name: 'DealsPage',
  data() {
    return {
      deals: [
        {
          id: 1,
          name: 'Smartphone Sale',
          description: 'Get 30% off on top-rated smartphones.',
          price: 299.99,
          image: 'https://via.placeholder.com/300x200?text=Smartphone',
        },
        {
          id: 2,
          name: 'Fashion Clearance',
          description: 'Up to 50% off on selected clothing items.',
          price: 79.99,
          image: 'https://via.placeholder.com/300x200?text=Clothing',
        },
        {
          id: 3,
          name: 'Home Appliances Deals',
          description: 'Exclusive discounts on the latest home appliances.',
          price: 199.99,
          image: 'https://via.placeholder.com/300x200?text=Appliances',
        },
        {
          id: 4,
          name: 'Beauty & Health Offer',
          description: 'Get the best beauty and wellness products at unbeatable prices.',
          price: 49.99,
          image: 'https://via.placeholder.com/300x200?text=Beauty+Health',
        },
      ],
    };
  },
  methods: {
    addToCart(deal) {
      console.log('Added to cart:', deal);
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
  padding-top: 80px;
  padding-bottom: 80px;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 700;
}

.hero-section p {
  font-size: 1.2rem;
}

.hero-section .btn-deal {
  background-color: #ff5733;
  border-color: #ff5733;
  color: white;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 25px;
  transition: background-color 0.3s, border-color 0.3s;
}

.hero-section .btn-deal:hover {
  background-color: #e04e2e;
  border-color: #e04e2e;
}

/* Deals Grid Section */
.deals-grid {
  background-color: #f8f9fa;
}

.card.deal-card {
  border: none;
  border-radius: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card.deal-card:hover {
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
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.card-text {
  color: #777;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #28a745;
}

.card .btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 25px;
  transition: background-color 0.3s;
}

.card .btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.deals-grid h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #444;
  margin-bottom: 40px;
}
.hero-section[data-v-9a3f238c] {
    background-color: #9da7a4;
    color: white;
    padding-top: 80px;
    padding-bottom: 80px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }

  .hero-section p {
    font-size: 1rem;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .card-text {
    font-size: 0.9rem;
  }
}
</style>
