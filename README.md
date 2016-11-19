# BB Pixelify
Transform any image into a grid of tiles

![Demo of BB Pixelify](/demo/img/pixelify-example@2x.jpg)

## Demo
Live demonstation at [bobbybol.com](http://bobbybol.com/plugins/bb-pixelify/).  
(Did this too quick, needs optimalization. Best viewed in Chrome to get the correct effect.)

## Features
- You only need to specify the number of rows and columns; Pixelify does the rest.
- Support for retina sized images.
- Easily animate the tiles with CSS or an animation library such as [GreenSock](https://greensock.com/).
- For real cool animations, use Pixelify in combination with the BB Matrix Shuffler plugin.

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
```

Perhaps a better way to get the tiles, is to do the initiation of the plugin and the reference to the tiles in one statement:
```javascript
var tilesToAnimate = $('.imgContainer')
  .bbPixelify({columns: 35, rows: 15})    // use plugin
  .children                               // get the children of the element returned by the plugin
  .slice(1)                               // slice out the original image
;
```
This ensures that the plugin has finished creating all the tiles, and that they are ready to be animated. It also saves another query to get all the tiles, which helps with performance.

## Known Issues
