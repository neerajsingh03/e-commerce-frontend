<template>
<div class="cart-page">
    <div class="container py-5">
        <h2 class="text-center mb-5">Your Shopping Cart</h2>
        <div class="loader">
            <div v-if="loading" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div class="row" v-if="cartProducts.length > 0">
            <!-- Cart Items -->
            <div class="col-md-8" >
                <div class="cart-items"  v-for="(cart, index) in cartProducts" :key="cart.id">
                    <div class="cart-item"  v-for="item in cart.items" :key="item.id">
                        <div class="row align-items-center" >
                            <div class="col-3">
                                <!-- <img :src="getImageUrl(item.prodcut.image)" class="img-fluid cart-item-image" alt="Product Image"> -->
                                 <img :src="getImageUrl(item.product.image)" class="card-img-top product-image" alt="Product Image">
                            </div>
                            <div class="col-6">
                                <h5 class="cart-item-title">{{ item.product.name }}</h5>
                                <p class="cart-item-description">{{ item.product.description }}</p>
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
        <div class="empty-cart" v-else-if="!loading">
            <div class="empty-cart-container">
                <div class="empty-cart-icon">
                    <img src="@/assets/empty-cart.jpg" alt="Empty Cart" class="img-fluid" />
                </div>
                <div class="empty-cart-message">
                    <h3>Your Cart is Empty</h3>
                    <p>Looks like you haven't added any items to your cart yet.</p>
                    <p>Don't worry, you can start shopping now!</p>
                </div>
                <div class="empty-cart-action">
                    <button class="btn btn-primary" @click="redirectToShop">Go to Shop</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {useStore} from 'vuex';
import {ref,onMounted,computed} from 'vue';
import apiClient from '@/service/Index';
import {getImageUrl} from '@/utils/Helper';
export default {
    name: 'CartPage',
    setup(){
        const store = new useStore();
        const userId = computed(() => store.getters['auth/getUserId']);
        const token = computed(() => store.getters['auth/getToken']);
        const cartProducts = ref([]);
        const loading = ref(false);
        const fetchUserProducts = async ()=> {
            if(token.value){
                loading.value= true;
                try {
                    const response = await apiClient.get(`/user-cart-products/${userId.value}`);
                    if(response.data && response.data.success && response.data.cartProducts){
                        cartProducts.value =  response.data.cartProducts;
                        loading.value = false;
                        console.log(response);
                    }
                } catch (error) {
                    console.log('Sorry, there are no products available for this user' ,error);
                        loading.value = false;
                }
            }else {
                console.log('No token found, cannot fetch cart data.');
                loading.value = false;
            }
        }
        onMounted (() => {
            fetchUserProducts();
          
        });
        return {
            cartProducts,
            getImageUrl,
            loading,
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
img.card-img-top.product-image {
    max-height: 174px;
}
.empty-cart {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32vh;
    text-align: center;
    background-color: #f9f9f9;
    padding: 20px;
}

.empty-cart-container {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
}

.empty-cart-icon img {
    width: 120px;
    height: 120px;
    object-fit: contain;
    margin-bottom: 20px;
}

.empty-cart-message h3 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
}

.empty-cart-message p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 10px;
}

.empty-cart-action {
    margin-top: 20px;
}

.empty-cart-action .btn {
    font-size: 1rem;
    padding: 10px 20px;
    border-radius: 5px;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
}

.empty-cart-action .btn:hover {
    background-color: #007bff;
    border-color: #007bff;
}

</style>
