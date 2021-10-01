const makeStylish = (diff) => {
  const iter = (currentValue, depth) => {
    const signUnchanged = '  ';
    const signDeleted = '- ';
    const signAdded = '+ ';
    const indentType = ' ';
    const spacesCount = 4;
    const indentSize = depth * spacesCount;
    const currentIndent = indentType.repeat(indentSize - 2);
    const bracketIndent = indentType.repeat(indentSize - spacesCount);

    const makeString = (object) => {
      if (object.status === 'nested') {
        return `${currentIndent}${signUnchanged}${object.key}: ${iter(object.descendants, depth + 1)}`;
      }
      if (object.status === 'added') {
        return `${currentIndent}${signAdded}${object.key}: ${object.value}`;
      }
      if (object.status === 'unchanged') {
        return `${currentIndent}${signUnchanged}${object.key}: ${object.value}`;
      }
      if (object.status === 'deleted') {
        return `${currentIndent}${signDeleted}${object.key}: ${object.value}`;
      }
      return `${currentIndent}${signDeleted}${object.key}: ${object.value1}\n${currentIndent}${signAdded}${object.key}: ${object.value2}`;
    };

    const result = currentValue.map((item) => makeString(item));
    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };
  return iter(diff, 1);
};

export default makeStylish;
