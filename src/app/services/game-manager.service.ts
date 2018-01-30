import { Injectable } from '@angular/core';

@Injectable()
export class GameManagerService {
  private currentPlayer: string;

  constructor() {
    this.currentPlayer = "Player1";
  }

  public getCurrentPlayerName(): string {
    return this.currentPlayer;
  }

  public getHumanName(): string {
    return "Player1";
  }

}
