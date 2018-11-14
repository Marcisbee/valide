import {
  translateKey,
  translateValue,
  validValue,
  language,
} from './helpers';

export class Valide {
  constructor(value) {
    this.value = value;
    this.rules = [];
  }

  register({ type, validate, error }) {
    let nn = this.rules.push({
      type: type,
      validate: value => (validValue(value) && validate(value)),
      error: error || translateKey('invalid_field'),
    });

    this.error = (text, params) => {
      this.rules[nn - 1].error = (text && translateValue(text, params)) || error;
      return this;
    }

    return this;
  }

  valueOf() {
    return this.check();
  }

  toString() {
    return this.check();
  }

  check(newValue) {
    if (typeof newValue !== 'undefined') {
      this.value = newValue;
    }

    return this.rules.reduce((acc, value) => (
      typeof acc === 'string' ? acc : (!value.validate(this.value) && value.error) || acc
    ), true)
  }

  required() {
    return this.register({
      type: 'required',
      validate: value => value !== '',
      error: translateKey('required'),
    })
  }

  test(regexp) {
    return this.register({
      type: 'test',
      validate: value => value === '' || regexp.test(value),
      error: translateKey('invalid_field'),
    })
  }

  includes(include) {
    return this.register({
      type: 'includes',
      validate: value => value === '' ||
        (Array.isArray(value) && value.indexOf(include) >= 0)
        || (typeof value === 'string' && value.indexOf(include) >= 0),
      error: translateKey('include', { value: include }),
    })
  }

  excludes(exclude) {
    return this.register({
      type: 'excludes',
      validate: value => value === '' ||
        (Array.isArray(value) && value.indexOf(exclude) < 0)
        || (typeof value === 'string' && value.indexOf(exclude) < 0),
      error: translateKey('exclude', { value: exclude }),
    })
  }

  equal(equal) {
    return this.register({
      type: 'equal',
      validate: value => value === '' || value + '' === equal + '',
      error: translateKey('be_equal', { value: equal }),
    })
  }

  notEqual(equal) {
    return this.register({
      type: 'notEqual',
      validate: value => value === '' || value + '' !== equal + '',
      error: translateKey('not_be_equal', { value: equal }),
    })
  }

  min(num) {
    return this.register({
      type: 'min',
      validate: value => value.length >= num,
      error: translateKey('min_length', { length: num }),
    })
  }

  max(num) {
    return this.register({
      type: 'max',
      validate: value => value.length < num,
      error: translateKey('max_length', { length: num }),
    })
  }

  email() {
    return this.register({
      type: 'email',
      validate: value => value === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      error: translateKey('invalid_email'),
    })
  }

  static get language() {
    return language.current;
  }

  static set language(value) {
    return language.current = value;
  }

  static get version() {
    return '1.0.0';
  }
}

if (window) window.Valide = Valide;
