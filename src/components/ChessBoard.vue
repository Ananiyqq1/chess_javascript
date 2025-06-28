<template>
  <div class="grid grid-cols-8 gap-0 border-4 border-amber-900 rounded-lg overflow-hidden shadow-2xl bg-amber-900">
    <ChessSquare
      v-for="(square, index) in squares"
      :key="index"
      :position="square.position"
      :piece="square.piece"
      :square-color="square.squareColor"
      :is-highlighted="square.isHighlighted"
      :is-selected="square.isSelected"
      @click="onSquareClick(square.position)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Position } from '../types/chess';
import { getSquareColor } from '../utils/boardUtils';
import ChessSquare from './ChessSquare.vue';

interface Props {
  onSquareClick: (position: Position) => void;
  isSquareHighlighted: (position: Position) => boolean;
  isSquareSelected: (position: Position) => boolean;
  getPieceAt: (position: Position) => any;
}

const props = defineProps<Props>();

const squares = computed(() => {
  const result = [];
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const position = { row, col };
      const piece = props.getPieceAt(position);
      const squareColor = getSquareColor(row, col);
      const isHighlighted = props.isSquareHighlighted(position);
      const isSelected = props.isSquareSelected(position);

      result.push({
        position,
        piece,
        squareColor,
        isHighlighted,
        isSelected
      });
    }
  }
  
  return result;
});
</script>