import React from 'react';
import { Link } from 'react-router-dom';

const LabLogsPage = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="bg-slate-900/60 border border-slate-700/50 p-6 rounded-lg backdrop-blur-sm shadow-lg">
            <h2 className="text-xl text-cyan-200 font-bold border-b border-slate-700 pb-3 mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              Projects
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Track active builds, experiments, and implementation milestones for portfolio and infrastructure work.
            </p>
          </section>

          <section className="bg-slate-900/60 border border-slate-700/50 p-6 rounded-lg backdrop-blur-sm shadow-lg">
            <h2 className="text-xl text-cyan-200 font-bold border-b border-slate-700 pb-3 mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              Blob
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Store reference notes, snippets, and idea dumps in one searchable section for future implementation.
            </p>
          </section>

          <section className="bg-slate-900/60 border border-slate-700/50 p-6 rounded-lg backdrop-blur-sm shadow-lg">
            <h2 className="text-xl text-cyan-200 font-bold border-b border-slate-700 pb-3 mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              Logs
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Maintain chronological change entries, deployment notes, and quick postmortems.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LabLogsPage;
