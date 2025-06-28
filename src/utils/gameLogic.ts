import { ChessPiece, Position, PieceColor, PieceType, GameState } from '../types/chess';
import { isValidPosition, positionsEqual } from './boardUtils';

export const createInitialPieces = (): ChessPiece[] => {
  const pieces: ChessPiece[] = [];
  
  // Helper function to create a piece
  const createPiece = (type: PieceType, color: PieceColor, row: number, col: number, id: string): ChessPiece => ({
    id,
    type,
    color,
    position: { row, col },
    hasMoved: false,
    captured: false
  });

  // White pieces
  pieces.push(createPiece('rook', 'white', 7, 0, 'w_rook1'));
  pieces.push(createPiece('knight', 'white', 7, 1, 'w_knight1'));
  pieces.push(createPiece('bishop', 'white', 7, 2, 'w_bishop1'));
  pieces.push(createPiece('queen', 'white', 7, 3, 'w_queen'));
  pieces.push(createPiece('king', 'white', 7, 4, 'w_king'));
  pieces.push(createPiece('bishop', 'white', 7, 5, 'w_bishop2'));
  pieces.push(createPiece('knight', 'white', 7, 6, 'w_knight2'));
  pieces.push(createPiece('rook', 'white', 7, 7, 'w_rook2'));
  
  for (let i = 0; i < 8; i++) {
    pieces.push(createPiece('pawn', 'white', 6, i, `w_pawn${i + 1}`));
  }

  // Black pieces
  pieces.push(createPiece('rook', 'black', 0, 0, 'b_rook1'));
  pieces.push(createPiece('knight', 'black', 0, 1, 'b_knight1'));
  pieces.push(createPiece('bishop', 'black', 0, 2, 'b_bishop1'));
  pieces.push(createPiece('queen', 'black', 0, 3, 'b_queen'));
  pieces.push(createPiece('king', 'black', 0, 4, 'b_king'));
  pieces.push(createPiece('bishop', 'black', 0, 5, 'b_bishop2'));
  pieces.push(createPiece('knight', 'black', 0, 6, 'b_knight2'));
  pieces.push(createPiece('rook', 'black', 0, 7, 'b_rook2'));
  
  for (let i = 0; i < 8; i++) {
    pieces.push(createPiece('pawn', 'black', 1, i, `b_pawn${i + 1}`));
  }

  return pieces;
};

export const getPieceAt = (pieces: ChessPiece[], position: Position): ChessPiece | null => {
  return pieces.find(piece => 
    !piece.captured && positionsEqual(piece.position, position)
  ) || null;
};

export const getValidMoves = (piece: ChessPiece, pieces: ChessPiece[]): Position[] => {
  const moves: Position[] = [];
  const { type, color, position } = piece;

  switch (type) {
    case 'pawn':
      moves.push(...getPawnMoves(piece, pieces));
      break;
    case 'rook':
      moves.push(...getRookMoves(position, pieces, color));
      break;
    case 'bishop':
      moves.push(...getBishopMoves(position, pieces, color));
      break;
    case 'queen':
      moves.push(...getQueenMoves(position, pieces, color));
      break;
    case 'king':
      moves.push(...getKingMoves(piece, pieces));
      break;
    case 'knight':
      moves.push(...getKnightMoves(position, pieces, color));
      break;
  }

  return moves;
};

const getPawnMoves = (piece: ChessPiece, pieces: ChessPiece[]): Position[] => {
  const moves: Position[] = [];
  const { color, position, hasMoved } = piece;
  const direction = color === 'white' ? -1 : 1;
  const startRow = color === 'white' ? 6 : 1;

  // Forward moves
  const oneForward = { row: position.row + direction, col: position.col };
  if (isValidPosition(oneForward) && !getPieceAt(pieces, oneForward)) {
    moves.push(oneForward);

    // Two squares forward from starting position
    if (!hasMoved) {
      const twoForward = { row: position.row + 2 * direction, col: position.col };
      if (isValidPosition(twoForward) && !getPieceAt(pieces, twoForward)) {
        moves.push(twoForward);
      }
    }
  }

  // Diagonal captures
  const captureLeft = { row: position.row + direction, col: position.col - 1 };
  const captureRight = { row: position.row + direction, col: position.col + 1 };

  [captureLeft, captureRight].forEach(capturePos => {
    if (isValidPosition(capturePos)) {
      const targetPiece = getPieceAt(pieces, capturePos);
      if (targetPiece && targetPiece.color !== color) {
        moves.push(capturePos);
      }
    }
  });

  return moves;
};

