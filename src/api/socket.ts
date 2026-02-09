import { io, Socket } from 'socket.io-client';
import { API_BASE_URL } from './config';

class SocketService {
    private socket: Socket | null = null;
    private isConnected = false;

    connect(): void {
        if (this.socket?.connected) {
            console.log('Socket already connected');
            return;
        }

        this.socket = io(API_BASE_URL, {
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            transports: ['websocket'],
        });

        this.socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
            this.isConnected = true;
            this.socket?.emit('join:objects');
        });

        this.socket.on('disconnect', (reason) => {
            console.log('Disconnected from Socket.IO server:', reason);
            this.isConnected = false;
        });

        this.socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            this.isConnected = false;
        });
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.emit('leave:objects');
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
        }
    }

    isSocketConnected(): boolean {
        return this.isConnected && this.socket?.connected || false;
    }

    // Event listeners
    onObjectCreated(callback: (object: any) => void): void {
        if (this.socket) {
            this.socket.on('object:created', callback);
        }
    }

    onObjectUpdated(callback: (object: any) => void): void {
        if (this.socket) {
            this.socket.on('object:updated', callback);
        }
    }

    onObjectDeleted(callback: (objectId: string) => void): void {
        if (this.socket) {
            this.socket.on('object:deleted', callback);
        }
    }

    // Removing event listeners
    offObjectCreated(callback: (object: any) => void): void {
        if (this.socket) {
            this.socket.off('object:created', callback);
        }
    }

    offObjectUpdated(callback: (object: any) => void): void {
        if (this.socket) {
            this.socket.off('object:updated', callback);
        }
    }

    offObjectDeleted(callback: (objectId: string) => void): void {
        if (this.socket) {
            this.socket.off('object:deleted', callback);
        }
    }

    getSocket(): Socket | null {
        return this.socket;
    }
}

export const socketService = new SocketService();
