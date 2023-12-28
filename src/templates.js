import { prettify } from './utils.js';

export async function getConfigTemplate(defaults) {
  return prettify(JSON.stringify(defaults), 'json');
}

export async function getIndexTemplate(componentName) {
  return prettify(`
    export * from "./${componentName}"
    export { default } from "./${componentName}"
  `);
}

export async function getComponentTemplate(componentName, lang, styling) {
  console.log(styling);
  const stylingOptions = {
    'vanilla-extract': 'import * as styles from "vanilla-extract"',
  };

  return prettify(`
    import React from 'react'
    ${stylingOptions[styling] ? stylingOptions[styling] : ''}

    function ${componentName}() {
      return <div></div>
    }

    export default ${componentName}
  `);
}

export function getStylingTemplate() {}
