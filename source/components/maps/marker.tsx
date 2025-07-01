import { Feather } from "@expo/vector-icons";
import React, { FC } from "react";
import { View } from "react-native";
import { Marker as AppMarker } from "react-native-maps";
import { Text } from "../ui/text";

type MarkerProps = {
  post: any;
  onSelectedItem: (post: any) => void;
};

const Marker: FC<MarkerProps> = ({ post, onSelectedItem }) => {
  const longitude = post.longitude;
  const latitude = post.latitude;
  return (
    <AppMarker
      coordinate={{
        longitude: longitude
? Number(longitude)
: 0,
        latitude: latitude
? Number(latitude)
: 0,
      }}
      title={post.title}
      description={post.description}
      onPress={() => onSelectedItem(post)}
    >
      <View className="p-4 rounded-full bg-red-500">
        <Text size="xs">
          <Feather name="user" size={16} />
        </Text>
      </View>
    </AppMarker>
  );
};

export default Marker;
