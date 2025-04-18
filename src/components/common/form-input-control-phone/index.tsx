import React, { Fragment, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { ICountry } from '@/src/shared/interface';
import { formatPhoneNumber } from '@/src/utils/formats';
import {
   FormControl,
   FormControlError,
   FormControlErrorIcon,
   FormControlErrorText,
   FormControlHelper,
   FormControlHelperText,
   FormControlLabel,
   FormControlLabelText,
} from '../../ui/form-control';
import { AlertCircleIcon } from '../../ui/icon';
import { Input, InputField, InputSlot } from '../../ui/input';
import { Text } from '../../ui/text';
import ActionsheetCountries from './action-sheet-countries';

type FormInputControlPhoneProps<T extends FieldValues> = {
   label: string;
   error: string | undefined;
   textInfo?: string;
   typeInputField?: 'text' | 'password';
   control: Control<T>;
   name: Path<T>;
   defaultValue: string | null;
   country: ICountry;
   placeholder: string;
   isRequired: boolean;
   setCountry: React.Dispatch<React.SetStateAction<ICountry>>;
};

export const FormInputControlPhone = <T extends FieldValues>({
   label,
   error,
   textInfo,
   typeInputField = 'text',
   control,
   name,
   defaultValue = '',
   country,
   placeholder,
   isRequired,
   setCountry,
}: FormInputControlPhoneProps<T>) => {
   const [showActionsheet, setShowActionsheet] = useState(false);
   const handleClose = () => setShowActionsheet(!showActionsheet);

   return (
      <Fragment>
         <FormControl
            isInvalid={!!error}
            className="min-w-full"
            isRequired={isRequired}
            size="md"
         >
            <FormControlLabel>
               <FormControlLabelText>{label}</FormControlLabelText>
            </FormControlLabel>

            <Controller
               control={control}
               name={name}
               render={({
                  field: { onChange, onBlur },
               }: {
                  field: {
                     onChange: (value: string) => void;
                     onBlur: () => void;
                  };
               }) => (
                  <Input variant="rounded" size={'lg'}>
                     <InputSlot className="pl-4" onPress={() => handleClose()}>
                        <Text>{`${country.emoji}`}</Text>
                     </InputSlot>

                     <InputField
                        keyboardType="phone-pad"
                        placeholder={placeholder}
                        type={typeInputField}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        defaultValue={
                           formatPhoneNumber(
                              defaultValue as string,
                              country.key
                           ).completeInternationalNumber as string
                        }
                     />
                  </Input>
               )}
            />

            {textInfo && (
               <FormControlHelper>
                  <FormControlHelperText>{textInfo}</FormControlHelperText>
               </FormControlHelper>
            )}

            <FormControlError>
               <FormControlErrorIcon as={AlertCircleIcon} />
               <FormControlErrorText>{error}</FormControlErrorText>
            </FormControlError>
         </FormControl>

         <ActionsheetCountries
            showActionsheet={showActionsheet}
            handleClose={handleClose}
            setSelectCountry={setCountry}
         />
      </Fragment>
   );
};
