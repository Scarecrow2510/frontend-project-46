import _ from 'lodash';
import getPrefix from 'get-prefix';

const makeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const valueFromation = (data, stylish, depth = 1) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const result = keys.map((name) => {
    const value = data[name];
    return stylish({ name, value, type: 'unchanged' }, depth + 1);
  });
  return `{\n${result.join('\n')}\n  ${makeIndent(depth)}}`;
};

const stylish = (diff, depth = 0) => {
  const {
    name, value, type, value1, value2, children,
  } = diff;

  switch (type) {
    case 'root': {
      const resultLine = children.flatMap((child) => stylish(child, depth + 1));
      return `{\n${resultLine.join('\n')}\n}`;
    }
    case 'nested': {
      const resultLine = children.flatMap((child) => stylish(child, depth + 1));
      return `${makeIndent(depth)}  ${name}: {\n${resultLine.join('\n')}\n${makeIndent(depth)}  }`;
    }
    case 'added':
      return `${makeIndent(depth)}+ ${name}: ${valueFromation(value, stylish, depth)}`;
    case 'deleted':
      return `${makeIndent(depth)}- ${name}: ${valueFromation(value, stylish, depth)}`;
    case 'unchanged': {
      if ('value' in diff) {
        return `${makeIndent(depth)}${getPrefix(diff.type)} ${name}: ${valueFromation(diff.value, stylish, depth)}`;
      }
      throw new Error(`Field ${value} is missing in ${diff.type} type`);
    }
    case 'changed': {
      if ('value1' in diff && 'value2' in diff) {
        const removed = `${makeIndent(depth)}- ${name}: ${valueFromation(diff.value1, stylish, depth)}`;
        const added = `${makeIndent(depth)}+ ${name}: ${valueFromation(diff.value2, stylish, depth)}`;
        return `${removed}\n${added}`;
      }
      throw new Error(`Fields ${value1} or ${value2} are missing in ${diff.type} type`);
    }
    default:
      throw new Error(`Type: ${type} is undefined`);
  }
};

export default stylish;
