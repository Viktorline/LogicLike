import { fetchGames, Game } from "@/src/entities/Game";
import {
  extractUniqueTopics,
  filterGamesByTopic,
} from "@/src/shared/utils/filterUtils";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
    ({ item }) => (
      <View
        style={{
          borderWidth: 1,
          borderColor: "black",
          padding: 10,
          margin: 5,
        }}
      >
        <Text style={{ color: "black" }}>{item.name}</Text>
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
    <View style={{ flex: 1, padding: 30, backgroundColor: "#7446EE" }}>
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
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito",
              fontSize: 18,
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

      <Text style={{ marginTop: 10, fontWeight: "bold" }}>Список игр</Text>

      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGameItem}
        ListEmptyComponent={
          !loading && !error ? <Text>Нет игр по выбранной теме</Text> : null
        }
      />

      {loading && <Text>Загрузка...</Text>}
      {error && <Text>Ошибка: {error}</Text>}
    </View>
  );
}
