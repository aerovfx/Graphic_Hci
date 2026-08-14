import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');
const entries = [
  '.openai',
  'assets',
  'courses',
  'server',
  'tools',
  'index.html',
  'course.html',
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of entries) {
  await cp(resolve(root, entry), resolve(output, entry), { recursive: true });
}
await writeFile(
  resolve(output, '.openai/hosting.json'),
  '{}\n',
  'utf8',
);
console.log(`Built static site in ${output}`);
