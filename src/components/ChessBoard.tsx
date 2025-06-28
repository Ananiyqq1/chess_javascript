import React from 'react';
import { Position } from '../types/chess';
import { getSquareColor } from '../utils/boardUtils';
import ChessSquare from './ChessSquare';

interface ChessBoardProps {
  onSquareClick: (position: Position) => void;
  isSquareHighlighted: (position: Position) => boolean;
  isSquareSelected: (position: Position) => boolean;
  getPieceAt: (position: Position) => any;
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  onSquareClick,
  isSquareHighlighted,
  isSquareSelected,
  getPieceAt
}) => {
  const renderBoard = () => {
    const squares = [];
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const position = { row, col };
        const piece = getPieceAt(position);
        const squareColor = getSquareColor(row, col);
        const isHighlighted = isSquareHighlighted(position);
        const isSelected = isSquareSelected(position);

        squares.push(
          <ChessSquare
            key={`${row}-${col}`}
            position={position}
            piece={piece}
            squareColor={squareColor}
            isHighlighted={isHighlighted}
            isSelected={isSelected}
            onClick={() => onSquareClick(position)}
          />
        );
      }
    }
    
    return squares;
  };

  return (
    <div className="grid grid-cols-8 gap-0 border-4 border-amber-900 rounded-lg overflow-hidden shadow-2xl bg-amber-900">
      {renderBoard()}
    </div>
  );
};

export default ChessBoard;