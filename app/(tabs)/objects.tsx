import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useObjects } from '../../src/hooks/useObjects';

export default function ObjectListScreen() {
    const router = useRouter();
    const { data: objects, isLoading, error, refetch } = useObjects();

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Error loading objects.</Text>
                <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={objects}
                keyExtractor={(item) => item.id || item._id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => router.push(`/object/${item.id || item._id}`)}
                    >
                        {item.imageUrl ? (
                            <Image source={{ uri: item.imageUrl }} style={styles.image} />
                        ) : (
                            <View style={[styles.image, styles.placeholder]} />
                        )}
                        <View style={styles.content}>
                            <Text style={styles.name}>{item.title}</Text>
                            {item.description && <Text style={styles.description} numberOfLines={2}>{item.description}</Text>}
                            <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#eee',
    },
    placeholder: {
        backgroundColor: '#ddd',
    },
    content: {
        padding: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    retryButton: {
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 8,
    },
    retryText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
