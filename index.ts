import { fromEvent, interval } from 'rxjs';
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  tap,
  map,
} from 'rxjs/operators';
import { Game } from './game';
import './style.css';

console.log(window.screen.availHeight, window.screen.availWidth);
const SCREEN_WIDTH = window.screen.availWidth;
const SCREEN_HEIGHT = window.screen.availHeight;

const gridContainer = document.getElementById('grid');
const width = gridContainer.offsetWidth;
const height = gridContainer.offsetHeight;
const nw = Math.floor(width / 16);
const nh = Math.floor(height / 16);
let cx = 0;
let cy = 0;
let currentDirection = 'IDLE';
let track = [[cx, cy]];

const game = new Game();
game.start();

const keyup = fromEvent(document, 'keydown').pipe(
  map((e) => {
    switch (e.key || '') {
      case 'ArrowUp':
        return 'U';
      case 'ArrowDown':
        return 'D';
      case 'ArrowLeft':
        return 'L';
      case 'ArrowRight':
        return 'R';
      default:
        return 'IDLE';
    }
  })
);

const sub = keyup.subscribe((e) => {
  currentDirection = e;
  document.getElementById(`${cx}x${cy}`).classList.remove('black');
  switch (currentDirection) {
    case 'R': {
      cx = (cx + 1) % nw;
      break;
    }
    case 'L': {
      cx = cx === 0 ? nw - 1 : (cx - 1) % nw;
      break;
    }
    case 'U': {
      cy = (cy + 1) % nh;
      break;
    }
    case 'D': {
      cy = cy === 0 ? nh - 1 : (cy - 1) % nh;
      break;
    }
    case 'IDLE':
      break;
  }
  // currentDirection = 'IDLE';
  document.getElementById(`${cx}x${cy}`).classList.add('black');
});

window.onclose = () => {
  sub.unsubscribe();
};
