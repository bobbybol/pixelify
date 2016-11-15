/* jshint -W117 */

/*!
 * BB Pixelify 1.0.1
 * Transform single images into a grid of tiles.
 * https://github.com/bobbybol/pixelify
 * @license MIT licensed
 *
 * Copyright (C) 2016 bobbybol.com - A project by Bobby Bol
 */

;(function ($) {
    "use strict";

    /**
     * Defining the Plugin
     */
    
    var shuffle_Random  = false;
    
    
    /*
    $.fn.bbShuffleArray = function(options) {
        
        **
         * Setting the Defaults
         *

        var settings = {
            
        };        
        // Settings extendable with options
        $.extend(settings, options);
        

        **
         * Set up the shuffle function
         *
        
        return this.each(function() {
            
            // Variables
            
          
        });
    };
    */
    
    setTimeout(function() {
        var pixels          = $('.bbTile');
        var columns         = 3;
        var rows            = 3;
        
        var pixelArray      = pixels.toArray();
        var numberOfPixels  = pixelArray.length;
        
        var shuffledArray   = [];
                 
        /*var sortedPixels = pixelArray.filter(function(element, index) {
            return index % 3 === 2;
        });*/ 
        
        if (shuffle_Random) {
            shuffledArray = 
                pixelArray
                    .map(function(element) {
                        return [Math.random(), element];
                    })
                    .sort()
                    .map(function (element) {
                        return element[1];
                    });
        }
                
        /*for (var i = 0; i < numberOfPixels; i++) {
            shuffledArray.push(i);
        }*/
                
        shuffledArray = pixelArray.map(function(element, index) {
            
            if (index % 4 === 0) {
                return element;
            }
            
        });
        
        
        console.log(shuffledArray);
        
    }, 100);

    // EXAMPLE: select and hide DOM element with vanilla JS
    // shuffledArray[0].style.visibility = "hidden";
    
    // EXAMPLE: select and hide DOM element with jQuery
    // var $shuffledArray = $(shuffledArray);
    // $shuffledArray.first().hide();
    
}(jQuery));