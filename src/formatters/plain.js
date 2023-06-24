import _ from 'lodash';

const checkValueFormat = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff, fileName = []) => {
  const {
    type, children, name, value, value1, value2,
  } = diff;
  const nestedKeys = [...fileName, name];
  const joinPath = nestedKeys.join('.');
  switch (type) {
    case 'root': {
      const result = children
        .filter((child) => child.type !== 'unchanged')
        .flatMap((child) => plain(child, []));
      return result.join('\n');
    }
    case 'nested': {
      const result = children
        .filter((child) => child.type !== 'unchanged')
        .flatMap((child) => plain(child, nestedKeys));
      return result.join('\n');
    }
    case 'added':
      return `Property '${joinPath}' was added with value: ${checkValueFormat(value)}`;
    case 'deleted':
      return `Property '${joinPath}' was removed`;
    case 'changed':
      return `Property '${joinPath}' was updated. From ${checkValueFormat(value1)} to ${checkValueFormat(value2)}`;
    default:
      throw new Error(`Type: ${type} is undefined`);
  }
};

export default plain;
