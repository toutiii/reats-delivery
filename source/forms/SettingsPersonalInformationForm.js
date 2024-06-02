import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { View } from "react-native";
import {
    checkValueIsDefined,
    checkValueNotContainsSpecialChar,
} from "../validators/common_validators";
import { checkNumericFormat } from "../validators/settingsform_validators";
import { callBackendWithFormDataForDelivers } from "../api/callBackend";
import { apiBaseUrl, port } from "../env";
import { getDeliveryRadius } from "../helpers/toolbox";

export default function SettingsPersonalInformationForm({ ...props }) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 2 }}>
                <Form
                    action={callBackendWithFormDataForDelivers}
                    url={`${apiBaseUrl}:${port}/api/v1/delivers/`}
                    method={"PATCH"}
                    navigation={props.navigation}
                    refreshDataStateChanger={props.route.params.refreshDataStateChanger}
                    item={props.route.params.item}
                    fields={{
                        photo: {
                            type: all_constants.field_type.image,
                            label: all_constants.label.form.settings.image,
                        },
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
                            validators: [
                                checkValueIsDefined,
                                checkNumericFormat
                            ],
                            maxLength: all_constants.max_length.form.phone,
                            isReadOnly: true,
                        },
                        siret: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.siret,
                            placeholder: all_constants.placeholders.form.settings.siret,
                            keyboardNumeric: true,
                            validators: [
                                checkValueIsDefined,
                                checkNumericFormat
                            ],
                            maxLength: all_constants.max_length.form.siret,
                            isReadOnly: true,
                        },
                        town: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.autocomplete,
                            label: all_constants.label.form.settings.town,
                            placeholder: all_constants.placeholders.form.settings.town,
                            validators: [
                                checkValueIsDefined
                            ],
                        },
                        delivery_radius: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.select,
                            label: all_constants.label.form.settings.delivery_radius,
                            placeholder:
                all_constants.placeholders.form.settings.delivery_radius,
                            validators: [
                                checkValueIsDefined
                            ],
                            selectValues: getDeliveryRadius(),
                        },
                    }}
                />
            </View>
        </View>
    );
}
