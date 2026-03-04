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

  const resolvedTitle = article.title || article.questTitle;
  if (!resolvedTitle || typeof resolvedTitle !== 'string' || resolvedTitle.trim().length === 0) {
    fail(`${fileRef}: missing or invalid title (title or questTitle required)`);
  }

  if (!article.publishedAt || !/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt)) {
    fail(`${fileRef}: publishedAt must be YYYY-MM-DD`);
  }

  if (Object.prototype.hasOwnProperty.call(article, 'author')) {
    if (typeof article.author !== 'string' || article.author.trim().length === 0) {
      fail(`${fileRef}: author must be a non-empty string when provided`);
    }
  }

  if (Object.prototype.hasOwnProperty.call(article, 'summary')) {
    if (typeof article.summary !== 'string' || article.summary.trim().length === 0) {
      fail(`${fileRef}: summary must be a non-empty string when provided`);
    }
  }

  if (Object.prototype.hasOwnProperty.call(article, 'tags')) {
    if (!Array.isArray(article.tags)) {
      fail(`${fileRef}: tags must be an array when provided`);
    } else {
      article.tags.forEach((tag, index) => {
        if (typeof tag !== 'string' || tag.trim().length === 0) {
          fail(`${fileRef}: tags[${index}] must be a non-empty string`);
        }
      });
    }
  }

  const content = article.content;
  if (!Array.isArray(content) || content.length === 0) {
    fail(`${fileRef}: content must be a non-empty array`);
  } else {
    const hasTypedBlocks = content.every(
      (entry) => entry && typeof entry === 'object' && typeof entry.type === 'string'
    );

    if (hasTypedBlocks) {
      content.forEach((block, index) => {
        const type = String(block.type || '').toLowerCase();

        if (type === 'heading') {
          if (typeof block.text !== 'string' || block.text.trim().length === 0) {
            fail(`${fileRef}: content[${index}] heading.text must be a non-empty string`);
          }
          if (Object.prototype.hasOwnProperty.call(block, 'level')) {
            if (!Number.isInteger(block.level) || block.level < 1 || block.level > 6) {
              fail(`${fileRef}: content[${index}] heading.level must be an integer between 1 and 6`);
            }
          }
          return;
        }

        if (type === 'paragraph') {
          if (typeof block.text !== 'string' || block.text.trim().length === 0) {
            fail(`${fileRef}: content[${index}] paragraph.text must be a non-empty string`);
          }
          return;
        }

        if (type === 'list') {
          if (!Array.isArray(block.items) || block.items.length === 0) {
            fail(`${fileRef}: content[${index}] list.items must be a non-empty array`);
          } else {
            block.items.forEach((item, itemIndex) => {
              if (typeof item !== 'string' || item.trim().length === 0) {
                fail(`${fileRef}: content[${index}] list.items[${itemIndex}] must be a non-empty string`);
              }
            });
          }
          return;
        }

        if (type === 'code') {
          if (typeof block.code !== 'string' || block.code.trim().length === 0) {
            fail(`${fileRef}: content[${index}] code.code must be a non-empty string`);
          }
          if (Object.prototype.hasOwnProperty.call(block, 'language')) {
            if (typeof block.language !== 'string' || block.language.trim().length === 0) {
              fail(`${fileRef}: content[${index}] code.language must be a non-empty string when provided`);
            }
          }
          if (Object.prototype.hasOwnProperty.call(block, 'caption')) {
            if (typeof block.caption !== 'string') {
              fail(`${fileRef}: content[${index}] code.caption must be a string when provided`);
            }
          }
          return;
        }

        fail(`${fileRef}: content[${index}] has unsupported block type '${block.type}'`);
      });
    } else {
      content.forEach((paragraph, index) => {
        const isStringParagraph =
          typeof paragraph === 'string' && paragraph.trim().length > 0;
        const isObjectParagraph =
          paragraph &&
          typeof paragraph === 'object' &&
          typeof paragraph.text === 'string' &&
          paragraph.text.trim().length > 0;

        if (!isStringParagraph && !isObjectParagraph) {
          fail(`${fileRef}: content[${index}] must be a non-empty string or { text } object`);
        }
      });
    }
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
