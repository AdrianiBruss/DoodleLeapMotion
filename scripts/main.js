requirejs.config({
  paths: {
    'Leap': '../lib/leap-0.6.4'
  },
  shim: {
    'Leap': {
      'exports': 'Leap'
    }
  }
});

require(['Leap','utils', 'scene', 'perso'], function(Leap, utils, scene, perso) {
  'use strict';


    //test with mouse

    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };

    function anim(){
        requestAnimationFrame(anim);
        perso.update();
    }

    requestAnimationFrame(anim);


    $('body').on('click', function(){
        perso.updateSpeed((Math.random() * -10) - 5);
        console.log('caca')
    });




  var controller = new Leap.Controller({
    enableGestures: true,
    frameEventName: 'animationFrame'
  });

  controller.connect();


  // ====================
  // CONTROLLER LISTENERS
  // ====================

  var hand, finger;

  controller.on('frame', function(frame) {



    ////effacement du canvas
    //canvas.context.clearRect(0,0, canvas.el.width, canvas.el.height);
    //
    ////Pour chaque main
    //for(var i = 0; i < frame.hands.length; i++){
    //
    //  hand = frame.hands[i];
    //
    //  //Dessin de la paume
    //  var palmPos = utils.LeapToScene(frame, hand.palmPosition);
    //  canvas.context.fillRect(palmPos.x, palmPos.y, 40,40);
    //
    //  //Pour chaque doigt de cette main
    //  for(var j = 0; j < hand.fingers.length; j++){
    //
    //    finger = hand.fingers[j];
    //
    //    //Dessin du bout des doigts
    //    var fingerPos = utils.LeapToScene(frame, finger.tipPosition);
    //    canvas.context.fillRect(fingerPos.x, fingerPos.y, 10, 10);
    //
    //  }

      if(frame.valid && frame.gestures.length > 0){
        frame.gestures.forEach(function(gesture){
          switch (gesture.type){
            case "circle":
              //console.log("Circle Gesture");
              break;
              case "keyTap":
              console.log("Key Tap Gesture");

                // Essayer de prendre en compte la puissance du tap
                perso.updateSpeed((Math.random() * -10) - 5);

              break;
            case "screenTap":
              //console.log("Screen Tap Gesture");
              break;
            case "swipe":
              console.log("Swipe Gesture");
              break;
          }
        });
      }

    //}

    perso.update();

  });

  controller.on('connect', function() {
    console.info('Leap Motion prêt ...');
    scene.init();
    perso.init();
  });

  controller.on('deviceConnected', function() {
    console.info('Leap Motion connecté !');

  });

  controller.on('deviceDisconnected', function() {
    console.warn('Leap Motion déconnecté !');
  });

});