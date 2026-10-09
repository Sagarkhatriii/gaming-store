const assert = require('node:assert/strict');
const fs = require('node:fs');
const {products, normalizeCart, totals, filterProducts} = require('./dist/app.js');
assert.equal(products.length, 8);
assert.equal(filterProducts('GPUs', '', 'featured').length, 2);
assert.equal(filterProducts('All', ' PHANTOM ', 'featured')[0].id, 'audio-phantom');
assert.equal(filterProducts('CPUs', 'phantom', 'featured').length, 0);
assert.equal(filterProducts('All', '', 'low')[0].id, 'mouse-ghost');
assert.equal(filterProducts('All', '', 'high')[0].id, 'gpu-apex');
assert.deepEqual(normalizeCart({'gpu-apex':-1, 'cpu-core':3, unknown:50, 'audio-phantom':'2'}), {'cpu-core':3});
assert.deepEqual(normalizeCart({'gpu-apex':500}), {'gpu-apex':99});
assert.deepEqual(normalizeCart(null), {});
assert.deepEqual(normalizeCart([]), {});
assert.deepEqual(totals({'gpu-apex':2, 'audio-phantom':1}), {count:3, subtotal:194700});
assert.deepEqual(totals({}), {count:0, subtotal:0});
for (const p of products) assert.ok(fs.existsSync(`${__dirname}/dist/assets/${p.image}.svg`));
const html = fs.readFileSync(`${__dirname}/dist/index.html`, 'utf8');
for (const file of ['style.css', 'app.js']) {assert.ok(html.includes(file));assert.ok(fs.existsSync(`${__dirname}/dist/${file}`));}
console.log('Passed: catalogue, category/search filters, sorting, cart validation, totals, limits, and local assets.');
