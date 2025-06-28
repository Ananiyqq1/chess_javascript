<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <div class="flex flex-col lg:flex-row gap-8 items-center">
      <div class="flex flex-col items-center">
        <h1 class="text-4xl font-bold text-white mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Vue Chess Game
        </h1>
        <ChessBoard
          :on-square-click="handleSquareClick"
          :is-square-highlighted="isSquareHighlighted"
          :is-square-selected="isSquareSelected"
          :get-piece-at="getPieceAt"
        />
      </div>
      
      <GameInfo :game-state="gameState" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChessBoard from './components/ChessBoard.vue';
import GameInfo from './components/GameInfo.vue';
import { useChessGame } from './composables/useChessGame';

const {
  gameState,
  handleSquareClick,
  isSquareHighlighted,
  isSquareSelected,
  getPieceAt
} = useChessGame();
</script>