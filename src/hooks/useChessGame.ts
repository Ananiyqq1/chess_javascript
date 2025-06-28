import { useState, useCallback } from 'react';
import { GameState, ChessPiece, Position, PieceColor } from '../types/chess';
import { createInitialPieces, getPieceAt, getValidMoves } from '../utils/gameLogic';
import { positionsEqual } from '../utils/boardUtils';

export const useChessGame = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    pieces: createInitialPieces(),
    currentPlayer: 'white',
    selectedPiece: null,
    validMoves: [],
    gameStatus: 'playing',
    moveHistory: []
  }));

  const selectPiece = useCallback((piece: ChessPiece | null) => {
    if (!piece || piece.color !== gameState.currentPlayer) {
      setGameState(prev => ({
        ...prev,
        selectedPiece: null,
        validMoves: []
      }));
      return;
    }

    const validMoves = getValidMoves(piece, gameState.pieces);
    setGameState(prev => ({
      ...prev,
      selectedPiece: piece,
      validMoves
    }));
  }, [gameState.currentPlayer, gameState.pieces]);

  const movePiece = useCallback((to: Position) => {
    if (!gameState.selectedPiece) return false;

    const isValidMove = gameState.validMoves.some(move => positionsEqual(move, to));
    if (!isValidMove) return false;

    setGameState(prev => {
      const newPieces = [...prev.pieces];
      const pieceIndex = newPieces.findIndex(p => p.id === prev.selectedPiece!.id);
      const targetPiece = getPieceAt(newPieces, to);

      // Capture piece if present
      if (targetPiece) {
        const targetIndex = newPieces.findIndex(p => p.id === targetPiece.id);
        newPieces[targetIndex] = { ...targetPiece, captured: true };
      }

      // Move the selected piece
      newPieces[pieceIndex] = {
        ...prev.selectedPiece!,
        position: to,
        hasMoved: true
      };

      return {
        ...prev,
        pieces: newPieces,
        selectedPiece: null,
        validMoves: [],
        currentPlayer: prev.currentPlayer === 'white' ? 'black' : 'white'
      };
    });

    return true;
  }, [gameState.selectedPiece, gameState.validMoves]);

  const handleSquareClick = useCallback((position: Position) => {
    const piece = getPieceAt(gameState.pieces, position);
    
    if (gameState.selectedPiece) {
      // Try to move to this position
      const moved = movePiece(position);
      if (!moved && piece && piece.color === gameState.currentPlayer) {
        // Select the new piece instead
        selectPiece(piece);
      }
    } else {
      // Select piece if it belongs to current player
      selectPiece(piece);
    }
  }, [gameState.pieces, gameState.selectedPiece, gameState.currentPlayer, movePiece, selectPiece]);

  const isSquareHighlighted = useCallback((position: Position): boolean => {
    return gameState.validMoves.some(move => positionsEqual(move, position));
  }, [gameState.validMoves]);

  const isSquareSelected = useCallback((position: Position): boolean => {
    return gameState.selectedPiece ? positionsEqual(gameState.selectedPiece.position, position) : false;
  }, [gameState.selectedPiece]);

  return {
    gameState,
    handleSquareClick,
    isSquareHighlighted,
    isSquareSelected,
    getPieceAt: (position: Position) => getPieceAt(gameState.pieces, position)
  };
};