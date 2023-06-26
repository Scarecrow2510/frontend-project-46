import _ from 'lodash';

const findDiff = (data1, data2) => {
  const sortedKeys = _.sortBy(_.keys(data1), _.keys(data2));
  const result = sortedKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        name: key,
        children: findDiff(data1[key], data2[key]),
        type: 'nested',
      };
    }
    if (!_.has(data2, key)) {
      return {
        name: key,
        value: data1[key],
        type: 'deleted',
      };
    }
    if (!_.has(data1, key)) {
      return {
        name: key,
        value: data2[key],
        type: 'added',
      };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] !== data2[key]) {
        return {
          name: key,
          value1: data1[key],
          value2: data2[key],
          type: 'changed',
        };
      }
    }
    return {
      name: key,
      value: data1[key],
      type: 'unchanged',
    };
  });
  return result;
};

const diffTree = (data1, data2) => ({ type: 'root', children: findDiff(data1, data2) });
export default diffTree;
