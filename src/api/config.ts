import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getLocalHost = () => {
    // 1. Try to get the host from the expo config (works for development)
    // This is crucial for physical devices to connect to the computer's local IP
    const debuggerHost = Constants.expoConfig?.hostUri;
    const localhostIp = debuggerHost?.split(':')[0];

    if (localhostIp) {
        return localhostIp;
    }

    // 2. Fallback for Android Emulator (if hostUri is missing)
    if (Platform.OS === 'android') {
        return '10.0.2.2';
    }

    // 3. Fallback for iOS Simulator and other platforms
    return 'localhost';
};

const localhost = getLocalHost();

export const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || `https://heyma-apitest.vercel.app`;
export const SOCKET_URL = Constants.expoConfig?.extra?.socketUrl || `https://heyma-apitest.vercel.app`; // Usually same port
export const DEV_MODE = true;
