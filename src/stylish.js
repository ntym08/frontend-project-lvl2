import _ from 'lodash';

const makeStylish = (value) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const replacer = ' ';
    const indentSize = depth * 4;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - 4);
    const lines = Object.keys(currentValue).map((key) => `${currentIndent}${key}: ${iter(currentValue[key], depth + 1)}`);

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(value, 1);
};

export default makeStylish;
