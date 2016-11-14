/*!
 * BB Pixelify 1.0.0
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
                    width               : tileWidth,
                    height              : tileHeight,
                    backgroundImage     : imageSource,
                    float               : "left"
                }
            });
                        
            // Hide the original
            originalImage.hide();
            
            // Set the container to correct width and height
            container.css({
                width: targetWidth,
                height: targetHeight
            });
            
            // Build grid of tiles
            for (i = 0; i < settings.rows; i++) {
                for (j = 0; j < settings.columns; j++) {
                    //console.log(i * tileWidth, j * tileHeight);
                    tile
                        .clone()
                        .css('backgroundPosition', (j * -tileWidth) + 'px ' + (i * -tileHeight) + 'px')
                        .appendTo(container);
                }
            }            
        });
    };    
}(jQuery));