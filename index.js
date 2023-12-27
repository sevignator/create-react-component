import { Option, program } from 'commander';

program
  .argument('<component-name>', 'new component name')
  .option('--typescript', 'create files using the `.ts` and `.tsx` extensions')
  .addOption(
    new Option('--styling <choice>', 'specify a styling library').choices([
      'vanilla-extract',
    ])
  );

program.parse();

const componentName = program.args[0];
const options = program.opts();

console.log({
  componentName,
  options,
});
