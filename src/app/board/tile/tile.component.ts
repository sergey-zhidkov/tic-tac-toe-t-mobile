import { Component, OnInit, Input, Output, HostListener, EventEmitter } from '@angular/core';

import { Tile, TileState } from '../../services/board-state.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() public tile: Tile;

  @HostListener('click') onclick() {
    if (this.tile.getState() === TileState.Empty) {
      this.changeStateEvent.emit();
    }
  }

  @Output() public changeStateEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  private getTextColor(): string {
    if (this.tile.getState() === TileState.X) {
      return '#009ACD';
    } else {
      return '#FA8072';
    }
  }

  private getTileText(): string {
    switch (this.tile.getState()) {
      case TileState.Empty: return '';
      case TileState.X: return 'X';
      case TileState.O: return 'O';
    }
    // never should go here
    return '';
  }
}
