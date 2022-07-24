import type { GameTile } from "@/models/GameTile";

export interface GameStore {
  isPlaying: boolean;
  size: number;
  tiles: GameTile[];
  isPlayer1Turn: boolean;
  result: string;
}
