import { Injectable } from '@angular/core';

export enum TileState {
  Empty = 0,
  X = 1,
  O = 2
}

export class Tile {
  private state: TileState;
  private index: number;

  constructor(index: number, state: TileState) {
    this.index = index;
    this.state = state;
  }

  public getState() {
    return this.state;
  }
}

export interface Row {
  [index: number]: Tile
}

@Injectable()
export class BoardStateService {
  /**
   * Use boardSize = 9 by default (3x3)
   * With this property we can extend our application to support any board size in the future.
   */
  private rows: number;
  private cols: number;
  private boardSize: number;

  private state: Tile[];

  constructor() {
    this.rows = 3;
    this.cols = 3;
    this.boardSize = this.rows * this.cols;
    this.resetState();
  }

  public resetState(): void {
    this.state = new Array(this.boardSize);
    for (let i = 0; i < this.state.length; i++) {
      this.state[i] = new Tile(i, TileState.Empty);
    }
  }

  public getRowNum(): number {
    return this.rows;
  }

  public getColNum(): number {
    return this.cols;
  }

  /**
   * Translate one dimension array to two dimensions
   */
  public getRows(): Row[] {
    const result: Row[] = [];
    for (let i = 0; i < this.rows; i++) {
      const row: Tile[] = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(this.getTileByRowCol(i, j));
      }
      result.push(row);
    }
    return result;
  }

  private getTileByRowCol(i: number, j: number): Tile {
    return this.state[i * this.rows + j];
  }

}
