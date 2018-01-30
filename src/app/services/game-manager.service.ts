import { Injectable } from '@angular/core';

import { BoardStateService, Tile } from './board-state.service';
import { setTimeout } from 'timers';

@Injectable()
export class GameManagerService {
  private currentPlayer: string;
  private isComputerTurn: boolean;
  private lastWinner: string;
  private isFinished: boolean;

  constructor(private boardStateService: BoardStateService) {
    this.lastWinner = '';
    this.reset();
  }

  public getCurrentPlayerName(): string {
    return this.currentPlayer;
  }

  public getHumanName(): string {
    return "Player1";
  }

  public hasWinner(): boolean {
    return this.isFinished;
  }

  public winnerName(): string {
    return this.lastWinner;
  }

  /**
   * Reset state to initial.
   */
  public reset(): void {
    this.currentPlayer = "Player1";
    this.isFinished = false;
    // Player always start fist for simplicity
    this.isComputerTurn = false;
    this.boardStateService.resetState();
  }

  public tryPlayerMove(tile: Tile): void {
    if (this.isComputerTurn || this.isFinished) {
      return;
    }

    this.currentPlayer = this.getHumanName();
    this.boardStateService.changeTileState(tile, false);
    if (!this.boardStateService.canContinue()) {
      this.finishGame();
    } else {
      this.computerMove();
    }
  }

  private computerMove(): void {
    this.isComputerTurn = true;
    this.currentPlayer = "Computer";

    // Make 1 sec delay on Bot turn
    setTimeout(() => {
      this.boardStateService.changeRandomTileState();
      this.isComputerTurn = false;
      if (!this.boardStateService.canContinue()) {
        this.finishGame();
      }
    }, 1000);
  }

  private finishGame(): void {
    this.isFinished = true;
    if (this.boardStateService.isBoardFull()) {
      this.lastWinner = '';
    } else {
      this.lastWinner = this.currentPlayer;
    }
  }
}
