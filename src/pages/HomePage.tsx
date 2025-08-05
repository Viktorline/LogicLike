import { fetchGames, Game } from "@/src/entities/Game";
import {
  extractUniqueTopics,
  filterGamesByTopic,
} from "@/src/shared/utils/filterUtils";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import TopicSelectorPage from "./TopicSelectorPage";

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [allTopics, setAllTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("Все темы");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchGames();
        setGames(data || []);
        setAllTopics(extractUniqueTopics(data || []));
      } catch {
        setError("Ошибка при загрузке");
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, []);

  const filteredGames = useMemo(
    () => filterGamesByTopic(games, selectedTopic),
    [games, selectedTopic]
  );

  const handleTopicPress = useCallback(() => {
    setShowSelector(true);
  }, []);

  const handleTopicSelect = useCallback((topic: string) => {
    setSelectedTopic(topic);
    setShowSelector(false);
  }, []);

  const renderGameItem: ListRenderItem<Game> = useCallback(
    ({ item, index }) => (
      <View
        style={{
          width: moderateScale(210),
          height: moderateScale(210),
          marginRight: moderateScale(8),
          marginLeft: index === 0 ? moderateScale(36) : moderateScale(8),
          borderRadius: moderateScale(24),
          backgroundColor: item.bgColor,
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={{ position: "relative" }}>
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: moderateScale(12),
              alignItems: "center",
              borderBottomLeftRadius: moderateScale(24),
              borderBottomRightRadius: moderateScale(24),
              zIndex: 2,
            }}
          >
            <Text
              style={{
                fontFamily: "Nunito",
                fontWeight: "800",
                fontSize: moderateScale(14),
                color: "#5A5776",
              }}
            >
              {item.name}
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: -moderateScale(6),
              left: 0,
              right: 0,
              height: moderateScale(40),
              backgroundColor: "#E6ECFF",
              borderBottomLeftRadius: moderateScale(24),
              borderBottomRightRadius: moderateScale(24),
              zIndex: 0,
            }}
          />
        </View>
      </View>
    ),
    []
  );

  if (showSelector) {
    return (
      <TopicSelectorPage
        topics={allTopics}
        onTopicSelect={handleTopicSelect}
        onClose={() => setShowSelector(false)}
        selectedTopic={selectedTopic}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: moderateScale(12),
        backgroundColor: "#7446EE",
      }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <TouchableOpacity
          onPress={handleTopicPress}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: 40,
            padding: 10,
            marginBottom: moderateScale(36),
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito",
              fontSize: moderateScale(18),
              color: "white",
            }}
          >
            {selectedTopic}
          </Text>

          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: "#4E2CA9",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Entypo name="chevron-down" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={filteredGames}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGameItem}
        showsHorizontalScrollIndicator={false}
      />

      {loading && <Text>Загрузка...</Text>}
      {error && <Text>Ошибка: {error}</Text>}
    </View>
  );
}
