const fs = require('fs');
const p = require('process');

try {
  if (process.argv.length === '3') {
    throw new Error('Wrong number of arguments');
  }
} catch (e) {
  console.error(e);
  p.exit(1);
}

function foo(path) {
  const res = fs.statSync(path);
  if (res === undefined) {
    return 'Doesnt exist';
  }
  if (res.isDirectory()) return 'Directory';
  if (res.isFile()) {
    const data = fs.readFileSync(path, 'utf-8');
    console.log(data);
    return 'File';
  }
  return 'Not a file or dir';
}

// console.log(foo(process.argv[2]));

module.exports = foo;
