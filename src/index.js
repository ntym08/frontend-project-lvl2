import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import formDiff from './formDiff.js';
import formatDiff from './formatters/index.js';

const getDataFormat = (filePath) => path.extname(filePath).slice(1);

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

const getDiff = (filePath1, filePath2) => {
  const data1 = getNormalizedContent(filePath1);
  const data2 = getNormalizedContent(filePath2);
  const diff = formDiff(data1, data2);
  return diff;
};

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const diff = getDiff(filePath1, filePath2);
  return formatDiff(diff, formatName);
};

export default genDiff;
