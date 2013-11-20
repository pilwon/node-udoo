[![Logo](https://raw.github.com/pilwon/node-udoo/master/logo.png)](http://www.udoo.org/)

[![NPM](https://nodei.co/npm/udoo.png?downloads=false&stars=false)](https://npmjs.org/package/udoo) [![NPM](https://nodei.co/npm-dl/udoo.png?months=6)](https://npmjs.org/package/udoo)


`udoo` is a [UDOO](http://www.udoo.org/) [GPIO](https://www.kernel.org/doc/Documentation/gpio.txt) abstraction library for [Node.js](http://nodejs.org/)


## Installation

    $ npm install udoo


## Usage

```js
var udoo = require('udoo');

var led = udoo.outputPin(13);

setInterval(function () {
  led.flipSync();
}, 1000);
```

* [See more comprehensive examples here.](https://github.com/pilwon/node-udoo/tree/master/examples)


## API

```js
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
