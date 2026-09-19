import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('public', { recursive: true });
for (const name of ['index.html','app.js','course-details.js','style.css','hero.webp','favicon.svg']) await copyFile(name, `public/${name}`);
