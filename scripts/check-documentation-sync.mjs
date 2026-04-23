import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const docsDir = path.join(process.cwd(), 'docs');
const masterPath = path.join(docsDir, 'USER_WIKI_FULL_DOCUMENTATION.md');
const spanishPath = path.join(docsDir, 'USER_WIKI_FULL_DOCUMENTATION.es.md');
const metaPath = path.join(docsDir, 'USER_WIKI_FULL_DOCUMENTATION.es.meta.json');

function hash(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function isTableOfContents(title) {
  return /^(table of contents|tabla de contenido|tabla de contenidos)$/i.test(title.trim());
}

function parseSections(markdown) {
  const headingRegex = /^##\s+(.+)$/gm;
  const matches = [...markdown.matchAll(headingRegex)].filter(
    (match) => !isTableOfContents(match[1])
  );

  return matches.map((match, index) => {
    const title = match[1].trim();
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? markdown.length;
    const content = markdown.slice(start, end).trim();
    const numberedMatch = title.match(/^(\d+(?:\.\d+)*)\.?\s+/);

    return {
      key: numberedMatch ? numberedMatch[1] : `section-${String(index + 1).padStart(2, '0')}`,
      title,
      hash: hash(content),
    };
  });
}

const masterSections = parseSections(fs.readFileSync(masterPath, 'utf8').replace(/\r\n/g, '\n'));
const spanishSections = parseSections(fs.readFileSync(spanishPath, 'utf8').replace(/\r\n/g, '\n'));
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const issues = [];

if (masterSections.length !== spanishSections.length) {
  issues.push(
    `Section count mismatch: master has ${masterSections.length}, Spanish has ${spanishSections.length}.`
  );
}

for (const section of masterSections) {
  const translatedSection = spanishSections.find((item) => item.key === section.key);
  if (!translatedSection) {
    issues.push(`Missing Spanish section for key ${section.key} (${section.title}).`);
    continue;
  }

  if (meta[section.key] !== section.hash) {
    issues.push(`Outdated translation for key ${section.key} (${section.title}).`);
  }
}

if (issues.length > 0) {
  console.error('Documentation sync check failed:');
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log('Documentation sync check passed.');