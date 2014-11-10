jQuery(function ($) {
    
    var dragContent = null;
    var answers = {"volatile":["RAM","Cache"],"non-volatile":["SSD","HDD","USB","ROM"],"primary":["RAM","Cache","ROM"],"secondary":["SSD","HDD"]};
    
    $(document).ready(function () {
        $('.draggable p img').elevateZoom({zoomEnabled:false}); // Disable Elevate Zoom
    });
    
    function handleDragStart(e) {
        this.style.opacity = '0.4';  // this / e.target is the source node.
        
        dragContent = this.getElementsByTagName('h1')[0].innerHTML;
    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
      }
      e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
      return false;
    }

    function handleDragEnter(e) {
        // this / e.target is the current hover target.
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');  // this / e.target is previous target element.
    }
    
    function destinationError(obj, message) {
        var destination = obj;
        destination.css('background-color', '#ff0000');
        setTimeout(function () {destination.css('background-color', '#f6f6f6'); alert(message);}, 150);
    }
    
    function handleDrop(e) {
        // this / e.target is current target element.

        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }
        
        var div = $('<div id="'+dragContent+'" class="row"><h2>'+dragContent+'</h2><a style="position: relative; top: -23px; left: 125px;" class="cancel">X</a></div>');
        div.children('a').click(function () {$(this).parent().remove();});
        var objectToAdd = div;

        var check = $($(this).children('#'+dragContent)).length;
        if (check == 0) { // If does not exist
            if ($(this).children().length <= answers[this.id].length) {
                $(this).add(objectToAdd).appendTo($(this));
            } else {
                destinationError($(this), "The "+this.id+" section has reached its limit of "+answers[this.id].length+" objects.");
            }
        } else {
            destinationError($(this), dragContent+" already exists in the "+this.id+" section.");
        }

        // See the section on the DataTransfer object.
        return false;
    }
    
    function handleDragEnd(e) {
        // this/e.target is the source node.
        this.style.opacity = '1';
        [].forEach.call(destinations, function (destinations) {
            destinations.classList.remove('over');
        });
    }
        
    var draggables = document.querySelectorAll('.draggable');
    [].forEach.call(draggables, function(draggables) {
        draggables.addEventListener('dragstart', handleDragStart, false);
        draggables.addEventListener('dragend', handleDragEnd, false);
    });
    
    var destinations = document.querySelectorAll('.destination');
    [].forEach.call(destinations, function(destinations) {
        destinations.addEventListener('dragenter', handleDragEnter, false);
        destinations.addEventListener('dragover', handleDragOver, false);
        destinations.addEventListener('dragleave', handleDragLeave, false);
        destinations.addEventListener('drop', handleDrop, false);
    });
        
    function checkAnswers () {
        var score = 0;
        var numberOfAnswers = 0;
        for (var q = 0; q < Object.keys(answers).length; q++) {
            var key = Object.keys(answers)[q];
            var qAnswers = answers[key];
            for (var a = 0; a < qAnswers.length; a++) {
                if ($('#'+key).children('#'+qAnswers[a]).length != 0) {
                    score++;   
                }
                numberOfAnswers++;
            }
        }
        //$('.mark').text('Mark: '+(score/numberOfAnswers)*100+'%');
        alert('You got '+(score/numberOfAnswers)*100+'% or '+score+'/'+numberOfAnswers+'.');
    }
    
    function reset () {
        for (var q = 0; q < Object.keys(answers).length; q++) {
            var key = Object.keys(answers)[q];
            var destination = $('#'+key);
            destination.children('div').remove();
        }
    }
    
    $("#check").click(function () {checkAnswers();});
    $("#reset").click(function () {reset();});
    $(".go-to-test").click(function () {scrollTo(0, 1960);});
});