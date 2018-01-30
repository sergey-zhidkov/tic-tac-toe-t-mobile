import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TileState } from '../interface/TileState';

@Injectable()
export class BoardStateService {
  /**
   * Use boardSize = 9 by default (3x3)
   * With this property we can extend our application to support any board size in the future.
   */
  private boardSize: number = 9;

  private readonly initialState: TileState[];
  private currentState: TileState[];

  constructor() {
    this.initialState = new Array(this.boardSize).fill(TileState.Empty);
    this.currentState = [...this.initialState];
  }

}
