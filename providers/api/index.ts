import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://your-api-base-url.com', // 替换为你的后端 API 基础 URL
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
