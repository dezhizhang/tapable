


const { SyncHook } = require('tapable');

const hook = new SyncHook(['name']);

hook.intercept({
    register(tapInfo) {
        console.log('intercept1 register',tapInfo.name);
    },
    call(name) {
        console.log('call',name);
    },
    tap(tapInfo) {
        console.log('tap',tapInfo.name);

    }
});

hook.tap({name:'A'},(name) => {
    console.log('A',name);
});

hook.tap({name:'B'},(name) => {
    console.log('B',name);

})
hook.call('hello')
