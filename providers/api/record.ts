import apiClient from './index'; // Your axios instance

export const postJoggingRecord = async (record: {
  user_id: number;
  start_time: string;
  end_time: string;
  distance: number;
  duration: number;
  blue_no: number;
  green_no: number;
  black_no: number;
}) => {
  try {
    const response = await apiClient.post('/record', record);
    return response.data; // Return the created record
  } catch (error) {
    console.error('Error posting jogging record:', error);
    throw error; // Propagate the error
  }
};
