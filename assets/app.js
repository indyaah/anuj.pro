// Tiny helper to select nodes
const $ = sel => document.querySelector(sel);
const resumeRoot = $('#resume');
const devNote = $('#dev-note');

// Try to load resume.yaml/yml or resume.json; if present, render HTML view; else show note.
async function tryFetch(path){
  try{
    const res = await fetch(path, {cache:'no-store'});
    if(!res.ok) return null;
    const text = await res.text();
    return { path, text };
  }catch(e){ return null; }
}

function parseMaybeJSON(text){
  const t = text.trim();
  if(t.startsWith('{') || t.startsWith('[')){
    return JSON.parse(t);
  }
  return null;
}

async function loadResumeData(){
  const candidates = ['resume.yaml','resume.yml','resume.json'];
  for (const p of candidates){
    const file = await tryFetch(p);
    if(!file) continue;
    try{
      if(p.endsWith('.json')){
        return JSON.parse(file.text);
      }
      // YAML or unknown extension: if it looks like JSON, parse as JSON
      const maybe = parseMaybeJSON(file.text);
      if(maybe) return maybe;
      // Otherwise, try YAML via js-yaml if available
      if(window.jsyaml && typeof window.jsyaml.load === 'function'){
        return window.jsyaml.load(file.text);
      } else {
        console.warn('YAML parser not available for', p);
        continue;
      }
    }catch(e){
      console.error('Failed to parse', p, e);
      continue;
    }
  }
  return null;
}

async function bootstrap(){
  const data = await loadResumeData();
  if(data){
    renderResume(data);
    devNote.hidden = true;
  }else{
    devNote.hidden = false;
  }
}

function text(el, str){ if(str){ el.textContent = str; } }
function make(tag, cls, content){
  const el = document.createElement(tag);
  if(cls) el.className = cls;
  if(content !== undefined){
    if(Array.isArray(content)) content.forEach(c => c && el.append(c));
    else if(content instanceof Node) el.append(content);
    else el.innerHTML = content;
  }
  return el;
}

function linkify(url, label){
  if(!url) return null;
  const a = document.createElement('a');
  a.href = url; a.textContent = label || url; a.target = '_blank'; a.rel = 'noopener';
  return a;
}

function renderHeader(d){
  const who = make('div','who', [
    make('h1',null, d.name || 'Your Name'),
    d.title ? make('div','title', d.title) : null
  ].filter(Boolean));

  const contacts = make('div','contacts-line');
  const bits = [];
  if(d.location) bits.push(make('span','', d.location));
  if(d.phone) {
    const tel = String(d.phone).replace(/\s+/g,'');
    const a = linkify('tel:'+tel, d.phone);
    if(a) bits.push(a);
  }
  if(d.email) { const a = linkify('mailto:'+d.email, d.email); if(a) bits.push(a); }
  if(Array.isArray(d.links)){
    d.links.forEach(l=>{ const a = linkify(l.url, l.label); if(a) bits.push(a); });
  }
  bits.forEach((b,i) => {
    if(i>0) contacts.append(make('span','dot','•'));
    contacts.append(b);
  });

  const header = make('div','hdr',[who, contacts]);
  const deco = make('div','deco', `<svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M17 0h15v15H17zM34 17h15v15H34z"></path><path opacity=".2" fill="currentColor" d="M34 34h15v15H34zM17 17h15v15H17zM0 0h15v15H0z"></path><path fill="currentColor" d="M34 0h15v15H34z"></path></svg>`);
  deco.setAttribute('aria-hidden','true');
  header.append(deco);
  return header;
}

function renderSkills(skills){
  if(!Array.isArray(skills) || !skills.length) return null;
  const sec = make('section','sec');
  sec.append(make('h2',null,'Skills'));
  // Flatten all categories into a single, de-duplicated CSV list
  const all = [];
  skills.forEach(s => {
    if(s && Array.isArray(s.items)){
      s.items.forEach(it => all.push(it));
    }
  });
  const list = [...new Set(all)].join(', ');
  sec.append(make('div','muted', list));
  return sec;
}

function renderExperience(exp){
  if(!Array.isArray(exp) || !exp.length) return null;
  const sec = make('section','sec');
  sec.append(make('h2',null,'Employment history'));
  exp.forEach(j => {
    if(!j) return;
    const item = make('div','item');
    item.append(make('div','role', [j.role, j.company].filter(Boolean).join(', ')));
    const dur = [j.start, j.end].filter(Boolean).join(' - ');
    const meta = [dur, j.location].filter(Boolean).join(' • ');
    if(meta) item.append(make('div','meta', meta));
    if(Array.isArray(j.highlights) && j.highlights.length){
      const ul = make('ul','tight muted');
      j.highlights.forEach(h => ul.append(make('li',null,h)));
      item.append(ul);
    }
    sec.append(item);
  });
  return sec;
}

function renderEducation(ed){
  if(!Array.isArray(ed) || !ed.length) return null;
  const sec = make('section','sec');
  sec.append(make('h2',null,'Education'));
  ed.forEach(e => {
    const item = make('div','item');
    item.append(make('div','role', [e.degree, e.school].filter(Boolean).join(' — ')));
    const meta = [e.year, e.location].filter(Boolean).join(' • ');
    if(meta) item.append(make('div','meta', meta));
    if(e.note) item.append(make('div','', e.note));
    sec.append(item);
  });
  return sec;
}

