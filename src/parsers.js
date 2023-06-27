import { load } from 'js-yaml';

const getParser = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return load(data);
    default:
      throw new Error(`Unknown format: ${format}. You can use JSON or YAML formats.`);
  }
};

export default getParser;
