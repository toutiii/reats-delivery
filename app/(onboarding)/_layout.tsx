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
            headerBackTitle: ' ',
         }}
      >
         <Stack.Screen
            name="index"
            options={{
               title: '',
               headerShown: false,
               headerBackTitle: ' ',
            }}
         />
         {/* <Stack.Screen
            name="login"
            options={{
               title: 'Connexion',
               headerBackTitle: ' ',
            }}
         />
         <Stack.Screen
            name="register"
            options={{
               title: 'Réjoins-nous',
               headerBackTitle: ' ',
            }}
         />
         <Stack.Screen
            name="otp"
            options={{
               title: 'Verify OTP',
               headerBackTitle: ' ',
            }}
         /> */}
      </Stack>
   );
}
