
const { AsyncParallelHook } = require('../tapable/index');
const hook = new AsyncParallelHook(['name','age']);

debugger;

hook.tapAsync('1',(name,age,callback) => {
 setTimeout(() => {
    console.log('1',name,age);
    callback();
 },1000)
});

hook.tapAsync('2',(name,age,callback) => {
   setTimeout(() => {
    console.log('2',name,age);
    callback();
   },2000)
});

hook.callAsync('hello',10,(err) => {
    console.log('done');

});