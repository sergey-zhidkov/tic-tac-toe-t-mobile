import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { TileComponent } from './board/tile/tile.component';

import { BoardStateService } from './services/board-state.service';
import { GameManagerService } from './services/game-manager.service';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    BoardStateService,
    GameManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
