import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';
import readFile from './readfile.js';

const mergeKeys = (data1, data2) => _.union(Object.keys(data1), Object.keys(data2));

const getChildrenValues = (node, data1, data2) => [_.get(data1, node), _.get(data2, node)];

const buildTree = (data1, data2) => {
  const sortedKeys = _.sortBy(mergeKeys(data1, data2));
  return sortedKeys.flatMap((key) => {
    const [value1, value2] = getChildrenValues(key, data1, data2);
    switch (true) {
      case (_.isPlainObject(value1) && _.isPlainObject(value2)):
        return { key, type: 'nested', children: buildTree(value1, value2) };
      case (_.isEqual(value1, value2)):
        return { key, type: 'unchanged', children: value1 };
      case (_.has(data1, key) && _.has(data2, key)): {
        return { key, type: 'changed', children: { old: value1, new: value2 } };
      }
      case (!value1 || !value2): {
        const children = value1 || value2;
        const newType = value1 ? 'deleted' : 'added';
        return { key, type: newType, children };
      }
      default: {
        throw new Error('Unexpected result of comparing!');
      }
    }
  });
};

export default (path1, path2, formatName = 'stylish') => {
  const [fileData1, fileExt1] = readFile(path1);
  const dataObject1 = parse(fileData1, fileExt1);

  const [fileData2, fileExt2] = readFile(path2);
  const dataObject2 = parse(fileData2, fileExt2);

  const result = buildTree(dataObject1, dataObject2);
  return format(result, formatName);
};
