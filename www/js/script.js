$(function () {

    /**
    * DOM-Objekte werden Variablen zugewiesen.
    */
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');

    /**
    * Dimensionen und zusätzliche Variablen festlegen.
    */
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 10;
    
    /**
    * Deklaration des Anfangszustands.
    */
    var go_up = false;
    var score_updated = false;
    var game_over = false;

    /**
    * Funktion, die das Spiel initialisiert.
    * @param {function} function() - Definiert den Hergang des Spiels und setzt die weiter unten im Code vorhandenen Funktionen ein.
    * @param {int} 40 - Die Funktion soll alle 40 Millisekunden aufgerufen werden.
    */
    var the_game = setInterval(function () {
        
        /**
        * Bei Kollision mit Poles, oberem oder unterem Rand wird das Spiel gestoppt.
        */
        if (collision(bird, pole_1) || collision(bird, pole_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height - bird_height) {

            stop_the_game();
            
        } else {
            /**
            * Bei ausbleibender Kollision werden die Poles wieder nach rechts gesetzt.
            */
            var pole_current_position = parseInt(pole.css('right'));
            
            /**
            * Der Score wird geupdatet, sobald der Vogel erfolgreich an den Poles vorbei ist.
            */
            if (pole_current_position > container_width - bird_left) {
                if (score_updated === false) {
                    score.text(parseInt(score.text()) + 1);
                    score_updated = true;
                }
            }
            
            /**
            * Überprüfung, ob die Poles sich außerhalb des Containers befinden.
            */
            if (pole_current_position > container_width) {
                var new_height = parseInt(Math.random() * 100);

                /**
                * Die Höhe der Poles wird geändert.
                */
                pole_1.css('height', pole_initial_height + new_height);
                pole_2.css('height', pole_initial_height - new_height);

                /**
                * Die Geschwindigkeit der Poles wird erhöht.
                */
                speed = speed + 1;
                speed_span.text(speed);

                score_updated = false;

                pole_current_position = pole_initial_position;
            }

            /**
            * Die Poles bewegen sich von rechts nach links.
            */
            pole.css('right', pole_current_position + speed);

            if (go_up === false) {
                go_down();
            }
        }

    }, 40);

    /**
    * Definiert, wie sich der Vogel nach unten bewegen soll.
    */
    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 5);
    }
    
    /**
    * Definiert, wie sich der Vogel nach oben bewegen soll.
    */
    function up() {
        bird.css('top', parseInt(bird.css('top')) - 10);
    }
    
    /**
    * Definiert, dass der Vogel sich bei längerem Berühren des Displays nach oben bewegt.
    */
    $(document).on('taphold', function(e) {
        var taphold = e.type;
        if (taphold && go_up == false) {
            go_up = setInterval(up, 20);
        } 
    });
    
    /**
    * Verursacht, dass der Vogel sich nach Abheben des Fingers vom Display nicht mehr weiter nach oben bewegt.
    */
    $(document).on('tap', function(e) {
        var tap = e.type;
        if (tap) {
            clearInterval(go_up);
            go_up = false;
        }
    });
    
    /**
    * Definiert, dass der Vogel sich bei längerem Gedrückthalten der linken Maustaste nach oben bewegt.
    */
    $(document).on('mousedown', function (e) {
        var mouse = e.type;
        if (mouse && go_up === false) {
            go_up = setInterval(up, 50);
        }
    });

    /**
    * Verursacht, dass der Vogel sich nach dem Loslassen der linken Maustaste nicht mehr weiter nach oben bewegt.
    */
    $(document).on('mouseup', function (e) {
        var mouse = e.type;
        if (mouse) {
            clearInterval(go_up)
            go_up = false;
        }
    });
    
    /**
    * Funktion zum Beenden des Spiels. 
    */
    function stop_the_game() {
        clearInterval(the_game);
        game_over = true;
        restart_btn.slideDown();
    }
    
    /**
    * Definiert, dass der Restart-Button das Spiel neu lädt.
    */
    restart_btn.click(function () {
        location.reload();
    });
    
    /**
    * Definiert die Kollision des Vogels mit den Poles. Bei Kollision wird "true" zurückgegeben.
    */
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }



});
