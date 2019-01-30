'use strict';

const func = {};

func.getPostBgColor = function(colorBgPosts, color, defaultColor = 'deepgrey') {
  if (colorBgPosts === 'true') {
    if (color) {
      return `bg-${color}`;
    }
    return 'bg-' + randBgColor();
  }
  return 'bg-' + defaultColor;
};

func.randPostThumb = function() {
  const prefix = '/public/images/thumbs/';
  return prefix + randomInt(0, 9) + '.jpg';
};

func.getPostIcon = function(icon) {
  if (icon) {
    return 'bg-ico-' + icon;
  }
  return 'bg-ico-' + randBgIco();
};

function randBgColor() {
  const arr = [ 'blue', 'purple', 'green', 'yellow', 'red', 'orange' ];
  return arr[randomInt(0, 5)];
}

function randBgIco() {
  const arr = [ 'book', 'game', 'note', 'chat', 'code', 'image', 'web', 'link', 'design', 'lock' ];
  return arr[randomInt(0, 9)];
}

function randomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

module.exports = func;
