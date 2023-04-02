import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

function savePlaybackPosition() {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem('videoplayer-current-time', seconds);
  });
}

const throttledSavePlaybackPosition = throttle(savePlaybackPosition, 1000);

function restorePlaybackPosition() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}

player.on('pause', function () {
  throttledSavePlaybackPosition();
});

player.on('timeupdate', function () {
  throttledSavePlaybackPosition();
});

player.ready().then(function () {
  restorePlaybackPosition();
});
