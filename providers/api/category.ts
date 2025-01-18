import apiClient from './index'; // Axios instance from your previous setup

export const getCategory = async () => {
  try {
    const response = await apiClient.get('/category');
    return response.data; // Return the category data
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error; // Throw the error to handle it in the calling component
  }
};
