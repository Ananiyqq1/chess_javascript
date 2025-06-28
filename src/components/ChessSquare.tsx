import React from 'react';
import clsx from 'clsx';
import { ChessPiece, Position } from '../types/chess';
import { getPieceSymbol } from '../utils/pieceSymbols';

interface ChessSquareProps {
  position: Position;
  piece: ChessPiece | null;
  squareColor: 'light' | 'dark';
  isHighlighted: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const ChessSquare: React.FC<ChessSquareProps> = ({
  position,
  piece,
  squareColor,
  isHighlighted,
  isSelected,
  onClick
}) => {
  return (
    <div
      className={clsx(
        'chess-square',
        squareColor,
        {
          'highlighted': isHighlighted,
          'selected': isSelected
        }
      )}
      onClick={onClick}
    >
      {piece && (
        <span className="chess-piece">
          {getPieceSymbol(piece.type, piece.color)}
        </span>
      )}
      {isHighlighted && !piece && (
        <div className="w-4 h-4 bg-emerald-400 rounded-full opacity-70 animate-pulse" />
      )}
    </div>
  );
};

export default ChessSquare;