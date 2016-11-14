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
    
    $.fn.bbPixelify = function(options) {
        
        /**
         * Setting the Defaults
         */

        var settings = {
            columns : 10,
            rows    : 10
        };        
        // Settings extendable with options
        $.extend(settings, options);
        

        /**
         * Set up the image grid for each element
         */
        
        return this.each(function() {
            
            // Variables
            var container       = $(this);
            var originalImage   = container.find('img');
            var imageSource     = 'url(' + originalImage.attr('src') + ')';
            
            // Set image to block before measuring
            originalImage.css({
                display:    "block",
                padding:    0,
                margin:     0
            });
            
            var targetWidth     = originalImage.width();
            var targetHeight    = originalImage.height();
            var numberOfTiles   = settings.columns * settings.rows;
            var tileWidth       = targetWidth / settings.columns;
            var tileHeight      = targetHeight / settings.rows;
            var tilesArray      = [];
            var tiles;
            var i;
            var j;
            
            // Build the tile blueprint
            var tile = jQuery('<div/>', {
                class: 'bbTile',
                css: {
                    position            : "absolute",
                    width               : tileWidth,
                    height              : tileHeight,
                    backgroundImage     : imageSource
                }
            });
                        
            // Hide the original
            originalImage.hide();
            
            // Set the container to correct width and height
            container.css({
                position    : "relative",
                width       : targetWidth,
                height      : targetHeight
            });
            
            // Build grid of tiles
            for (i = 0; i < settings.rows; i++) {
                for (j = 0; j < settings.columns; j++) {
                    tile
                        .clone()
                        .css({
                            left                : j * tileWidth,
                            top                 : i * tileHeight,
                            backgroundPosition  : j * -tileWidth + 'px ' + i * -tileHeight + 'px'
                        })
                        .appendTo(container);
                }
            }           
        });
    };
    
    
    /**
     * Helper function: Range
     * Get an array of numbers within a range
     * @param min {number} Lowest number in array
     * @param max {number} Highest number in array
     * @param rand {bool} Shuffle array
     * @return {array}
     */
    function range(min, max, rand) {
        var arr = (new Array(++max - min))
            .join('.').split('.')
            .map(function (v, i) {
                return min + i;
            });
        return rand ? arr.map(function (v) {
                return [Math.random(), v];
            })
            .sort().map(function (v) {
                return v[1];
            }) : arr;
    }
    
}(jQuery));