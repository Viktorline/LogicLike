import React, { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  topics: string[];
  onTopicSelect: (topic: string) => void;
}

export default function TopicSelectorPage({ topics, onTopicSelect }: Props) {
  const handleTopicPress = useCallback(
    (topic: string) => () => {
      onTopicSelect(topic);
    },
    [onTopicSelect]
  );

  const renderTopicItem: ListRenderItem<string> = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={handleTopicPress(item)}
        style={{
          borderWidth: 1,
          borderColor: "black",
          padding: 10,
          margin: 5,
        }}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    ),
    [handleTopicPress]
  );

  return (
    <View style={{ flex: 1, padding: 30 }}>
      <Text>Выбор темы</Text>

      <TouchableOpacity
        onPress={handleTopicPress("Все темы")}
        style={{
          borderWidth: 1,
          borderColor: "black",
          padding: 10,
          margin: 5,
        }}
      >
        <Text>Все темы</Text>
      </TouchableOpacity>

      <FlatList
        data={topics}
        keyExtractor={(item) => item}
        renderItem={renderTopicItem}
      />
    </View>
  );
}
