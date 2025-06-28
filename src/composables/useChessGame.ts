import { ref, computed } from 'vue';
import { GameState, ChessPiece, Position, PieceColor } from '../types/chess';
import { createInitialPieces, getPieceAt, getValidMoves } from '../utils/gameLogic';
import { positionsEqual } from '../utils/boardUtils';

export const useChessGame = () => {
  const gameState = ref<GameState>({
    pieces: createInitialPieces(),
    currentPlayer: 'white',
    selectedPiece: null,
    validMoves: [],
    gameStatus: 'playing',
    moveHistory: []
  });

  const selectPiece = (piece: ChessPiece | null) => {
    if (!piece || piece.color !== gameState.value.currentPlayer) {
      gameState.value.selectedPiece = null;
      gameState.value.validMoves = [];
      return;
    }

    const validMoves = getValidMoves(piece, gameState.value.pieces);
    gameState.value.selectedPiece = piece;
    gameState.value.validMoves = validMoves;
  };

  const movePiece = (to: Position): boolean => {
    if (!gameState.value.selectedPiece) return false;

    const isValidMove = gameState.value.validMoves.some(move => positionsEqual(move, to));
    if (!isValidMove) return false;

    const newPieces = [...gameState.value.pieces];
    const pieceIndex = newPieces.findIndex(p => p.id === gameState.value.selectedPiece!.id);
    const targetPiece = getPieceAt(newPieces, to);

    // Capture piece if present
    if (targetPiece) {
      const targetIndex = newPieces.findIndex(p => p.id === targetPiece.id);
      newPieces[targetIndex] = { ...targetPiece, captured: true };
    }

    // Move the selected piece
    newPieces[pieceIndex] = {
      ...gameState.value.selectedPiece,
      position: to,
      hasMoved: true
    };

    gameState.value.pieces = newPieces;
    gameState.value.selectedPiece = null;
    gameState.value.validMoves = [];
    gameState.value.currentPlayer = gameState.value.currentPlayer === 'white' ? 'black' : 'white';

    return true;
  };

  const handleSquareClick = (position: Position) => {
    const piece = getPieceAt(gameState.value.pieces, position);
    
    if (gameState.value.selectedPiece) {
      // Try to move to this position
      const moved = movePiece(position);
      if (!moved && piece && piece.color === gameState.value.currentPlayer) {
        // Select the new piece instead
        selectPiece(piece);
      }
    } else {
      // Select piece if it belongs to current player
      selectPiece(piece);
    }
  };

  const isSquareHighlighted = (position: Position): boolean => {
    return gameState.value.validMoves.some(move => positionsEqual(move, position));
  };

  const isSquareSelected = (position: Position): boolean => {
    return gameState.value.selectedPiece ? positionsEqual(gameState.value.selectedPiece.position, position) : false;
  };

  const getPieceAtPosition = (position: Position) => {
    return getPieceAt(gameState.value.pieces, position);
  };

  return {
    gameState: computed(() => gameState.value),
    handleSquareClick,
    isSquareHighlighted,
    isSquareSelected,
    getPieceAt: getPieceAtPosition
  };
};