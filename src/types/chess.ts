export type PieceColor = 'white' | 'black';
export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';

export interface Position {
  row: number;
  col: number;
}

export interface ChessPiece {
  id: string;
  type: PieceType;
  color: PieceColor;
  position: Position;
  hasMoved: boolean;
  captured: boolean;
}

export interface GameState {
  pieces: ChessPiece[];
  currentPlayer: PieceColor;
  selectedPiece: ChessPiece | null;
  validMoves: Position[];
  gameStatus: 'playing' | 'check' | 'checkmate' | 'stalemate';
  moveHistory: Move[];
}

export interface Move {
  piece: ChessPiece;
  from: Position;
  to: Position;
  capturedPiece?: ChessPiece;
  isCheck?: boolean;
  isCheckmate?: boolean;
  isCastle?: boolean;
  isEnPassant?: boolean;
  promotion?: PieceType;
}