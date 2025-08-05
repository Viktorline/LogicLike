import { Ionicons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

interface Props {
  topics: string[];
  onTopicSelect: (topic: string) => void;
  onClose: () => void;
  selectedTopic: string;
}

export default function TopicSelectorPage({
  topics,
  onTopicSelect,
  onClose,
  selectedTopic,
}: Props) {
  const handleTopicPress = useCallback(
    (topic: string) => () => {
      onTopicSelect(topic);
    },
    [onTopicSelect]
  );

  const renderTopicItem: ListRenderItem<string> = useCallback(
    ({ item }) => {
      const isSelected = item === selectedTopic;

      return (
        <TouchableOpacity
          onPress={handleTopicPress(item)}
          style={{
            width: "60%",
            alignSelf: "center",
            backgroundColor: isSelected ? "#5CBB73" : "transparent",
            borderWidth: moderateScale(4),
            borderColor: isSelected ? "#5CBB73" : "#C6D2E1",
            paddingVertical: moderateScale(14),
            paddingHorizontal: moderateScale(20),
            marginBottom: moderateScale(12),
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito",
              fontWeight: "800",
              fontSize: moderateScale(24),
              color: isSelected ? "#fff" : "#39414B",
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      );
    },
    [handleTopicPress, selectedTopic]
  );

  return (
    <View
      style={{
        flex: 1,
        paddingTop: moderateScale(24),
        paddingHorizontal: moderateScale(24),
        backgroundColor: "#fff",
      }}
    >
      <TouchableOpacity
        onPress={onClose}
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          zIndex: 1,
          padding: moderateScale(8),
          borderRadius: moderateScale(4),
        }}
      >
        <Ionicons name="close" size={moderateScale(32)} color="#9FAAC3" />
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: "Nunito",
          fontWeight: "800",
          fontSize: moderateScale(24),
          color: "#39414B",
          textAlign: "center",
          marginBottom: moderateScale(24),
        }}
      >
        Выбор темы
      </Text>

      <FlatList
        data={topics}
        keyExtractor={(item) => item}
        renderItem={renderTopicItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
