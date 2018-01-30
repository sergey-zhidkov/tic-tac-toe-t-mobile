import { Component, OnInit, Input, Output, HostListener, EventEmitter } from '@angular/core';

import { Tile, TileState } from '../../services/board-state.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  private value: string;

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

}
