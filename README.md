# Learn: one app, many courses

A Duolingo-style Progressive Web App (installable, works offline, no backend).
All progress is stored in the browser's `localStorage` under the key `learn-state-v2`.

```
learn/
  index.html            app shell
  app.js                engine: course switcher, lesson path, lessons, review, dashboard, streak
  styles.css, nunito.ttf
  manifest.webmanifest, sw.js, icons/
  courses/
    index.js            course registry (list of course ids)
    code-de-la-route.js
    english-idioms.js
    en-fr-vocabulary.js
```

## What is global and what belongs to a course
* **Global, shared by all courses:** the daily streak (any lesson or review in any course counts; it resets if you skip a day), best streak, the daily XP goal, total XP and the 7-day XP chart.
* **Per course:** the lesson path and unlocked lessons, unit progress, course XP, accuracy, review/weak items and the color theme.

## Add a new course (one file + one line)
1. Create `courses/<your-id>.js`:

```js
registerCourse({
  id: 'spanish-basics',               // must match the file name and the registry entry
  name: 'Spanish Basics', short: 'Spanish',
  lang: 'en',                         // UI language while this course is open: 'en' or 'fr'
  logo: '🇪🇸', mascot: '🌮',          // header tile and lesson-complete picture
  desc: 'First words in Spanish.', itemNoun: 'words',
  theme: { c: '#ff4b4b', cd: '#d93030', cl: '#ffe3e3', acc: '#ffc800', bg: '#fff8f8' },
  lessonsPerUnit: 3,                  // lessons 1..n-1 each focus on part of the unit; the last one is a unit test
  lessonSize: 9, finalSize: 10, perItem: 2,
  units: [
    { title: 'Greetings', desc: 'Hello & goodbye', icon: '👋', color: '#ff4b4b',
      items: [ { en: 'hello', es: 'hola' }, { en: 'goodbye', es: 'adiós' } /* ... */ ] }
  ],
  // Return one or more exercises for an item. ctx = { shuffle, sample, distract(item, n, keyFn), esc, ALL }
  makeExercises(it, ctx) {
    const opts = ctx.shuffle([it.es, ...ctx.distract(it, 3, x => x.es)]);
    return [
      { kind: 'mcq', sub: 'Translate', prompt: `<span class="big">${ctx.esc(it.en)}</span>`,
        options: opts, correct: opts.indexOf(it.es), explain: `${it.en} = ${it.es}` },
      { kind: 'type', sub: 'Write in Spanish', prompt: `<span class="big">${ctx.esc(it.en)}</span>`,
        answers: [it.es], display: it.es }
    ];
  },
  // Optional: a "tap the pairs" exercise. Each pair is [left, right, itemId].
  makeMatch(items) { return { kind: 'match', pairs: items.slice(0, 5).map(it => [it.en, it.es, it.id]) }; },
  itemLabel: it => `${it.en} → ${it.es}`,   // shown in the weak-items list
  itemDetail: (it, course) => course.units[it._u].title
});
```

2. Add the id to `courses/index.js`:

```js
self.COURSE_IDS = ['code-de-la-route', 'english-idioms', 'en-fr-vocabulary', 'spanish-basics'];
```

3. In `sw.js`, bump `VERSION` (e.g. `learn-v2`) so installed copies refresh their offline cache. The new course file is cached automatically because the service worker reads `courses/index.js`.

The new course appears in the course picker ("Add a course" in the header switcher). Nothing else needs to change.

Exercise kinds: `mcq` (options + correct index), `type` (answers[] + display; accents and leading articles are checked leniently), `match` (pairs). Every exercise can carry `explain` (HTML shown after answering) and `speak: { text, lang }` (adds a 🔊 button that uses the device's speech synthesis).

## Run locally
```
cd /workspace/apps && python3 -m http.server 8765
# open http://localhost:8765/learn/
```
To install it on a phone, the folder must be served over HTTPS (any static host). Then use "Add to Home Screen" (iPhone, Safari) or "Install app" (Android, Chrome).
