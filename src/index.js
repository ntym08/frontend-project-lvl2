import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const readFile = (pathToFile) => {
  const fullPath = path.resolve(process.cwd(), pathToFile);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  return data;
};

const genDiff = (filepath1, filepath2) => {
  const file1Content = readFile(filepath1);
  const file2Content = readFile(filepath2);
};

export default genDiff;
