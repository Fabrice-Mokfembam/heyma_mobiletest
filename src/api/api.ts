import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';
import { CreateObjectRequest } from '../types/object';
import { API_BASE_URL } from './config';

class ApiService {
    private api: AxiosInstance;

    constructor() {
        console.log('API Base URL:', API_BASE_URL);
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
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('API Error Response:', {
                        status: error.response.status,
                        data: error.response.data,
                        headers: error.response.headers,
                    });
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('API Error Request (No Response):', error.message);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('API Error Setup:', error.message);
                }
                console.error('API Error Config:', error.config);
                return Promise.reject(error);
            }
        );
    }

    // Object CRUD operations
    async getObjects(): Promise<any[]> {
        const response = await this.api.get('/objects');
        return response.data;
    }

    async getObjectById(id: string): Promise<any> {
        const response = await this.api.get(`/objects/${id}`);
        return response.data;
    }

    async createObject(data: CreateObjectRequest): Promise<any> {
        const formData = new FormData();
        formData.append('title', data.title);
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

        const response = await this.api.post('/objects', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    async deleteObject(id: string): Promise<void> {
        await this.api.delete(`/objects/${id}`);
    }
}

export const apiService = new ApiService();
