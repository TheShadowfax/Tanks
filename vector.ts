export abstract class Vector {
  protected oldPosition: Point = null;

  constructor(
    private direction: IDirection,
    private magnitude: number,
    private position: Point
  ) {}

  move() {}

  setPosition(x: number, y: number) {
    this.oldPosition = this.position;
    this.position.x = x;
    this.position.y = y;
  }

  getPosition() {
    return this.position;
  }

  getDirection() {
    return this.direction;
  }

  draw() {}
}

export enum IDirection {
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

export interface Point {
  x: number;
  y: number;
}
