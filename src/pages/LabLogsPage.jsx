import React from 'react';
import { Link } from 'react-router-dom';
import { labArticles } from '../data/labArticles.js';
import LabLogsAnimatedHeader from './LabLogsAnimatedHeader.jsx';

const getSnippet = (content = []) => {
  const firstParagraph = content.find((block) => {
    if (typeof block === 'string') {
      return block.trim().length > 0;
    }
    return block?.type === 'paragraph' && typeof block.text === 'string' && block.text.trim().length > 0;
  });

  const text = typeof firstParagraph === 'string' ? firstParagraph : firstParagraph?.text || '';
  if (text.length <= 160) {
    return text;
  }
  return text.slice(0, 160).trim();
};

const LabLogsPage = () => {
  const logs = labArticles
    .map((article) => ({
      slug: article.slug,
      title: article.title || article.questTitle,
      publishedAt: article.publishedAt,
      author: article.author,
      snippet: getSnippet(article.content)
    }))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-mono">
      <header className="w-full px-3 pt-3 sm:px-6 sm:pt-5">
        <div className="relative mx-auto w-full max-w-5xl">
          <LabLogsAnimatedHeader />
          <Link
            to="/"
            className="absolute top-3 right-3 md:top-5 md:right-5 px-3 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-600 rounded text-slate-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-6 pb-16">
        <section className="space-y-5">
          {logs.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-700/50 p-6 rounded-lg backdrop-blur-sm shadow-lg">
              <p className="text-slate-300 text-sm leading-relaxed">
                No lab articles are linked to active quests yet.
              </p>
            </div>
          ) : (
            logs.map((log) => (
              <article key={log.slug} className="bg-slate-900/60 border border-slate-700/50 p-6 rounded-lg backdrop-blur-sm shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h2 className="text-xl text-cyan-200 font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
                    <Link to={`/lab-logs/${log.slug}`} className="hover:text-cyan-100 underline underline-offset-2">
                      {log.title}
                    </Link>
                  </h2>
                </div>

                <div className="mb-4 text-xs uppercase tracking-wider text-slate-400">
                  <span>{log.publishedAt}</span>
                  {log.author ? <span>{` • ${log.author}`}</span> : null}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {log.snippet}{' '}
                  <Link to={`/lab-logs/${log.slug}`} className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2">
                    ...more
                  </Link>
                </p>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default LabLogsPage;
