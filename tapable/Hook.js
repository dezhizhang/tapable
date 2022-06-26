class Hook {
  constructor(args) {
    if (!Array.isArray(args)) {
      this.args = [];
    }
    this.args = args;
    this.taps = []; //用来存放回调函数
    this.call = CALL_DELEGATE;
    this.callAsync = CALL_ASYNC_DELEGATE;
  }
  tap(options,fn) {
    this._tap('sync',options,fn);
  }
  tapAsync(options,fn) {
    this._tap('async',options,fn);
  }
  _tap(type,options,fn) {
    if(typeof options === 'string') {
        options = {name:options}
    }
    const tapInfo = {...options,type,fn}
    this._insert(tapInfo);
  }

  _insert(tapInfo) {
    this.taps.push(tapInfo);
  }
  compile(options) {
    throw new Error('此方法是抽像方法，子类去实现')
  }

  _createCall(type) {
    return this.compile({
        taps:this.taps,
        args:this.args,
        type
    })
  }
}

const CALL_DELEGATE = function(...args) {
    this.call = this._createCall('sync');
    return this.call(...args);
}

const CALL_ASYNC_DELEGATE = function(...args) {
  this.callAsync = this._createCall('async');
  return this.callAsync(...args);

}

module.exports = Hook;

