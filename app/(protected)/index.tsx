import { ThemedView } from '@/src/components/themed-view';
import { Alert, AlertIcon, AlertText } from '@/src/components/ui/alert';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Center } from '@/src/components/ui/center';
import {
   Checkbox,
   CheckboxIcon,
   CheckboxIndicator,
   CheckboxLabel,
} from '@/src/components/ui/checkbox';
import { Divider } from '@/src/components/ui/divider';
import {
   FormControl,
   FormControlError,
   FormControlErrorIcon,
   FormControlErrorText,
   FormControlHelper,
   FormControlHelperText,
   FormControlLabel,
   FormControlLabelText,
} from '@/src/components/ui/form-control';
import { Heading } from '@/src/components/ui/heading';
import {
   AddIcon,
   AlertCircleIcon,
   CheckIcon,
   CloseIcon,
   GlobeIcon,
   Icon,
   InfoIcon,
   PlayIcon,
   SettingsIcon,
} from '@/src/components/ui/icon';
import { Input, InputField } from '@/src/components/ui/input';
import { Menu, MenuItem, MenuItemLabel } from '@/src/components/ui/menu';
import {
   Modal,
   ModalBackdrop,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
} from '@/src/components/ui/modal';
import { Text } from '@/src/components/ui/text';
import { VStack } from '@/src/components/ui/vstack';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function HomeScreen() {
   const [isInvalid, setIsInvalid] = React.useState(false);
   const [inputValue, setInputValue] = React.useState('');
   const [showModal, setShowModal] = React.useState(false);

   const handleSubmit = () => {
      if (inputValue.length < 6) {
         setIsInvalid(true);
      } else {
         setIsInvalid(false);
      }
   };
   return (
      <ThemedView>
         <SafeAreaView>
            <VStack className="px-5" space="lg">
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

               <Alert action="info" variant="solid">
                  <AlertIcon as={InfoIcon} />
                  <AlertText>Description of alert!</AlertText>
               </Alert>

               <Checkbox
                  size="md"
                  isInvalid={false}
                  isDisabled={false}
                  value="true"
               >
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
                     <Input className="my-1" size={'lg'} variant="rounded">
                        <InputField
                           type="text"
                           placeholder="placeholder test"
                           value={inputValue}
                           onChangeText={text => setInputValue(text)}
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
                  <Button
                     className="w-fit self-end mt-4"
                     size="md"
                     onPress={handleSubmit}
                  >
                     <ButtonText>Submit</ButtonText>
                  </Button>
               </VStack>
               <Center>
                  <Menu
                     placement="top"
                     offset={5}
                     disabledKeys={['Settings']}
                     trigger={({ ...triggerProps }) => {
                        return (
                           <Button {...triggerProps}>
                              <ButtonText>Menu</ButtonText>
                           </Button>
                        );
                     }}
                  >
                     <MenuItem key="Add account" textValue="Add account">
                        <Icon as={AddIcon} size="sm" className="mr-2" />
                        <MenuItemLabel size="sm">Add account</MenuItemLabel>
                     </MenuItem>
                     <MenuItem key="Community" textValue="Community">
                        <Icon as={GlobeIcon} size="sm" className="mr-2" />
                        <MenuItemLabel size="sm">Community</MenuItemLabel>
                     </MenuItem>
                     <MenuItem key="Plugins" textValue="Plugins">
                        <Icon as={PlayIcon} size="sm" className="mr-2" />
                        <MenuItemLabel size="sm">Plugins</MenuItemLabel>
                     </MenuItem>
                     <MenuItem key="Settings" textValue="Settings">
                        <Icon as={SettingsIcon} size="sm" className="mr-2" />
                        <MenuItemLabel size="sm">Settings</MenuItemLabel>
                     </MenuItem>
                  </Menu>
               </Center>
               <Center>
                  <Button onPress={() => setShowModal(true)}>
                     <ButtonText>Show Modal</ButtonText>
                  </Button>
                  <Modal
                     isOpen={showModal}
                     onClose={() => {
                        setShowModal(false);
                     }}
                     size="md"
                  >
                     <ModalBackdrop />
                     <ModalContent>
                        <ModalHeader>
                           <Heading size="md" className="text-typography-950">
                              Test modal
                           </Heading>
                           <ModalCloseButton>
                              <Icon
                                 as={CloseIcon}
                                 size="md"
                                 className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                              />
                           </ModalCloseButton>
                        </ModalHeader>
                        <ModalBody>
                           <Text size="sm" className="text-typography-500">
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Rem dolores hic voluptatibus
                              dicta aspernatur impedit omnis quia voluptates
                              aliquid, officiis debitis eius doloribus numquam
                              labore odit vero est? Reiciendis, distinctio!
                           </Text>
                        </ModalBody>
                        <ModalFooter>
                           <Button
                              variant="outline"
                              action="secondary"
                              onPress={() => {
                                 setShowModal(false);
                              }}
                           >
                              <ButtonText>Cancel</ButtonText>
                           </Button>
                           <Button
                              onPress={() => {
                                 setShowModal(false);
                              }}
                           >
                              <ButtonText>Explore</ButtonText>
                           </Button>
                        </ModalFooter>
                     </ModalContent>
                  </Modal>
               </Center>
            </VStack>
         </SafeAreaView>
      </ThemedView>
   );
}
