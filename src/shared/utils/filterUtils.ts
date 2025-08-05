import { Game } from "@/src/entities/Game";

export const filterGamesByTopic = (
  games: Game[],
  selectedTopic: string
): Game[] => {
  if (selectedTopic === "Все темы") {
    return games;
  }
  return games.filter((game) => game.tags.includes(selectedTopic));
};

export const extractUniqueTopics = (games: Game[]): string[] => {
  const topics = new Set<string>();
  games.forEach((game) => {
    game.tags.forEach((tag) => topics.add(tag));
  });
  return Array.from(topics);
};
