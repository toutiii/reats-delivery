import { ThemedView } from "@/components/ThemedView";
import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { AlertCircleIcon, CheckIcon, InfoIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from '@/components/ui/vstack';
import React from "react";
import { SafeAreaView } from "react-native";


export default function HomeScreen() {
  const [isInvalid, setIsInvalid] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleSubmit = () => {
    if (inputValue.length < 6) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
  }
  return (
    <ThemedView>
      <SafeAreaView>
        <VStack className="px-5" space='lg'>
          <Text>Hello</Text>
          <Button size="md" variant="solid" action="primary">
            <ButtonText>Hello World!</ButtonText>
          </Button>
          <Heading>I am a Heading</Heading>
          <Center>
            <Text className="font-semibold">Easy</Text>
            <Divider className="my-0.5" />
            <Text className="font-semibold">Difficult</Text>
          </Center>

          <Alert action='info' variant="solid">
            <AlertIcon as={InfoIcon} />
            <AlertText>Description of alert!</AlertText>
          </Alert>

          <Checkbox size="md" isInvalid={false} isDisabled={false} value='true'>
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Test checkbox</CheckboxLabel>
          </Checkbox>

          <VStack className="w-full rounded-md border border-background-200 p-4">
            <FormControl
              isInvalid={isInvalid}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={false}
            >
              <FormControlLabel>
                <FormControlLabelText>My input</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size={'lg'}>
                <InputField
                  type='text'
                  placeholder="placeholder test"
                  value={inputValue}
                  onChangeText={(text) => setInputValue(text)}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText>
                  Must be atleast 6 characters.
                </FormControlHelperText>
              </FormControlHelper>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Atleast 6 characters are required.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <Button className="w-fit self-end mt-4" size="md" onPress={handleSubmit}>
              <ButtonText>Submit</ButtonText>
            </Button>
          </VStack>

          <Text>Phone</Text>
        </VStack>
      </SafeAreaView>
    </ThemedView>
  );
}

