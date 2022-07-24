<script setup lang="ts">
import { computed } from "vue";

import { Option, type GameTile } from "@/models/GameTile";
import { useGameStore } from "@/stores/game";
import CircleIcon from "@/components/icons/CircleIcon.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";

const store = useGameStore();

const props = defineProps<{
  tile: GameTile;
}>();

const currentIcon = computed(() => {
  if (props.tile.option == Option.Circle) return CircleIcon;
  if (props.tile.option == Option.Cross) return CrossIcon;
  return store.$state.isPlayer1Turn ? CrossIcon : CircleIcon;
});

const currentClass = computed(() => {
  if (props.tile.option == Option.Circle) return "circle-icon";
  if (props.tile.option == Option.Cross) return "cross-icon";
  return "";
});

const selectTileHandle = () => {
  if (store.$state.isPlaying && props.tile.option === Option.NonSelected)
    store.selectTile(props.tile);
};
</script>

<template>
  <div class="square" :class="currentClass" @click="selectTileHandle">
    <component :is="currentIcon" />
  </div>
</template>

<style scoped>
.square {
  border: 5px solid #577590;
  align-items: center;
  border-radius: 20px;
  stroke: transparent;
  cursor: pointer;
  display: flex;
  font-size: 50px;
  justify-content: center;
  margin: 4px;
}

.square:hover > svg {
  stroke: #577590;
}

.square.cross-icon > svg {
  stroke: #f8961e;
}

.square.cross-icon:hover > svg {
  stroke: #f3722c;
}

.square.circle-icon > svg {
  stroke: #90be6d;
}

.square.circle-icon:hover > svg {
  stroke: #43aa8b;
}
</style>
