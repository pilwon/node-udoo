[![Logo](https://raw.github.com/pilwon/node-udoo/master/logo.png)](http://www.udoo.org/)

[![NPM](https://nodei.co/npm/udoo.png?downloads=false&stars=false)](https://npmjs.org/package/udoo) [![NPM](https://nodei.co/npm-dl/udoo.png?months=6)](https://npmjs.org/package/udoo)


`udoo` is a [UDOO](http://www.udoo.org/) [GPIO](https://www.kernel.org/doc/Documentation/gpio.txt) abstraction library for [Node.js](http://nodejs.org/)


## Installation

    $ npm install udoo


## Usage ([Blink](http://arduino.cc/en/Tutorial/Blink) example from [Arduino Tutorials](http://arduino.cc/en/Tutorial/HomePage))

### Asynchronous version

```js
var udoo = require('udoo');

var led = udoo.outputPin(13),
    on = false;

(function loop() {
  led.set(on = !on, function (err) {
    if (err) { throw err; }
    setTimeout(loop, 1000);
  });
}());
```

### Another asynchronous version w/ [Async.js](https://github.com/caolan/async)

```js
var async = require('async'),
    udoo = require('udoo');

var led = udoo.outputPin(13);

async.forever(function (cb) {
  async.series([
    function (cb) {
      led.setHigh(cb);
    },
    function (cb) {
      setTimeout(cb, 1000);
    },
    function (cb) {
      led.setLow(cb);
    },
    function (cb) {
      setTimeout(cb, 1000);
    }
  ], cb);
}, function (err) {
  throw err;
});
```

### Synchronous version (not recommended)

```js
var udoo = require('udoo');

var led = udoo.outputPin(13),
    on = false;

setInterval(function () {
  led.setSync(on = !on);
}, 1000);
```

* [See more comprehensive examples here.](https://github.com/pilwon/node-udoo/tree/master/examples)


## API

```js
// Create new pin
.inputPin(name)
.outputPin(name)
.pin(name)        // direction must be set by .setInputMode() / .setOutputMode()

// Chainable pin commands (append `Sync` for synchronous calls)
.get()            // returns `true` for high/1, `false` for low/0
.getMode()        // returns one of `udoo.PIN_MODE.*`
.set(value)       // set value. (value must be boolean)
.setHigh()        // sets true/high/1
.setInputMode()   // sets input mode.
.setLow()         // sets false/low/0
.setOutputMode()  // 
```


## Credits

  See the [contributors](https://github.com/pilwon/node-udoo/graphs/contributors).


## License

<pre>
The MIT License (MIT)

Copyright (c) 2013 Pilwon Huh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre>
