const context = require.context('../content/lab-articles-json', false, /\.json$/);

const normalizeContent = (content = []) =>
	content.map((entry) => {
		if (typeof entry === 'string') {
			return entry;
		}
		if (entry && typeof entry === 'object' && typeof entry.text === 'string') {
			return entry.text;
		}
		return '';
	}).filter(Boolean);

const normalizeImages = (images = []) =>
	images
		.map((image) => ({
			src: image?.src || '',
			alt: image?.alt || '',
			insertAfter: Number.isInteger(image?.insertAfter) ? image.insertAfter : 0
		}))
		.filter((image) => image.src);

export const labArticles = context.keys().map((key) => {
	const raw = context(key);
	const article = raw && raw.default ? raw.default : raw;

	return {
		slug: article.slug,
		questTitle: article.questTitle,
		publishedAt: article.publishedAt,
		content: normalizeContent(article.content),
		images: normalizeImages(article.images)
	};
});
