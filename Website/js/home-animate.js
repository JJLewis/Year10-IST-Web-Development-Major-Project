jQuery(function ($) {
    $(document).ready(function () {
        var body = $('body');
        var list = $('.home-nav');
        var listOfChildren = list.children();

        function show(i) {
            var li = $(listOfChildren.get(i));
            li.animate({opacity:1},750);
        }
        
        function randomNumberInRange(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min; 
        }
        
        function addRowOfRain() {
            var amount = randomNumberInRange(3, 7);
            var bodyWidth = body.width();
            for (var i = 0; i < amount; i++) {
                var size = randomNumberInRange(50, 200);
                var speed = randomNumberInRange(1000, 5000);
                
                var circleStr = '<div class="circle '+size+'"></div>';
                var circle = $(circleStr);
                body.add(circle).appendTo(body);
                
                var left = randomNumberInRange(-50, bodyWidth);
                circle.css('left', left+'px');
                circle.css('height', size+'px');
                circle.css('width', size+'px');
                circle.css('top', -size+'px');
                circle.animate({'top':'100%'}, speed, 'linear', function(){
                    $(this).remove();
                });
            }
            // Log how many circles there are on the screen.
            //var circle = $('.circle');
            //console.log(circle.length);
        }
        
        function delayedLoop(numberOfTimes, delay, action) {
            var i = 0;
            var loop = setInterval(function () {
                action(i);
                if (numberOfTimes > 0) {
                    if (i >= numberOfTimes) {
                        clearInterval(loop);
                    }
                }
                i++;
            }, delay);
        }

        delayedLoop(listOfChildren.length, 100, show);
        delayedLoop(-1, 300, addRowOfRain);
    });
});