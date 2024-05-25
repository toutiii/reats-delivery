import {
    MaterialCommunityIcons,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
    ActivityIndicator,
    Avatar,
    Drawer,
    Text,
    Title,
    useTheme,
} from "react-native-paper";
import Animated from "react-native-reanimated";
import all_constants from "../constants";
import { getUserSettings } from "../helpers/settings_helpers";

export default function DrawerContent(props) {
    const paperTheme = useTheme();
    const [
        userData,
        getUserData
    ] = React.useState(null);
    const [
        requesting,
        isRequesting
    ] = React.useState(true);

    async function getData() {
        const data = await getUserSettings();
        getUserData(data);
    }

    React.useEffect(() => {
        if (requesting) {
            console.log("Fetching data to feed drawer content");

            getData();
        }

        return () => {
            isRequesting(false);
        };
    }, [
        userData
    ]);

    return (
        <View style={{ flex: 1 }}>
            {requesting
                ? (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <ActivityIndicator animating={true} color="tomato" />
                    </View>
                )
                : (
                    <DrawerContentScrollView {...props}>
                        <Animated.View
                            style={[
                                styles.drawerContent,
                                {
                                    backgroundColor: paperTheme.colors.surface,
                                },
                            ]}
                        >
                            <View style={styles.userInfoSection}>
                                <TouchableOpacity
                                    style={{ marginLeft: 10 }}
                                    onPress={() => {
                                        props.navigation.toggleDrawer();
                                    }}
                                >
                                    <Avatar.Image
                                        source={require("../images/mum_test.jpg")}
                                        size={60}
                                    />
                                </TouchableOpacity>
                                <Title style={styles.title}>
                Bonjour{" "}
                                    {userData["personal_infos_section"]["data"]["firstname"]}
                                </Title>
                            </View>

                            <Drawer.Section style={{ marginTop: "4%", marginRight: 15 }}>
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <Ionicons name="stats-chart" color={color} size={size} />
                                    )}
                                    label={all_constants.drawercontent.stats}
                                    onPress={() => {
                                        props.navigation.navigate("SimpleView");
                                    }}
                                />
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name="account"
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label={all_constants.drawercontent.account}
                                    onPress={() => {
                                        props.navigation.navigate("SimpleView");
                                    }}
                                />
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <MaterialIcons name="history" color={color} size={size} />
                                    )}
                                    label={all_constants.drawercontent.delivery}
                                    onPress={() => {
                                        props.navigation.navigate("SimpleView");
                                    }}
                                />
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name="lock"
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label={all_constants.drawercontent.login}
                                    onPress={() => {
                                        props.navigation.navigate("SimpleView");
                                    }}
                                />
                            </Drawer.Section>
                            <Drawer.Section>
                                <DrawerItem
                                    icon={({ size }) => (
                                        <MaterialCommunityIcons
                                            name="power"
                                            color="red"
                                            size={size}
                                        />
                                    )}
                                    label={() => (
                                        <Text style={{ color: "red", fontWeight: "bold" }}>
                                            {all_constants.drawercontent.logout}
                                        </Text>
                                    )}
                                    onPress={() => {}}
                                />
                            </Drawer.Section>
                        </Animated.View>
                    </DrawerContentScrollView>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 10,
        fontWeight: "bold",
    },
});
