import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRealtimeUpdates } from '../src/hooks/useSocket';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

function App() {
  useRealtimeUpdates(); // Setup socket listeners globally

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="object/[id]" options={{ title: 'Object Details' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
