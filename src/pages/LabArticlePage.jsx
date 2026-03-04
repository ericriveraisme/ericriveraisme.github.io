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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-mono">
      <header className="container mx-auto px-6 py-10 flex items-center justify-between gap-4">
        <h1
          className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-500"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          {article.questTitle} — {article.publishedAt}
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
          </div>

          <div className="space-y-5 text-slate-300 leading-relaxed">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
};

export default LabArticlePage;
