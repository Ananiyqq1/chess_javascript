import React from 'react';
import ChessBoard from './components/ChessBoard';
import GameInfo from './components/GameInfo';
import { useChessGame } from './hooks/useChessGame';

function App() {
  const {
    gameState,
    handleSquareClick,
    isSquareHighlighted,
    isSquareSelected,
    getPieceAt
  } = useChessGame();

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            React Chess Game
          </h1>
          <ChessBoard
            onSquareClick={handleSquareClick}
            isSquareHighlighted={isSquareHighlighted}
            isSquareSelected={isSquareSelected}
            getPieceAt={getPieceAt}
          />
        </div>
        
        <GameInfo gameState={gameState} />
      </div>
    </div>
  );
}

export default App;