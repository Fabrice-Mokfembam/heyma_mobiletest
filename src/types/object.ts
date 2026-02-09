export interface Object {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateObjectRequest {
    title: string;
    description?: string;
    image?: any;
}

export interface SocketEvents {
    'object:created': Object;
    'object:deleted': string;
    'object:updated': Object;
}
