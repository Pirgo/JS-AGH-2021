const assert = require('assert');
const foo = require('../zad2/zad2');

describe('The foo function', () => {
  it('File for t.txt', () => {
    assert.strictEqual(foo('./zad2/t.txt'), 'File');
  });
  it('Dir for zad2', () => {
    assert.strictEqual(foo('/home/pirgo/Documents/JS-AGH-2021/lab4/math/zad2'), 'Directory');
  });
});
