import { Component, OnInit } from '@angular/core';

import { BoardStateService, TileState, Row, Tile } from '../services/board-state.service';
import { GameManagerService } from '../services/game-manager.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private boardStateService: BoardStateService, private gameManagerService: GameManagerService) {

  }

  ngOnInit(): void {
  }

  public changeState(tile: Tile): void {
    this.gameManagerService.tryPlayerMove(tile);
  }

  private getRows(): Row[] {
    return this.boardStateService.getRows();
  }

}
