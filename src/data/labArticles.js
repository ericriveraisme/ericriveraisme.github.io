const context = require.context('../content/lab-articles-json', false, /\.json$/);

const normalizeLegacyParagraphs = (content = []) =>
	content.map((entry) => {
		if (typeof entry === 'string') {
			return entry;
		}
		if (entry && typeof entry === 'object' && typeof entry.text === 'string') {
			return entry.text;
		}
		return '';
	}).filter(Boolean);

const normalizeContentBlocks = (content = []) => {
	if (!Array.isArray(content) || content.length === 0) {
		return [];
	}

	const hasTypedBlocks = content.every((entry) =>
		entry && typeof entry === 'object' && typeof entry.type === 'string'
	);

	if (!hasTypedBlocks) {
		return normalizeLegacyParagraphs(content).map((text) => ({
			type: 'paragraph',
			text
		}));
	}

	return content.map((entry) => {
		const type = String(entry.type || '').toLowerCase();

		if (type === 'heading') {
			return {
				type: 'heading',
				level: Number.isInteger(entry.level) ? entry.level : 2,
				text: typeof entry.text === 'string' ? entry.text : ''
			};
		}

		if (type === 'list') {
			return {
				type: 'list',
				items: Array.isArray(entry.items) ? entry.items.filter((item) => typeof item === 'string' && item.trim().length > 0) : []
			};
		}

		if (type === 'code') {
			return {
				type: 'code',
				language: typeof entry.language === 'string' ? entry.language : 'text',
				caption: typeof entry.caption === 'string' ? entry.caption : '',
				code: typeof entry.code === 'string' ? entry.code : ''
			};
		}

		return {
			type: 'paragraph',
			text: typeof entry.text === 'string' ? entry.text : ''
		};
	});
};

const extractParagraphsFromBlocks = (blocks = []) =>
	blocks
		.flatMap((block) => {
			if (block.type === 'paragraph') {
				return [block.text || ''];
			}
			if (block.type === 'list') {
				return (block.items || []).map((item) => `• ${item}`);
			}
			if (block.type === 'heading') {
				return [block.text || ''];
			}
			return [];
		})
		.filter((line) => typeof line === 'string' && line.trim().length > 0);

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
	const contentBlocks = normalizeContentBlocks(article.content);
	const textContent = extractParagraphsFromBlocks(contentBlocks);
	const resolvedTitle = article.title || article.questTitle || 'Untitled Lab Article';

	return {
		slug: article.slug,
		title: resolvedTitle,
		questTitle: resolvedTitle,
		publishedAt: article.publishedAt,
		author: article.author || '',
		summary: article.summary || textContent[0] || '',
		tags: Array.isArray(article.tags) ? article.tags.filter((tag) => typeof tag === 'string' && tag.trim().length > 0) : [],
		content: textContent,
		contentBlocks,
		images: normalizeImages(article.images)
	};
});
