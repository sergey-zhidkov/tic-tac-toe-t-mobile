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

  /**
   * Translate one dimension array to two dimension
   */
  public getRows(): Tile[][] {
    const result: Tile[][] = [];
    for (let i = 0; i < this.rows; i++) {
      const row: Tile[] = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(this.getTileByRowCol(i, j));
      }
      result.push(row);
    }
    return result;
  }

  private getCols(): Tile[][] {
    const result: Tile[][] = [];
    for (let i = 0; i < this.cols; i++) {
      const row: Tile[] = [];
      for (let j = 0; j < this.rows; j++) {
        row.push(this.getTileByRowCol(j, i));
      }
      result.push(row);
    }
    return result;
  }

  private getDiagonalTopLeft(): Tile[] {
    const result: Tile[] = [];
    for (let i = 0; i < this.boardSize; i = i + this.cols + 1) {
      result.push(this.state[i]);
    }
    return result;
  }

  private getDiagonalTopRight(): Tile[] {
    const result: Tile[] = [];
    for (let i = this.cols - 1; i < this.boardSize - 1; i = i + this.cols - 1) {
      result.push(this.state[i]);
    }
    return result;
  }

  private getTileByRowCol(rowIndex: number, colIndex: number): Tile {
    return this.state[rowIndex * this.rows + colIndex];
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
    if (this.isWinner()) {
      return false;
    }

    return !this.isBoardFull();
  }

  public isBoardFull(): boolean {
    return this.state.filter(tile => tile.getState() === TileState.Empty).length === 0;
  }

  private isWinner(): boolean {
    // 1. Check every row 
    const rows: Tile[][] = this.getRows();
    for (const row of rows) {
      if (!this.containsEmptyTile(row) && this.allValuesAreSame(row)) {
        return true;
      }
    }

    // 2. Check every column
    const cols: Tile[][] = this.getCols();
    for (const col of cols) {
      if (!this.containsEmptyTile(col) && this.allValuesAreSame(col)) {
        return true;
      }
    }

    // 3. Check diagonals
    const diagonalTopLeft: Tile[] = this.getDiagonalTopLeft();
    if (!this.containsEmptyTile(diagonalTopLeft) && this.allValuesAreSame(diagonalTopLeft)) {
      return true;
    }
    const diagonalTopRight: Tile[] = this.getDiagonalTopRight();
    if (!this.containsEmptyTile(diagonalTopRight) && this.allValuesAreSame(diagonalTopRight)) {
      return true;
    }

    return false;
  }

  private containsEmptyTile(arr: Tile[]): boolean {
    return arr.filter(tile => tile.getState() === TileState.Empty).length > 0;
  }

  private allValuesAreSame(arr: Tile[]): boolean {
    return !!arr.reduce((prev: Tile, cur: Tile) => {
      if (prev === null) {
        return null;
      }
      if (prev.getState() === cur.getState()) {
        return prev;
      } else {
        return null;
      }
    });
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
