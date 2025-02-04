if (!globalThis['$262']) {
  function print(...args) {
    console.log(...args);
  }
  var $262 = {
    global: globalThis,
    gc() {
      return gc();
    },
    createRealm(options) {
      throw new Test262Error('createRealm() not yet supported.');
    },
    evalScript(code) {
      throw new Test262Error('evalScript() not yet supported.');
    },
    getGlobal(name) {
      return this.global[name];
    },
    setGlobal(name, value) {
      this.global[name] = value;
    },
    IsHTMLDDA() { return {}; },
    get agent() {
      throw new Test262Error('agent.* not yet supported.');
    }
  };
}

$262.destroy = () => {};

$262.source = $SOURCE;
