<template>
<div class="container-xxl position-relative bg-white d-flex p-0">
    <div class="content">
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-9">
                    <div v-if="errorMessage && errorMessage.trim() !== ''" class="alert alert-danger text-center">
                        {{ errorMessage }}
                    </div>
                    <div class="card">
                        <h2 class="mb-4">Add Product</h2>
                        <!-- Product Form -->
                        <div class="card-body">
                            <form @submit.prevent="submitProductForm">
                                <!-- Subcategory Selection -->
                                <div class="mb-3">
                                    <label for="subcategory_id" class="form-label">Subcategory</label>
                                    <select id="subcategory_id" class="form-select" v-model="formData.selectedSubcategory" style="max-width: 701px; width: 100%" onfocus="this.size=5;" onblur="this.size=1;" onchange="this.size=1; this.blur();">
                                        <option value="" v-if="!selectedSubcategory">Select Subcategory</option>
                                        <option v-for="subcategory in subCategories" :key="subcategory.id" :value="subcategory.id">
                                            {{ subcategory.name }}
                                        </option>
                                    </select>
                                </div>
                                <!-- Product Name -->
                                <div class="mb-3">
                                    <label for="name" class="form-label">Product Name</label>
                                    <input type="text" class="form-control" id="name" v-model="formData.name">
                                </div>
                                <!-- Product Description -->
                                <div class="mb-3">
                                    <label for="description" class="form-label">Description</label>
                                    <textarea class="form-control" id="description" rows="4" v-model="formData.description"></textarea>
                                </div>
                                <!-- Price -->
                                <div class="mb-3">
                                    <label for="price" class="form-label">Price</label>
                                    <input type="number" min="1" step="0.01" class="form-control" id="price" v-model="formData.price">
                                </div>
                                <!-- Discount Price -->
                                <div class="mb-3">
                                    <label for="discount_price" class="form-label">Discount Price</label>
                                    <input type="number" min="1" step="0.01" class="form-control" id="discount_price" v-model="formData.discountPrice">
                                </div>
                                <!-- Stock Quantity -->
                                <div class="mb-3">
                                    <label for="stock" class="form-label">Stock Quantity</label>
                                    <input type="number" class="form-control" id="stock" v-model="formData.stockQuantity">
                                </div>
                                <!-- Product Image -->
                                <div class="mb-3">
                                    <label for="image" class="form-label">Product Image</label>
                                    <input type="file" class="form-control" id="image" @change="handleImageUpload">
                                </div>
                                <!-- Submit Button -->
                                <button type="submit" class="btn btn-primary">Save Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import apiClient from '@/service/Index'
import {
    ref,
    onMounted
} from 'vue';
export default {
    name: 'AddProduct',
    setup() {

        const subCategories = ref([]);
        const errorMessage = ref('');
        const selectedSubcategory = ref('');
        const formData = ref({
            selectedSubcategory: '',
            name: '',
            description: '',
            price: '',
            discountPrice: '',
            stockQuantity: '',
            imageFile: null
        });
        
        const handleImageUpload = (e) => {
            const file = e.target.files[0];
            if(file){
                formData.value.imageFile = file;
            }
        }
        const submitProductForm = async () =>{
          
            if (!formData.value.name || !formData.value.price || !formData.value.selectedSubcategory || !formData.value.imageFile || !formData.value.stockQuantity) {
                alert('Please fill all the required fields and upload an image.');
                return;
            }
            if (formData.value.description.length > 300) {
                alert('Description length is greater than 100 characters');
                return;
            }
            const data = new FormData();
            data.append('selectedSubcategory', formData.value.selectedSubcategory);
            data.append('name', formData.value.name);
            data.append('description', formData.value.description);
            data.append('price', formData.value.price);
            data.append('discountPrice', formData.value.discountPrice);
            data.append('stockQuantity', formData.value.stockQuantity);
            if(formData.value.imageFile){
                data.append('image', formData.value.imageFile);
            }
            try {
                const responseSaveProduct =  await apiClient.post('add-product',data,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if(responseSaveProduct.data.success){
                    formData.value.selectedSubcategory = '';
                    formData.value.name = '';
                    formData.value.description = '';
                    formData.value.price = '';
                    formData.value.discountPrice = '';
                    formData.value.stockQuantity = '';
                    document.getElementById('image').value = '';
                    alert(responseSaveProduct.data.msg);
                    
                }
            } catch (error) {
                console.log('product not save');
            }
          

        }
        const fetchSubCategories = async () => {
            try {
                const response = await apiClient.get('/sub-categories');
                if (response.data && response.data.success && response.data.allSubCategories) {
                    subCategories.value = response.data.allSubCategories;
                
                }
            } catch (error) {
                errorMessage.value = 'Failed to fetch subcategories.';
            }

        };
        onMounted(() => {
            fetchSubCategories();
        });
        return {
            errorMessage,
            subCategories,
            selectedSubcategory,
            submitProductForm,
            formData,
            handleImageUpload
        }
    }
}
</script>

<style scoped>
.mb-4 {
    margin-bottom: 1.5rem !important;
    text-align: center;
    margin-top: 1px;
    padding-top: 23px;
}

/* .scrollable-select {
    max-height: 200px;
    overflow-y: auto;
} */
</style>
