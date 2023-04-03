import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const VIMEO_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.setCurrentTime(JSON.parse(localStorage.getItem(VIMEO_KEY)) || 0);

function savePlaybackPosition(e) {
  localStorage.setItem(VIMEO_KEY, e.seconds);
}

const throttledSavePlaybackPosition = throttle(savePlaybackPosition, 1000);

player.on('timeupdate', function (e) {
  throttledSavePlaybackPosition(e);
});
