<template>
<div class="container-xxl position-relative bg-white d-flex p-0">
    <div class="content">
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header bg-primary text-white text-center">
                            <h4>Add Category</h4>
                        </div>
                        <div class="card-body">
                            <form id="categoryForm" @submit.prevent="handleCategoryAdd">
                                <!-- Category Name -->
                                <div class="mb-3">
                                    <label for="categoryName" class="form-label">Category Name</label>
                                    <input type="text" id="categoryName" name="categoryName" class="form-control" v-model="formData.name" placeholder="Enter category name">
                                </div>

                                <!-- Category Image -->
                                <div class="mb-3">
                                    <label for="categoryImage" class="form-label">Category Image</label>
                                    <input type="file" id="categoryImage" name="categoryImage" class="form-control"  @change="handleCategoryImage">
                                </div>

                                <!-- Category Description
                                <div class="mb-3">
                                    <label for="categoryDescription" class="form-label">Category Description</label>
                                    <textarea id="categoryDescription" name="categoryDescription" class="form-control" rows="4" placeholder="Enter category description" required></textarea>
                                </div> -->

                                <!-- Submit Button -->
                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary">Add Category</button>
                                </div>
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
import {reactive} from 'vue';
import apiClient from '@/service/Index';
export default {
    name: 'AddCategory',
    setup() {
        const formData = reactive({
            name: '',
            image: null,
        })
        const handleCategoryImage = ((e) => {
            const image = e.target.files[0];
            if (image) { 
                formData.image = image;
            }
            console.log(image);
        })

        const handleCategoryAdd = async () => {
            if (!formData.name || !formData.image) {
                alert('All fields are required');
                return;
            }
            const form = new FormData();
            form.append('name', formData.name);
            form.append('image', formData.image);
            try {
                const response = await apiClient.post('/add-category', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.data.success) {
                    formData.name = '';
                    formData.image = null;
                    document.getElementById('categoryImage').value = '';
                    alert('Category added successfully');
                }

            } catch (error) {
                console.log('something wrong', error);
                alert('server side error');
            }

        };
        return {
            handleCategoryAdd,
            handleCategoryImage,
            formData,
        }
    }
}
</script>

<style scoped>
.row.justify-content-center {
    margin-top: 100px;
    margin-bottom: 147px;
}
</style>
