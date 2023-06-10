/* eslint no-throw-literal: "error" */

import YAML from 'js-yaml';

export default (fileData, fileExt) => {
  switch (fileExt) {
    case 'json':
      return JSON.parse(fileData);
    case 'yml':
      return YAML.load(fileData);
    case 'yaml':
      return YAML.load(fileData);
    default:
      throw new Error(`Invalid format: ${fileExt}`);
  }
};
