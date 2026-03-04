import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { labArticles } from '../data/labArticles.js';

const LabArticlePage = () => {
  const { slug } = useParams();

  const article = labArticles.find((entry) => entry.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-200 font-mono">
        <header className="container mx-auto px-6 py-10 flex items-center justify-between gap-4">
          <h1
            className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-500"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Lab Article Not Found
          </h1>
          <Link
            to="/lab-logs"
            className="px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-600 rounded text-slate-200 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
          >
            Back to Lab Logs
          </Link>
        </header>
      </div>
    );
  }

  const imageInsertions = new Map();
  (article.images || []).forEach((image) => {
    const current = imageInsertions.get(image.insertAfter) || [];
    current.push(image);
    imageInsertions.set(image.insertAfter, current);
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-mono">
      <header className="container mx-auto px-6 py-10 flex items-center justify-between gap-4">
        <h1
          className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-500"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          {article.title || article.questTitle}
        </h1>
        <Link
          to="/lab-logs"
          className="px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-600 rounded text-slate-200 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
        >
          Back to Lab Logs
        </Link>
      </header>

      <main className="container mx-auto px-6 pb-16">
        <article className="bg-slate-900/60 border border-slate-700/50 p-6 md:p-8 rounded-lg backdrop-blur-sm shadow-lg">
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs uppercase tracking-wider">
            <span className="text-slate-400">Published {article.publishedAt}</span>
            {article.author ? <span className="text-slate-500">• {article.author}</span> : null}
          </div>

          {Array.isArray(article.tags) && article.tags.length > 0 ? (
            <div className="mb-6 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-xs border border-cyan-500/30 text-cyan-200 bg-cyan-950/20">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          {article.summary ? (
            <p className="mb-6 text-slate-300 leading-relaxed border-l-2 border-cyan-500/40 pl-4">
              {article.summary}
            </p>
          ) : null}

          <div className="space-y-5 text-slate-300 leading-relaxed">
            {(article.contentBlocks || []).map((block, index) => (
              <React.Fragment key={index}>
                {block.type === 'heading' ? (
                  <h2 className="text-cyan-200 font-bold text-2xl" style={{ fontFamily: 'Cinzel, serif' }}>
                    {block.text}
                  </h2>
                ) : null}

                {block.type === 'paragraph' ? <p>{block.text}</p> : null}

                {block.type === 'list' ? (
                  <ul className="list-disc pl-6 space-y-2">
                    {(block.items || []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}

                {block.type === 'code' ? (
                  <figure>
                    {block.caption ? <figcaption className="text-cyan-300 text-xs uppercase tracking-wider mb-2">{block.caption}</figcaption> : null}
                    <pre className="bg-slate-950/80 border border-slate-700 rounded-lg p-4 overflow-x-auto">
                      <code>{block.code}</code>
                    </pre>
                  </figure>
                ) : null}

                {(imageInsertions.get(index) || []).map((image, imageIndex) => (
                  <div key={`${index}-${imageIndex}`} className="my-8 flex justify-center">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full max-w-3xl rounded-lg border border-slate-700/50 bg-slate-950/40"
                      loading="lazy"
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
};

export default LabArticlePage;
