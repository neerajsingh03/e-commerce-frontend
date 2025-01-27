<template>
<div class="container-xxl position-relative bg-white d-flex p-0">
    <div class="content">
        <div class="container mt-5">
            <h2>Add New Subcategory</h2>
            <form @submit.prevent="submitForm">
                <!-- Subcategory Name -->
                <div class="mb-3">
                    <label for="name" class="form-label">Subcategory Name</label>
                    <input type="text" class="form-control" id="name" v-model="formData.name" />
                </div>
                <!-- Description -->
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="4" v-model="formData.description"></textarea>
                </div>
                <!-- Category Selection -->
                <div class="mb-3">
                    <label for="category_id" class="form-label">Select Category</label>
                    <select v-model="formData.category_id" class="form-select" id="category_id">
                        <option value="" disabled>Select a category</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                <!-- Image Upload -->
                <div class="mb-3">
                    <label for="image" class="form-label">Subcategory Image</label>
                    <input @change="handleFileChange" type="file" class="form-control" id="image" />
                </div>
                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary">Add Subcategory</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import {ref,onMounted} from "vue";
import apiClient from '@/service/Index';
export default {
    name: "AddSubCategory",
    setup() {
        const formData = ref({
            name: "",
            description: "",
            category_id: "",
            image: null,
        });

        const categories = ref([]);
        const fetchCategories = async () => {
            try {
                const response = await apiClient.get("/fetch-categories");
                categories.value = response.data.allCategories;
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        const handleFileChange = (event) => {
            formData.value.image = event.target.files[0];
        };
        const submitForm = async () => {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.value.name);
            formDataToSend.append("description", formData.value.description);
            formDataToSend.append("category_id", formData.value.category_id);
              if (formData.value.image) {
                formDataToSend.append("image", formData.value.image);
              }
              try {
                const response = await apiClient.post("/add-subcategory", formDataToSend, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });
                console.log(response.data);
                alert("Subcategory added successfully!");
                formData.value.name = "";
                formData.value.description = "";
                formData.value.category_id = "";
                // formData.value.image = null;
                 document.getElementById('image').value = '';
              } catch (error) {
                console.error("Error adding subcategory:", error);
                alert("Failed to add subcategory.");
              }
        };
        onMounted(fetchCategories);
        return {
            formData,
            categories,
            submitForm,
            handleFileChange,
        };
    },
};
</script>

<style scoped>
.container {
    max-width: 600px;
}
</style>
