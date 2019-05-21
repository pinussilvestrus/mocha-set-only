#! /usr/bin/env node
const fs = require('fs');

const mri = require('mri');

const {
  help,
  ...args
} = mri(process.argv, {
  alias: {
    file: [ 'f' ],
    help: [ 'h' ],
    test: [ 't' ],
  },
  string: ['f', 't'],
  default: {
    help: false
  }
});


if (help) {

  printHelp();

  process.exit(0);
}

run(args);

async function run(options) {

  let {
    file,
    test
  } = options;

  test = test[1] || '';

  if (!file || !test) {

    console.error('File and Test name have to be provided!');
    printHelp();

    process.exit(1);
  }

  const f = fs.readFileSync(file);

  const contents = f.toString('utf8');

  const updated = contents.replace(`('${test}`, `.only('${test}`);

  fs.writeFileSync(file, updated);

}

function printHelp() {
  console.log(`usage: node index.js [-f FILE_NAME] [-t TEST_NAME]
    Sets a karma-mocha test to only.
    Options:
        -f, --file=FILE_NAME          test in which the file is located
        -t, --test=TEST_NAME          test label
        -h, --help                    print this help
    `);
}