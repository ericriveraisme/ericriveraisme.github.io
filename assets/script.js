const username = 'ericriveraisme';
const apiBase = 'https://api.github.com';
const preferredFeatured = 'netdevops-complete'; // pinned featured repo

async function fetchJSON(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

function el(id){return document.getElementById(id)}

async function loadRepos(){
  try{
    const repos = await fetchJSON(`${apiBase}/users/${username}/repos?per_page=200&sort=updated`);
    if(!Array.isArray(repos) || repos.length===0){
      el('featured-title').textContent = 'No public repositories found';
      return;
    }

    repos.sort((a,b)=> new Date(b.updated_at) - new Date(a.updated_at));

    // prefer the pinned repo if present
    let featured = repos.find(r=> r.name.toLowerCase() === preferredFeatured.toLowerCase());
    if(!featured) featured = repos[0];

    // fetch languages for the featured repo
    let langs = {};
    try{langs = await fetchJSON(featured.languages_url)}catch(e){console.warn('languages fetch failed', e)}

    // render featured
    el('featured-title').innerHTML = `<a href="${featured.html_url}" target="_blank" rel="noopener">${featured.name}</a>`;
    el('featured-desc').textContent = featured.description || 'No description provided.';
    el('featured-meta').innerHTML = `Updated ${new Date(featured.updated_at).toLocaleDateString()} • ${featured.stargazers_count} ★`;

    const langsList = el('featured-langs');
    langsList.innerHTML = '';
    const totalBytes = Object.values(langs).reduce((s,v)=>s+v,0) || 0;
    if(totalBytes>0){
      for(const [name,bytes] of Object.entries(langs)){
        const pct = Math.round((bytes/totalBytes)*100);
        const li = document.createElement('li');
        li.textContent = `${name} (${pct}%)`;
        langsList.appendChild(li);
      }
    } else if(featured.language){
      const li = document.createElement('li'); li.textContent = featured.language; langsList.appendChild(li);
    }

    const links = el('featured-links');
    links.innerHTML = `<a href="${featured.html_url}" target="_blank" rel="noopener">View on GitHub</a>`;

    // render repo list (exclude forks and archived for brevity)
    const list = el('repo-list');
    list.innerHTML = '';
    repos.filter(r=>!r.fork && !r.archived).slice(0,18).forEach(r=>{
      const li = document.createElement('li');
      li.className = 'repo-item';
      li.innerHTML = `<h4><a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a></h4>
                      <p>${r.description ? r.description : '<span class="muted">No description</span>'}</p>
                      <p class="muted">${r.language || '—'} • Updated ${new Date(r.updated_at).toLocaleDateString()}</p>`;
      list.appendChild(li);
    });

  }catch(err){
    console.error(err);
    el('featured-title').textContent = 'Error loading repositories';
    el('featured-desc').textContent = err.message || String(err);
  }
}

// start
loadRepos();
