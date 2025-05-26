import React from "react";
import { TextInput, TouchableHighlight, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import all_constants from "../../constants";
import CustomAlert from "../components/CustomAlert";
import { getItemFromSecureStore } from "../../helpers/toolbox";
import { apiBaseUrl } from "../../env";
import { callBackEnd } from "../../api/callBackend";
import CustomButton from "../components/CustomButton";
import { ActivityIndicator, Text } from "react-native-paper";
import moment from "moment";
import "moment/locale/fr"; // Import French locale

export default function StatsView() {
    const [
        statsData,
        setStatsData
    ] = React.useState([
    ]);

    const [
        startDate,
        setStartDate
    ] = React.useState("");

    const [
        originalStartDate,
        setOriginalStartDate
    ] = React.useState("");

    const [
        endDate,
        setEndDate
    ] = React.useState("");

    const [
        originalEndDate,
        setOriginalEndDate
    ] = React.useState("");

    const [
        isRequesting,
        setIsRequesting
    ] = React.useState(false);

    const [
        showStartDateMode,
        setShowStartDateMode
    ] = React.useState(false);

    const [
        showEndDateMode,
        setShowEndDateMode
    ] = React.useState(false);

    const [
        showAlert,
        setShowAlert
    ] = React.useState(false);

    const [
        showAlertBothDatesMandatory,
        setShowAlertBothDatesMandatory
    ] =
    React.useState(false);

    const [
        alertMessage,
        setAlertMessage
    ] = React.useState("");

    const onChangeStartDate = (event, selectedDate) => {
        console.log("event: ", event);
        console.log("selectedDate: ", selectedDate);

        const currentDate = selectedDate;
        setShowStartDateMode(false);
        setOriginalStartDate(moment(currentDate).format("YYYY-MM-DD"));
        setStartDate(moment(currentDate).format("dddd DD MMM YYYY"));
    };

    const onChangeEndDate = (event, selectedDate) => {
        console.log("event: ", event);
        console.log("selectedDate: ", selectedDate);

        const currentDate = selectedDate;
        setShowEndDateMode(false);
        setOriginalEndDate(moment(currentDate).format("YYYY-MM-DD"));
        setEndDate(moment(currentDate).format("dddd DD MMM YYYY"));
    };

    async function fetchStatsData() {
        const access = await getItemFromSecureStore("accessTokenForDeliveryApp");
        const baseUrl = `${apiBaseUrl}/api/v1/delivers-stats/`;
        const url =
      baseUrl +
      `?start_date=${encodeURIComponent(originalStartDate)}` +
      `&end_date=${encodeURIComponent(originalEndDate)}`;

        const result = await callBackEnd(new FormData(), url, "GET", access);

        setStatsData(result.data);
        setIsRequesting(false);
    }

    React.useEffect(() => {
        console.log("reload stats screen");
    }, [
        originalStartDate,
        originalEndDate
    ]);

    React.useEffect(() => {
        if (isRequesting) {
            const timer = setTimeout(() => {
                fetchStatsData();
            }, 1000);
            return () => {
                setIsRequesting(false);
                clearTimeout(timer);
            };
        }
    }, [
        isRequesting
    ]);

    function validateBothDatesAreGiven() {
        if (startDate === "" || endDate === "") {
            setShowAlertBothDatesMandatory(true);
        } else {
            setIsRequesting(true);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {showAlert && (
                <CustomAlert
                    show={showAlert}
                    title={all_constants.stats.custom_alerts.title}
                    message={alertMessage}
                    confirmButtonColor={"green"}
                    onConfirmPressed={() => {
                        setShowAlert(false);
                    }}
                />
            )}

            {showStartDateMode && (
                <DateTimePicker
                    testID="datePicker"
                    value={new Date()}
                    mode={"date"}
                    is24Hour={true}
                    onChange={onChangeStartDate}
                />
            )}

            {showEndDateMode && (
                <DateTimePicker
                    testID="datePicker"
                    value={new Date()}
                    mode={"date"}
                    is24Hour={true}
                    onChange={onChangeEndDate}
                />
            )}

            {showAlertBothDatesMandatory && (
                <CustomAlert
                    show={showAlertBothDatesMandatory}
                    title={all_constants.stats.custom_alerts.error_title}
                    message={
                        all_constants.stats.custom_alerts.messages.both_dates_mandatory
                    }
                    confirmButtonColor={"red"}
                    onConfirmPressed={() => {
                        setShowAlertBothDatesMandatory(false);
                    }}
                />
            )}

            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                        }}
                    >
                        <TouchableHighlight
                            onPress={() => {
                                setShowStartDateMode(true);
                            }}
                            underlayColor={all_constants.colors.inputBorderColor}
                        >
                            <MaterialCommunityIcons
                                name="calendar-outline"
                                color={"tomato"}
                                size={40}
                            />
                        </TouchableHighlight>
                    </View>
                    <View
                        style={{
                            flex: 3,
                            marginRight: "5%",
                            borderBottomWidth: 2,
                            borderBottomColor: "tomato",
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: 18,
                                color: "black",
                            }}
                            value={startDate}
                            editable={false}
                            placeholder={all_constants.stats.labels.start}
                        />
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                        }}
                    >
                        <TouchableHighlight
                            onPress={() => {
                                setShowEndDateMode(true);
                            }}
                            underlayColor={all_constants.colors.inputBorderColor}
                        >
                            <MaterialCommunityIcons
                                name="calendar-outline"
                                color={"tomato"}
                                size={40}
                            />
                        </TouchableHighlight>
                    </View>
                    <View
                        style={{
                            flex: 3,
                            marginRight: "5%",
                            borderBottomWidth: 2,
                            borderBottomColor: "tomato",
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: 18,
                                color: "black",
                            }}
                            value={endDate}
                            editable={false}
                            placeholder={all_constants.stats.labels.end}
                        />
                    </View>
                </View>

                <View style={{ flex: 1, alignItems: "center", marginTop: "5%" }}>
                    <CustomButton
                        label={all_constants.messages.submit}
                        height={50}
                        border_width={3}
                        border_radius={30}
                        font_size={18}
                        backgroundColor={"green"}
                        label_color="white"
                        onPress={validateBothDatesAreGiven}
                    />
                </View>
            </View>

            {isRequesting && (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator animating={true} color="tomato" size={"huge"} />
                </View>
            )}

            {!isRequesting && (
                <View style={{ flex: 2, margin: "10%" }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1, borderBottomWidth: 0.3 }}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <TouchableHighlight
                                    onPress={() => {
                                        setAlertMessage(
                                            all_constants.stats.custom_alerts.messages.balance,
                                        );
                                        setShowAlert(true);
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="currency-eur"
                                        color={"black"}
                                        size={40}
                                    />
                                </TouchableHighlight>
                            </View>

                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Text style={{ fontSize: 28, color: "black" }}>
                                    {statsData.length === 0
                                        ? 0
                                        : statsData.total_delivery_fees}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    flex: 1,
                                    borderBottomWidth: 0.3,
                                    borderLeftWidth: 0.3,
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableHighlight
                                        onPress={() => {
                                            setAlertMessage(
                                                all_constants.stats.custom_alerts.messages
                                                    .delivery_count,
                                            );
                                            setShowAlert(true);
                                        }}
                                    >
                                        <MaterialIcons
                                            name="delivery-dining"
                                            color={"black"}
                                            size={50}
                                        />
                                    </TouchableHighlight>
                                </View>

                                <View style={{ flex: 1, alignItems: "center" }}>
                                    <Text style={{ fontSize: 28, color: "black" }}>
                                        {statsData.length === 0
                                            ? 0
                                            : statsData.total_number_of_deliveries}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableHighlight
                                        onPress={() => {
                                            setAlertMessage(
                                                all_constants.stats.custom_alerts.messages
                                                    .delivery_mean_time,
                                            );
                                            setShowAlert(true);
                                        }}
                                    >
                                        <MaterialIcons name="timer" color={"black"} size={50} />
                                    </TouchableHighlight>
                                </View>

                                <View style={{ flex: 1, alignItems: "center" }}>
                                    <Text style={{ fontSize: 28, color: "black" }}>
                                        {statsData.length === 0
                                            ? 0
                                            : statsData.delivery_mean_time / 60}{" "}
                                        {all_constants.stats.custom_alerts.units.minutes}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, borderLeftWidth: 0.3 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableHighlight
                                        onPress={() => {
                                            setAlertMessage(
                                                all_constants.stats.custom_alerts.messages
                                                    .delivery_total_km,
                                            );
                                            setShowAlert(true);
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="road"
                                            color={"black"}
                                            size={50}
                                        />
                                    </TouchableHighlight>
                                </View>

                                <View style={{ flex: 1, alignItems: "center" }}>
                                    <Text style={{ fontSize: 28, color: "black" }}>
                                        {statsData.length === 0
                                            ? 0
                                            : statsData.total_delivery_distance}{" "}
                                        {all_constants.stats.kilometers}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}
