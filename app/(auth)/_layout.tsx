import { Stack } from 'expo-router';
export default function AuthLayout() {
   return (
      <Stack
         screenOptions={{
            headerStyle: {
               backgroundColor: '#FF6347',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
               fontWeight: 'bold',
            },
            title: '',
            headerShadowVisible: false,
         }}
      >
         <Stack.Screen
            name="index"
            options={{
               title: '',
               headerShown: false,
            }}
         />
         <Stack.Screen
            name="login"
            options={{
               title: 'Connexion',
            }}
         />
         <Stack.Screen
            name="register"
            options={{
               title: '',
            }}
         />
      </Stack>
   );
}
