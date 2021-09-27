import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const getDataFormat = (filePath) => path.extname(filePath);

const getContentOfFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return data;
};

const getNormalizedContent = (filePath) => {
  const data = getContentOfFile(filePath);
  const dataFormat = getDataFormat(filePath);
  return parse(data, dataFormat);
};

const genDiff = (filePath1, filePath2) => {
  const data1 = getNormalizedContent(filePath1);
  const data2 = getNormalizedContent(filePath2);

  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);

  const sotredAllKeys = _.sortBy(_.union(data1Keys, data2Keys));

  const diff = sotredAllKeys.reduce((acc, key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        return `${acc}    ${key}: ${data1[key]}\n`;
      }
      return `${acc}  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return `${acc}  - ${key}: ${data1[key]}\n`;
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return `${acc}  + ${key}: ${data2[key]}\n`;
    }
    return acc;
  }, '');
  return `{\n${diff}}`;
};

export default genDiff;
