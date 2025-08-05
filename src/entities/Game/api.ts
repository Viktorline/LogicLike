import axios from "axios";
import { Game } from "./types";

export const fetchGames = async (): Promise<Game[]> => {
  try {
    const response = await axios.get("https://logiclike.com/docs/courses.json");
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    throw error;
  }
};
