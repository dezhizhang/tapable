const { AsyncSeriesBailHook } = require('tapable');
const hook = new AsyncSeriesBailHook(['name','age']);
console.time('cost');
hook.tapAsync('1',(name,age,callback) => {
    setTimeout(() => {
        console.log('1',name,age);
        callback();
    },1000)
});

hook.tapAsync('2',(name,age,callback) => {
    setTimeout(() => {
        console.log('2',name,age);
        callback(null,'2号返回值')
    },2000)
});


hook.callAsync('hello',10,(err,data) => {
    console.log('done',data);
    console.timeEnd('cost');
    
})