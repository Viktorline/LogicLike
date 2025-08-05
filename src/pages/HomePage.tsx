import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { fetchGames, Game } from "../entities/Game";
import { extractUniqueTopics, filterGamesByTopic } from "../utils/filterUtils";
import TopicSelectorPage from "./TopicSelectorPage";

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [allTopics, setAllTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("Все темы");
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
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

        const topics = extractUniqueTopics(data || []);
        setAllTopics(topics);
      } catch (error) {
        setError("Ошибка при загрузке");
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, []);

  useEffect(() => {
    const filtered = filterGamesByTopic(games, selectedTopic);
    setFilteredGames(filtered);
  }, [selectedTopic, games]);

  if (showSelector) {
    return (
      <TopicSelectorPage
        topics={allTopics}
        onTopicSelect={(topic) => {
          setSelectedTopic(topic);
          setShowSelector(false);
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setShowSelector(true)}>
        <Text>{selectedTopic}</Text>
      </TouchableOpacity>

      <View>
        <Text>Список игр</Text>
        {filteredGames.map((game) => (
          <View
            key={game.id}
            style={{
              borderWidth: 1,
              borderColor: "black",
              padding: 10,
              margin: 5,
            }}
          >
            <Text style={{ color: "black" }}>{game.name}</Text>
          </View>
        ))}
      </View>

      {loading && <Text>Загрузка...</Text>}
      {error && <Text>Ошибка: {error}</Text>}
    </View>
  );
}
