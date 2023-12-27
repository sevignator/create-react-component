import { prettify } from './utils.js';

const stylingOptions = {
  'vanilla-extract': 'import * as styles from "vanilla-extract"',
};

export async function getIndexTemplate(componentName) {
  try {
    return await prettify(`
      export * from "./${componentName}"
      export { default } from "./${componentName}"
    `);
  } catch (e) {
    console.error(e.message);
  }
}

export async function getComponentTemplate(componentName, lang, styling) {
  try {
    return await prettify(`
      import React from 'react'
      ${stylingOptions[styling] ? stylingOptions[styling] : ''}

      function ${componentName}() {
        return <div></div>
      }

      export default ${componentName}
    `);
  } catch (e) {
    console.error(e.message);
  }
}

export function getStylingTemplate() {}
