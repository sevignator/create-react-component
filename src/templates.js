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
  const stylingOptions = {
    'vanilla-extract': `import * as styles from "./${componentName}.css.${lang}"`,
  };

  return prettify(`
    import React from 'react'
    ${stylingOptions[styling] ? stylingOptions[styling] : ''}

    ${lang === 'ts' ? `export type ${componentName}Props = {}` : ''}

    function ${componentName}() {
      return <div></div>
    }

    export default ${componentName}
  `);
}

export function getStylingTemplate(styling) {
  const stylingOptions = {
    'vanilla-extract': 'import { style } from "@vanilla-extract/css"',
  };

  return prettify(`
    ${stylingOptions[styling] ? stylingOptions[styling] : ''}
  `);
}
