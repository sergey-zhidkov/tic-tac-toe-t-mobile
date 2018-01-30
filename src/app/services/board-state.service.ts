import { Injectable } from '@angular/core';

export enum TileState {
  Empty = 0,
  X = 1,
  O = 2
}

export interface Tile {
  state: TileState
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

  private readonly initialState: Tile[];
  private currentState: Tile[];

  constructor() {
    this.rows = 3;
    this.cols = 3;
    this.boardSize = this.rows * this.cols;

    this.initialState = new Array(this.boardSize).fill(TileState.Empty);
    this.resetState();
  }

  public resetState(): void {
    this.currentState = [...this.initialState];
  }

  // public getState(): TileState[] {
  //   return this.currentState.slice();
  // }

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
        row.push(this.getTileByIndex(i, j));
      }
      result.push(row);
    }
    return result;
  }

  private getTileByIndex(i: number, j: number): Tile {
    return this.currentState[i * this.rows + j];
  }

}
