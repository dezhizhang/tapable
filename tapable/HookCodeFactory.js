class HookCodeFactory {
  setup(hookInstance, options) {
    hookInstance._x = options.taps.map((tapInfo) => tapInfo.fn);
  }
  init(options) {
    this.options = options;
  }
  deInit() {
    this.options = null;
  }
  args(options) {
    const { after, before } = options;
    let allArgs = this.options.args || [];
    if(before) {
      allArgs = [before,...allArgs];
    }
    if(after) {
      allArgs = [...allArgs,after]
    }
    // const allArgs = this.options.args || [];
    // if (before) {
    //   allArgs.unshift(before);
    // }
    // if (after) {
    //   allArgs.push(after);
    // }
    return allArgs.join(',');

  }
  header() {
    let code = "";
    code += `var _x = this._x;\n`;
    return code;
  }
  callTapsSeries() {
    let code = "";
    for (let i = 0; i < this.options.taps.length; i++) {
      const content = this.callTap(i);
      code += content;
    }
    return code;
  }

  callTapsParallel() {
    const taps = this.options.taps;
    let code = `var _counter=${taps.length};\n`;
    code += `
      var _done = (function () {
        _callback();
      });\n
    `;
    for (let i = 0; i < taps.length; i++) {
      const content = this.callTap(i);
      code += content;
    }

  }
  callTap(tapIndex) {
    let code = "";
    code += `var _fn${tapIndex} = _x[${tapIndex}];\n`;
    let tapInfo = this.options.taps[tapIndex];
    switch (tapInfo.type) {
      case "sync":
        code += `_fn${tapIndex}(${this.args()});\n`;
        break;
      case 'async':
        code += `
          _fn${tapIndex}(${this.args},(function() {
            if(--_counter === 0) _done();
          }));\n
        `
      default:
        break;
    }
    return code;
  }

  create(options) {
    this.init(options);
    let fn;
    switch (this.options.type) {
      case "sync":
        fn = new Function(this.args(), this.header() + this.content());
        break;
      case "async":
        fn = new Function(this.args({ after: '_callback' }), this.header() + this.content());
        break;

      default:
        break;
    }
    this.deInit();

    return fn;
  }
}

module.exports = HookCodeFactory;
