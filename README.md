# BB Pixelify
Transform any image into a grid of tiles

## Demo
Live demonstation at [bobbybol.com](http://bobbybol.com/plugins/bb-pixelify/).

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

The original image will be replaced with columns * rows amount of blocks.
You can then proceed to animate these blocks with CSS, GreenSock, or anything, by referring to their `.bbTile` CSS class. 
