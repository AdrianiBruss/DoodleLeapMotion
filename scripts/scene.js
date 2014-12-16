define([], function(ctx) {

    return scene = {

        number : 5,
        posX : 0,
        posY : 0,

        $el: $('.marche'),


        init: function(){

            console.log('scene inited');

            for(var i = 0; i < this.number; i++){

                $('#wrapper').append('<div class="marche"></div>');

            }

            $.each($('.marche'), function(){

                scene.posX += Math.floor((Math.random() * 300) + 1);
                scene.posY += Math.floor((Math.random() * 400) + 1);

                $(this).css({

                    'top'   : scene.posY + 'px',
                    'left'  : scene.posX + 'px'

                })

            })

        }


    }

});