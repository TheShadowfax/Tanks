import { Subscription } from 'rxjs';
import { Game } from './game';
import { IDirection, Vector } from './vector';

export class Tank extends Vector {
  private subscriptions = new Subscription();

  move(): void {
    let { x: cx, y: cy } = this.getPosition();
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

  private check4Neighbours() {}

  draw() {
    document
      .getElementById(`${this.oldPosition.x}x${this.oldPosition.y}`)
      .classList.remove('black');
    document
      .getElementById(`${this.getPosition().x}x${this.getPosition().y}`)
      .classList.add('black');
  }
}
