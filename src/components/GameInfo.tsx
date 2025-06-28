import React from 'react';
import { GameState } from '../types/chess';

interface GameInfoProps {
  gameState: GameState;
}

const GameInfo: React.FC<GameInfoProps> = ({ gameState }) => {
  const currentPlayerDisplay = gameState.currentPlayer === 'white' ? 'White' : 'Black';
  
  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-slate-600/30">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Chess Game
      </h2>
      
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-lg text-slate-300 mb-2">Current Turn</div>
          <div className={clsx(
            "text-2xl font-bold px-4 py-2 rounded-lg transition-all duration-500",
            gameState.currentPlayer === 'white' 
              ? "bg-white text-black shadow-lg shadow-white/30" 
              : "bg-slate-900 text-white shadow-lg shadow-slate-900/30"
          )}>
            {currentPlayerDisplay}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-lg text-slate-300 mb-2">Game Status</div>
          <div className="text-xl font-semibold text-emerald-400 capitalize">
            {gameState.gameStatus}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-lg text-slate-300 mb-2">Moves</div>
          <div className="text-xl font-semibold text-blue-400">
            {gameState.moveHistory.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;