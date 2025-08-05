export interface Game {
  id: string;
  name: string;
  tags: string[];
  bgColor: string;
  image: string;
}

export interface GamesResponse {
  games: Game[];
}
