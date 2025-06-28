import { Position } from '../types/chess';

export const isValidPosition = (pos: Position): boolean => {
  return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8;
};

export const positionsEqual = (pos1: Position, pos2: Position): boolean => {
  return pos1.row === pos2.row && pos1.col === pos2.col;
};

export const getSquareColor = (row: number, col: number): 'light' | 'dark' => {
  return (row + col) % 2 === 0 ? 'light' : 'dark';
};

export const getAlgebraicNotation = (pos: Position): string => {
  const files = 'abcdefgh';
  return `${files[pos.col]}${8 - pos.row}`;
};

export const fromAlgebraicNotation = (notation: string): Position => {
  const files = 'abcdefgh';
  const col = files.indexOf(notation[0]);
  const row = 8 - parseInt(notation[1]);
  return { row, col };
};