import React from 'react';
import { Link } from 'react-router-dom';
import { activeQuests } from '../data/activeQuests.js';
import { labArticles } from '../data/labArticles.js';

const getSnippet = (content = []) => {
  const firstParagraph = content[0] || '';
  if (firstParagraph.length <= 160) {
    return firstParagraph;
  }
  return firstParagraph.slice(0, 160).trim();
};

const LabLogsPage = () => {
  const logs = labArticles
    .map((article) => {
      const quest = activeQuests.find((entry) => entry.title === article.questTitle);

      if (!quest) {
        return null;
      }

      return {
        slug: article.slug,
        title: quest.title,
        status: quest.status,
        updatedAt: quest.updatedAt,
        snippet: getSnippet(article.content)
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-mono">
      <header className="container mx-auto px-6 py-10 flex items-center justify-between gap-4">
        <h1
          className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-500"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Lab Logs
        </h1>
        <Link
          to="/"
          className="px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-600 rounded text-slate-200 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
        >
          Back to Home
        </Link>
      </header>

      <main className="container mx-auto px-6 pb-16">
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
                    {log.title}
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded border bg-emerald-900/40 border-emerald-500/50 text-emerald-300">
                    {log.status}
                  </span>
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
