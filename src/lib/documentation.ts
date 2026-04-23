import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { slugify, extractHeadings, type HeadingItem } from '@/lib/heading-id';

const DOCS_DIR = path.join(process.cwd(), 'docs');
const MASTER_DOC_PATH = path.join(DOCS_DIR, 'USER_WIKI_FULL_DOCUMENTATION.md');
const SPANISH_DOC_PATH = path.join(DOCS_DIR, 'USER_WIKI_FULL_DOCUMENTATION.es.md');

function isTableOfContents(title: string) {
  return /^(table of contents|tabla de contenido|tabla de contenidos)$/i.test(title.trim());
}

function isHiddenInternalSection(title: string) {
  return /^(source basis|fundamento de la fuente)$/i.test(title.trim());
}

export interface DocumentationSection {
  key: string;
  title: string;
  id: string;
  content: string;
  headingLevel: number;
  sourceHash: string;
}

export interface DocumentationPage {
  title: string;
  description: string;
  keywords: string[];
  sourceFile: string;
  intro: string;
  sections: DocumentationSection[];
  headings: HeadingItem[];
}

function readDocumentationSource(locale: string) {
  const sourceFile = locale === 'es' ? SPANISH_DOC_PATH : MASTER_DOC_PATH;
  return {
    sourceFile,
    content: fs.readFileSync(sourceFile, 'utf8').replace(/\r\n/g, '\n'),
  };
}

function createHash(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function extractTitle(markdown: string) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? 'Documentation';
}

function extractDescription(markdown: string) {
  const firstSectionStart = markdown.search(/^##\s+/m);
  const introBlock = (firstSectionStart === -1 ? markdown : markdown.slice(0, firstSectionStart))
    .replace(/^#\s+.+$/gm, '')
    .replace(/^>\s*(?:SEO keywords|Palabras clave SEO):.*$/gim, '')
    .replace(/^---$/gm, '')
    .trim();

  const paragraph = introBlock
    .split(/\n\s*\n/)
    .map((chunk) => chunk.replace(/\n/g, ' ').trim())
    .find(Boolean);

  return paragraph ?? '';
}

function extractSeoKeywords(markdown: string) {
  const match = markdown.match(/^>\s*(?:SEO keywords|Palabras clave SEO):\s*(.+)$/im);
  if (!match?.[1]) return [];

  return match[1]
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function buildSectionKey(title: string, index: number) {
  const numberedMatch = title.match(/^(\d+(?:\.\d+)*)\.?\s+/);
  if (numberedMatch) return numberedMatch[1];
  return `section-${String(index + 1).padStart(2, '0')}`;
}

function parseSections(markdown: string): { intro: string; sections: DocumentationSection[] } {
  const headingRegex = /^##\s+(.+)$/gm;
  const matches = Array.from(markdown.matchAll(headingRegex));

  if (matches.length === 0) {
    return {
      intro: markdown.trim(),
      sections: [],
    };
  }

  const firstSectionStart = matches[0]?.index ?? 0;
  const intro = markdown.slice(0, firstSectionStart).trim();

  const sections = matches
    .map((match, index) => {
      const title = match[1].trim();
      const start = match.index ?? 0;
      const end = matches[index + 1]?.index ?? markdown.length;
      const content = markdown.slice(start, end).trim();
      const key = buildSectionKey(title, index);

      return {
        key,
        title,
        id: slugify(title),
        content,
        headingLevel: 2,
        sourceHash: createHash(content),
      };
    })
    .filter(
      (section) => !isTableOfContents(section.title) && !isHiddenInternalSection(section.title)
    );

  return { intro, sections };
}

export function getDocumentationPage(locale: string): DocumentationPage {
  const { sourceFile, content } = readDocumentationSource(locale);
  const { intro, sections } = parseSections(content);

  return {
    title: extractTitle(content),
    description: extractDescription(content),
    keywords: extractSeoKeywords(content),
    sourceFile,
    intro,
    sections,
    headings: extractHeadings(content),
  };
}

export function getDocumentationSeoKeywords(locale: string) {
  const { content } = readDocumentationSource(locale);
  return extractSeoKeywords(content);
}

export function getMasterDocumentationSections() {
  const content = fs.readFileSync(MASTER_DOC_PATH, 'utf8').replace(/\r\n/g, '\n');
  return parseSections(content).sections;
}

export function getSpanishDocumentationSections() {
  const content = fs.readFileSync(SPANISH_DOC_PATH, 'utf8').replace(/\r\n/g, '\n');
  return parseSections(content).sections;
}
