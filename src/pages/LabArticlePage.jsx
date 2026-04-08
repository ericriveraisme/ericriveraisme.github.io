import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { labArticles } from '../data/labArticles.js';

const escapeHtml = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const highlightYaml = (source = '') => {
  const lines = source.split('\n');

  return lines
    .map((line) => {
      const commentMatch = line.match(/^(\s*#.*)$/);
      if (commentMatch) {
        return `<span style="color:#6272a4;font-style:italic;">${escapeHtml(line)}</span>`;
      }

      const keyValueMatch = line.match(/^(\s*)([A-Za-z0-9_-]+)(\s*:\s*)(.*)$/);
      if (!keyValueMatch) {
        return escapeHtml(line);
      }

      const [, indent, key, separator, rawValue] = keyValueMatch;
      let value = escapeHtml(rawValue);

      if (/^\s*(true|false)\s*$/i.test(rawValue)) {
        value = `<span style="color:#ff5555;font-weight:700;">${escapeHtml(rawValue.trim())}</span>`;
      } else if (/^\s*-?\d+(\.\d+)?\s*$/.test(rawValue)) {
        value = `<span style="color:#bd93f9;">${escapeHtml(rawValue.trim())}</span>`;
      } else if (/['"`]/.test(rawValue) || /https?:\/\//.test(rawValue)) {
        value = `<span style="color:#f1fa8c;">${escapeHtml(rawValue)}</span>`;
      }

      return `${escapeHtml(indent)}<span style="color:#8be9fd;">${escapeHtml(key)}</span><span style="color:#f8f8f2;opacity:0.8;">${escapeHtml(separator)}</span>${value}`;
    })
    .join('\n');
};

const highlightJavascript = (source = '') => {
  let output = escapeHtml(source);

  output = output.replace(/(\/\/.*)$/gm, '<span style="color:#6272a4;font-style:italic;">$1</span>');
  output = output.replace(/(["'`])((?:\\.|(?!\1).)*)\1/g, '<span style="color:#f1fa8c;">$&</span>');
  output = output.replace(/\b(const|let|var|return|if|else|function|new|typeof|class|import|from|export|default|for|while|map)\b/g, '<span style="color:#ff79c6;font-weight:700;">$1</span>');
  output = output.replace(/\b(true|false|null|undefined)\b/g, '<span style="color:#ff5555;font-weight:700;">$1</span>');
  output = output.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span style="color:#bd93f9;">$1</span>');
  output = output.replace(/([{}()[\].,;:])/g, '<span style="color:#f8f8f2;opacity:0.85;">$1</span>');
  output = output.replace(/(=>|===|!==|==|!=|\+|\-|\*|\/|=)/g, '<span style="color:#ffb86c;">$1</span>');

  return output;
};

const highlightCode = (source = '', language = '') => {
  const lang = String(language || '').toLowerCase();
  if (lang === 'yaml' || lang === 'yml') return highlightYaml(source);
  if (lang === 'javascript' || lang === 'js') return highlightJavascript(source);
  return escapeHtml(source);
};

const getTagClasses = (tag = '') => {
  const normalized = String(tag).trim().toLowerCase();

  if (normalized === 'react') return 'border-cyan-400/50 text-cyan-300 bg-cyan-950/40';
  if (normalized === 'cms') return 'border-indigo-400/50 text-indigo-200 bg-indigo-950/45';
  if (normalized === 'oauth') return 'border-pink-400/50 text-pink-200 bg-pink-950/45';
  if (normalized === 'github pages') return 'border-orange-400/50 text-orange-200 bg-orange-950/45';
  if (normalized === 'career growth') return 'border-emerald-400/60 text-emerald-200 bg-emerald-950/45';
  if (normalized === 'azure') return 'border-sky-400/50 text-sky-200 bg-sky-950/45';
  if (normalized === 'active directory' || normalized === 'active-directory') return 'border-amber-400/50 text-amber-200 bg-amber-950/45';
  if (normalized === 'entra id' || normalized === 'entra-id') return 'border-violet-400/50 text-violet-200 bg-violet-950/45';
  if (normalized === 'hybrid cloud' || normalized === 'hybrid-cloud') return 'border-fuchsia-400/50 text-fuchsia-200 bg-fuchsia-950/45';
  if (normalized === 'sysadmin') return 'border-teal-400/50 text-teal-200 bg-teal-950/45';

  return 'border-cyan-500/30 text-cyan-200 bg-cyan-950/20';
};

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
                <span key={tag} className={`px-2.5 py-1 rounded-full text-xs border ${getTagClasses(tag)}`}>
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

          <div className="space-y-6 text-slate-300 leading-relaxed">
            {(article.contentBlocks || []).map((block, index) => (
              <React.Fragment key={index}>
                {block.type === 'heading' && block.level === 3 ? (
                  <h3 className="text-cyan-300/90 font-bold text-lg mt-6 mb-1 pl-3 border-l-2 border-cyan-500/40" style={{ fontFamily: 'Cinzel, serif' }}>
                    {block.text}
                  </h3>
                ) : null}
                {block.type === 'heading' && block.level !== 3 ? (
                  <div className="mt-10 mb-2 pt-8 border-t border-slate-700/60">
                    <h2 className="text-cyan-200 font-bold text-2xl" style={{ fontFamily: 'Cinzel, serif' }}>
                      {block.text}
                    </h2>
                  </div>
                ) : null}

                {block.type === 'paragraph' && String(block.text).startsWith('Lesson:') ? (
                  <div className="my-4 rounded-lg border border-amber-500/30 bg-amber-950/20 px-5 py-4">
                    <p className="text-amber-200/90">
                      <span className="font-bold uppercase tracking-wider text-xs text-amber-400 mr-2">⚑ Lesson</span>
                      <br className="sm:hidden" />
                      {String(block.text).replace(/^Lesson:\s*/, '')}
                    </p>
                  </div>
                ) : null}
                {block.type === 'paragraph' && !String(block.text).startsWith('Lesson:') ? <p>{block.text}</p> : null}

                {block.type === 'list' ? (
                  <ul className="pl-5 space-y-2 border-l-2 border-cyan-500/25 ml-1">
                    {(block.items || []).map((item) => (
                      <li key={item} className="pl-2 relative before:content-['▸'] before:absolute before:-left-1 before:text-cyan-500/60 before:text-sm">{item}</li>
                    ))}
                  </ul>
                ) : null}

                {block.type === 'code' ? (
                  <figure className="my-6">
                    {block.caption ? (
                      <figcaption className="text-[11px] uppercase tracking-wider mb-0 px-3 py-2 rounded-t-lg border border-b-0 border-purple-400/45 text-slate-100 bg-gradient-to-r from-purple-500/30 to-slate-700/70">
                        {block.caption}{block.language ? ` (${block.language})` : ''}
                      </figcaption>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg border border-b-0 border-indigo-400/25 bg-slate-800/60">
                        <span className="w-2 h-2 rounded-full bg-red-400/70"></span>
                        <span className="w-2 h-2 rounded-full bg-yellow-400/70"></span>
                        <span className="w-2 h-2 rounded-full bg-green-400/70"></span>
                        {block.language ? <span className="ml-auto text-[10px] uppercase tracking-wider text-slate-500">{block.language}</span> : null}
                      </div>
                    )}
                    <pre className="rounded-b-lg border border-indigo-400/35 border-t-0 p-4 overflow-x-auto shadow-[0_12px_28px_rgba(10,10,20,0.5)] bg-[radial-gradient(circle_at_top_right,rgba(255,121,198,0.2),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(139,233,253,0.14),transparent_38%),#282a36]">
                      <code
                        className="text-[#f8f8f2]"
                        dangerouslySetInnerHTML={{ __html: highlightCode(block.code || '', block.language || '') }}
                      />
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

          <footer className="mt-12 pt-8 border-t border-slate-700/40">
            <p className="italic text-slate-400 text-sm mb-4">See you in the terminal.</p>
            <p className="italic text-cyan-200 font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>
              {article.author || 'Eric Rivera'}
            </p>
            <p className="italic text-slate-500 text-xs tracking-wide mt-1">Sovereign Lab Architect (in training)</p>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default LabArticlePage;