const getRookMoves = (position: Position, pieces: ChessPiece[], color: PieceColor): Position[] => {
  const moves: Position[] = [];
  const directions = [
    { row: 0, col: 1 },   // Right
    { row: 0, col: -1 },  // Left
    { row: 1, col: 0 },   // Down
    { row: -1, col: 0 }   // Up
  ];

  directions.forEach(direction => {
    moves.push(...getLinearMoves(position, direction, pieces, color));
  });

  return moves;
};

const getBishopMoves = (position: Position, pieces: ChessPiece[], color: PieceColor): Position[] => {
  const moves: Position[] = [];
  const directions = [
    { row: 1, col: 1 },   // Down-right
    { row: 1, col: -1 },  // Down-left
    { row: -1, col: 1 },  // Up-right
    { row: -1, col: -1 }  // Up-left
  ];

  directions.forEach(direction => {
    moves.push(...getLinearMoves(position, direction, pieces, color));
  });

  return moves;
};

const getQueenMoves = (position: Position, pieces: ChessPiece[], color: PieceColor): Position[] => {
  return [
    ...getRookMoves(position, pieces, color),
    ...getBishopMoves(position, pieces, color)
  ];
};

const getKingMoves = (piece: ChessPiece, pieces: ChessPiece[]): Position[] => {
  const moves: Position[] = [];
  const { position, color } = piece;
  
  const directions = [
    { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
    { row: 0, col: -1 },                       { row: 0, col: 1 },
    { row: 1, col: -1 },  { row: 1, col: 0 },  { row: 1, col: 1 }
  ];

  directions.forEach(direction => {
    const newPos = {
      row: position.row + direction.row,
      col: position.col + direction.col
    };

    if (isValidPosition(newPos)) {
      const targetPiece = getPieceAt(pieces, newPos);
      if (!targetPiece || targetPiece.color !== color) {
        moves.push(newPos);
      }
    }
  });

  // Castling logic would go here
  return moves;
};

const getKnightMoves = (position: Position, pieces: ChessPiece[], color: PieceColor): Position[] => {
  const moves: Position[] = [];
  const knightMoves = [
    { row: -2, col: -1 }, { row: -2, col: 1 },
    { row: -1, col: -2 }, { row: -1, col: 2 },
    { row: 1, col: -2 },  { row: 1, col: 2 },
    { row: 2, col: -1 },  { row: 2, col: 1 }
  ];

  knightMoves.forEach(move => {
    const newPos = {
      row: position.row + move.row,
      col: position.col + move.col
    };

    if (isValidPosition(newPos)) {
      const targetPiece = getPieceAt(pieces, newPos);
      if (!targetPiece || targetPiece.color !== color) {
        moves.push(newPos);
      }
    }
  });

  return moves;
};

const getLinearMoves = (
  position: Position,
  direction: { row: number; col: number },
  pieces: ChessPiece[],
  color: PieceColor
): Position[] => {
  const moves: Position[] = [];
  let currentPos = {
    row: position.row + direction.row,
    col: position.col + direction.col
  };

  while (isValidPosition(currentPos)) {
    const targetPiece = getPieceAt(pieces, currentPos);
    
    if (!targetPiece) {
      moves.push({ ...currentPos });
    } else {
      if (targetPiece.color !== color) {
        moves.push({ ...currentPos });
      }
      break; // Stop when we hit any piece
    }

    currentPos.row += direction.row;
    currentPos.col += direction.col;
  }

  return moves;
};