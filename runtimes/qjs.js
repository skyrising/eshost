/* run-test262 exposes a $262 object, so we need to redefine it for safe shortName mapping */
const qjs = globalThis["\x24262"];
const DollarCreateRealm = qjs && qjs.createRealm;
const DollarEvalScript = qjs && qjs.evalScript.bind(qjs);

var $262 = Object.assign({}, qjs);
$262.source = $SOURCE;
$262.destroy = function() {};
$262.gc = function() {
  std.gc();
};
$262.getGlobal = function(name) {
  return this.global[name];
};
$262.setGlobal = function(name, value) {
  this.global[name] = value;
};
$262.evalScript = function(code) {
  try {
    std.evalScript(code);
    return { type: 'normal', value: undefined };
  } catch (e) {
    return { type: 'throw', value: e };
  }
};
$262.createRealm = function (options = {}) {
  if (!DollarCreateRealm) throw new Test262Error('createRealm() not yet supported.');

  const realm = DollarCreateRealm(options);
  realm.evalScript($262.source);
  realm.source = $262.source;
  realm.getGlobal = $262.getGlobal;
  realm.setGlobal = $262.setGlobal;
  realm.destroy = () => {
    if (options.destroy) {
      options.destroy();
    }
  };
  const globals = options.globals || {};
  for (let glob in globals) {
    realm.global[glob] = globals[glob];
  }
  return realm;
};
$262.clearKeptObjects = function () {
  throw new Test262Error('clearKeptObjects() not yet supported.');
};
$262.detachArrayBuffer = function () {
  throw new Test262Error('detachArrayBuffer() not yet supported.');
};