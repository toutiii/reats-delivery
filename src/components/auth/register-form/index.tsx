import SocialAuthButtons from '@/src/components/auth/social-auth-buttons';
import { Button, ButtonText } from '@/src/components/ui/button';
import {
   FormControl,
   FormControlError,
   FormControlErrorIcon,
   FormControlErrorText,
   FormControlLabel,
   FormControlLabelText,
} from '@/src/components/ui/form-control';
import { AlertCircleIcon } from '@/src/components/ui/icon';
import { Input, InputField } from '@/src/components/ui/input';
import { VStack } from '@/src/components/ui/vstack';
import { ICountry } from '@/src/shared/interface';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { FormInputControlPhone } from '../../common/form-input-control-phone';
import { Text } from '../../ui/text';

const RegisterForm = () => {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [phone, setPhone] = useState('');
   const [rememberMe, setRememberMe] = useState(false);
   const [country, setCountry] = useState<ICountry>({
      calling_codes: [242],
      key: 'FR',
      emoji: '🇫🇷',
      value: 'France',
   });

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
      <VStack className="px-6 flex-1" space="lg">
         {/* Prénom Input */}
         <View>
            <FormControl
               isInvalid={false}
               size="md"
               isDisabled={false}
               isReadOnly={false}
               isRequired={true}
            >
               <FormControlLabel>
                  <FormControlLabelText>Prénom</FormControlLabelText>
               </FormControlLabel>
               <Input className="my-1" size={'lg'} variant="rounded">
                  <InputField
                     type="text"
                     placeholder="Entrez votre prénom"
                     value={firstName}
                     onChangeText={setFirstName}
                  />
               </Input>
               <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                     Le prénom est requis.
                  </FormControlErrorText>
               </FormControlError>
            </FormControl>
         </View>

         {/* Nom Input */}
         <View>
            <FormControl
               isInvalid={false}
               size="md"
               isDisabled={false}
               isReadOnly={false}
               isRequired={true}
            >
               <FormControlLabel>
                  <FormControlLabelText>Nom</FormControlLabelText>
               </FormControlLabel>
               <Input className="my-1" size={'lg'} variant="rounded">
                  <InputField
                     type="text"
                     placeholder="Entrez votre nom"
                     value={lastName}
                     onChangeText={setLastName}
                  />
               </Input>
               <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                     Le nom est requis.
                  </FormControlErrorText>
               </FormControlError>
            </FormControl>
         </View>

         {/* Téléphone Input */}
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
               <Text className="text-base text-gray-800">Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
               <Text className="text-base text-gray-500">Forgot password?</Text>
            </TouchableOpacity>
         </View>

         {/* Register Button */}
         <Button size="xl" className="my-2">
            <ButtonText size="lg">S'inscrire</ButtonText>
         </Button>

         {/* Divider */}
         <View className="flex-row items-center my-2">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500">Ou</Text>
            <View className="flex-1 h-px bg-gray-300" />
         </View>

         {/* Social Register Buttons */}
         <SocialAuthButtons />

         {/* Login Link */}
         <View className="flex-row justify-center mt-4">
            <Text className="text-base text-gray-500">
               Vous avez déjà un compte?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
               <Text className="text-base text-blue-500">Se connecter</Text>
            </TouchableOpacity>
         </View>
      </VStack>
   );
};

export default RegisterForm;
