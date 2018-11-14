export function validValue(value) {
  return !!(typeof value === 'string'
    || typeof value === 'number'
    || value);
}

export const strings = {
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

export const language = {
  default: 'en',
  current: 'en',
};

export function translateKey(key, params) {
  const string = strings[language.current] || strings[language.default];

  if (!string) {
    console.warn(`[Valide] No keys for language "${language.current}" found.`);
  }

  if (string && !string[key]) {
    console.warn(`[Valide] No such key "${key}" for language "${language.current}" found.`);
  }

  return translateValue(strings[language.current][key], params);
}

export function translateValue(value, params = {}) {
  const paramList = Object.keys(params)
    .map(value => `:${value}`)
    .join('|');

  return value.replace(
    new RegExp(paramList, 'g'),
    (match) => (
      params[match.substr(1)] || match
    )
  );
}
