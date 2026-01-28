import axios from 'axios';

// Create Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // Default fallback
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Add Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 and not already retrying
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // In a real app, call refresh token endpoint here
                // const { data } = await api.post('/auth/refresh');
                // localStorage.setItem('token', data.token);
                // api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

                // For now, just logout or reject
                // store.dispatch(logout()); 
                return Promise.reject(error);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
