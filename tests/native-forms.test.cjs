/* CommonJS loader transpiles real TSX components without adding a test framework dependency. */
/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
require.extensions['.css'] = (module) => { module.exports = new Proxy({}, { get: (_, key) => key }); };
require.extensions['.tsx'] = require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8').replaceAll('"@/', '"' + root + '/src/');
  module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
};
const standard = 'g6ZbBzkJ8UoG66SlyX7P';
const rv = 'BrRXsepTbATAcuEXreoT';

test('legacy token-dependent quote API and exclusive bot protection initialization are retired', () => {
  assert.equal(fs.existsSync(path.join(root, 'src/app/api/quote/route.ts')), false, 'Legacy quote route must not remain reachable');
  assert.equal(fs.existsSync(path.join(root, 'src/instrumentation-client.ts')), false);
  assert.doesNotMatch(fs.readFileSync(path.join(root, 'next.config.ts'), 'utf8'), /withBotId/);
  for (const file of ['Contact.tsx', 'QuotePopup.tsx', 'NativeQuoteForm.tsx']) {
    assert.doesNotMatch(fs.readFileSync(path.join(root, 'src/components', file), 'utf8'), /\/api\/quote|HIGHLEVEL.*TOKEN|leadconnectorhq.com\/contacts/);
  }
});

test('existing popup embeds the native form without adding popups to vehicle pages', () => {
  const popup = fs.readFileSync(path.join(root, 'src/components/QuotePopup.tsx'), 'utf8');
  assert.match(popup, /<NativeQuoteForm quoteType=\{quoteType\} placement="popup"/);
  assert.doesNotMatch(popup, /fetch\(|<form[ >]/);
  const vehicle = fs.readFileSync(path.join(root, 'src/app/vehicles/[slug]/page.tsx'), 'utf8');
  assert.doesNotMatch(vehicle, /<QuotePopup/);
  assert.match(vehicle, /<Contact quoteType=\{slug === "rv" \? "rv" : "standard"\}/);
});

test('standard native embed renders the public form and supported script without a custom submitter', () => {
  const filename = path.join(root, 'src/components/NativeQuoteForm.tsx');
  assert.ok(fs.existsSync(filename), 'Reusable native quote form must exist');
  const NativeQuoteForm = require(filename).default;
  const html = renderToStaticMarkup(React.createElement(NativeQuoteForm, { placement: 'contact' }));
  assert.match(html, new RegExp('https://link.eic.agency/widget/form/' + standard));
  assert.match(html, /title="CBA Glass quote request"/);
  assert.match(html, /data-layout="\{&quot;id&quot;:&quot;INLINE&quot;\}"/);
  assert.match(fs.readFileSync(filename, 'utf8'), /https:\/\/link.msgsndr.com\/js\/form_embed.js/);
  assert.doesNotMatch(html, /<form[ >]/);
});

test('contact uses native standard and RV forms with no custom submitter', () => {
  const Contact = require(path.join(root, 'src/components/Contact.tsx')).default;
  for (const [quoteType, id] of [['standard', standard], ['rv', rv]]) {
    const html = renderToStaticMarkup(React.createElement(Contact, { quoteType }));
    assert.match(html, new RegExp('widget/form/' + id));
    assert.match(html, /tel:6232171310/);
    assert.doesNotMatch(html, /<form[ >]/);
  }
});
