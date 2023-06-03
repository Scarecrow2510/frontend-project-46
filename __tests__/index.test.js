import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (ident) => path.join(__dirname, '../..', '__fixtures__', ident);

const formatterSet = [
  {
    a: 'jsonFile1.json', b: 'yamlFile2.yml', expected: 'stylishOutput.txt', format: 'stylish',
  },
  {
    a: 'yamlFile1.yaml', b: 'jsonFile2.json', expected: 'plainOutput.txt', format: 'plain',
  },
  {
    a: 'jsonFile1.json', b: 'jsonFile2.json', expected: 'jsonOutput.txt', format: 'json',
  },
];

test.each(formatterSet)('$format formatter of gendiff', ({
  a, b, expected, format,
}) => {
  expect(genDiff(getFixturePath(a), getFixturePath(b), format))
    .toEqual(readFileSync(getFixturePath(expected), 'utf-8'));
});
