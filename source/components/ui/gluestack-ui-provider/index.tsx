import React from "react";
import { config } from "./config";
import { View, ViewProps } from "react-native";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { ToastProvider } from "@gluestack-ui/toast";

export type ModeType = "light" | "dark" | "system";

export function GluestackUIProvider({
    mode = "light",
    ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps["style"];
}) {
    return (
        <View
            style={[
                config[mode],
                { flex: 1, height: "100%", width: "100%" },
                props.style,
            ]}
        >
            <OverlayProvider>
                <ToastProvider>{props.children}</ToastProvider>
            </OverlayProvider>
        </View>
    );
}
