import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import GamesListPage from "../pages/GamesListPage";

export default function HomePage() {
  const handleTopicPress = () => {
    router.push("/topicSelector");
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={handleTopicPress}>
        <Text>Все темы</Text>
      </TouchableOpacity>
      <GamesListPage />
    </View>
  );
}
