/* jshint -W117 */

/*!
 * BB Matrix Shuffle 0.0.5
 * Reshuffle a grid array into various other layouts
 * https://github.com/bobbybol/matrixshuffler
 * @license MIT licensed
 *
 * Copyright (C) 2016 bobbybol.com - A project by Bobby Bol
 */

;(function ($) {
    "use strict";

    /**
     * The Plugin Definition
     */
        
    $.fn.bbShuffleMatrix = function(options) {
        
        /**
         * The Default Settings
         */

        var settings = {
            columns             : 10,
            rows                : 10,
            shuffleAlgorithm    : "random",
            diagonalDirection   : "tl->br"
        };        
        // Settings extendable with options
        $.extend(settings, options);
        
        
        /**
         * The Variables
         */
        
        var pixelArray      = this.toArray();
        var shuffledArray   = [];
        
        
        /**
         * The Test Array
         *
         *   With 3 rows and 5 columns
         *
         *   | 0  | 1  | 2  | 3  | 4  |
         *   +----+----+----+----+----+
         *   | 5  | 6  | 7  | 8  | 9  |
         *   +----+----+----+----+----+
         *   | 10 | 11 | 12 | 13 | 14 |
         *
         *
         *   With 5 rows and 3 columns
         *
         *   | 0  | 1  | 2  |
         *   +----+----+----+
         *   | 3  | 4  | 5  |
         *   +----+----+----+
         *   | 6  | 7  | 8  |
         *   +----+----+----+
         *   | 9  | 10 | 11 |
         *   +----+----+----+
         *   | 12 | 13 | 14 |
         *
         */

        var testArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        
        
        /**
         * The Simple Helper Functions
         */
        
        function attachRandomNumber(element) {
            // returns a 2-value array, comprising of:
            // [0] random number
            // [1] the element passed to function
            return [Math.random(), element];
        }
        
        function returnLastArrayValue(array) {
            // returns z of [.., x, y, z]
            return array[array.length - 1];
        }
        
        function flatten2dMatrix(array) {
            // flattens:  [[a, b], [..], [x, z]]
            // to:        [a, b, .., x, z]
            return [].concat.apply([], array);
        }
        
        /**
         * The Shuffle Functions
         */
        
        // Random
        function randomShuffle(array) {
            return array
                .map(attachRandomNumber)
                .sort()
                .map(returnLastArrayValue)
            ;
        }
        
        // Diagonal
        function diagonalShuffle(array) {
            var columns             = settings.columns;
            var rows                = settings.rows;
            var numberOfDiagonals   = rows + columns - 1;                 
            var newDiagonalArray    = [];
            var i;
            var j;  
            
            // We're doing n number of loops, where n = the number of diagonals
            for(i = 0; i < numberOfDiagonals; i++) {

                for(j = Math.max(0, i - columns + 1); j <= Math.min(rows, i + 1) - 1; j++) {
                    var originalArrayIndex = (j * columns) + i - j;
                    newDiagonalArray.push(array[originalArrayIndex]);
                }  

            }
            
            return newDiagonalArray;
        }
    
        // Mirror
        function mirrorShuffle(array) {
            var rows                = settings.rows;
            var rowLength           = array.length / rows;
            var newMirroredArray    = [];
            var i;
            
            // create a n number of new arrays, where n = the number of rows
            for(i = 0; i < rows; i++) {
                var arrayRow =  array.slice( rowLength * i, rowLength * i + rowLength);
                arrayRow.reverse();
                newMirroredArray.push(arrayRow);
            } 
            
            return flatten2dMatrix(newMirroredArray);
        }
        
        // Inside Out 
        function insideOutShuffle(array) {
            var rows                = 3; //settings.rows;
            var columns             = 5; //settings.columns;
            
            var rowLength           = columns;
            var columnLength        = rows;
            
            var longestAxis         = rowLength >= columnLength ? columns : rows;
            var shortestAxis        = rowLength >= columnLength ? rows : columns;

            var numberOfRings;
            var numberOfFullRings;
            
            var arrayRow;
            var arrayOfRowArrays    = [];
            var newGuttedArray      = [];
            var i;
            var j;
            var k;
             
            // number of rings
            if(longestAxis % 2) {
                // true & uneven
                numberOfRings       = (longestAxis+1)/2;
            }else{
                // false & even
                numberOfRings       = longestAxis/2;
            }
            
            // number of complete rings
            if(shortestAxis % 2) {
                // true & uneven
                numberOfFullRings   = (shortestAxis+1)/2;
            }else{
                // false & even
                numberOfFullRings   = shortestAxis/2;
            }
                        
            // create a n number of new arrays, where n = the number of rows
            for(i = 0; i < rows; i++) {
                arrayRow =  array.slice( rowLength * i, rowLength * i + rowLength);
                arrayOfRowArrays.push(arrayRow);
            } 
            
            //console.log(arrayOfRowArrays);
            
            for(j = 0; j < numberOfRings; j++) {
                var ring                = [];
                var subRing             = [];
                var firstRow;
                var lastRow;
                var firstItem;
                var lastItem;
                var currentRowLength    = arrayOfRowArrays.length;
                var currentColumnLength = arrayOfRowArrays[0].length;
                
                //console.log(currentRowLength);
                //console.log(currentColumnLength);
                
                // CASE 1: if there's more rows than inner rings
                if(currentRowLength > currentColumnLength + 1) {
                    console.log("more rows than rings");

                    // shave off first and last row completely
                    firstRow = arrayOfRowArrays.shift();
                    lastRow  = arrayOfRowArrays.pop();
                    // put them into ring array
                    ring.push(firstRow, lastRow);
                    newGuttedArray.push(flatten2dMatrix(ring));
                    
                }
                
                // CASE 2: if there's more columns than inner rings
                else if(currentColumnLength >  currentRowLength + 1) {
                    console.log("more columns than rings");
                    
                    // shave off all first and last elements of all rows
                    for (k = 0; k < arrayOfRowArrays.length; k++) {
                        firstItem   = arrayOfRowArrays[k].shift();
                        lastItem    = arrayOfRowArrays[k].pop();
                        // put them into subRing array
                        subRing.push(firstItem, lastItem);
                    }

                    newGuttedArray.push(flatten2dMatrix(subRing));
                }
                
                // CASE 3: it's a square!!
                else {
                    console.log("square");
                    // shave off first and last row completely

                    // #TODO combination of shaving lines and first/last items
                }

            } 
            
            console.log(newGuttedArray);
            
            
            return arrayOfRowArrays;
        }
        
        //insideOutShuffle(testArray);
        
        
        
        /**
         * The Shuffling
         */
        
        if (settings.shuffleAlgorithm === "random") {
            shuffledArray = randomShuffle(pixelArray);
        }
        
        if (settings.shuffleAlgorithm === "diagonal" && settings.diagonalDirection === "tl->br") {
            shuffledArray = diagonalShuffle(pixelArray);
        }
        
        if (settings.shuffleAlgorithm === "diagonal" && settings.diagonalDirection === "br->tl") {
            shuffledArray = diagonalShuffle(pixelArray).reverse();
        }
        
        if (settings.shuffleAlgorithm === "diagonal" && settings.diagonalDirection === "tr->bl") {
            shuffledArray = diagonalShuffle(mirrorShuffle(pixelArray));
        }
        
        if (settings.shuffleAlgorithm === "diagonal" && settings.diagonalDirection === "bl->tr") {
            shuffledArray = diagonalShuffle(mirrorShuffle(pixelArray)).reverse();
        }
        
        if (settings.shuffleAlgorithm === "center") {
            shuffledArray = insideOutShuffle(pixelArray);
        }
        
        
        /**
         * The Return Value
         *   -> Shuffled array as jQuery object
         */
        
        return $(shuffledArray);
         
    };    
}(jQuery));