import apiClient from '@/service/Index'; 
 
 export const getImageUrl = (imagePath) => {
    // console.log(imagePath);
    return `${process.env.VUE_APP_API_URL}/${imagePath}`;


  };
  export   const fetchCategories = async ()=> {
    try {
      const response = await apiClient.get('/fetch-categories');
      if (response.data.success) {
        // loading.value= false;
        return response.data.allCategories;
      }
      else {
        throw new Error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
