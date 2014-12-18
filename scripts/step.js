define([], function() {

    return stepManager = {

        list            : [],
        number          : 5,
        scene           : window,
        firstStep       : {

            $el : $('#first-step')
        },

        init: function(){

            for(var i = 0; i < this.number; i++){

                var step = {

                    $el     : $('<div class="step"></div>'),
                    width   : stepManager.scene.innerWidth * 0.2,
                    height  : 20,
                    posX    : Math.floor((Math.random() * (stepManager.scene.innerWidth - 300))+ 1),
                    posY    : - ((stepManager.scene.innerHeight + 150)/ this.number * i),
                    ratios  : {
                    "10" : 0.175, 
                    "20" : 0.150, 
                    "30" : 0.125, 
                    "40" : 0.1
                    },
                    stepSpeed: 0.9,
                    stepSpeedArray: {
                    "10" : 1, 
                    "20" : 1.1, 
                    "30" : 1.2, 
                    "40" : 1.3
                    },
                    update  : function(){


                        this.posY += this.stepSpeed;

                        // Marches en dehors du jeu
                        if (this.posY >= stepManager.scene.innerHeight){

                            this.posY = 0;

                        }
                        for(var key in this.ratios){
                            if(parseInt(key)==perso.steppedOn){
                                this.width = stepManager.scene.innerWidth * this.ratios[key];
                                this.stepSpeed = this.stepSpeedArray[key];
                            }
                        }

                    },

                    render  : function(){

                        this.$el.css({
                            'top'   : this.posY + 'px',
                            'left'  : this.posX + 'px',
                            'width' : this.width + 'px'
                        })

                    }


                };

                console.log(step.posX);

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