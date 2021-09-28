import _ from 'lodash';

const formDiff = (data1, data2) => {
  const getDiff = (node1, node2, key) => {
    if (!_.has(node1, key)) return { key, status: 'added', value: node2[key] };
    if (!_.has(node2, key)) return { key, status: 'deleted', value: node1[key] };
    if (_.isObject(node1[key]) && _.isObject(node2[key])) return { key, status: 'nested', descendants: formDiff(node1[key], node2[key]) };
    if (node1[key] === node2[key]) return { key, status: 'unchanged', value: node1[key] };
    return {
      key, status: 'changed', value1: node1[key], value2: node2[key],
    };
  };

  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const sotredAllKeys = _.sortBy(_.union(data1Keys, data2Keys));

  return sotredAllKeys.map((key) => getDiff(data1, data2, key));
};

export default formDiff;
