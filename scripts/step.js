define([], function(ctx) {

    return step = {

        number : 4,
        posX : 0,
        posY : 0,

        $el: $('.step'),


        init: function(){

            console.log('steps inited');

            for(var i = 0; i < this.number; i++){

                $('#wrapper').append('<div class="step"></div>');

            }

            $.each($('.step'), function(){

                step.posX += Math.floor((Math.random() * 300) + 1);
                step.posY += Math.floor((Math.random() * 400) + 1);

                $(this).css({

                    'top'   : step.posY + 'px',
                    'left'  : step.posX + 'px'

                })

            })

        }


    }

});