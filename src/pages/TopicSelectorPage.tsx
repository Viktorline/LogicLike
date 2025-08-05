import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

interface Props {
  topics: string[];
  onTopicSelect: (topic: string) => void;
}

export default function TopicSelectorPage({ topics, onTopicSelect }: Props) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text>Выберите тему</Text>

      <TouchableOpacity
        onPress={() => onTopicSelect("Все темы")}
        style={{ borderWidth: 1, borderColor: "black", padding: 10, margin: 5 }}
      >
        <Text>Все темы</Text>
      </TouchableOpacity>

      {topics.map((topic) => (
        <TouchableOpacity
          key={topic}
          onPress={() => onTopicSelect(topic)}
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            margin: 5,
          }}
        >
          <Text>{topic}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
