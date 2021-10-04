import _ from 'lodash';

const getNormalizedValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const getString = (object, ancestry) => {
  const beginningOfString = `Property '${ancestry.join('.')}' was ${object.status}`;
  if (object.status === 'added') {
    return `${beginningOfString} with value: ${getNormalizedValue(object.value)}`;
  }
  if (object.status === 'removed') {
    return `${beginningOfString}`;
  }
  if (object.status === 'updated') {
    return `${beginningOfString}. From ${getNormalizedValue(object.value1)} to ${getNormalizedValue(object.value2)}`;
  }
  return [];
};

const makePlain = (diff) => {
  const iter = (currentValue, ancestry) => {
    const makeString = (object) => {
      const newAncestry = [...ancestry, object.key];
      if (object.status === 'nested') {
        return `${iter(object.descendants, newAncestry)}`;
      }
      return getString(object, newAncestry);
    };

    const result = currentValue.flatMap((item) => makeString(item));
    return result.join('\n');
  };
  return iter(diff, []);
};

export default makePlain;
