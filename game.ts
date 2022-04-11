import { Subscription, interval, fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Tank } from './tank';
import { IDirection, Point } from './vector';

export class Game {
  public static MAX_CELLS_HORIZONTALLY;
  public static MAX_CELLS_VERTICALLY;

  private readonly gridContainer = document.getElementById('grid');

  private readonly npcTanks = new Array<Tank>();

  private subscriptions = new Subscription();

  constructor() {}

  public start() {
    this.setUp();
  }

  private setUp() {
    this.drawScreen();
    this.drawGrid();
    this.addNPCTanks();
    this.gameLoop();
  }

  private gameLoop() {
    fromEvent(document, 'keyup')
      .pipe(filter((event) => event && event.key === 'Enter'))
      .subscribe(() => {
        console.log('enter');
        this.npcTanks.forEach((tank) => {
          tank.move();
          tank.draw();
        });
        console.log(this.npcTanks);
      });
    // const sub = interval(500).subscribe(() => {
    //
    // });
    // this.subscriptions.add(sub);
  }

  private drawScreen() {
    const SCREEN_WIDTH = window.screen.availWidth;
    const SCREEN_HEIGHT = window.screen.availHeight;

    const width = this.gridContainer.offsetWidth;
    const height = this.gridContainer.offsetHeight;
    Game.MAX_CELLS_HORIZONTALLY = Math.floor(width / 16);
    Game.MAX_CELLS_VERTICALLY = Math.floor(height / 16);
  }

  private drawGrid() {
    console.time('setup');

    const gridItem = document.createElement('div');
    gridItem.setAttribute('class', 'grid-item');
    const gridRow = document.createElement('div');
    gridRow.setAttribute('class', 'grid-row');
    for (let i = 0; i < Game.MAX_CELLS_HORIZONTALLY; i++) {
      let row = gridRow.cloneNode();
      for (let j = Game.MAX_CELLS_VERTICALLY - 1; j >= 0; j--) {
        gridItem.setAttribute('id', `${i}x${j}`);
        const node = gridItem.cloneNode();
        row.appendChild(node);
      }
      this.gridContainer.appendChild(row);
    }
    console.timeEnd('setup');
  }

  public static getAvailableMoves(x, y) {
    console.log(Game.MAX_CELLS_HORIZONTALLY, Game.MAX_CELLS_VERTICALLY, x, y);
    const availableSlots: IDirection[] = new Array();
    //RIGHT
    if (x < Game.MAX_CELLS_HORIZONTALLY - 1) {
      const item = document.getElementById(`${x + 1}x${y}`);
      if (!item.classList.contains('occupied')) {
        availableSlots.push(IDirection.RIGHT);
      }
    }

    //LEFT
    if (x > 0) {
      const item = document.getElementById(`${x - 1}x${y}`);
      if (!item.classList.contains('occupied')) {
        availableSlots.push(IDirection.LEFT);
      }
    }

    //UP
    if (x > 0 && y > 0) {
      const item = document.getElementById(`${x - 1}x${y - 1}`);
      if (!item.classList.contains('occupied')) {
        availableSlots.push(IDirection.UP);
      }
    }

    //DOWN
    if (
      x < Game.MAX_CELLS_HORIZONTALLY - 1 &&
      y < Game.MAX_CELLS_VERTICALLY - 1
    ) {
      const item = document.getElementById(`${x + 1}x${y + 1}`);
      if (!item.classList.contains('occupied')) {
        availableSlots.push(IDirection.DOWN);
      }
    }

    return availableSlots;
  }

  private addNPCTanks() {
    const numberOfTanks = this.getRandomArbitrary(10, 15);
    const occupiedSlots = new Set<string>();
    occupiedSlots.add('0-0');
    for (let i = 0; i < numberOfTanks; i++) {
      const randomDirection = IDirection[this.getRandomArbitrary(0, 3)];
      let point = null;
      while (true) {
        point = this.getRandomPoint();
        if (!occupiedSlots.has(`${point.x}-${point.y}`)) {
          occupiedSlots.add(`${point.x}-${point.y}`);
          break;
        }
      }

      const tank = new Tank(IDirection[randomDirection], 1, point);
      tank.setId(String(i));
      this.npcTanks.push(tank);
      tank.draw();
    }
    console.log(this.npcTanks);
  }

  private getRandomPoint(): Point {
    let x = this.getRandomArbitrary(0, Game.MAX_CELLS_HORIZONTALLY);
    let y = this.getRandomArbitrary(0, Game.MAX_CELLS_VERTICALLY);
    console.log(x, y);
    return { x, y };
  }

  private getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
