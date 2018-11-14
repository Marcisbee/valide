import { Valide } from '../index';

describe('index.js', () => {
  it('provides a Valide namespace', () => {
    expect(Valide).toEqual(expect.objectContaining({
      language: Valide.language,
      version: Valide.version,
    }));
  });

  it('sets language', () => {
    Valide.language = 'ru';
    expect(Valide.language).toEqual('ru');
    Valide.language = 'en';
    expect(Valide.language).toEqual('en');
  });

  it('adds the Valide namespace to the window', () => {
    expect(window.Valide).toBe(Valide);
  });

  describe('`required` method', () => {
    beforeEach(() => {
      Valide.language = 'en';
    });

    it('validates value `undefined`', () => {
      const value = undefined;
      const output = new Valide(value).required();

      expect(output.check()).not.toBe(true);
    });

    it('validates value `null`', () => {
      const value = null;
      const output = new Valide(value).required();

      expect(output.check()).not.toBe(true);
    });

    it('validates value `true`', () => {
      const value = true;
      const output = new Valide(value).required();

      expect(output.check()).toBe(true);
    });

    it('validates value "foo"', () => {
      const value = 'foo';
      const output = new Valide(value).required();

      expect(output.check()).toBe(true);
    });
  });

  describe('`test` method', () => {
    beforeEach(() => {
      Valide.language = 'en';
    });

    it('validates value `undefined`', () => {
      const value = undefined;
      const output = new Valide(value).test(/Foo/);

      expect(output.check()).not.toBe(true);
    });

    it('validates value `null`', () => {
      const value = null;
      const output = new Valide(value).test(/Foo/);

      expect(output.check()).not.toBe(true);
    });

    it('validates value `true`', () => {
      const value = true;
      const output = new Valide(value).test(/Foo/);

      expect(output.check()).not.toBe(true);
    });

    it('validates value "foo"', () => {
      const value = 'foo';
      const output = new Valide(value).test(/Foo/);

      expect(output.check()).not.toBe(true);
    });

    it('validates value "Foo"', () => {
      const value = 'Foo';
      const output = new Valide(value).test(/Foo/);

      expect(output.check()).toBe(true);
    });
  });

  describe('`includes` method', () => {
    beforeEach(() => {
      Valide.language = 'en';
    });

    it('validates value `undefined`', () => {
      const value = undefined;
      const output = new Valide(value).includes('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value `null`', () => {
      const value = null;
      const output = new Valide(value).includes('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value `true`', () => {
      const value = true;
      const output = new Valide(value).includes('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value "foo"', () => {
      const value = 'foo';
      const output = new Valide(value).includes('foo');

      expect(output.check()).toBe(true);
    });

    it('validates value `["foo"]`', () => {
      const value = ['foo'];
      const output = new Valide(value).includes('foo');

      expect(output.check()).toBe(true);
    });

    it('validates value `["bar"]`', () => {
      const value = ['bar'];
      const output = new Valide(value).includes('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value "A foo bar"', () => {
      const value = 'A foo bar';
      const output = new Valide(value).includes('foo');

      expect(output.check()).toBe(true);
    });

    it('validates value "bar"', () => {
      const value = 'bar';
      const output = new Valide(value).includes('foo');

      expect(output.check()).not.toBe(true);
    });
  });

  describe('`excludes` method', () => {
    beforeEach(() => {
      Valide.language = 'en';
    });

    it('validates value `undefined`', () => {
      const value = undefined;
      const output = new Valide(value).excludes('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value `null`', () => {
      const value = null;
      const output = new Valide(value).excludes('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value `true`', () => {
      const value = true;
      const output = new Valide(value).excludes('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value "foo"', () => {
      const value = 'foo';
      const output = new Valide(value).excludes('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value `["foo"]`', () => {
      const value = ['foo'];
      const output = new Valide(value).excludes('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value `["bar"]`', () => {
      const value = ['bar'];
      const output = new Valide(value).excludes('foo');

      expect(output.check()).toBe(true);
    });

    it('validates value "A foo bar"', () => {
      const value = 'A foo bar';
      const output = new Valide(value).excludes('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value "bar"', () => {
      const value = 'bar';
      const output = new Valide(value).excludes('foo');

      expect(output.check()).toBe(true);
    });
  });

  describe('`equal` method', () => {
    beforeEach(() => {
      Valide.language = 'en';
    });

    it('validates value `undefined`', () => {
      const value = undefined;
      const output = new Valide(value).equal('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value `null`', () => {
      const value = null;
      const output = new Valide(value).equal('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value `true`', () => {
      const value = true;
      const output = new Valide(value).equal('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value "foo"', () => {
      const value = 'foo';
      const output = new Valide(value).equal('foo');

      expect(output.check()).toBe(true);
    });

    it('validates value `["foo"]`', () => {
      const value = ['foo'];
      const output = new Valide(value).equal(['foo']);

      expect(output.check()).toBe(true);
    });

    it('validates value "A foo bar"', () => {
      const value = 'A foo bar';
      const output = new Valide(value).equal('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value "bar"', () => {
      const value = 'bar';
      const output = new Valide(value).equal('foo');

      expect(output.check()).not.toBe(true);
    });
  });

  describe('`notEqual` method', () => {
    beforeEach(() => {
      Valide.language = 'en';
    });

    it('validates value `undefined`', () => {
      const value = undefined;
      const output = new Valide(value).notEqual('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value `null`', () => {
      const value = null;
      const output = new Valide(value).notEqual('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value `true`', () => {
      const value = true;
      const output = new Valide(value).notEqual('foo');

      expect(output.check()).toBe(true);
    });

    it('validates value "foo"', () => {
      const value = 'foo';
      const output = new Valide(value).notEqual('foo');

      expect(output.check()).not.toBe(true);
    });

    it('validates value `["foo"]`', () => {
      const value = ['foo'];
      const output = new Valide(value).notEqual(['foo']);

      expect(output.check()).not.toBe(true);
    });

    it('validates value "A foo bar"', () => {
      const value = 'A foo bar';
      const output = new Valide(value).notEqual('foo');

      expect(output.check()).toBe(true);
    });

    it('validates value "bar"', () => {
      const value = 'bar';
      const output = new Valide(value).notEqual('foo');

      expect(output.check()).toBe(true);
    });
  });

  describe('`min` method', () => {
    beforeEach(() => {
      Valide.language = 'en';
    });

    it('validates value `undefined`', () => {
      const value = undefined;
      const output = new Valide(value).min(3);

      expect(output.check()).not.toBe(true);
    });

    it('validates value `null`', () => {
      const value = null;
      const output = new Valide(value).min(3);

      expect(output.check()).not.toBe(true);
    });

    it('validates value `true`', () => {
      const value = true;
      const output = new Valide(value).min(3);

      expect(output.check()).not.toBe(true);
    });

    it('validates value "foo"', () => {
      const value = 'foo';
      const output = new Valide(value).min(3);

      expect(output.check()).toBe(true);
    });

    it('validates value `[1,2,3]`', () => {
      const value = [1,2,3];
      const output = new Valide(value).min(3);

      expect(output.check()).toBe(true);
    });

    it('validates value "a"', () => {
      const value = 'a';
      const output = new Valide(value).min(3);

      expect(output.check()).not.toBe(true);
    });

    it('validates value "Foo Fox"', () => {
      const value = 'Foo Fox';
      const output = new Valide(value).min(3);

      expect(output.check()).toBe(true);
    });
  });

  describe('`max` method', () => {
    beforeEach(() => {
      Valide.language = 'en';
    });

    it('validates value `undefined`', () => {
      const value = undefined;
      const output = new Valide(value).max(3);

      expect(output.check()).not.toBe(true);
    });

    it('validates value `null`', () => {
      const value = null;
      const output = new Valide(value).max(3);

      expect(output.check()).not.toBe(true);
    });

    it('validates value `true`', () => {
      const value = true;
      const output = new Valide(value).max(3);

      expect(output.check()).not.toBe(true);
    });

    it('validates value ""', () => {
      const value = '';
      const output = new Valide(value).max(3);

      expect(output.check()).toBe(true);
    });

    it('validates value "foo"', () => {
      const value = 'foo';
      const output = new Valide(value).max(3);

      expect(output.check()).not.toBe(true);
    });

    it('validates value `[1,2,3]`', () => {
      const value = [1,2,3];
      const output = new Valide(value).max(3);

      expect(output.check()).not.toBe(true);
    });

    it('validates value "a"', () => {
      const value = 'a';
      const output = new Valide(value).max(3);

      expect(output.check()).toBe(true);
    });

    it('validates value "Foo Fox"', () => {
      const value = 'Foo Fox';
      const output = new Valide(value).max(3);

      expect(output.check()).not.toBe(true);
    });
  });

  describe('`email` method', () => {
    beforeEach(() => {
      Valide.language = 'en';
    });

    it('validates value `undefined`', () => {
      const value = undefined;
      const output = new Valide(value).email();

      expect(output.check()).not.toBe(true);
    });

    it('validates value `null`', () => {
      const value = null;
      const output = new Valide(value).email();

      expect(output.check()).not.toBe(true);
    });

    it('validates value `true`', () => {
      const value = true;
      const output = new Valide(value).email();

      expect(output.check()).not.toBe(true);
    });

    it('validates value ""', () => {
      const value = '';
      const output = new Valide(value).email();

      expect(output.check()).toBe(true);
    });

    it('validates value "foo"', () => {
      const value = 'foo';
      const output = new Valide(value).email();

      expect(output.check()).not.toBe(true);
    });

    it('validates value "m@"', () => {
      const value = 'm@';
      const output = new Valide(value).email();

      expect(output.check()).not.toBe(true);
    });

    it('validates value "m@a"', () => {
      const value = 'm@a';
      const output = new Valide(value).email();

      expect(output.check()).not.toBe(true);
    });

    it('validates value "m@a."', () => {
      const value = 'm@a.';
      const output = new Valide(value).email();

      expect(output.check()).not.toBe(true);
    });

    it('validates value "m@a.l"', () => {
      const value = 'm@a.l';
      const output = new Valide(value).email();

      expect(output.check()).toBe(true);
    });
  });
});
