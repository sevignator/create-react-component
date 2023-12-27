const stylingOptions = {
  'vanilla-extract': 'import * as styles from "vanilla-extract"',
};

export function getTemplate(componentName, lang, styling) {
  const template = `
    import React from 'react'
    ${styling ? stylingOptions[styling] : ''}

    ${lang === 'ts' ? 'type Props = {}' : ''}

    function ${componentName}() {
      return <div></div>
    }

    export default ${componentName}
  `;

  return template;
}
