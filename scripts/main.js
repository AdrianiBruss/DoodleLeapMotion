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

require(['Leap','game', 'utils', 'raf', 'step', 'perso', 'keyboard'], function(Leap, game, utils, raf, step, perso, KeyboardJS) {
    'use strict';

    function anim(){
        requestAnimationFrame(anim);

        // Updates

        game.update();
        perso.update();


        for ( var i = 0; i < stepManager.number; i++ ){

          stepManager.list[i].update();

        }

        for ( var i = 0; i < stepManager.number; i++ ){

          stepManager.list[i].render();

        }

    }


  /* ---------------------------  KeyBoard ----------------------- */

    KeyboardJS.on('up',function(){


        if ( game.start == true ){

            if (perso.jump < 3){

                perso.updateSpeed(-10);
                perso.jump += 1;

            }

        }else{

            game.start = true;
            requestAnimationFrame(anim);

        }




    }, function(){
      // quand on relache la touche
    });

    KeyboardJS.on('left',function(){

      perso.updateDirection(-4);

    }, function(){
      // quand on relache la touche
    });

    KeyboardJS.on('right',function(){

      perso.updateDirection(4);

    }, function(){
      // quand on relache la touche
    });

    /* ---------------------------  Leap Motion ----------------------- */
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

        if(frame.valid && frame.gestures.length > 0){

            frame.gestures.forEach(function(gesture){

                switch (gesture.type){

                    case "circle":
                        //console.log("Circle Gesture");
                        break;

                    case "keyTap":
                        console.log("Key Tap Gesture");

                        // Essayer de prendre en compte la puissance du tap
                        if (perso.jump < 3){

                          perso.updateSpeed(-10);
                          perso.jump += 1;

                        }

                        break;

                    case "screenTap":
                        //console.log("Screen Tap Gesture");
                        break;

                    case "swipe":
                        //console.log("Swipe Gesture");

                        var swipeDirection;
                        var velocity = gesture.speed / 40;
                        var state = gesture.state;

                        //Classify swipe as either horizontal or vertical
                        var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);

                        //Classify as right-left or up-down
                        if(isHorizontal){

                            if(gesture.direction[0] > 0){

                                if ( state == "start" ){

                                    swipeDirection = "right";
                                    perso.updateDirection(velocity);
                                    console.log(velocity);

                                }

                              //console.log(state);
                              //console.log(velocity);

                            } else {

                              if ( state == "start" ){

                                swipeDirection = "left";
                                perso.updateDirection(-velocity);
                                console.log(velocity);

                              }

                              //swipeDirection = "left";
                              //perso.updateDirection(-velocity);
                              //
                              ////console.log(velocity);
                              //console.log(state);
                            }

                        } else { //vertical

                            if(gesture.direction[1] > 0){

                                swipeDirection = "up";

                            } else {

                                swipeDirection = "down";

                            }

                        }
                        //console.log(swipeDirection);

                      break;

                }

          });

      }

  });

  controller.on('connect', function() {

    console.info('Leap Motion prêt ...');

        // init des élements
        game.init();
        stepManager.init();
        perso.init();

  });

  controller.on('deviceConnected', function() {

    console.info('Leap Motion connecté !');

  });

  controller.on('deviceDisconnected', function() {

    console.warn('Leap Motion déconnecté !');

  });

});