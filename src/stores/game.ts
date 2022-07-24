import { defineStore } from "pinia";

import { type GameTile, Option } from "@/models/GameTile";
import type { GameStore } from "@/models/GameStore";

export const useGameStore = defineStore({
  id: "game",
  state: () =>
    <GameStore>{
      isPlaying: true,
      size: 3,
      tiles: [],
      isPlayer1Turn: true,
      result: "",
    },
  getters: {
    showResult: (state) => !state.isPlaying && state.result.length > 0,
  },
  actions: {
    resetGame() {
      const tiles: GameTile[] = [];
      for (let i = 0; i < this.size * this.size; i++) {
        tiles.push(<GameTile>{
          position: i + 1,
          option: Option.NonSelected,
        });
      }
      this.tiles = [];
      this.tiles.push(...tiles);
      this.isPlaying = true;
      this.result = "";
    },
    selectTile(tile: GameTile) {
      const index = this.tiles.findIndex((x) => x.position === tile.position);
      if (index > -1) {
        this.tiles[index].option = this.isPlayer1Turn
          ? Option.Cross
          : Option.Circle;
        this.checkGameWinner();
        if (this.isPlaying) this.isPlayer1Turn = !this.isPlayer1Turn;
      }
    },
    checkGameWinner() {
      // Convert list to matrix
      const matrix = [];
      for (let index = 0; index < this.size; index++) {
        matrix[index] = [
          ...this.tiles.slice(index * this.size, this.size * (index + 1)),
        ];
      }
      // Check if someone wins!
      const player = this.isPlayer1Turn ? "Player 1" : "Player 2";
      let line: Option[] = [];
      try {
        // Check first diagonal
        line = matrix.map((x, i) => x[i].option);
        if (line.every((x, _, l) => x === l[0] && x !== Option.NonSelected)) {
          throw new Error();
        }
        // Check second diagonal
        line = matrix.map((x, i) => x[this.size - (i + 1)].option);
        if (line.every((x, _, l) => x === l[0] && x !== Option.NonSelected)) {
          throw new Error();
        }
        for (let i = 0; i < this.size; i++) {
          // Check row
          line = matrix[i].map((x) => x.option);
          if (line.every((x, _, l) => x === l[0] && x !== Option.NonSelected)) {
            throw new Error();
          }
          // Check columns
          line = matrix.map((x) => x[i].option);
          if (line.every((x, _, l) => x === l[0] && x !== Option.NonSelected)) {
            throw new Error();
          }
        }
      } catch (error) {
        const text = line[0] === Option.Cross ? "crosses" : "circles";
        this.result = `${player} win with ${text}`;
        this.isPlaying = false;
        return;
      }
    },
  },
});
