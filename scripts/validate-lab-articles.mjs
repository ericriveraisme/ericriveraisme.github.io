import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const articlesDir = path.join(repoRoot, 'src', 'content', 'lab-articles-json');

const fail = (message) => {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
};

if (!fs.existsSync(articlesDir)) {
  fail(`Articles directory not found: ${articlesDir}`);
  process.exit(process.exitCode ?? 1);
}

const files = fs.readdirSync(articlesDir).filter((file) => file.endsWith('.json'));

if (files.length === 0) {
  fail('No article JSON files found.');
  process.exit(process.exitCode ?? 1);
}

const slugSet = new Set();

for (const file of files) {
  const filePath = path.join(articlesDir, file);
  let article;

  try {
    article = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    fail(`Invalid JSON: ${path.relative(repoRoot, filePath)}`);
    continue;
  }

  const fileRef = path.relative(repoRoot, filePath);

  if (!article.slug || typeof article.slug !== 'string') {
    fail(`${fileRef}: missing or invalid slug`);
  } else {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) {
      fail(`${fileRef}: slug must be lowercase-dash format`);
    }

    if (slugSet.has(article.slug)) {
      fail(`${fileRef}: duplicate slug '${article.slug}'`);
    }

    slugSet.add(article.slug);
  }

  if (!article.questTitle || typeof article.questTitle !== 'string') {
    fail(`${fileRef}: missing or invalid questTitle`);
  }

  if (!article.publishedAt || !/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt)) {
    fail(`${fileRef}: publishedAt must be YYYY-MM-DD`);
  }

  const content = article.content;
  if (!Array.isArray(content) || content.length === 0) {
    fail(`${fileRef}: content must be a non-empty array`);
  } else {
    content.forEach((paragraph, index) => {
      if (typeof paragraph !== 'string' || paragraph.trim().length === 0) {
        fail(`${fileRef}: content[${index}] must be a non-empty string`);
      }
    });
  }

  if (Array.isArray(article.images)) {
    article.images.forEach((image, index) => {
      if (!image || typeof image !== 'object') {
        fail(`${fileRef}: images[${index}] must be an object`);
        return;
      }

      if (!image.src || typeof image.src !== 'string') {
        fail(`${fileRef}: images[${index}].src is required`);
      } else {
        const normalized = image.src.replace(/^\//, '');
        const imagePath = path.join(repoRoot, normalized);
        if (!fs.existsSync(imagePath)) {
          fail(`${fileRef}: images[${index}].src file not found (${image.src})`);
        }
      }

      if (!image.alt || typeof image.alt !== 'string' || image.alt.trim().length === 0) {
        fail(`${fileRef}: images[${index}].alt is required`);
      }

      if (!Number.isInteger(image.insertAfter) || image.insertAfter < 0) {
        fail(`${fileRef}: images[${index}].insertAfter must be a non-negative integer`);
      }

      if (Array.isArray(content) && Number.isInteger(image.insertAfter) && image.insertAfter >= content.length) {
        fail(`${fileRef}: images[${index}].insertAfter out of range (content length ${content.length})`);
      }
    });
  }
}

if (process.exitCode && process.exitCode !== 0) {
  console.error('\nLab article validation failed.');
  process.exit(process.exitCode);
}

console.log(`✅ Lab article validation passed (${files.length} files)`);
