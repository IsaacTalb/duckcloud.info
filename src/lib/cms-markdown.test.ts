import assert from 'node:assert/strict';
import test from 'node:test';
import { markdownToHtml } from './cms.ts';

test('renders headings, paragraphs, emphasis, links, lists, and inline code', () => {
  const rendered = markdownToHtml(`# Guide\n\nFirst **bold** and *italic* paragraph with [a local tool](/tools/json-formatter) and \`code\`.\n\n- One\n- Two`);
  assert.match(rendered.html, /<h1 id="guide">Guide<\/h1>/);
  assert.match(rendered.html, /<p>First <strong>bold<\/strong> and <em>italic<\/em> paragraph/);
  assert.match(rendered.html, /<a href="\/tools\/json-formatter"/);
  assert.match(rendered.html, /<code>code<\/code>/);
  assert.match(rendered.html, /<ul><li>One<\/li><li>Two<\/li><\/ul>/);
});

test('renders safe tables and escapes untrusted HTML', () => {
  const rendered = markdownToHtml(`| Field | Value |\n|---|---|\n| name | <script>alert(1)</script> |`);
  assert.match(rendered.html, /<table>/);
  assert.match(rendered.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(rendered.html, /<script>/);
});

test('builds a table of contents from unique level-two and level-three headings', () => {
  const rendered = markdownToHtml(`## Setup\n\nText.\n\n### Check\n\nText.\n\n## Setup\n\nText.`);
  assert.deepEqual(rendered.toc, [
    { id: 'setup', text: 'Setup', level: 2 },
    { id: 'check', text: 'Check', level: 3 },
    { id: 'setup-2', text: 'Setup', level: 2 },
  ]);
});
