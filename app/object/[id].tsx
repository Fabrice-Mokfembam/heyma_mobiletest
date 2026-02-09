import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Correct import
import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from 'react-native';
import { apiService } from '../../src/api/api';

export default function ObjectDetailScreen() {
    const router = useRouter(); // Initialize router
    const { id } = useLocalSearchParams();
    const { data: object, isLoading, error } = useQuery({
        queryKey: ['object', id as string],
        queryFn: () => apiService.getObjectById(id as string),
        enabled: !!id,
    });

    if (isLoading) {
        return <ActivityIndicator style={styles.center} size="large" color="#007AFF" />;
    }

    if (error || !object) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Error loading object details: {error?.message}</Text>
                <Button title="Go Back" onPress={() => router.back()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {object.imageUrl ? (
                <Image
                    source={{ uri: object.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : null}
            <View style={styles.details}>
                <Text style={styles.name}>{object.name}</Text>
                {object.description ? (
                    <Text style={styles.description}>{object.description}</Text>
                ) : null}
                <Text style={styles.meta}>Created: {new Date(object.createdAt).toLocaleDateString()}</Text>
                {object.updatedAt && (
                    <Text style={styles.meta}>Updated: {new Date(object.updatedAt).toLocaleDateString()}</Text>
                )}
            </View>
            <View style={styles.footer}>
                <Button title="Go Back" onPress={() => router.back()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300,
        backgroundColor: '#eee',
    },
    details: {
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 20,
    },
    meta: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    footer: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
});
