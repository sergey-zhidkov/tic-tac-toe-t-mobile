import { Component } from '@angular/core';

import { GameManagerService } from './services/game-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private gameManagerService: GameManagerService) {
  }

  ngOnInit(): void {
    this.gameManagerService.reset();
  }
  
  private getTurnText(): string {
    return this.gameManagerService.getHumanName() === this.gameManagerService.getCurrentPlayerName() ? 
      "Your turn" : "Computer turn";
  }

  private restart(): void {
    this.gameManagerService.reset();
  }
}
