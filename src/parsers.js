import YAML from 'yaml';

const parsingConfig = {
  '.json': JSON.parse,
  '.yaml': YAML.parse,
  '.yml': YAML.parse,
};

export default (data, extension) => {
  try {
    return parsingConfig[extension](data);
  } catch (e) {
    throw new Error(`Invalid parsing '${parsingConfig[extension](data)}' result!`);
  }
};
