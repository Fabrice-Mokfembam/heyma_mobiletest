import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { apiService } from '../../src/api/api';

export default function CreateObjectScreen() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

    const mutation = useMutation({
        mutationFn: (data: any) => apiService.createObject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['objects'] });
            Alert.alert('Success', 'Object created successfully');
            setTitle('');
            setDescription('');
            setImage(null);
            router.push('/(tabs)/objects'); // Redirect to list
        },
        onError: (error: any) => {
            Alert.alert('Error', error.message || 'Failed to create object');
        }
    });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const handleSubmit = () => {
        if (!title) return Alert.alert('Error', 'Title is required');

        mutation.mutate({
            title,
            description,
            image: image ? { uri: image.uri, type: 'image/jpeg', name: 'upload.jpg' } : undefined
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Enter title" />

            <Text style={styles.label}>Description</Text>
            <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} placeholder="Enter description" multiline />

            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image.uri }} style={styles.image} />}

            <View style={styles.spacer} />
            <Button title={mutation.isPending ? "Creating..." : "Create Object"} onPress={handleSubmit} disabled={mutation.isPending} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 10,
    },
    spacer: {
        height: 20,
    },
});
