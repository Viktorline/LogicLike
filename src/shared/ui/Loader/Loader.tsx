import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

export default function FunnyLoader() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#7446EE",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="white" />
      <Text
        style={{
          marginTop: 20,
          color: "white",
          fontSize: moderateScale(32),
          fontWeight: "bold",
        }}
      >
        Загружаем игры...
      </Text>
    </View>
  );
}
