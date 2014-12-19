define([], function() {

    return perso = {

        step : {
            x:0,
            y:0.5
        },
        stepSpeed : {
            x:0,
            y:0
        },
        vitesse : {
            x:0,
            y:0
        },
        position : {
            x: $(window).width() * 0.5,
            y: $(window).height() - $('#perso').height()
        },
        jump:0,
        onStep: false,
        alreadyScored:false,
        steppedOn:0,
        scene : window,
        fallen : false,
        $el : $('#perso'),

        init: function () {
            this.position.x = $(window).width() * 0.5;
            this.position.y = $(window).height() - $('#perso').height()
            this.jump = 0;
            this.alreadyScored = false;
            this.steppedOn = 0;
            this.fallen = false;
            console.log('perso inited');


            this.$el.css({
                'top'                   : this.position.y + 'px',
                'left'                  : this.position.x + 'px'
            });

        },

        updateSpeed : function(vitesse){
            // KeyUp ou Leap.tapKey
            this.vitesse.y = vitesse;
        },
        updateDirection : function(vitesse){
            // Left/Right ou Leap.Swipe
            this.vitesse.x  = vitesse
        },
        update: function() {

            // Déplacement personnage

            this.position.x += this.vitesse.x;
            this.position.y += this.vitesse.y;

            this.vitesse.y += this.step.y;
            this.vitesse.x += this.step.x;

            // Collisions avec les murs

            // position.x
            if (this.position.x <= 0) {
                this.position.x = 0;
                // Rebond
                this.vitesse.x = -(this.vitesse.x - this.vitesse.x * .2);
            }

            if (this.position.x >= this.scene.innerWidth - this.$el.width()) {
                this.position.x = this.scene.innerWidth - this.$el.width();
                // Rebond
                this.vitesse.x = -(this.vitesse.x - this.vitesse.x * .2);
            }

            // position.y
            if (this.position.y <= 0) {
                this.position.y = 0;
                // Rebond
                this.vitesse.y = -(this.vitesse.y - this.vitesse.y * .2);
            }


            if (this.position.y >= this.scene.innerHeight - this.$el.height()) {
                if(this.steppedOn==0){
                    this.position.y = this.scene.innerHeight - this.$el.height()-2;  
                }
            }
            if(this.position.y >= this.scene.innerHeight){
                this.fallen=true;
               /* cancelAnimationFrame(anim);

                game.init();
                stepManager.init();
                perso.init();*/
            }


            // Collision avec les marches

            var marche_posX, marche_posY, marche_width, marche_height, perso_posY;

            for (var k = 0; k < stepManager.number; k++){

                perso_posY = this.position.y;

                marche_posX = stepManager.list[k].posX;
                marche_posY = stepManager.list[k].posY;
                marche_width = marche_posX + stepManager.list[k].width;
                marche_height = marche_posY + stepManager.list[k].height;

                /*
                * Detecter une phase de descente
                *
                * Si la position.y + la hauteur du perso est supérieure à la position.y d'une marche
                *
                * Et
                *
                * Si la position.x du perso est comprise entre la position.x d'une marche et la position d'une marche
                * plus sa largeur
                * &&
                * Si la position.y + sa hauteur du perso est inférieure ou égale à la position y d'une marche,
                * alors, le personnage s'arrête sur cette marche */

                if ( this.vitesse.y > 0 ){
                    // Descente du personnage
                    this.onStep=false;
                    if ( (this.position.x + this.$el.width() >= marche_posX
                        && this.position.x <= marche_width)
                        && ( (this.position.y + this.$el.height() >= marche_posY)
                        && (this.position.y + this.$el.height() <= marche_height) )){

                        // Perso posé sur une marche

                        this.updateSpeed(0);
                        this.onStep = true;
                        this.jump = 0;

                        if ( this.onStep == true && this.alreadyScored==false){
                            this.alreadyScored=true;
                            game.score += 10;
                            this.steppedOn+=1;
                        }
                        if(this.steppedOn==1){
                            $('#first-step').fadeOut();
                        }
                    }
                }else{
                    if(!this.onStep){
                        this.alreadyScored=false;
                    }
                    // Saut du personnage

                    // Collision de la tête du personnage avec le bas d'une marche

                    if ( (this.position.x + this.$el.width() >= marche_posX
                        && this.position.x <= marche_width)
                        && ( (this.position.y >= marche_posY)
                        && (this.position.y <= marche_height) )){

                        // Collision
                        this.vitesse.y = -(this.vitesse.y - this.vitesse.y * .2);

                    }
                }
            }

            this.render(this.position);

        },
        render: function (position) {

            this.$el.css({

                'top': position.y + 'px',
                'left': position.x + 'px'

            });


        }




    };


});