# Fastdrag

[![Build Status](https://www.travis-ci.org/qkorbit/fastdrag.svg?branch=master)](https://www.travis-ci.org/qkorbit/fastdrag)

A fast and lovely drag & drop library.

## Features

* 👌 Easy to use
* 🚀 Tiny size, <2Kb gziped
* 🤣 Modular, easy to extend
* ⚡️ Only pure JavaScript

## Getting Started

### Installation

You can get it on npm:

```bash
npm install fastdrag --save
```

As a dependency:

```javascript
import Fastdrag from 'Fastdrag'
```

Or via CDN:

```html
<script src="https://unpkg.com/fastdrag@0.1.1/dist/fastdrag.min.js"></script>
```

### Examples

```javascript
let instance = new Fastdrag({
  el: document.getElementById('demo'),
  friction: 2
})
```

Or in a more simple way:

```javascript
let instanceList = Fastdrag.to(document.getElementsByClassName('dragdrag'))
```

## API

|   Methods   |   Description   |
|:--------:|:--------:|
|Fastdrag  | Create the instance  |
|config | Modify the setting |
|destroy | Destroy the instance |
|on | Add eventListener to instance |
|to | Generate instances quickly |

### class Fastdrag

> new Fastdrag(options): Fastdrag Instance

Create the instance.

* options:

|   Parameter   |  Default Value  |   Description   | Type    |
|:--------:|:--------:|:--------:|:--------:|
|el| document.body |The container|HTMLElement|
|friction| 3 |The friction of target|number|
|rotateRange| 60 |The rotate range limit|number|
|scale|1|The scale factor of Container|number|

### config

> config(options): void

Everything can be changed except 'el'.

examples:

```javascript
let instance = new Fastdrag({
  el: document.getElementById('demo'),
  friction: 2
})

instance.config({
  friction: 5
})
```
### destroy

> destroy(): void

Destroy the instance.

examples:

```javascript
let instance = new Fastdrag({
  el: document.getElementById('demo'),
  friction: 2
})

instance.destroy()
```

### to

> to(target, options): Fastdrag Instances

|   Parameter   |  Default Value  |   Description   | Type    |
|:--------:|:--------:|:--------:|:--------:|
|target| document.body |The container|HTMLElement \| HTMLElement[]|
|options| {} |As same as Fastdrag options|object|


### on

> on(event, callback): void

Normally, you can listen the browser's native event on the instance of Fastdrag:

```javascript
let demo = document.getElementById('demo')
let instance = new Fastdrag({
  el: demo,
  friction: 4
})

// Actually, animation is still moving.
demo.addEventListener('dragend', e => {
	console.log('done!')
})

```

But sometimes you need to get more exactly what happened:

```javascript
let demo = document.getElementById('demo')
let instance = new Fastdrag({
  el: demo,
  friction: 4
})

instance.on('end', e => {
  console.log('done!')
})

```

* params:

|   Parameter   |  Default Value  |   Description   | Type    |
|:--------:|:--------:|:--------:|:--------:|
|event| document.body |The event name|string|
|callback| n => n |The callback function|function|

* event list:

|   Event   |   Description   |
|:--------:|:--------:|
|start  | As same as dragstart  |
|move | Every AnimationFrame of motion would trigger it |
|end | Trigger if Animation is stopped |


## Inspiration

Inspired by: https://github.com/ClassicOldSong/Drag.js

## License

[MIT](LICENSE)