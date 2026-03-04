# Lab Article Template Kit

This folder is a standalone template kit for future posts.

## What this gives you

- A copy-ready article object template
- A simple registration checklist
- A quick-fill markdown checklist

## Start here

1. Copy `lab-article.template.js` into `src/content/lab-articles/`.
2. Rename it to your slug, for example `my-new-article.js`.
3. Fill in `slug`, `questTitle`, `publishedAt`, `content`, and `images`.
4. Add your image files to `assets/lab-article-images/`.
5. Register the new article in `src/content/lab-articles/index.js`.

## Image placement rule

Each image has `insertAfter`:
- `0` = after paragraph 1
- `1` = after paragraph 2
- `2` = after paragraph 3

Use the same article format for all future posts.
