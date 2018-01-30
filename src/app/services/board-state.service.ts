import { Injectable } from '@angular/core';
import { empty } from 'rxjs/Observer';

export enum TileState {
  Empty = 0,
  X = 1,
  O = 2
}

export class Tile {
  constructor(private index: number, private state: TileState) {
  }

  public getState() {
    return this.state;
  }

  public setState(state: TileState) {
    this.state = state;
  }
}

export interface Row {
  [index: number]: Tile
}

@Injectable()
export class BoardStateService {
  /**
   * Use boardSize == 9 by default (3x3)
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

  // public getRowNum(): number {
  //   return this.rows;
  // }

  // public getColNum(): number {
  //   return this.cols;
  // }

  /**
   * Translate one dimension array to two dimension
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

  public changeTileState(tile: Tile, isComputerTurn: boolean): void {
    if (tile.getState() !== TileState.Empty) {
      console.warn("Tile state should be Empty");
    }

    tile.setState(isComputerTurn ? TileState.O : TileState.X);
  }

  /**
   * Returns true if no winner yet or board is not full.
   */
  public canContinue(): boolean {
    if (this.isBoardFull()) {
      return false;
    }

    return !this.isWinner();
  }

  public isBoardFull(): boolean {
    return this.state.filter(tile => tile.getState() === TileState.Empty).length === 0;
  }

  private isWinner(): boolean {
    return false;
  }

  /**
   * Called on Computer turn. Simplest computer logic.
   */
  public changeRandomTileState(): void {
    const emptyTiles: Tile[] = this.state.filter(tile => tile.getState() === TileState.Empty);
    const randomRange = emptyTiles.length;
    if (randomRange === 0) {
      console.warn("Game should been finished one turn before");
    }

    const randomIndex = Math.floor((Math.random() * 10)) % randomRange;
    this.changeTileState(emptyTiles[randomIndex], true);
  }
}
