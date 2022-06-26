const HookCodeFactory = require("./HookCodeFactory");
const Hook = require("./Hook");

class AsyncParallelHookCodeFactory extends HookCodeFactory {
  content() {
    return this.callTapsParallel();
  }
}
const factory = new AsyncParallelHookCodeFactory();

class AsyncParallelHook extends Hook {
  compile(options) {
    factory.setup(this, options);
    return factory.create(options);
  }
}

module.exports = AsyncParallelHook;
