import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="objects"
                options={{
                    title: 'Objects',
                    tabBarIcon: ({ color }) => <MaterialIcons name="list" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                    tabBarIcon: ({ color }) => <MaterialIcons name="add" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
