/* Learn – multi-course Duolingo-style engine. Courses register themselves via registerCourse() (see README.md). */
(function () {
  'use strict';
  const TFR = {
    learn: 'Apprendre', review: 'Réviser', dash: 'Progrès', unit: 'Unité', start: 'COMMENCER',
    check: 'VÉRIFIER', cont: 'CONTINUER', correct: ['Bravo !', 'Excellent !', 'Parfait !', 'Bien joué !'],
    wrong: 'Réponse correcte :', almost: 'Attention aux accents :', lessonDone: 'Leçon terminée !', reviewDone: 'Révision terminée !',
    xp: 'XP', acc: 'Précision', time: 'Temps', streak: 'Série', days: 'jours', day: 'jour', outHearts: 'Plus de cœurs !',
    outHeartsSub: 'Pas de panique : vos erreurs sont ajoutées à la révision. Réessayez !', retry: 'RÉESSAYER', quit: 'QUITTER',
    quitQ: 'Quitter la leçon ?', quitSub: 'Votre progression dans cette leçon sera perdue.', keep: 'CONTINUER LA LEÇON',
    goal: 'Objectif du jour', goalDone: 'Objectif atteint !', total: 'XP total', lessons: 'Leçons', best: 'Meilleure série',
    last7: 'XP des 7 derniers jours (tous cours)', unitsProg: 'Unités', weak: 'À revoir', noWeak: 'Aucune erreur à revoir. Continuez comme ça !',
    reviewTitle: 'Révision', reviewSub: 'Retravaillez ce que vous avez manqué dans ce cours.', reviewBtn: 'RÉVISER MES ERREURS',
    practiceBtn: 'ENTRAÎNEMENT LIBRE', nothing: 'Terminez une leçon pour débloquer la révision.', items: 'éléments à revoir',
    keepStreak: 'Une leçon dans n\'importe quel cours garde votre série !', streakSafe: 'Série sauvegardée pour aujourd\'hui 🎉',
    streakUp: 'Série prolongée !', reset: 'Réinitialiser toute la progression', resetQ: 'Effacer toute la progression de tous les cours ?', tapPairs: 'Associez les paires',
    typeHere: 'Écrivez votre réponse…', missed: 'erreur(s)', mastered: 'maîtrisés', perfect: 'Sans faute ! +5 XP bonus',
    locked: 'Terminez la leçon précédente pour débloquer', finalLesson: 'Test de l\'unité', lesson: 'Leçon',
    myCourses: 'Mes cours', addCourse: 'Ajouter un cours', byCourse: 'Par cours', global: 'Tous les cours', current: 'Cours actuel',
    lessonsDone: 'leçons', today: 'aujourd\'hui'
  };
  const TEN = {
    learn: 'Learn', review: 'Review', dash: 'Dashboard', unit: 'Unit', start: 'START',
    check: 'CHECK', cont: 'CONTINUE', correct: ['Nice!', 'Excellent!', 'Great job!', 'Awesome!'],
    wrong: 'Correct answer:', almost: 'Watch the accents:', lessonDone: 'Lesson complete!', reviewDone: 'Review complete!',
    xp: 'XP', acc: 'Accuracy', time: 'Time', streak: 'Streak', days: 'days', day: 'day', outHearts: 'Out of hearts!',
    outHeartsSub: 'No worries: your mistakes were added to Review. Try again!', retry: 'TRY AGAIN', quit: 'QUIT',
    quitQ: 'Quit the lesson?', quitSub: 'You will lose your progress in this lesson.', keep: 'KEEP LEARNING',
    goal: 'Daily goal', goalDone: 'Goal reached!', total: 'Total XP', lessons: 'Lessons', best: 'Best streak',
    last7: 'XP in the last 7 days (all courses)', unitsProg: 'Units', weak: 'Weak items', noWeak: 'No mistakes to review. Keep it up!',
    reviewTitle: 'Review', reviewSub: 'Practise what you missed in this course until it sticks.', reviewBtn: 'REVIEW MY MISTAKES',
    practiceBtn: 'FREE PRACTICE', nothing: 'Complete a lesson to unlock review.', items: 'items to review',
    keepStreak: 'A lesson in any course keeps your streak!', streakSafe: 'Streak safe for today 🎉',
    streakUp: 'Streak extended!', reset: 'Reset all progress', resetQ: 'Erase all progress in every course?', tapPairs: 'Tap the matching pairs',
    typeHere: 'Type your answer…', missed: 'missed', mastered: 'mastered', perfect: 'Flawless! +5 bonus XP',
    locked: 'Finish the previous lesson to unlock', finalLesson: 'Unit test', lesson: 'Lesson',
    myCourses: 'My courses', addCourse: 'Add a course', byCourse: 'By course', global: 'All courses', current: 'Current course',
    lessonsDone: 'lessons', today: 'today'
  };
  let T = TEN;

  /* ---------- helpers ---------- */
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sample = (a, n) => shuffle(a).slice(0, n);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const $ = (sel, el) => (el || document).querySelector(sel);
  const pick = a => a[Math.random() * a.length | 0];
  const pad = n => String(n).padStart(2, '0');
  const dk = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const today = () => dk(new Date());
  function norm(s, keepAcc) {
    s = String(s).toLowerCase().replace(/œ/g, 'oe').replace(/æ/g, 'ae').replace(/[’`]/g, "'");
    if (!keepAcc) s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    s = s.replace(/[.!?¿¡,;:"«»()]/g, ' ').replace(/\s+/g, ' ').trim();
    return s.replace(/^(le |la |les |l'|un |une |des |the |a |an |to )/, '').trim();
  }

  /* ---------- courses ---------- */
  const COURSES = {}; const ORDER = [];
  window.registerCourse = function (c) {
    if (!c || !c.id || !Array.isArray(c.units)) { console.warn('Invalid course', c); return; }
    c.L = c.lessonsPerUnit || 3;
    c.ITEMS = {}; c.units.forEach((u, ui) => u.items.forEach((it, ii) => { it.id = it.id || (ui + '.' + ii); it._u = ui; c.ITEMS[it.id] = it; }));
    c.ALL = Object.values(c.ITEMS);
    c.totalLessons = c.units.length * c.L;
    if (!COURSES[c.id]) ORDER.push(c.id);
    COURSES[c.id] = c;
  };

  /* ---------- state ---------- */
  const KEY = 'learn-state-v2';
  const SESS_KEY = 'learn-session-v1';
  const MAX_HEARTS = 5;
  const def = () => ({ v: 2, xp: 0, days: {}, goal: 20, best: 0, sound: true, enrolled: [], current: null, courses: {} });
  const cdef = () => ({ xp: 0, done: {}, stats: {}, answered: 0, correct: 0, lessons: 0 });
  let S; try { S = Object.assign(def(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = def(); }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const clearSession = () => { try { localStorage.removeItem(SESS_KEY); } catch (e) {} };
  function saveSession() {
    if (!R) { clearSession(); return; }
    try {
      localStorage.setItem(SESS_KEY, JSON.stringify({
        v: 1, type: R.type, course: R.course, u: R.u, l: R.l, queue: R.queue, i: R.i,
        hearts: R.hearts, mistakes: R.mistakes, firstOk: R.firstOk, answers: R.answers, ok: R.ok,
        requeued: Array.from(R.requeued || []), start: R.start, total: R.total,
        checked: !!R.checked, sel: R.sel, lastFb: R.lastFb || null
      }));
    } catch (e) {}
  }
  function validEx(ex) {
    if (!ex || !ex.kind) return false;
    if (ex.kind === 'mcq') return Array.isArray(ex.options) && typeof ex.correct === 'number';
    if (ex.kind === 'type') return Array.isArray(ex.answers);
    if (ex.kind === 'match') return Array.isArray(ex.pairs);
    return false;
  }
  function loadSession() {
    try {
      const s = JSON.parse(localStorage.getItem(SESS_KEY) || 'null');
      if (!s || s.v !== 1 || !s.course || !COURSES[s.course] || !['lesson', 'review'].includes(s.type)) { clearSession(); return null; }
      if (!Array.isArray(s.queue) || !s.queue.length || !s.queue.every(validEx)) { clearSession(); return null; }
      const i = +s.i, hearts = +s.hearts;
      if (!Number.isFinite(i) || i < 0 || i >= s.queue.length || !Number.isFinite(hearts) || hearts < 0) { clearSession(); return null; }
      if (s.type === 'lesson') {
        const c = COURSES[s.course];
        if (!Number.isInteger(s.u) || !Number.isInteger(s.l) || s.u < 0 || s.u >= c.units.length || s.l < 0 || s.l >= c.L) { clearSession(); return null; }
      }
      return s;
    } catch (e) { clearSession(); return null; }
  }
  function resumeSession(s) {
    setCourse(s.course);
    R = { type: s.type, course: s.course, u: s.u, l: s.l, queue: s.queue, i: s.i, hearts: s.hearts,
      mistakes: +s.mistakes || 0, firstOk: +s.firstOk || 0, answers: +s.answers || 0, ok: +s.ok || 0,
      requeued: new Set(Array.isArray(s.requeued) ? s.requeued : []), start: s.start || Date.now(),
      sel: s.sel, checked: false, total: +s.total || s.queue.length, lastFb: s.lastFb || null };
    if (s.hearts <= 0) { fail(); return 'fail'; }
    if (s.checked && s.lastFb) R.checked = true;
    else if (s.checked) { R.i++; if (R.i >= R.queue.length) { finish(); return 'done'; } }
    return 'live';
  }
  let C = null, CS = null; // current course + its state
  const cstate = id => S.courses[id] || (S.courses[id] = cdef());

  const dayHas = d => (S.days[dk(d)] && S.days[dk(d)].lessons > 0);
  function streak() { let d = new Date(); if (!dayHas(d)) d = addDays(d, -1); let n = 0; while (dayHas(d)) { n++; d = addDays(d, -1); } return n; }
  const doneToday = () => dayHas(new Date());
  const todayXP = () => (S.days[today()] && S.days[today()].xp) || 0;

  const lk = (u, l) => u + '-' + l;
  const isDone = (u, l, cs) => !!(cs || CS).done[lk(u, l)];
  const unlocked = (u, l) => (u === 0 && l === 0) || (l > 0 ? isDone(u, l - 1) : isDone(u - 1, C.L - 1));
  function currentNode() { for (let u = 0; u < C.units.length; u++) for (let l = 0; l < C.L; l++) if (!isDone(u, l)) return [u, l]; return null; }
  const unitDone = u => { let n = 0; for (let l = 0; l < C.L; l++) if (isDone(u, l)) n++; return n; };
  const courseDone = id => Object.keys(cstate(id).done).length;
  const weakItems = () => C.ALL.filter(it => { const s = CS.stats[it.id]; return s && s.r > 0; })
    .sort((a, b) => (CS.stats[b.id].w - CS.stats[a.id].w) || (CS.stats[b.id].t - CS.stats[a.id].t));

  function setCourse(id) {
    if (!COURSES[id]) return;
    C = COURSES[id]; CS = cstate(id); S.current = id;
    if (!S.enrolled.includes(id)) S.enrolled.push(id);
    T = C.lang === 'fr' ? TFR : TEN;
    const r = document.documentElement.style, th = C.theme || {};
    [['--c', th.c || '#58cc02'], ['--cd', th.cd || '#46a302'], ['--cl', th.cl || '#e7f9d7'], ['--acc', th.acc || '#ff9600'], ['--bg', th.bg || '#f7f7f7']].forEach(([k, v]) => r.setProperty(k, v));
    const m = $('meta[name="theme-color"]'); if (m) m.content = th.c || '#58cc02';
    document.documentElement.lang = C.lang || 'en';
    render._scrolled = false; save();
  }

  /* ---------- lesson building ---------- */
  function distract(item, n, key) {
    const k = key(item); const seen = new Set([k]); const out = [];
    for (const it of shuffle(C.units[item._u].items).concat(shuffle(C.ALL))) { const v = key(it); if (!seen.has(v)) { seen.add(v); out.push(v); } if (out.length >= n) break; }
    return out;
  }
  const ctx = () => ({ shuffle, sample, distract, esc, ALL: C.ALL });
  const exFor = item => shuffle(C.makeExercises(item, ctx())).map(e => Object.assign({ itemId: item.id }, e));
  function buildSet(focus, others, size, perItem, withMatch) {
    const out = []; const pools = focus.map(exFor); let round = 0;
    while (out.length < size && round < perItem) { let added = false; for (const p of pools) { if (out.length >= size) break; const e = p.shift(); if (e) { out.push(e); added = true; } } if (!added) break; round++; }
    for (const it of shuffle(others)) { if (out.length >= size) break; out.push(exFor(it)[0]); }
    let res = shuffle(out);
    for (let i = 1; i < res.length; i++) if (res[i].itemId === res[i - 1].itemId) { const j = res.findIndex((e, k) => k > i && e.itemId !== res[i].itemId); if (j > 0) [res[i], res[j]] = [res[j], res[i]]; }
    if (withMatch && C.makeMatch && focus.length >= 4) {
      const m = C.makeMatch(sample(focus, Math.min(5, focus.length)), ctx());
      if (m) { res = res.slice(0, size - 1); res.splice(Math.min(res.length, 2 + (Math.random() * (res.length - 2) | 0)), 0, m); }
    }
    return res;
  }
  function buildLesson(u, l) {
    const items = C.units[u].items;
    if (l < C.L - 1) { const cs = Math.ceil(items.length / (C.L - 1)); const focus = items.slice(l * cs, (l + 1) * cs); return buildSet(focus, items.filter(i => !focus.includes(i)), C.lessonSize || 9, C.perItem || 2, true); }
    return buildSet(shuffle(items), [], C.finalSize || 10, 1, true);
  }
  function buildReview(free) {
    let focus = free ? [] : weakItems().slice(0, 8);
    if (focus.length < 6) { const seen = C.ALL.filter(it => CS.stats[it.id] && !focus.includes(it)).sort((a, b) => CS.stats[a.id].s - CS.stats[b.id].s); focus = focus.concat(free ? sample(seen, 8) : seen.slice(0, 6 - focus.length)); }
    if (!focus.length) return null;
    return buildSet(focus, [], Math.min(8, Math.max(focus.length, 5)), 2, focus.length >= 4);
  }

  /* ---------- sound / speech ---------- */
  let ac;
  function beep(ok) {
    if (!S.sound) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      (ok ? [660, 880] : [220, 180]).forEach((f, i) => { const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + i * 0.09; o.type = ok ? 'sine' : 'square'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16); o.connect(g).connect(ac.destination); o.start(t0); o.stop(t0 + 0.18); });
    } catch (e) {}
  }
  function speak(text, lang) { try { const u = new SpeechSynthesisUtterance(text); u.lang = lang; u.rate = 0.9; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {} }

  /* ---------- views ---------- */
  const IC = {
    learn: '<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    review: '<svg viewBox="0 0 24 24"><path d="M12 4a8 8 0 0 1 7.7 5.9l1.8-.9-1 5.2-4.4-2.9 1.8-.9A6 6 0 1 0 18 15h2.1A8 8 0 1 1 12 4z"/></svg>',
    dash: '<svg viewBox="0 0 24 24"><path d="M4 20V11h3v9zm6.5 0V4h3v16zM17 20v-6h3v6z"/></svg>'
  };
  const flame = on => `<span class="flame ${on ? 'on' : ''}">🔥</span>`;
  const tile = (c, cls) => `<span class="ctile ${cls || ''}" style="background:${c.theme.c};box-shadow:0 3px 0 ${c.theme.cd}">${c.logo}</span>`;
  const root = document.getElementById('app');
  let tab = (location.hash || '#learn').slice(1); if (!['learn', 'review', 'dash'].includes(tab)) tab = 'learn';
  let R = null, picking = false, menuOpen = false;

  function topbar() {
    return `<header class="top">
      <button class="cswitch" id="cswitch" aria-label="${T.myCourses}">${tile(C)}<span class="bname">${esc(C.short)}</span><span class="chev">▾</span></button>
      <div class="stats"><span class="pill" title="${T.streak}">${flame(doneToday())}<b data-t="streak">${streak()}</b></span>
      <span class="pill" title="${T.total}"><span>⭐</span><b data-t="xp">${S.xp}</b></span></div></header>
      ${menuOpen ? courseMenu() : ''}`;
  }
  function courseMenu() {
    return `<div class="cmenu-back" id="cmenuBack"></div><div class="cmenu" role="menu"><div class="cmh">${T.myCourses}</div>
      ${S.enrolled.filter(id => COURSES[id]).map(id => { const c = COURSES[id], cs = cstate(id), p = courseDone(id) / c.totalLessons;
        return `<button class="citem ${id === C.id ? 'act' : ''}" data-course="${id}">${tile(c)}<div class="cinfo"><b>${esc(c.name)}</b>
          <div class="bar"><i style="width:${p * 100}%;background:${c.theme.c}"></i></div><small>${courseDone(id)}/${c.totalLessons} ${T.lessonsDone} · ${cs.xp} XP</small></div>${id === C.id ? '<span class="tick">✓</span>' : ''}</button>`; }).join('')}
      <button class="citem add" id="addCourse"><span class="ctile plus">＋</span><div class="cinfo"><b>${T.addCourse}</b></div></button></div>`;
  }
  function tabbar() {
    const wc = weakItems().length;
    return `<nav class="tabs">${['learn', 'review', 'dash'].map(t => `<button class="tab ${tab === t ? 'act' : ''}" data-tab="${t}">${IC[t]}<span>${T[t]}</span>${t === 'review' && wc ? `<i class="badge">${wc}</i>` : ''}</button>`).join('')}</nav>`;
  }
  function goalInner() {
    const x = todayXP(), g = S.goal, p = Math.min(1, x / g);
    return `<div class="ring" style="--p:${p}"><span>${x >= g ? '✓' : Math.round(p * 100) + '%'}</span></div>
      <div class="gtxt"><b>${x >= g ? T.goalDone : T.goal}</b><div class="bar"><i style="width:${p * 100}%"></i></div><small>${x} / ${g} XP · ${doneToday() ? T.streakSafe : T.keepStreak}</small></div>`;
  }
  const OFF = [0, 52, 78, 52, 0, -52, -78, -52];
  function viewLearn() {
    const cur = currentNode(); let k = 0;
    let h = `<div class="card goal">${goalInner()}</div>`;
    C.units.forEach((u, ui) => {
      const locked = !unlocked(ui, 0);
      h += `<section class="unit ${locked ? 'locked' : ''}" style="--uc:${u.color || 'var(--c)'}">
        <div class="ubanner"><div><small>${T.unit} ${ui + 1} · ${unitDone(ui)}/${C.L}</small><h2>${esc(u.title)}</h2><p>${esc(u.desc || '')}</p></div><span class="uicon">${u.icon || '📘'}</span></div><div class="path">`;
      for (let l = 0; l < C.L; l++) {
        const done = isDone(ui, l), open = unlocked(ui, l), isCur = cur && cur[0] === ui && cur[1] === l, final = l === C.L - 1;
        const label = final ? T.finalLesson : `${T.lesson} ${l + 1}`;
        h += `<div class="node-wrap ${isCur ? 'has-bubble' : ''}" style="transform:translateX(${OFF[k++ % OFF.length]}px)">${isCur ? `<div class="bubble">${T.start}</div>` : ''}
          <button class="node ${done ? 'done' : open ? 'open' : 'lock'} ${isCur ? 'cur' : ''} ${final ? 'final' : ''}" data-u="${ui}" data-l="${l}" aria-label="${esc(u.title)} – ${label}">
          <span>${done ? (final ? '🏆' : '✓') : open ? (final ? '🏆' : '★') : '🔒'}</span></button><small class="nlabel">${label}</small></div>`;
      }
      h += `</div></section>`;
    });
    return h + `<p class="foot">${esc(C.footer || '')}</p>`;
  }
  function weakList(w, n) {
    if (!w.length) return `<div class="card"><h3>${T.weak} · ${esc(C.name)}</h3><p class="muted">${T.noWeak}</p></div>`;
    return `<div class="card"><h3>${T.weak} · ${esc(C.name)}</h3><ul class="weak">${w.slice(0, n).map(it => `<li><div><b>${C.itemLabel(it, C)}</b><small>${C.itemDetail(it, C)}</small></div><span class="miss">${CS.stats[it.id].w}× ${T.missed}</span></li>`).join('')}</ul></div>`;
  }
  function viewReview() {
    const w = weakItems(), any = Object.keys(CS.stats).length > 0;
    return `<div class="card hero"><div class="heroic">${tile(C, 'big')}</div><h2>${T.reviewTitle} · ${esc(C.short)}</h2><p>${T.reviewSub}</p>
      <div class="bigcount"><b>${w.length}</b> ${T.items}</div>
      <button class="btn primary" id="revBtn" ${w.length ? '' : 'disabled'}>${T.reviewBtn}</button>
      <button class="btn ghost" id="freeBtn" ${any ? '' : 'disabled'}>${T.practiceBtn}</button>${any ? '' : `<p class="muted">${T.nothing}</p>`}</div>` + weakList(w, 30);
  }
  function viewDash() {
    const st = streak(); let ans = 0, cor = 0, les = 0;
    Object.values(S.courses).forEach(c => { ans += c.answered; cor += c.correct; les += c.lessons; });
    const acc = ans ? Math.round(100 * cor / ans) : 0;
    let h = `<div class="sect">${T.global}</div><div class="grid4">
      <div class="card stat"><span class="si">${flame(doneToday())}</span><b data-t="dstreak">${st}</b><small>${T.streak}</small></div>
      <div class="card stat"><span class="si">🏅</span><b data-t="dbest">${Math.max(S.best, st)}</b><small>${T.best}</small></div>
      <div class="card stat"><span class="si">⭐</span><b data-t="dxp">${S.xp}</b><small>${T.total}</small></div>
      <div class="card stat"><span class="si">🎯</span><b>${acc}%</b><small>${T.acc} · ${les} ${T.lessonsDone}</small></div></div>`;
    h += `<div class="card"><div class="goal">${goalInner()}</div><div class="goalpick" style="margin-top:14px">${[10, 20, 30, 50].map(g => `<button class="chip ${S.goal === g ? 'act' : ''}" data-goal="${g}">${g} XP</button>`).join('')}</div></div>`;
    const days = []; for (let i = 6; i >= 0; i--) { const d = addDays(new Date(), -i), r = S.days[dk(d)] || {}; days.push({ d, xp: r.xp || 0, by: r.by || {} }); }
    const max = Math.max(S.goal, ...days.map(x => x.xp));
    const used = ORDER.filter(id => days.some(x => x.by[id]));
    h += `<div class="card"><h3>${T.last7}</h3><div class="chart"><div class="plot"><div class="goalline" style="bottom:${S.goal / max * 100}%"><span>🎯 ${S.goal}</span></div>
      ${days.map((x, i) => { const other = x.xp - Object.values(x.by).reduce((a, b) => a + b, 0);
        return `<div class="col"><div class="stack ${i === 6 ? 'today' : ''}" style="height:${x.xp / max * 100}%">${x.xp ? `<em>${x.xp}</em>` : ''}
        ${ORDER.filter(id => x.by[id]).map(id => `<i style="flex:${x.by[id]};background:${COURSES[id].theme.c}"></i>`).join('')}${other > 0 ? `<i style="flex:${other};background:#bbb"></i>` : ''}</div></div>`; }).join('')}</div>
      <div class="dlabels">${days.map(x => `<small>${x.d.toLocaleDateString(C.lang === 'fr' ? 'fr-FR' : 'en-GB', { weekday: 'short' }).replace('.', '')}</small>`).join('')}</div>
      ${used.length ? `<div class="legend">${used.map(id => `<span><i style="background:${COURSES[id].theme.c}"></i>${esc(COURSES[id].short)}</span>`).join('')}</div>` : ''}</div></div>`;
    h += `<div class="sect">${T.byCourse}</div><div class="card">${S.enrolled.filter(id => COURSES[id]).map(id => { const c = COURSES[id], cs = cstate(id), a = cs.answered ? Math.round(100 * cs.correct / cs.answered) + '%' : '–';
      const tx = (S.days[today()] && S.days[today()].by && S.days[today()].by[id]) || 0;
      return `<button class="crow ${id === C.id ? 'act' : ''}" data-course="${id}">${tile(c)}<div class="ut"><div class="row"><b>${esc(c.name)}</b><small data-t="cxp-${id}">${cs.xp} XP</small></div>
        <div class="bar"><i style="width:${courseDone(id) / c.totalLessons * 100}%;background:${c.theme.c}"></i></div>
        <small class="cmeta">${courseDone(id)}/${c.totalLessons} ${T.lessonsDone} · ${T.acc} ${a} · +${tx} XP ${T.today}</small></div></button>`; }).join('')}</div>`;
    h += `<div class="sect">${T.current} · ${esc(C.name)}</div><div class="card"><h3>${T.unitsProg}</h3>${C.units.map((u, ui) => { const n = unitDone(ui); const m = u.items.filter(it => CS.stats[it.id] && CS.stats[it.id].s >= 2 && !(CS.stats[it.id].r > 0)).length;
      return `<div class="uprog"><span class="uicon sm">${u.icon}</span><div class="ut"><div class="row"><b>${esc(u.title)}</b><small>${n}/${C.L} · ${m}/${u.items.length} ${T.mastered}</small></div><div class="bar"><i style="width:${n / C.L * 100}%;background:${u.color || 'var(--c)'}"></i></div></div></div>`; }).join('')}</div>`;
    return h + weakList(weakItems(), 8) + `<button class="link" id="resetBtn">${T.reset}</button>`;
  }
  function viewPicker() {
    const first = !C;
    return `<div class="picker"><div class="pk-head">${first ? '<div class="pk-logo">🎓</div>' : '<button class="x" id="pkClose" aria-label="close">✕</button>'}
      <h1>${first ? 'Choose your courses' : 'Courses'}</h1><p>Choisissez vos cours · You can add more later</p></div>
      <div class="pk-list">${ORDER.map(id => { const c = COURSES[id], on = S.enrolled.includes(id);
        return `<button class="pk-card ${on ? 'on' : ''}" data-pick="${id}" style="--pc:${c.theme.c};--pcd:${c.theme.cd};--pcl:${c.theme.cl}">${tile(c, 'big')}
          <div class="pk-info"><b>${esc(c.name)}</b><small>${esc(c.desc || '')}</small><em>${c.ALL.length} ${esc(c.itemNoun || 'items')} · ${c.units.length} units${on && courseDone(id) ? ` · ${courseDone(id)}/${c.totalLessons} ✓` : ''}</em></div>
          <span class="pk-check">${on ? '✓' : '＋'}</span></button>`; }).join('')}</div>
      <div class="pk-foot"><button class="btn primary" id="pkGo" ${S.enrolled.length ? '' : 'disabled'}>${first ? "LET'S GO · C'EST PARTI" : 'DONE · OK'}</button></div></div>`;
  }

  function render() {
    if (R) return renderLesson();
    if (picking || !C) {
      root.innerHTML = viewPicker();
      root.querySelectorAll('[data-pick]').forEach(b => b.onclick = () => {
        const id = b.dataset.pick, i = S.enrolled.indexOf(id);
        if (i >= 0) { if (S.enrolled.length > 1 || !C) S.enrolled.splice(i, 1); } else S.enrolled.push(id);
        if (C && !S.enrolled.includes(C.id)) setCourse(S.enrolled[0]);
        save(); render();
      });
      const go = $('#pkGo'); if (go) go.onclick = () => { picking = false; if (!C || !S.enrolled.includes(C.id)) setCourse(S.enrolled[0]); tab = 'learn'; render(); window.scrollTo(0, 0); };
      const cl = $('#pkClose'); if (cl) cl.onclick = () => { picking = false; render(); };
      return;
    }
    const body = tab === 'learn' ? viewLearn() : tab === 'review' ? viewReview() : viewDash();
    root.innerHTML = `${topbar()}<main class="screen s-${tab}">${body}</main>${tabbar()}`;
    $('#cswitch').onclick = () => { menuOpen = !menuOpen; render(); };
    const back = $('#cmenuBack'); if (back) back.onclick = () => { menuOpen = false; render(); };
    root.querySelectorAll('[data-course]').forEach(b => b.onclick = () => { menuOpen = false; setCourse(b.dataset.course); if (b.classList.contains('citem')) tab = 'learn'; render(); window.scrollTo(0, 0); });
    const add = $('#addCourse'); if (add) add.onclick = () => { menuOpen = false; picking = true; render(); window.scrollTo(0, 0); };
    root.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { tab = b.dataset.tab; menuOpen = false; history.replaceState(null, '', '#' + tab); render(); window.scrollTo(0, 0); });
    root.querySelectorAll('.node').forEach(b => b.onclick = () => { const u = +b.dataset.u, l = +b.dataset.l; if (!unlocked(u, l)) return toast(T.locked); startRun('lesson', buildLesson(u, l), u, l); });
    const rb = $('#revBtn'), fb = $('#freeBtn');
    if (rb) rb.onclick = () => { const q = buildReview(false); if (q) startRun('review', q); };
    if (fb) fb.onclick = () => { const q = buildReview(true); if (q) startRun('review', q); };
    root.querySelectorAll('[data-goal]').forEach(b => b.onclick = () => { S.goal = +b.dataset.goal; save(); render(); });
    const rs = $('#resetBtn'); if (rs) rs.onclick = () => { if (confirm(T.resetQ)) { S = def(); save(); clearSession(); C = null; CS = null; picking = true; R = null; render(); } };
    if (tab === 'learn' && !menuOpen && !render._scrolled) { const c = $('.node.cur'); if (c) { render._scrolled = true; setTimeout(() => c.scrollIntoView({ block: 'center' }), 50); } }
  }
  function toast(msg) {
    let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 1800);
  }

  /* ---------- lesson runner ---------- */
  function startRun(type, queue, u, l) {
    R = { type, course: C.id, u, l, queue, i: 0, hearts: MAX_HEARTS, mistakes: 0, firstOk: 0, answers: 0, ok: 0, requeued: new Set(), start: Date.now(), sel: null, checked: false, total: queue.length, lastFb: null };
    saveSession(); window.scrollTo(0, 0); render();
  }
  function rec(id, ok) {
    const s = CS.stats[id] || (CS.stats[id] = { c: 0, w: 0, s: 0, t: 0 });
    if (ok) { s.c++; s.s++; if (s.r > 0 && R && (R.type === 'review' || (s.lw || 0) < R.start)) s.r--; }
    else { s.w++; s.s = 0; s.r = 1; s.lw = Date.now(); }
    s.t = Date.now(); CS.answered++; if (ok) CS.correct++;
  }
  function renderLesson() {
    const ex = R.queue[R.i]; window.__ex = ex;
    const spk = ex.speak ? `<button class="spk" data-say="1" aria-label="audio">🔊</button>` : '';
    const prompt = `<div class="prompt${ex.speak ? ' has-spk' : ''}">${spk}${ex.speak ? `<div class="prompt-main">${ex.prompt}</div>` : ex.prompt}</div>`;
    let body = '';
    if (ex.kind === 'mcq') body = `<div class="ex-sub">${ex.sub}</div>${prompt}
        <div class="opts">${ex.options.map((o, i) => `<button class="opt" data-i="${i}"><kbd>${i + 1}</kbd><span>${esc(o)}</span></button>`).join('')}</div>`;
    else if (ex.kind === 'type') body = `<div class="ex-sub">${ex.sub}</div>${prompt}
        <textarea class="typein" rows="2" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${T.typeHere}" lang="${ex.lang || ''}"></textarea>
        ${ex.chars ? `<div class="chars">${ex.chars.map(c => `<button class="char">${c}</button>`).join('')}</div>` : ''}`;
    else if (ex.kind === 'match') {
      const left = shuffle(ex.pairs.map((p, i) => ({ t: p[0], i }))), right = shuffle(ex.pairs.map((p, i) => ({ t: p[1], i })));
      R.matched = new Set(); R.mErr = new Set(); R.mSel = null;
      body = `<div class="ex-sub">${T.tapPairs}</div><div class="match"><div class="mcol">${left.map(x => `<button class="mt" data-side="L" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div>
        <div class="mcol">${right.map(x => `<button class="mt" data-side="R" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div></div>`;
    }
    root.innerHTML = `<div class="lesson"><header class="lhead"><button class="x" id="quit" aria-label="close">✕</button><div class="lbar"><i style="width:${R.i / R.queue.length * 100}%"></i></div>
      <span class="hearts">❤️ <b>${R.hearts}</b></span></header><main class="lbody k-${ex.kind}">${body}</main>
      <footer class="lfoot" id="lfoot"><button class="btn primary" id="checkBtn" disabled>${T.check}</button></footer></div>`;
    const resumeFb = R.checked && R.lastFb;
    if (!resumeFb) { R.sel = null; R.checked = false; }
    $('#quit').onclick = quitAsk;
    const sp = $('[data-say]'); if (sp) sp.onclick = () => speak(ex.speak.text, ex.speak.lang);
    if (ex.kind === 'mcq') {
      root.querySelectorAll('.opt').forEach(b => b.onclick = () => { if (R.checked) return; root.querySelectorAll('.opt').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); R.sel = +b.dataset.i; $('#checkBtn').disabled = false; });
      $('#checkBtn').onclick = check;
    } else if (ex.kind === 'type') {
      const ta = $('.typein'); ta.focus({ preventScroll: true });
      ta.oninput = () => { $('#checkBtn').disabled = !ta.value.trim(); };
      ta.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); if (!R.checked && ta.value.trim()) check(); else if (R.checked) next(); } };
      root.querySelectorAll('.char').forEach(b => b.onclick = () => { ta.value += b.textContent; ta.oninput(); ta.focus(); });
      $('#checkBtn').onclick = check;
    } else { $('#checkBtn').style.visibility = 'hidden'; root.querySelectorAll('.mt').forEach(b => b.onclick = () => matchTap(b)); }
    if (resumeFb) {
      if (ex.kind === 'mcq') root.querySelectorAll('.opt').forEach((b, i) => { if (i === ex.correct) b.classList.add('right'); else if (R.sel != null && i === R.sel) b.classList.add('wrongopt'); b.disabled = true; });
      else if (ex.kind === 'type') { const ta = $('.typein'); if (ta) ta.disabled = true; }
      else root.querySelectorAll('.mt').forEach(x => { x.classList.add('ok', 'gone'); x.disabled = true; });
      feedback(R.lastFb.ok, R.lastFb.shown, R.lastFb.note);
    }
  }
  function matchTap(b) {
    const ex = R.queue[R.i], i = +b.dataset.i, side = b.dataset.side;
    if (R.matched.has(i) || R.checked) return;
    if (!R.mSel || R.mSel.side === side) { root.querySelectorAll(`.mt[data-side="${side}"]`).forEach(x => x.classList.remove('sel')); b.classList.add('sel'); R.mSel = { side, i, el: b }; return; }
    const a = R.mSel; R.mSel = null;
    if (a.i === i) {
      R.matched.add(i); [a.el, b].forEach(x => { x.classList.remove('sel'); x.classList.add('ok'); setTimeout(() => x.classList.add('gone'), 350); }); beep(true);
      if (R.matched.size === ex.pairs.length) { ex.pairs.forEach((p, k) => rec(p[2], !R.mErr.has(k))); const ok = R.mErr.size === 0; R.answers++; if (ok) { R.firstOk++; R.ok++; } R.checked = true; save(); feedback(true, '', ''); }
    } else {
      [a.el, b].forEach(x => { x.classList.remove('sel'); x.classList.add('bad'); setTimeout(() => x.classList.remove('bad'), 450); }); beep(false);
      R.mErr.add(a.side === 'L' ? a.i : i); R.mistakes++; R.hearts--; $('.hearts b').textContent = R.hearts; saveSession();
      if (R.hearts <= 0) { save(); setTimeout(fail, 500); }
    }
  }
  function check() {
    if (R.checked) return; const ex = R.queue[R.i]; let ok, shown = '', note = '';
    if (ex.kind === 'mcq') {
      ok = R.sel === ex.correct; shown = ex.options[ex.correct];
      root.querySelectorAll('.opt').forEach((b, i) => { if (i === ex.correct) b.classList.add('right'); else if (i === R.sel) b.classList.add('wrongopt'); b.disabled = true; });
    } else {
      const v = $('.typein').value;
      ok = ex.answers.some(a => norm(a, true) === norm(v, true));
      if (!ok && ex.answers.some(a => norm(a) === norm(v))) { ok = true; note = `${T.almost} <b>${esc(ex.display)}</b>`; }
      shown = ex.display; $('.typein').disabled = true;
    }
    R.checked = true; R.answers++;
    if (ok) { R.ok++; if (!R.requeued.has(R.i)) R.firstOk++; }
    else { R.mistakes++; R.hearts--; if (!R.requeued.has(R.i) && R.queue.length < R.total + 4) { R.queue.push(Object.assign({}, ex)); R.requeued.add(R.queue.length - 1); } }
    rec(ex.itemId, ok); save(); beep(ok); $('.hearts b').textContent = R.hearts;
    feedback(ok, shown, note);
  }
  function feedback(ok, shown, note) {
    R.lastFb = { ok, shown: shown || '', note: note || '' }; saveSession();
    const ex = R.queue[R.i], f = $('#lfoot');
    f.className = 'lfoot fb ' + (ok ? 'good' : 'bad');
    f.innerHTML = `<div class="fbtxt"><div class="fbh">${ok ? '✅ ' + pick(T.correct) : '❌ ' + T.wrong}</div>${!ok ? `<div class="fba">${esc(shown)}</div>` : ''}${note ? `<div class="fbn">${note}</div>` : ''}
      ${ex.explain ? `<div class="fbe">${ex.explain}</div>` : ''}</div><button class="btn ${ok ? 'primary' : 'danger'}" id="nextBtn">${T.cont}</button>`;
    $('#nextBtn').onclick = next; $('#nextBtn').focus({ preventScroll: true });
  }
  function next() {
    if (!R) return; if (R.hearts <= 0) { save(); return fail(); }
    R.i++; R.checked = false; R.lastFb = null; R.sel = null;
    if (R.i >= R.queue.length) return finish();
    saveSession(); renderLesson(); window.scrollTo(0, 0);
  }
  function finish() {
    const acc = R.answers ? R.ok / R.answers : 1, perfect = R.mistakes === 0;
    const xp = (R.type === 'review' ? 5 : 10) + Math.min(R.firstOk, R.total) + (perfect ? 5 : 0);
    const wasToday = doneToday(), goalBefore = todayXP() >= S.goal;
    const d = S.days[today()] || (S.days[today()] = { xp: 0, lessons: 0, by: {} }); d.by = d.by || {};
    d.xp += xp; d.lessons++; d.by[C.id] = (d.by[C.id] || 0) + xp;
    S.xp += xp; CS.xp += xp; CS.lessons++;
    if (R.type === 'lesson') { const k = lk(R.u, R.l), p = CS.done[k]; CS.done[k] = { acc: Math.max(p ? p.acc : 0, acc), n: (p ? p.n : 0) + 1, at: Date.now() }; }
    const after = streak(); S.best = Math.max(S.best, after); save();
    const secs = Math.round((Date.now() - R.start) / 1000), goalNow = todayXP() >= S.goal, type = R.type;
    clearSession(); R = null;
    root.innerHTML = `<div class="done-screen"><div class="confetti">${Array.from({ length: 40 }, () => `<i style="--x:${Math.random() * 100}%;--d:${(Math.random() * 1.5 + .6).toFixed(2)}s;--h:${Math.random() * 360 | 0}"></i>`).join('')}</div>
      <div class="trophy">${C.mascot || '🎉'}</div><h1>${type === 'review' ? T.reviewDone : T.lessonDone}</h1>${perfect ? `<p class="perfect">${T.perfect}</p>` : ''}
      <div class="res"><div class="rc xp"><small>${T.xp}</small><b data-t="gained">+${xp}</b></div><div class="rc ac"><small>${T.acc}</small><b>${Math.round(acc * 100)}%</b></div><div class="rc tm"><small>${T.time}</small><b>${Math.floor(secs / 60)}:${pad(secs % 60)}</b></div></div>
      ${!wasToday ? `<div class="streakup">${flame(true)}<div><b>${after} ${after > 1 ? T.days : T.day}</b><small>${T.streakUp}</small></div></div>` : ''}
      ${!goalBefore && goalNow ? `<div class="goalmsg">🎯 ${T.goalDone}</div>` : ''}<button class="btn primary" id="doneBtn">${T.cont}</button></div>`;
    $('#doneBtn').onclick = render;
  }
  function fail() {
    const type = R.type, u = R.u, l = R.l; clearSession(); R = null; save();
    root.innerHTML = `<div class="done-screen failed"><div class="trophy">💔</div><h1>${T.outHearts}</h1><p>${T.outHeartsSub}</p>
      <button class="btn primary" id="retryBtn">${T.retry}</button><button class="btn ghost" id="quitBtn">${T.quit}</button></div>`;
    $('#retryBtn').onclick = () => { if (type === 'lesson') startRun('lesson', buildLesson(u, l), u, l); else { const q = buildReview(false) || buildReview(true); q ? startRun('review', q) : render(); } };
    $('#quitBtn').onclick = render;
  }
  function quitAsk() {
    const m = document.createElement('div'); m.className = 'modal';
    m.innerHTML = `<div class="sheet"><div class="trophy sm">${C.mascot || '🎓'}</div><h3>${T.quitQ}</h3><p>${T.quitSub}</p><button class="btn primary" id="mKeep">${T.keep}</button><button class="btn ghost red" id="mQuit">${T.quit}</button></div>`;
    document.body.appendChild(m);
    $('#mKeep').onclick = () => m.remove();
    $('#mQuit').onclick = () => { m.remove(); clearSession(); R = null; save(); render(); };
  }
  document.addEventListener('keydown', e => {
    if (!R || e.target.tagName === 'TEXTAREA') return; const ex = R.queue[R.i];
    if (ex && ex.kind === 'mcq' && !R.checked && /^[1-9]$/.test(e.key)) { const b = root.querySelectorAll('.opt')[+e.key - 1]; if (b) b.click(); }
    if (e.key === 'Enter') { const n = R.checked ? $('#nextBtn') : $('#checkBtn'); if (n && !n.disabled) n.click(); }
  });

  /* ---------- boot: load every registered course file, then start ---------- */
  const ids = self.COURSE_IDS || [];
  Promise.all(ids.map(id => new Promise(res => { const s = document.createElement('script'); s.src = 'courses/' + id + '.js'; s.onload = res; s.onerror = () => { console.warn('Course failed to load: ' + id); res(); }; document.head.appendChild(s); })))
    .then(() => {
      ORDER.sort((a, b) => ids.indexOf(a) - ids.indexOf(b));
      S.enrolled = S.enrolled.filter(id => COURSES[id]);
      if (S.current && COURSES[S.current] && S.enrolled.includes(S.current)) setCourse(S.current); else if (S.enrolled.length) setCourse(S.enrolled[0]);
      window.__app = { get state() { return S; }, streak, COURSES, get course() { return C && C.id; }, get run() { return R; } };
      const sess = loadSession();
      const how = sess ? resumeSession(sess) : null;
      if (how !== 'fail' && how !== 'done') render();
    });
  if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
})();
