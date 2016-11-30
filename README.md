# BB Pixelify
Transform any image into a grid of image tiles

![Demo of BB Pixelify](/demo/img/pixelify-example@2x.jpg)

## Demo
Live demonstation at [bobbybol.com/plugins/bb-pixelify](http://bobbybol.com/plugins/bb-pixelify/).  

## Features
- You only need to specify the number of rows and columns; Pixelify does the rest.
- Support for retina sized images.
- Easily animate the tiles with CSS or an animation library such as [GreenSock](https://greensock.com/).
- For real cool animations, use Pixelify in combination with the [BB Matrix Shuffler](https://github.com/bobbybol/matrix-shuffler) plugin.

## Usage

**HTML structure**  
All this plug-in requires is an `<img/>`, and an element like a `<div>` to contain the image.
When using retina sized images, do not forget to scale the image down to desired size with CSS.
```html
<div class="imgContainer">
  <img src="path-to-your/image.jpg"/>
</div>

<script src="path-to-the-plugin/jquery.bb-pixelify.js"></script>
// don't forget that this plugin needs jQuery to work
```

**Activating Pixelify with JavaScript**  
Call the plugin with JavaScript, and specify the number of desired rows and columns.
```javascript
$('.imgContainer').bbPixelify({ 
  columns : 35,        // number of blocks in the x direction @default 10 
  rows    : 15         // number of blocks in the y direction @default 10
});
```
The original image will be replaced with a `columns * rows` number of blocks.

## Animating the Tiles
After your image has been 'pixelified', you can proceed to animate the individual tiles by referring to their `.bbTile` CSS class. To get the tiles ready for animation with jQuery, just get them by doing the following:
```javascript
var tilesToAnimate = $('.bbTile');
// tilesToAnimate is now the variable that you can refer to when animating the tiles
```

Perhaps a better way to get the tiles, is to do the initiation of the plugin and the reference to the tiles in one statement:
```javascript
var tilesToAnimate = $('.imgContainer')
  .bbPixelify({columns: 35, rows: 15})    // use plugin
  .children()                             // get the children of the element returned by the plugin
;
// tilesToAnimate is now the variable that you can refer to when animating the tiles
```
This ensures that the plugin has finished creating all the tiles, and that they are ready to be animated. It also saves another query to get all the tiles, which helps with performance.

## Known Issues
**Divide into whole pixels**  
It is **strongly advised** to divide up your image in such a way that the individual tiles are made up of _whole pixel values_. For example, if the original image is 700x400 pixels large, choosing 7 rows and 4 columns would result in images 100x100px large, which is great. If you were to choose 8 rows and 5 columns, the tiles would be 87.5x80 pixels large, which is not so great because the tiles are 87.5px wide while we should aim for whole pixels. Pixel values with decimal points cause incorrect rendering in some browsers, as well as some performance issues.

## Use Matrix Shuffler for advanced animations
The Pixelify plugin cuts images up into a grid of smaller images. If you want more control over the order in which you can animate the individual grid tiles, use [BB Matrix Shuffler](https://github.com/bobbybol/matrix-shuffler). Simply call it chained to the `.bbPixelify()` method:
```javascript
var tilesToAnimate = $('.imgContainer')
  .bbPixelify({columns: 35, rows: 15})        // use plugin,
  .bbShuffleMatrix({                          // shuffle the tiles,
    shuffleAlgorithm: "diagonal",             // specify which shuffle algorithm to use ,
    shuffleDirection: "topleft->bottomright"  // and what direction the tiles should run.
  })
;
// tilesToAnimate is the variable that you can refer to when animating the tiles, 
// shuffled in the order you specified in the plugin options.
```
