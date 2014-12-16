define([], function(ctx) {

    return perso = {

         step : {
            x:0,
            y:0.2
        },
        stepSpeed : {
            x:0,
            y:0
        },
        vitesse : {
            x:0,
            y:(Math.random() * -10) - 5
        },
        position : {
            x: 500,
            y: 999
        },
        screen : window,
        $el : $('#perso'),

        init: function () {

            console.log('perso inited');


            this.$el.css({
                'top': this.position.y + 'px',
                'left': this.position.x + 'px'
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

            if (this.position.x <= 0) {
                this.position.x = 0;
                // Rebond
                this.vitesse.x = -(this.vitesse.x - this.vitesse.x * .2);
            }

            if (this.position.y <= 0) {
                this.position.y = 0;
                // Rebond
                this.vitesse.y = -(this.vitesse.y - this.vitesse.y * .2);
            }

            if (this.position.x >= this.screen.innerWidth - this.$el.width()) {
                this.position.x = this.screen.innerWidth - this.$el.width();
                // Rebond
                this.vitesse.x = -(this.vitesse.x - this.vitesse.x * .2);
            }

            if (this.position.y >= this.screen.innerHeight - this.$el.height()) {
                this.position.y = this.screen.innerHeight - this.$el.height()-2;
            }

            // Collision avec les marches

            var $marche = $('.step');
            var marche_posX, marche_posY, marche_width, marche_height, perso_posY;

            for (var k = 0; k < step.number; k++){

                perso_posY = this.position.y;

                marche_posX = $marche.eq(k).position().left;
                marche_posY = $marche.eq(k).position().top;
                marche_width = marche_posX + $marche.width();
                marche_height = marche_posY + $marche.height();

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


                if ( this.vitesse.y > 0  ){
                    // Descente du personnage

                    if ( (this.position.x + this.$el.width() >= marche_posX
                        && this.position.x <= marche_width)
                        && ( (this.position.y + this.$el.height() >= marche_posY)
                        && (this.position.y + this.$el.height() <= marche_height) )){

                        // Perso posé sur une marche

                        this.updateSpeed(0);


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