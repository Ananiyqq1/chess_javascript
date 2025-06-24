# JavaScript Chess Game

A browser-based chess game that enforces standard chess rules with turn-based play.

## Features

- **Legal move validation** for all pieces
- **Turn alternation** between White and Black
- **Complete ruleset**:
  - Castling (kingside/queenside)
  - En passant captures
  - Pawn promotion
  - Check/checkmate detection
  - Stalemate detection

## How to Play

1. Select a piece (legal moves highlight)
2. Click destination square
3. Game auto-switches turns

## Implementation

- Pure JavaScript (no dependencies)
- Board state tracking
- Move validation engine
- Turn management system

## Rules Enforcement

- Prevents illegal moves
- Handles special cases:
  - Castling rights
  - En passant timing
  - Promotion defaults to Queen
  - Check resolution

## Future Enhancements

- [ ] Chess clock
- [ ] Move undo
- [ ] Game state save/load
- [ ] AI opponent

*Note: Currently supports human vs human play only*
