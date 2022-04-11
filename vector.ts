export abstract class Vector {
  protected oldPosition: Point = null;
  protected id:string;
  
  constructor(
    private direction: IDirection,
    private magnitude: number,
    private position: Point
  ) {}

  move() {}

  setPosition(x: number, y: number) {
    console.log('from:', this.position, ' to: ', { x, y });
    this.oldPosition = { ...this.position };
    this.position.x = x;
    this.position.y = y;
  }

  getPosition() {
    return this.position;
  }

  getDirection() {
    return this.direction;
  }

  setDirection(direction: IDirection) {
    this.direction = direction;
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
