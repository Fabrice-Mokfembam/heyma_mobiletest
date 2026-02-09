import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';
import { CreateObjectRequest } from '../types/object';
import { API_BASE_URL } from './config';

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            timeout: 10000,
        });

        // Request interceptor for auth token (optional for now as spec doesn't require auth but good practice from guide)
        this.api.interceptors.request.use(async (config) => {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error('API Error:', error.response?.data || error.message);
                return Promise.reject(error);
            }
        );
    }

    // Object CRUD operations
    async getObjects(): Promise<any[]> {
        const response = await this.api.get('/api/objects');
        return response.data;
    }

    async getObjectById(id: string): Promise<any> {
        const response = await this.api.get(`/api/objects/${id}`);
        return response.data;
    }

    async createObject(data: CreateObjectRequest): Promise<any> {
        const formData = new FormData();
        formData.append('title', data.name); // Using 'title' as per spec, aligning with 'name' property
        if (data.description) {
            formData.append('description', data.description);
        }
        if (data.image) {
            formData.append('image', {
                uri: data.image.uri,
                type: data.image.type || 'image/jpeg', // Default type
                name: data.image.fileName || 'upload.jpg', // Default name
            } as any);
        }

        const response = await this.api.post('/api/objects', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    async deleteObject(id: string): Promise<void> {
        await this.api.delete(`/api/objects/${id}`);
    }
}

export const apiService = new ApiService();
