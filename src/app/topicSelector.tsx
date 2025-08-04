import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TopicSelectorPage from "../pages/TopicSelectorPage";

export default function TopicSelectorScreen() {
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={handleBack}>
        <Text>Назад</Text>
      </TouchableOpacity>
      <TopicSelectorPage />
    </View>
  );
}
