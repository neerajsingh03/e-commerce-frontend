<template>
<div class="cart-page">
    <div class="container py-5">
        <h2 class="text-center mb-5">Your Shopping Cart</h2>

        <div class="row">
            <!-- Cart Items -->
            <div class="col-md-8">
                <div class="cart-items">
                    <div class="cart-item" v-for="(item, index) in cartItems" :key="item.id">
                        <div class="row align-items-center">
                            <div class="col-3">
                                <img src="../../assets/loginImg.jpg" class="img-fluid cart-item-image" alt="Product Image">
                            </div>
                            <div class="col-6">
                                <h5 class="cart-item-title">{{ item.name }}</h5>
                                <p class="cart-item-description">{{ item.description }}</p>
                                <p class="cart-item-price">${{ item.price }}</p>
                            </div>
                            <div class="col-3">
                                <div class="quantity-selector">
                                    <button class="quantity-btn" @click="decreaseQuantity(index)">-</button>
                                    <input type="number" class="quantity-input" v-model="item.quantity" min="1" readonly />
                                    <button class="quantity-btn" @click="increaseQuantity(index)">+</button>
                                </div>
                                <button class="btn btn-danger mt-3" @click="removeItem(index)">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Cart Summary -->
            <div class="col-md-4">
                <div class="cart-summary">
                    <h4 class="cart-summary-title">Cart Summary</h4>
                    <div class="cart-summary-item">
                        <p>Total Items: <span>{{ totalItems }}</span></p>
                        <p>Total Price: <span>${{ totalPrice }}</span></p>
                    </div>
                    <button class="btn btn-primary w-100" @click="proceedToCheckout">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'CartPage',
    data() {
        return {
            cartItems: [{
                    id: 1,
                    name: 'Product 1',
                    description: 'Description for product 1',
                    price: 99.99,
                    quantity: 1,
                    image: 'https://via.placeholder.com/150',
                },
                {
                    id: 2,
                    name: 'Product 2',
                    description: 'Description for product 2',
                    price: 199.99,
                    quantity: 1,
                    image: 'https://via.placeholder.com/150',
                },
                // Add more items as needed
            ]
        };
    },
    computed: {
        totalItems() {
            return this.cartItems.reduce((total, item) => total + item.quantity, 0);
        },
        totalPrice() {
            return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        }
    },
    methods: {
        increaseQuantity(index) {
            this.cartItems[index].quantity++;
        },
        decreaseQuantity(index) {
            if (this.cartItems[index].quantity > 1) {
                this.cartItems[index].quantity--;
            }
        },
        removeItem(index) {
            this.cartItems.splice(index, 1);
        },
        proceedToCheckout() {
            // Logic for proceeding to checkout
            alert('Proceeding to checkout!');
        }
    }
};
</script>

<style scoped>
/* Cart Page Styles */
.cart-page {
    background-color: #f9f9f9;
    padding-top: 30px;
}

.cart-item {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.cart-item .cart-item-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
}

.cart-item .cart-item-description {
    font-size: 0.9rem;
    color: #777;
}

.cart-item .cart-item-price {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
}

.cart-item .quantity-selector {
    display: flex;
    align-items: center;
}

.quantity-btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 4px;
}

.quantity-btn:hover {
    background-color: #0056b3;
}

.quantity-input {
    width: 40px;
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 0 10px;
}

.cart-summary {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.cart-summary-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
}

.cart-summary-item {
    margin-bottom: 20px;
}

.cart-summary-item p {
    font-size: 1rem;
    color: #333;
}

.cart-summary-item span {
    font-weight: 600;
}

.btn-primary {
    background-color: #28a745;
    border-color: #28a745;
    font-size: 1.1rem;
    padding: 12px;
    border-radius: 5px;
}

.btn-primary:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
    font-size: 0.9rem;
    padding: 6px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.btn-danger:hover {
    background-color: #c82333;
    border-color: #bd2130;
}

@media (max-width: 768px) {
    .cart-item .row {
        flex-direction: column;
        align-items: flex-start;
    }

    .cart-summary {
        margin-top: 30px;
    }
}

.cart-page {
    margin-top: 56px;
    padding-bottom: 166px;
}
</style>
