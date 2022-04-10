export class Game {
  public static MAX_CELLS_HORIZONTALLY;
  public static MAX_CELLS_VERTICALLY;

  private readonly gridContainer = document.getElementById('grid');

  constructor() {
  }

  public start() {
    this.setUp(); 
  }

  private setUp() {
    this.drawScreen();
    this.drawGrid();
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
  };
}
