# Lab Articles Content Folder

Add or update website lab posts in this folder.

## Structure
- One file per article (`*.js`) exporting a default object.
- Register each file in `index.js` so it becomes available site-wide.

## Article object shape
```js
{
  slug: 'unique-article-slug',
  questTitle: 'Title shown in Active Quests and Lab Logs',
  publishedAt: 'YYYY-MM-DD',
  content: [
    'Paragraph 1',
    'Paragraph 2'
  ]
}
```

## Notes
- `slug` must be unique.
- `publishedAt` controls newest-first ordering.
- Active Quests currently shows only the 5 newest articles.
