import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const tests = [
  {
    file1: 'file1.json', file2: 'file2.json', formatter: 'stylish', output: 'resultStylish.txt',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', formatter: 'stylish', output: 'resultStylish.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', formatter: 'plain', output: 'resultPlain.txt',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', formatter: 'plain', output: 'resultPlain.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', formatter: 'json', output: 'outputresult.json',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', formatter: 'json', output: 'outputresult.json',
  },
];

test.each(tests)('gendiff stylish, plain and json tests', ({
  file1, file2, output, formatter,
}) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expected = readFile(output);
  const result = genDiff(filepath1, filepath2, formatter);
  expect(result).toEqual(expected);
});

test('should set default formatter', () => {
  const formatter = 'file1.json';
  const defaultFormatter = 'json';
  expect(genDiff(getFixturePath(formatter), getFixturePath(formatter)))
    .toBe(defaultFormatter);
});
