import fs from 'fs';
import path from 'path';
import diffTree from './findDiff.js';
import getParser from './parsers.js';
import getFormat from './formatters/index.js';

const getFileFormat = (filepath) => path.extname(filepath).slice(1);
const getPathFile = (filepath) => path.resolve(process.cwd(), filepath).trim();
const readFile = (filepath) => fs.readFileSync(getPathFile(filepath), 'utf-8');

const genDiff = (filepath1, filepath2, format = undefined) => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);
  const data1 = getParser(content1, getFileFormat(filepath1));
  const data2 = getParser(content2, getFileFormat(filepath2));
  const diff = diffTree(data1, data2);
  return getFormat(diff, format);
};

export default genDiff;
