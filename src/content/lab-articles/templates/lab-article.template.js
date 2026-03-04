const article = {
  slug: 'your-article-slug',
  questTitle: 'Your Article Title',
  publishedAt: 'YYYY-MM-DD',
  images: [
    {
      src: '/assets/lab-article-images/your-image-1.svg',
      alt: 'Describe the image clearly',
      insertAfter: 0
    },
    {
      src: '/assets/lab-article-images/your-image-2.svg',
      alt: 'Describe the second image clearly',
      insertAfter: 1
    }
  ],
  content: [
    'Write your opening paragraph here.',
    'Write your second paragraph here.',
    'Write your closing paragraph here.'
  ]
};

export default article;
