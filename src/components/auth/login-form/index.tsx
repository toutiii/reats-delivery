import SocialAuthButtons from '@/src/components/auth/social-auth-buttons';
import { Button, ButtonText } from '@/src/components/ui/button';
import { VStack } from '@/src/components/ui/vstack';
import { ICountry } from '@/src/shared/interface';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { FormInputControlPhone } from '../../common/form-input-control-phone';
import { Text } from '../../ui/text';

const LoginForm = () => {
   const [phone, setPhone] = useState('');
   const [country, setCountry] = useState<ICountry>({
      calling_codes: [242],
      key: 'FR',
      emoji: '🇫🇷',
      value: 'France',
   });
   const [rememberMe, setRememberMe] = useState(false);

   const {
      control,
      handleSubmit,
      getValues,
      watch,
      setValue,
      formState: { errors },
   } = useForm({
      // resolver: yupResolver(loginValidationSchema),
      defaultValues: {
         phone: '',
      },
   });

   return (
      <VStack className="px-6 flex-1 mt-4" space="lg">
         <FormInputControlPhone
            control={control}
            name="phone"
            error={errors.phone?.message}
            defaultValue={watch('phone')}
            label="Numéro de téléphone"
            placeholder="Entrez votre numéro de téléphone"
            country={country}
            setCountry={setCountry}
            textInfo="Format: +33 6 XX XX XX XX"
            isRequired={true}
         />

         {/* Remember Me & Forgot Password */}
         <View className="flex-row justify-between items-center my-2">
            <TouchableOpacity
               className="flex-row items-center"
               onPress={() => setRememberMe(!rememberMe)}
            >
               <View
                  className={`w-6 h-6 mr-2 rounded items-center justify-center ${rememberMe ? 'bg-green-500' : 'border border-gray-300'}`}
               >
                  {rememberMe && (
                     <Ionicons name="checkmark" size={18} color="white" />
                  )}
               </View>
               <Text className="text-base text-gray-800">
                  Se souvenir de moi
               </Text>
            </TouchableOpacity>

            <TouchableOpacity>
               <Text className="text-base text-gray-500">
                  Mot de passe oublié ?
               </Text>
            </TouchableOpacity>
         </View>

         {/* Login Button */}
         <Button size="xl" className="my-2">
            <ButtonText size="lg">Se connecter</ButtonText>
         </Button>

         {/* Divider */}
         <View className="flex-row items-center my-2">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500">Ou</Text>
            <View className="flex-1 h-px bg-gray-300" />
         </View>

         {/* Social Login Buttons */}
         <SocialAuthButtons />

         {/* Register Link */}
         <View className="flex-row justify-center mt-4">
            <Text className="text-base text-gray-500">
               Vous n'avez pas de compte ?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
               <Text className="text-base text-blue-500">S'inscrire</Text>
            </TouchableOpacity>
         </View>
      </VStack>
   );
};

export default LoginForm;
