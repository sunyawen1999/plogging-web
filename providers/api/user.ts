import apiClient from './index';

// get User Jogging Records
export const getUserJoggingRecords = async (userId: number) => {
  try {
    const response = await apiClient.get(`/record/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch jogging records:', error);
    throw error;
  }
};
