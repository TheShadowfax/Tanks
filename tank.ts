import { Subscription } from 'rxjs';
import { Game } from './game';
import { IDirection, Vector } from './vector';

export class Tank extends Vector {
  private subscriptions = new Subscription();

  move(): void {
    let { x: cx, y: cy } = this.getPosition();
    const availableMoves = Game.getAvailableMoves(cx, cy);

    //no moves available
    if (availableMoves.length === 0) return;

    //check if tank can continue in the same direction
    if (availableMoves.indexOf(this.getDirection()) === -1) {
      const randomMove = Math.floor(Math.random() * availableMoves.length);
      this.setDirection(availableMoves[randomMove]);
    }

    switch (this.getDirection()) {
      case IDirection.RIGHT: {
        this.setPosition((cx + 1) % Game.MAX_CELLS_HORIZONTALLY, cy);
        break;
      }
      case IDirection.LEFT: {
        cx =
          cx === 0
            ? Game.MAX_CELLS_HORIZONTALLY - 1
            : (cx - 1) % Game.MAX_CELLS_HORIZONTALLY;
        this.setPosition(cx, cy);
        break;
      }
      case IDirection.UP: {
        cy = (cy + 1) % Game.MAX_CELLS_VERTICALLY;
        this.setPosition(cx, cy);
        break;
      }
      case IDirection.DOWN: {
        cy =
          cy === 0
            ? Game.MAX_CELLS_VERTICALLY - 1
            : (cy - 1) % Game.MAX_CELLS_VERTICALLY;
        this.setPosition(cx, cy);
        break;
      }
    }
  }

  draw() {
    if (this.oldPosition) {
      document
        .getElementById(`${this.oldPosition.x}x${this.oldPosition.y}`)
        .classList.remove('black', 'occupied');
    }
    document
      .getElementById(`${this.getPosition().x}x${this.getPosition().y}`)
      .classList.add('black', 'occupied');
  }
}
