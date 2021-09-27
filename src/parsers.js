import yaml from 'js-yaml';

export default (data, dataFormat) => {
  if (dataFormat === '.yml' || dataFormat === '.yaml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};
