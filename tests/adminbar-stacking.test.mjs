import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, '../src/styles/globalchatbotlauncher.css');
const deployed = resolve(here, '../../../assets/globalchatbotlauncher/styles/globalchatbotlauncher.css');

function dockedZIndex(css) {
	const match = css.match(/#base3-chatbot-panel\.mode-docked\s*\{([^}]+)\}/);
	assert.ok(match, 'Docked launcher style must exist.');
	const value = match[1].match(/z-index:\s*(\d+)/);
	assert.ok(value, 'Docked launcher must define its stacking level.');
	return Number(value[1]);
}

test('docked launcher is above the WordPress administration toolbar', () => {
	const css = readFileSync(source, 'utf8');
	assert.ok(dockedZIndex(css) > 99999, 'The WordPress admin toolbar uses z-index 99999.');
});

test('published CSS is byte-identical to the source CSS', () => {
	assert.equal(readFileSync(deployed, 'utf8'), readFileSync(source, 'utf8'));
});
