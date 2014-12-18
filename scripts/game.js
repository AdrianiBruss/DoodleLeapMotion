define([], function() {

    return game = {

        start           :   false,
        score           :   0,
        score_el        :   $('#score'),
        scene           :   $('#wrapper'),
        overlay         :   $('#overlay'),
        backgroundY_O   :   0,
        backgroundY     :   0,
        init            :   function(){

            this.score_el.html(this.score);
            this.scene.css({
                'background-position-y': this.backgroundY + 'px'
            });
            this.overlay.css({
                'background-position-y': this.backgroundY_O + 'px'
            })

        },

        update          :   function(){

            this.backgroundY += 0.35;
            this.backgroundY_O += 0.2;


            this.render();
        },

        render          :   function(){

            this.score_el.html(this.score);
            this.scene.css({
                'background-position-y': this.backgroundY + 'px'
            });
            this.overlay.css({
                'background-position-y': this.backgroundY_O + 'px'
            });

        }

    }


});
