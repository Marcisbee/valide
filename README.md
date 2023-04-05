# Valide

[![discord](https://dcbadge.vercel.app/api/server/a62gfaDW2e?style=flat-square)](https://discord.gg/a62gfaDW2e)

Valide is simple, chainable, multi lingual data validator.

## Installation

To install the stable version:

```
npm install --save valide
```

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

If you're not, you can [access these files on unpkg](https://unpkg.com/valide/dist/), download them, or point your package manager to them.

#### Browser Compatibility

Valide.js currently is compatible with browsers that support at least ES3.

## Example usage

```js
import { Valide } from 'valide';

function validateEmail(value) {
  return new Valide(value)
    .required()
    .email()
    .error('E-mail :email is invalid!', { email: value })
    .check();
}

validateEmail(''); // -> "Field is required"
validateEmail('foo'); // -> "E-mail foo is invalid!"
validateEmail('foo@example.com'); // -> true
```

Valide chain must always end with `.check()` to evaluate value.
Check method also can take in new value to check against rule set.

Every rule can have custom error message. To add it, simply chain `.error(string [, params])` after rule. By default every rule has english error message.

### Currently available rules:

- `.required()`
- `.test(regex)`
- `.includes(string)`
- `.excludes(string)`
- `.equal(string)`
- `.notEqual(string)`
- `.min(number)`
- `.max(number)`
- `.email(string)`

---

- `.error(string [, params])`

## Stay In Touch

- [Twitter](https://twitter.com/radi_js)
- [Slack](https://join.slack.com/t/radijs/shared_invite/enQtMjk3NTE2NjYxMTI2LWFmMTM5NTgwZDI5NmFlYzMzYmMxZjBhMGY0MGM2MzY5NmExY2Y0ODBjNDNmYjYxZWYxMjEyNjJhNjA5OTJjNzQ)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Marcis (Marcisbee) Bergmanis
