// const { AsyncParallelHook } = require('tapable');
// const hook = new AsyncParallelHook(['name','age']);

// hook.tapAsync('1',(name,age,callback) => {
//     console.log('1',name,age);
//     setTimeout(() => {
//         callback();
//     },1000)
//     return '1';
// });

// hook.tapAsync('2',(name,age,callback) => {
//     console.log('2',name,age);
//     setTimeout(() => {
//         callback();
//     },1000)
//     return '2'
// });

// hook.callAsync('hello',10,(err) => {
//     console.log(err);
// });

const { AsyncParallelHook } = require('tapable');
const hook = AsyncParallelHook(['name','age']);

hook.tapPromise('1',(name,age) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('1',name,age);
            resolve();
        },2000)
    })
});

hook.tapPromise('2',(name,age) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('2',name,age);
            resolve();
        },3000)
    })
});

hook.promise('hello',10).then((err) => {
    console.log(err);
    
})
