import yaml from 'js-yaml';

export default (data, dataFormat) => {
  switch (dataFormat) {
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown data format: '${dataFormat}'!`);
  }
};
