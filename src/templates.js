const stylingOptions = {
  'vanilla-extract': 'import * as styles from "vanilla-extract"',
};

export function getIndexTemplate(componentName) {
  return `
    export * from "./${componentName}"
    export { default } from "./${componentName}"
  `;
}

export function getComponentTemplate(componentName, lang, styling) {
  return `
    import React from 'react'
    ${styling ? stylingOptions[styling] : ''}

    ${lang === 'ts' ? 'type Props = {}' : ''}

    function ${componentName}() {
      return <div></div>
    }

    export default ${componentName}
  `;
}

export function getStylingTemplate() {}
