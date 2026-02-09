import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { socketService } from '../api/socket';

export const useRealtimeUpdates = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        socketService.connect();

        const handleObjectCreated = (newObject: any) => {
            console.log('Realtime Object Created:', newObject);
            queryClient.setQueryData(['objects'], (old: any[] | undefined) => {
                // Prevent duplicates if already added by mutation
                if (old?.some(obj => obj.id === newObject.id || obj._id === newObject._id)) return old;
                return old ? [newObject, ...old] : [newObject];
            });
        };

        const handleObjectDeleted = (objectId: string) => {
            console.log('Realtime Object Deleted:', objectId);
            queryClient.setQueryData(['objects'], (old: any[] | undefined) => {
                return old ? old.filter(obj => obj.id !== objectId && obj._id !== objectId) : [];
            });
        };

        socketService.onObjectCreated(handleObjectCreated);
        socketService.onObjectDeleted(handleObjectDeleted);

        return () => {
            socketService.offObjectCreated(handleObjectCreated);
            socketService.offObjectDeleted(handleObjectDeleted);
            socketService.disconnect();
        };
    }, [queryClient]);
};
