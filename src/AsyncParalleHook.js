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
