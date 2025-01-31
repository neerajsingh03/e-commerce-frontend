import apiClient from "@/service/Index";

 
 export const getImageUrl = (imagePath) => {
  return `${process.env.VUE_APP_API_URL}/${imagePath}`;
  };

export  const getCountries = async () =>  {
    try {
        const response = await apiClient.get('/countries');
        if(response.data ?. success){
            return response;
        }
    } catch (error) {
        console.error('counries not found');
        throw error;
    }
       
  }
  

