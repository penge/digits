# digits

## one-digit.js

The main project's file is called `one-digit.js`. It contains a custom HTML element created using Shadow DOM.
The one-digit element encapsulates all the blocks, to be exact, 20 blocks, needed to visualize a digit, a digit we know from digital clock.

By including the `one-digit.js` file to our project we can start using the one-digit element. The usage is as simple as follows:
```html
<one-digit></one-digit>
```

By default this prints number 0 whereas every block is having darkseagreen color and size 20 by 20 pixels.

To customize these attributes, we can do easily:
```html
<one-digit data-value="3" data-size="15" data-color="blue"></one-digit>
```

Of course, setting size and color to one-digit is more proper to do by CSS. Let's look at that example:
```html
<style>
#answer one-digit::shadow .block { width: 15px; height: 20px; }
#answer one-digit::shadow .block.active { background: red; }
</style>
<section id="answer">
  <one-digit data-value="4"></one-digit>
  <one-digit data-value="2"></one-digit>
</section>
```

42 gets printed in red with each blocks' size of 15 by 20 pixels, what makes it little narrower.

As you can see, your styling options here are countless.

## stopwatch.js

The second main file is `stopwatch.js`. To use stopwatch, just follow this template:
```html
<section class="stopwatch" id="stopwatch-full" data-delay="10">
  <one-digit class="hundreds" data-size="30"></one-digit>
  <one-digit class="tens" data-size="30"></one-digit>
  <one-digit class="ones" data-size="30"></one-digit>
  <one-digit class="tenths" data-size="6"></one-digit>
  <one-digit class="hundredths" data-size="6"></one-digit>
  
  <div class="buttons">
    <button class="start">Start</button>
    <button class="stop">Stop</button>
    <button class="reset">Reset</button>
  </div>
</section>
```

Finaly, to initialize the stopwatch, just do:
```javascript
new Stopwatch("stopwatch-full");
```

You can start, stop, or reset the stopwatch by clicking on the specific button, or by javascript as well:
```javascript
var sw = new Stopwatch("stopwatch-full");
sw.start();
sw.stop();
sw.reset();
```

`stopwatch.js` is inteligent enough to give you the freedom.
You can use one-digit for the numbers, or you can stick to div or span elements if needed.
Which numbers (`.hundreds`, `.tens`, and so on) you'd like to display, it's up to you. They all are optional.
The `.stopwatch` and `.buttons` classes are optional as well. And `button` elements don't have to be buttons either.

As you can see, stopwatch has a `data-delay` attribute. It is used to set the update speed.
By default it is 1000. That corresponds to updates every 1 second.

That's all there is to it! Enjoy & share!
