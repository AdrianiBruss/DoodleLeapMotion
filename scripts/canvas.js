define([], function() {
  'use strict';

  var canvas  = document.createElement('canvas');
  var context = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'absolute';
  canvas.style.top      = 0;
  canvas.style.right    = 0;
  canvas.style.bottom   = 0;
  canvas.style.left     = 0;
  window.document.body.appendChild(canvas);

  return {

    el      : canvas,
    context : context

  }

});