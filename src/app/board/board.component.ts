import { Component, OnInit } from '@angular/core';

import { BoardStateService, TileState, Row } from '../services/board-state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private boardState: TileState[];
  // private cols: number;
  // private rows: number;

  constructor(private boardStateService: BoardStateService) {

  }

  ngOnInit() {
    // this.cols = this.boardStateService.getColNum();
    // this.rows = this.boardStateService.getRowNum();
  }

  private getRows(): Row[] {
    return this.boardStateService.getRows();
  }

}
