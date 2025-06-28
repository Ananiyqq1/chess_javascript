<template>
  <div
    :class="[
      'chess-square',
      squareColor,
      {
        'highlighted': isHighlighted,
        'selected': isSelected
      }
    ]"
    @click="$emit('click')"
  >
    <span v-if="piece" class="chess-piece">
      {{ getPieceSymbol(piece.type, piece.color) }}
    </span>
    <div 
      v-if="isHighlighted && !piece" 
      class="w-4 h-4 bg-emerald-400 rounded-full opacity-70 animate-pulse"
    />
  </div>
</template>

<script setup lang="ts">
import { ChessPiece, Position } from '../types/chess';
import { getPieceSymbol } from '../utils/pieceSymbols';

interface Props {
  position: Position;
  piece: ChessPiece | null;
  squareColor: 'light' | 'dark';
  isHighlighted: boolean;
  isSelected: boolean;
}

defineProps<Props>();
defineEmits<{
  click: [];
}>();
</script>