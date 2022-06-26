# tapable

### SyncHook
```js

const { SyncHook } = require('tapable');

const hook = new SyncHook(['a','b']);


hook.tap('1',(name,age) => {
    console.log('1',name,age);
    return '1';
});

hook.tap('2',(name,age) => {
    console.log('2',name,age);
    return '2';
});

hook.tap('3',(name,age) => {
    console.log('3',name,age);
    return '3';
});

hook.call('hello',10);

```
### SyncBailHook返回非undefined后面不热行
```js
const { SyncBailHook } = require('tapable');


const hook = new SyncBailHook(['a','b']);

hook.tap('1',(name,age) => {
    console.log('1',name,age);
});

hook.tap('2',(name,age) => {
    console.log('2',name,age);
    return '2';
});

hook.tap('3',(name,age) => {
    console.log('3',name,age);

});

hook.call('hello',10);

```
### SyncWaterfallHook
```js
const { SyncWaterfallHook } = require('tapable');
const hook = new SyncWaterfallHook(['a','b']);

hook.tap('1',(name,age) => {
    console.log('1',name,age);
    return '1';
});

hook.tap('2',(name,age) => {
    console.log('2',name,age);
    return '2';
});

hook.tap('3',(name,age) => {
    console.log('3',name,age);
});

hook.call('hello',10);

```
### AsyncParallelHook
```js
const { AsyncParallelHook } = require('tapable');
const hook = new AsyncParallelHook(['name','age']);

hook.tapAsync('1',(name,age,callback) => {
    console.log('1',name,age);
    setTimeout(() => {
        callback();
    },1000)
    return '1';
});

hook.tapAsync('2',(name,age,callback) => {
    console.log('2',name,age);
    setTimeout(() => {
        callback();
    },1000)
    return '2'
});

hook.callAsync('hello',10,(err) => {
    console.log(err);
});

```




