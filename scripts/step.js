define([], function() {

    return stepManager = {

        list            : [],
        number          : 5,
        scene           : window,
        scenePart       : window.innerWidth / 3,
        countSteps      : 1,
        firstStep       : {

            $el : $('#first-step')
        },
        updateSteps     : function(that){
            console.log(stepManager.countSteps);

            // Update countStep

            stepManager.countSteps +=1;


            if (stepManager.countSteps > 3){
                stepManager.countSteps = 0;
            }

            if (stepManager.countSteps == 1){
                that.posX = Math.floor( 0 + (1 + (stepManager.scenePart - that.width) - 0) * Math.random());

            }else if (stepManager.countSteps == 2 || stepManager.countSteps == 0){
                that.posX = Math.floor( stepManager.scenePart + ( 1 + (stepManager.scenePart * 2 - that.width) - stepManager.scenePart ) * Math.random());


            }else if (stepManager.countSteps == 3){
                that.posX = Math.floor( stepManager.scenePart * 2 + ( 1 + (stepManager.scene.innerWidth - that.width ) - stepManager.scenePart * 2 ) * Math.random());

            }

            return that.posX;

        },

        init: function(){

            //console.log(Math.floor( stepManager.scenePart * 2 + ( 1 + stepManager.scene.innerWidth - stepManager.scenePart * 2 ) * Math.random()));

            this.list = [];
            if($('.step')){
                this.firstStep.$el.show();
                $('.step').each(function(){
                    $(this).remove();
                })
            }
            for(var i = 0; i < this.number; i++){
                var step = {

                    $el     : $('<div class="step"></div>'),
                    width   : stepManager.scene.innerWidth * 0.3,
                    height  : 20,
                    posX    : stepManager.updateSteps(this),
                    posY    : - ((stepManager.scene.innerHeight + 150)/ this.number * i) + stepManager.scene.innerHeight*.3,
                    ratios  : {
                        "10" : 0.19,
                        "20" : 0.175,
                        "30" : 0.14,
                        "40" : 0.13
                    },
                    stepSpeed: 1.9,
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

                            stepManager.updateSteps(this);


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

                // console.log(step.posX);

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