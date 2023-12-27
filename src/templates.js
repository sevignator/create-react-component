import { prettify } from './utils.js';

const stylingOptions = {
  'vanilla-extract': 'import * as styles from "vanilla-extract"',
};

export async function getIndexTemplate(componentName) {
  return await prettify(`
    export * from "./${componentName}"
    export { default } from "./${componentName}"
  `);
}

export async function getComponentTemplate(componentName, lang, styling) {
  return await prettify(`
    import React from 'react'
    ${styling ? stylingOptions[styling] : ''}

    function ${componentName}() {
      return <div></div>
    }

    export default ${componentName}
  `);
}

export function getStylingTemplate() {}
