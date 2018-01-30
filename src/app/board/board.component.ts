import { Component, OnInit } from '@angular/core';

import { BoardStateService, TileState, Row, Tile } from '../services/board-state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private boardStateService: BoardStateService) {

  }

  ngOnInit(): void {
  }

  public changeState(tile: Tile): void {
    console.log(tile);
  }

  private getRows(): Row[] {
    return this.boardStateService.getRows();
  }

}
