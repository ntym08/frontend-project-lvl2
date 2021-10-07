import _ from 'lodash';

const indentType = ' ';
const spacesCount = 4;
const signUnchanged = ' ';
const signRemoved = '-';
const signAdded = '+';

const setIndent = (depth, spaces = 2) => indentType.repeat(depth * spacesCount - spaces);

const stringify = (value, depth) => {
  if (!_.isObject(value)) return value;
  const lines = Object.entries(value).map(([key, val]) => `${setIndent(depth)}  ${key}: ${stringify(val, depth + 1)}`);
  return ['{', ...lines, `${setIndent(depth, spacesCount)}}`].join('\n');
};

const makeStylish = (diff) => {
  const iter = (currentValue, depth) => {
    const makeString = (object) => {
      switch (object.status) {
        case 'nested':
          return `${setIndent(depth)}${signUnchanged} ${object.key}: ${iter(object.descendants, depth + 1)}`;
        case 'added':
          return `${setIndent(depth)}${signAdded} ${object.key}: ${stringify(object.value, depth + 1)}`;
        case 'unchanged':
          return `${setIndent(depth)}${signUnchanged} ${object.key}: ${stringify(object.value, depth + 1)}`;
        case 'removed':
          return `${setIndent(depth)}${signRemoved} ${object.key}: ${stringify(object.value, depth + 1)}`;
        case 'updated':
          return `${setIndent(depth)}${signRemoved} ${object.key}: ${stringify(object.value1, depth + 1)}\n${setIndent(depth)}${signAdded} ${object.key}: ${stringify(object.value2, depth + 1)}`;
        default:
          throw new Error(`Unknown status: '${object.status}'!`);
      }
    };
    const result = currentValue.map((item) => makeString(item));
    return ['{', ...result, `${setIndent(depth, spacesCount)}}`].join('\n');
  };
  return iter(diff, 1);
};

export default makeStylish;
