import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'process.env.NEXT_PUBLIC_API_BASE_URL', // 替换为你的后端 API 基础 URL
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器（如果需要）
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // 动态添加 token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 添加响应拦截器（如果需要）
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
