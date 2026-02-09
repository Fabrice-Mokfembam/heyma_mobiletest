import Constants from 'expo-constants';
import { Platform } from 'react-native';

const localhost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || `http://${localhost}:3001`;
export const SOCKET_URL = Constants.expoConfig?.extra?.socketUrl || `http://${localhost}:3001`; // Usually same port
export const DEV_MODE = true;
