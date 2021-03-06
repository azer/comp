## comp

Async function composition. Similar to promises.

```bash
$ npm install comp
```

Need more features? See [andthen](http://github.com/azer/andthen)

## Usage

```js
steps = comp(step1, step2, step3)

steps(value1, function(error, value4){

    if(error) throw error

    value4
    // => what step3 returns. see below.

})

function step1(value1, callback){}
function step2(value2, callback){}
function step3(value3, callback){}
```

You can add functions to the composition later;

```js
steps = comp(step1).then(step2).then(step3)
```

First step may not get any initial value:

```js
steps = comp(step0, step1, step2, step3)

steps(function(error, value4){

    if(error) throw error

    value4
    // => what step3 returns. see below.

})

function step0(callback){

    callback(null, value1)

}
```

![](http://distilleryimage9.s3.amazonaws.com/af5718c279ac11e280ba22000a9f1893_6.jpg)
