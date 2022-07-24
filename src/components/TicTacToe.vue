<template>
  <div class="container">
    <header>
      <h1 class="title">Tic tac toe game</h1>
    </header>
    <main class="game">
      <div class="board">
        <game-tile
          v-for="item in tiles"
          :key="`tile-${item.position}`"
          :tile="item"
        ></game-tile>
      </div>
      <div class="players">
        <div class="player-1" :class="{ current: isPlayer1Turn }">Player 1</div>
        <div class="player-2" :class="{ current: !isPlayer1Turn }">
          Player 2
        </div>
      </div>
      <div class="result" v-if="showResult">
        {{ result }}
        <button class="reset-button" @click="resetGameHandle">Reset</button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import GameTile from "@/components/GameTile.vue";

import { useGameStore } from "@/stores/game";
import { storeToRefs } from "pinia";

const store = useGameStore();

store.resetGame();

const { tiles, isPlayer1Turn, showResult, result } = storeToRefs(store);

const resetGameHandle = () => store.resetGame();
</script>

<style>
.container {
  margin: 0 auto;
  width: 500px;
  height: 100vh;
}

header {
  text-align: center;
}

.title {
  font-weight: bolder;
}

.board {
  height: 500px;
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}

.players {
  position: relative;
  margin-top: 10px;
  min-height: 60px;
  width: 100%;
}

.player-1,
.player-2 {
  border: 5px solid #577590;
  border-radius: 20px;
  color: #577590;
  display: block;
  font-size: 2rem;
  text-align: center;
  padding: 5px 0;
  float: left;
  width: 46%;
}

.player-1 {
  margin-right: 4%;
}

.player-1.current {
  color: #f8961e;
  border: 5px solid #f8961e;
}

.player-2.current {
  color: #90be6d;
  border: 5px solid #90be6d;
}

.result {
  color: #577590;
  display: block;
  font-size: 2rem;
  margin: 15px 0;
  text-align: center;
  width: 100%;
}

.reset-button {
  border-radius: 20px;
  background-color: white;
  border: 5px solid #577590;
  color: #577590;
  font-size: 2rem;
  margin: 10px auto;
  padding: 5px 20px;
  display: block;
  text-align: center;
}

.reset-button:hover {
  border: 5px solid #f9c74f;
  color: #f9c74f;
}
</style>
