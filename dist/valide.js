(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Valide = {})));
}(this, (function (exports) { 'use strict';

  function validValue(value) {
    return !!(typeof value === 'string'
      || typeof value === 'number'
      || value);
  }

  var strings = {
    en: {
      invalid_field: 'Invalid field',
      required: 'Field is required',
      include: 'Field must include :value',
      exclude: 'Field must exclude :value',
      be_equal: 'Field must be equal to :value',
      not_be_equal: 'Field must not be equal to :value',
      min_length: 'Min char length is :length',
      max_length: 'Max char length is :length',
      invalid_email: 'Email is not valid',
    },
  };

  var language = {
    default: 'en',
    current: 'en',
  };

  function translateKey(key, params) {
    var string = strings[language.current] || strings[language.default];

    if (!string) {
      console.warn(("[Valide] No keys for language \"" + (language.current) + "\" found."));
    }

    if (string && !string[key]) {
      console.warn(("[Valide] No such key \"" + key + "\" for language \"" + (language.current) + "\" found."));
    }

    return translateValue(strings[language.current][key], params);
  }

  function translateValue(value, params) {
    if ( params === void 0 ) params = {};

    var paramList = Object.keys(params)
      .map(function (value) { return (":" + value); })
      .join('|');

    return value.replace(
      new RegExp(paramList, 'g'),
      function (match) { return (
        params[match.substr(1)] || match
      ); }
    );
  }

  var Valide = function Valide(value) {
    this.value = value;
    this.rules = [];
  };

  var staticAccessors = { language: { configurable: true },version: { configurable: true } };

  Valide.prototype.register = function register (ref) {
      var this$1 = this;
      var type = ref.type;
      var validate = ref.validate;
      var error = ref.error;

    var nn = this.rules.push({
      type: type,
      validate: function (value) { return (validValue(value) && validate(value)); },
      error: error || translateKey('invalid_field'),
    });

    this.error = function (text, params) {
      this$1.rules[nn - 1].error = (text && translateValue(text, params)) || error;
      return this$1;
    };

    return this;
  };

  Valide.prototype.valueOf = function valueOf () {
    return this.check();
  };

  Valide.prototype.toString = function toString () {
    return this.check();
  };

  Valide.prototype.check = function check (newValue) {
      var this$1 = this;

    if (typeof newValue !== 'undefined') {
      this.value = newValue;
    }

    return this.rules.reduce(function (acc, value) { return (
      typeof acc === 'string' ? acc : (!value.validate(this$1.value) && value.error) || acc
    ); }, true)
  };

  Valide.prototype.required = function required () {
    return this.register({
      type: 'required',
      validate: function (value) { return value !== ''; },
      error: translateKey('required'),
    })
  };

  Valide.prototype.test = function test (regexp) {
    return this.register({
      type: 'test',
      validate: function (value) { return value === '' || regexp.test(value); },
      error: translateKey('invalid_field'),
    })
  };

  Valide.prototype.includes = function includes (include) {
    return this.register({
      type: 'includes',
      validate: function (value) { return value === '' ||
        (Array.isArray(value) && value.indexOf(include) >= 0)
        || (typeof value === 'string' && value.indexOf(include) >= 0); },
      error: translateKey('include', { value: include }),
    })
  };

  Valide.prototype.excludes = function excludes (exclude) {
    return this.register({
      type: 'excludes',
      validate: function (value) { return value === '' ||
        (Array.isArray(value) && value.indexOf(exclude) < 0)
        || (typeof value === 'string' && value.indexOf(exclude) < 0); },
      error: translateKey('exclude', { value: exclude }),
    })
  };

  Valide.prototype.equal = function equal (equal$1) {
    return this.register({
      type: 'equal',
      validate: function (value) { return value === '' || value + '' === equal$1 + ''; },
      error: translateKey('be_equal', { value: equal$1 }),
    })
  };

  Valide.prototype.notEqual = function notEqual (equal) {
    return this.register({
      type: 'notEqual',
      validate: function (value) { return value === '' || value + '' !== equal + ''; },
      error: translateKey('not_be_equal', { value: equal }),
    })
  };

  Valide.prototype.min = function min (num) {
    return this.register({
      type: 'min',
      validate: function (value) { return value.length >= num; },
      error: translateKey('min_length', { length: num }),
    })
  };

  Valide.prototype.max = function max (num) {
    return this.register({
      type: 'max',
      validate: function (value) { return value.length < num; },
      error: translateKey('max_length', { length: num }),
    })
  };

  Valide.prototype.email = function email () {
    return this.register({
      type: 'email',
      validate: function (value) { return value === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); },
      error: translateKey('invalid_email'),
    })
  };

  staticAccessors.language.get = function () {
    return language.current;
  };

  staticAccessors.language.set = function (value) {
    return language.current = value;
  };

  staticAccessors.version.get = function () {
    return '1.0.0';
  };

  Object.defineProperties( Valide, staticAccessors );

  if (window) { window.Valide = Valide; }

  exports.Valide = Valide;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=valide.js.map
