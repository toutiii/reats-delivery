import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { ICountry } from "@/types";
import { FormInputControlPhone } from "@/components/common/form-input-control-phone";

const LoginForm = () => {
  const [country, setCountry] = useState<ICountry>({
    calling_codes: [242],
    key: "FR",
    emoji: "🇫🇷",
    value: "France",
  });

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      phone: "",
    },
  });

  return (
    <VStack className="px-6 flex-1 mt-4" space="lg">
      <FormInputControlPhone
        control={control}
        name="phone"
        error={errors.phone?.message}
        defaultValue={watch("phone")}
        label="Numéro de téléphone"
        placeholder="Entrez votre numéro de téléphone"
        country={country}
        setCountry={setCountry}
        textInfo="Format: +33 6 XX XX XX XX"
        isRequired={true}
      />
      <Button size="xl" className="my-2" onPress={() => null}>
        <ButtonText size="lg">Se connecter</ButtonText>
      </Button>

      {/* Divider */}
      <View className="flex-row items-center my-2">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500">Ou</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Register Link */}
      <View className="flex-row justify-center mt-4">
        <Text className="text-base text-gray-500">
          Vous n&lsquo;avez pas de compte ?
        </Text>
        <TouchableOpacity onPress={() => null}>
          <Text className="text-base text-blue-500">S&lsquo;inscrire</Text>
        </TouchableOpacity>
      </View>
    </VStack>
  );
};

export default LoginForm;
