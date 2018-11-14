import {
  translateKey,
  translateValue,
  validValue,
  strings,
} from '../helpers';

describe('helpers.js', () => {
  const contents = strings['en'];
  describe('`translateKey` method', () => {
    it('returns correct translation', () => {
      const key = 'required';

      expect(translateKey(key)).toEqual(contents[key]);
    });
  });

  describe('`translateValue` method', () => {
    it('returns string', () => {
      const value = 'foo';

      expect(translateValue(value)).toEqual(value);
    });

    it('returns string with keys', () => {
      const value = 'bar :foo';

      expect(translateValue(value)).toEqual(value);
    });

    it('returns string with key replacements', () => {
      const value = 'bar :foo';
      const params = {foo: 'baz'};

      expect(translateValue(value, params)).toEqual('bar baz');
    });
  });

  describe('`validValue` method', () => {
    it('validates string', () => {
      const value = 'foo';

      expect(validValue(value)).toEqual(true);
    });

    it('validates number', () => {
      const value = 12;

      expect(validValue(value)).toEqual(true);
    });

    it('validates `true`', () => {
      const value = true;

      expect(validValue(value)).toEqual(true);
    });

    it('validates `false`', () => {
      const value = false;

      expect(validValue(value)).toEqual(false);
    });

    it('validates `undefined`', () => {
      const value = undefined;

      expect(validValue(value)).toEqual(false);
    });

    it('validates `null`', () => {
      const value = null;

      expect(validValue(value)).toEqual(false);
    });

    it('validates array', () => {
      const value = [];

      expect(validValue(value)).toEqual(true);
    });
  });
});
