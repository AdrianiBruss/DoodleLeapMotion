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
            this.vitesse.y = vitesse;
        },
        update: function() {

            this.position.x += this.vitesse.x;
            this.position.y += this.vitesse.y;

            this.vitesse.y += this.step.y;

//            this.step.x = this.acceleration;
            //this.step.y = this.acceleration;

//            this.vitesse.x += this.step.x;
            //this.vitesse.y += this.step.y;

//            this.position.x -= this.vitesse.x;
            //this.position.y = this.vitesse.y;


            //if (this.position.x <= 0) {
            //    this.position.x = 0;
            //    this.vitesse.x = -(this.vitesse.x - this.vitesse.x * .2);
            //}

            if (this.position.y <= 0) {
                this.position.y = 0;
                //this.vitesse.y = -(this.vitesse.y - this.vitesse.y * .2);
            }

            //if (this.position.x >= this.screen.width - this.$el.width()) {
            //    this.position.x = this.screen.width - this.$el.width();
            //    this.vitesse.x = -(this.vitesse.x - this.vitesse.x * .2);
            //}

//            console.log(this.screen.height)
            if (this.position.y >= this.screen.innerHeight - this.$el.height()) {

                this.position.y = this.screen.innerHeight - this.$el.height()-2;
                //this.vitesse.y = -(this.vitesse.y - this.vitesse.y * .2);

            }


            this.render(this.position);
//            console.log(this.position)


        },
        render: function (position) {

            this.$el.css({

                'top': position.y + 'px',
                'left': position.x + 'px'

            });


        }




    };


});