function renderSummary(txt){
  if(!txt) return null;
  const sec = make('section','sec');
  sec.append(make('h2',null,'Professional summary'));
  sec.append(make('div','muted', txt));
  return sec;
}

function renderCerts(list){
  if(!Array.isArray(list) || !list.length) return null;
  const sec = make('section','sec');
  sec.append(make('h2',null,'Certifications'));
  list.forEach(c => {
    const item = make('div','item');
    item.append(make('div','role', c.name || ''));
    const meta = [c.issuer, c.year].filter(Boolean).join(' • ');
    if(meta) item.append(make('div','meta', meta));
    sec.append(item);
  });
  return sec;
}

function renderResumeTheme1(d){
  resumeRoot.innerHTML = '';
  resumeRoot.append(
    renderHeader(d)
  );

  // Body sections (single-column, skills as CSV list after summary)
  const sections = [
    renderSummary(d.summary),
    renderSkills(d.skills),
    renderExperience(d.experience),
    renderEducation(d.education),
    renderCerts(d.certifications)
  ].filter(Boolean);

  sections.forEach(sec => resumeRoot.append(sec));
}

function renderSkillsPills(skills){
  if(!Array.isArray(skills) || !skills.length) return null;
  const sec = make('section','sec skills-pills');
  sec.append(make('h2',null,'Skills'));
  const wrap = make('div','');
  skills.forEach(s => {
    if(s && Array.isArray(s.items)){
      s.items.forEach(it => wrap.append(make('span','pill', it)));
    }
  });
  sec.append(wrap);
  return sec;
}

function renderResumeTheme2(d){
  resumeRoot.innerHTML = '';
  resumeRoot.append(renderHeader(d));

  // Two-column body: left aside with skills, right main with content
  const body = make('section','sec');
  const cols = make('div','columns');

  const aside = make('aside','aside');
  const leftBlocks = [ renderSkillsPills(d.skills) ].filter(Boolean);
  leftBlocks.forEach(b => aside.append(b));

  const main = make('div','main');
  const rightBlocks = [
    renderSummary(d.summary),
    renderExperience(d.experience),
    renderEducation(d.education),
    renderCerts(d.certifications)
  ].filter(Boolean);
  rightBlocks.forEach(b => main.append(b));

  cols.append(aside, main);
  body.append(cols);
  resumeRoot.append(body);
}

function renderHeaderT3(d){
  const who = make('div','who', [
    make('h1',null, d.name || 'Your Name'),
    make('div','subline', [[d.location, d.phone, d.email].filter(Boolean).join(', ')])
  ]);
  const header = make('div','hdr',[who]);
  return header;
}

function renderExperienceT3(exp){
  if(!Array.isArray(exp) || !exp.length) return null;
  const sec = make('section','sec');
  sec.append(make('h2',null,'Employment history'));
  exp.forEach(j => {
    if(!j) return;
    const item = make('div','item');
    const dur = [j.start, j.end].filter(Boolean).join(' - ');
    const roleLine = [j.role, dur].filter(Boolean).join(', ');
    if(roleLine) item.append(make('div','role', roleLine));
    const sub = [j.company, j.location].filter(Boolean).join(', ');
    if(sub) item.append(make('div','submeta', sub));
    if(Array.isArray(j.highlights) && j.highlights.length){
      const ul = make('ul','tight muted');
      j.highlights.forEach(h => ul.append(make('li',null,h)));
      item.append(ul);
    }
    sec.append(item);
  });
  return sec;
}

function renderEducationT3(ed){
  if(!Array.isArray(ed) || !ed.length) return null;
  const sec = make('section','sec');
  sec.append(make('h2',null,'Education'));
  ed.forEach(e => {
    const item = make('div','item');
    const head = [e.degree, e.year].filter(Boolean).join(', ');
    if(head) item.append(make('div','role', head));
    const sub = [e.school, e.location].filter(Boolean).join(', ');
    if(sub) item.append(make('div','submeta', sub));
    if(e.note) item.append(make('div','', e.note));
    sec.append(item);
  });
  return sec;
}

function renderResumeTheme3(d){
  resumeRoot.innerHTML = '';
  resumeRoot.append(
    renderHeaderT3(d)
  );
  const sections = [
    renderSummary(d.summary),
    renderSkills(d.skills),
    renderExperienceT3(d.experience),
    renderEducationT3(d.education),
    renderCerts(d.certifications)
  ].filter(Boolean);
  sections.forEach(sec => resumeRoot.append(sec));
}

function renderResume(d){
  const urlParams = new URLSearchParams(window.location.search);
  const th = (d && d.theme) || urlParams.get('theme') || 't1';
  const norm = (t => {
    if(!t) return 't1';
    return t;
  })(th);

  // Apply theme class to root
  resumeRoot.className = `resume theme-${norm}`;

  if(norm === 't2') return renderResumeTheme2(d);
  if(norm === 't3') return renderResumeTheme3(d);
  return renderResumeTheme1(d);
}

window.addEventListener('DOMContentLoaded', bootstrap);
