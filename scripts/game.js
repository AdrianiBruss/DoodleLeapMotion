define([], function() {

    return game = {

        start           :   false,
        score           :   0,
        score_el        :   $('#score'),
        scene           :   $('#wrapper'),
        backgroundY     :   0,
        init            :   function(){

            this.score_el.html(this.score);
            this.scene.css({
                'background-position-y': this.backgroundY + 'px'
            })

        },

        update          :   function(){

            this.backgroundY += 0.35;

            this.render();
        },

        render          :   function(){

            this.score_el.html(this.score);
            this.scene.css({
                'background-position-y': this.backgroundY + 'px'
            })

        }

    }


});
