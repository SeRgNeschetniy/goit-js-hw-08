import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const LOCALSTORAGE_KEY = 'videoplayer-current-time';
const currentTime = load(LOCALSTORAGE_KEY);
console.log(currentTime);

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.setCurrentTime(currentTime === undefined ? 0 : currentTime);

player.on(
  'timeupdate',
  throttle(e => {
    save(LOCALSTORAGE_KEY, e.seconds);
    console.log(e.seconds);
  }, 1000)
);
