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
  args() {
    return this.options.args.join(",");
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
  callTap(tapIndex) {
    let code = "";
    code += `var _fn${tapIndex} = _x[${tapIndex}];\n`;
    let tapInfo = this.options.taps[tapIndex];
    switch (tapInfo.type) {
      case "sync":
        code += `_fn${tapIndex}(${this.args()});\n`;
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
      default:
        break;
    }
    this.deInit();

    return fn;
  }
}

module.exports = HookCodeFactory;
