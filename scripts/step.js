define([], function() {

    return stepManager = {

        list    :[],
        number  : 5,
        scene   : window,

        init: function(){

            for(var i = 0; i < this.number; i++){

                var step = {

                    $el     : $('<div class="step"></div>'),
                    width   : 150,
                    height  : 20,
                    posX    : Math.floor((Math.random() * stepManager.scene.innerWidth) + 1),
                    posY    : Math.floor((Math.random() * stepManager.scene.innerHeight) + 1),

                    update  : function(){

                        this.posY += 0.7;

                        // Marches en dehors du jeu
                        if (this.posY >= stepManager.scene.innerHeight){

                            this.posY = Math.floor((Math.random() * 600) + 1);

                        }

                    },

                    render  : function(){

                        this.$el.css({
                            'top'   : this.posY + 'px',
                            'left'  : this.posX + 'px'
                        })

                    }


                };

                step.$el.css({
                    'width' : step.width + 'px',
                    'height': step.height + 'px',
                    'top'   : step.posY + 'px',
                    'left'  : step.posX + 'px'

                });

                this.list.push(step);
                $('#wrapper').append(step.$el);

                console.log('Steps inited');

            }

        }

    }

});