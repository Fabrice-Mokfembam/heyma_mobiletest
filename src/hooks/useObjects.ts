import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../api/api';
import { CreateObjectRequest } from '../types/object';

export const useObjects = () => {
    return useQuery({
        queryKey: ['objects'],
        queryFn: () => apiService.getObjects(),
        refetchInterval: false, // Ensure we don't spam API since we use sockets
    });
};

export const useObject = (id: string) => {
    return useQuery({
        queryKey: ['object', id],
        queryFn: () => apiService.getObjectById(id),
        enabled: !!id,
    });
};

export const useCreateObject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (objectData: CreateObjectRequest) => apiService.createObject(objectData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['objects'] });
        },
    });
};

export const useDeleteObject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => apiService.deleteObject(id),
        onSuccess: (data, id) => {
            queryClient.invalidateQueries({ queryKey: ['objects'] });
            queryClient.invalidateQueries({ queryKey: ['object', id] });
        }
    });
};
