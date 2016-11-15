# BB Pixelify
Transform any image into a grid of tiles

## Demo
Live demonstation at [bobbybol.com](http://bobbybol.com/plugins/bb-pixelify/).
(Did this too quick, needs optimalization. Best viewed in Chrome to get the correct effect.)

## Usage

HTML structure
```html
<div class="imgContainer">
  <img src="path-to-your/image.jpg"/>
</div>

<script src="path-to-the-plugin/jquery.bb-pixelify.js"></script>
// don't forget that this plugin needs jQuery to work
```

Call the plugin with JavaScript
```javascript
$('.imgContainer').bbPixelify({ 
  columns : 35,        // number of blocks in the x direction @default 10 
  rows    : 15         // number of blocks in the y direction @default 10
});
```

The original image will be replaced with a `columns * rows` number of blocks.
You can then proceed to animate these blocks with CSS, GreenSock, or whatever, by referring to their `.bbTile` CSS class. 
