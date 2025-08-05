import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { fetchGames, Game } from "../entities/Game";
import GamesListPage from "../pages/GamesListPage";

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchGames();
        setGames(data || []);
      } catch (error) {
        console.error("Ошибка при загрузке игр:", error);
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, []);

  const handleTopicPress = () => {
    router.push("/topicSelector");
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={handleTopicPress}>
        <Text>Все темы</Text>
      </TouchableOpacity>
      <GamesListPage />
      {loading && <Text>Загрузка...</Text>}
      {error && <Text>Ошибка: {error}</Text>}
      {!loading &&
        !error &&
        games?.map((game) => (
          <Text style={{ color: "black" }} key={game.id}>
            {game.name}
          </Text>
        ))}
    </View>
  );
}
