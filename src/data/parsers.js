import YAML from 'js-yaml';

const parsingConfig = {
  '.json': JSON.parse,
  '.yaml': YAML.parse,
  '.yml': YAML.parse,
};

export default (fileData, fileExt) => {
  try {
    return parsingConfig[fileExt](fileData);
  } catch (e) {
    return 'Invalid parsing result!';
  }
};
