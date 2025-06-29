import React from "react";
import Form from "./Form";
import all_constants from "../../../constants";
import { View } from "react-native";
import {
  checkValueIsDefined,
  checkValueNotContainsSpecialChar,
  checkPhoneNumbers,
} from "../../validators/common_validators";
import { checkNumericFormat } from "../../validators/settingsform_validators";
import { callBackendWithFormDataForDelivers } from "../../../api/callBackend";
import CustomAlert from "../../components/CustomAlert";
import { apiBaseUrl } from "../../../env";
import { getDeliveryRadius } from "../../../helpers/toolbox";

export default function SignupForm({ ...props }) {
  const [showAlert, setShowAlert] = React.useState(false);
  const [isRequestOK, setIsRequestOK] = React.useState(false);
  const [item, setItem] = React.useState(null);

  const handleResult = (isRequestSuccessful, itemObject) => {
    setIsRequestOK(isRequestSuccessful);
    setItem(itemObject);
    setShowAlert(true);
  };

  const onConfirmPressedRequestSuccess = () => {
    setShowAlert(false);
    props.navigation.navigate("OTPView", { item: item });
  };

  const onConfirmPressedRequestFailed = () => {
    setShowAlert(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <CustomAlert
          show={showAlert}
          title={
            isRequestOK
              ? all_constants.messages.success.title
              : all_constants.messages.failed.title
          }
          message={
            isRequestOK && all_constants.messages.success.otp_message_signup
          }
          confirmButtonColor={isRequestOK
            ? "green"
            : "red"}
          onConfirmPressed={() => {
            isRequestOK
              ? onConfirmPressedRequestSuccess()
              : onConfirmPressedRequestFailed();
          }}
        />
      </View>

      <View style={{ flex: 2 }}>
        <Form
          action={callBackendWithFormDataForDelivers}
          useApiKey={true}
          url={`${apiBaseUrl}/api/v1/delivers/`}
          method={"POST"}
          navigation={props.navigation}
          afterSubmit={handleResult}
          item={{}}
          fields={{
            firstname: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.firstname,
              placeholder: all_constants.placeholders.form.settings.firstname,
              validators: [
                checkValueIsDefined,
                checkValueNotContainsSpecialChar,
              ],
              maxLength: all_constants.max_length.form.firstname,
            },
            lastname: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.lastname,
              placeholder: all_constants.placeholders.form.settings.lastname,
              validators: [
                checkValueIsDefined,
                checkValueNotContainsSpecialChar,
              ],
              maxLength: all_constants.max_length.form.lastname,
            },
            phone: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.phone,
              placeholder: all_constants.placeholders.form.settings.phone,
              keyboardNumeric: true,
              validators: [checkValueIsDefined, checkNumericFormat],
              maxLength: all_constants.max_length.form.phone,
            },
            phone_confirmation: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.phone_confirmation,
              placeholder: all_constants.placeholders.form.settings.phone,
              keyboardNumeric: true,
              validators: [
                checkValueIsDefined,
                checkNumericFormat,
                checkPhoneNumbers,
              ],
              maxLength: all_constants.max_length.form.phone,
            },
            siret: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.siret,
              placeholder: all_constants.placeholders.form.settings.siret,
              keyboardNumeric: true,
              validators: [checkValueIsDefined, checkNumericFormat],
              maxLength: all_constants.max_length.form.siret,
            },
            town: {
              fieldIsMandatory: true,
              type: all_constants.field_type.autocomplete,
              label: all_constants.label.form.settings.town,
              placeholder: all_constants.placeholders.form.settings.town,
              validators: [checkValueIsDefined],
            },
            delivery_radius: {
              fieldIsMandatory: true,
              type: all_constants.field_type.select,
              label: all_constants.label.form.settings.delivery_radius,
              placeholder:
                all_constants.placeholders.form.settings.delivery_radius,
              validators: [checkValueIsDefined],
              selectValues: getDeliveryRadius(),
            },
          }}
        />
      </View>
    </View>
  );
}
