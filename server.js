/**
 * PokerJS Web App (Express + EJS)
 * Modes: Practice, Random Lesson, Browse Cards, Progress
 * Data: code_snippets.json + deckofcards/*.md
 */
const express = require('express');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter'); // optional if frontmatter later
const marked = require('marked');

const app = express();
const PORT = process.env.PORT || 5000;

// Paths
const ROOT = __dirname;
const DATA_PATH = path.join(ROOT, 'code_snippets.json');
const DECK_DIR = path.join(ROOT, 'deckofcards');
const PROGRESS_PATH = path.join(ROOT, 'progress.json');

// Express config
app.set('view engine', 'ejs');
app.set('views', path.join(ROOT, 'views'));
app.use(express.static(path.join(ROOT, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Load data
function loadCards() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  const data = JSON.parse(raw);
  return data.cards || [];
}
let CARDS = loadCards();

// Progress store
function loadProgress() {
  try {
    const raw = fs.readFileSync(PROGRESS_PATH, 'utf-8');
    const p = JSON.parse(raw);
    return {
      seen: new Set(Array.isArray(p.seen) ? p.seen : []),
      correct: p.correct ?? 0,
      total: p.total ?? 0,
      streak: p.streak ?? 0,
      bestStreak: p.bestStreak ?? 0,
    };
  } catch {
    return { seen: new Set(), correct: 0, total: 0, streak: 0, bestStreak: 0 };
  }
}
function saveProgress(p) {
  const out = {
    seen: Array.from(p.seen),
    correct: p.correct,
    total: p.total,
    streak: p.streak,
    bestStreak: p.bestStreak,
  };
  fs.writeFileSync(PROGRESS_PATH, JSON.stringify(out, null, 2), 'utf-8');
}
const progress = loadProgress();

// Utilities
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function getRandomCard() {
  return rand(CARDS);
}
function getRandomLessonCard() {
  const unseen = CARDS.filter(c => !progress.seen.has(c.card));
  return rand(unseen.length ? unseen : CARDS);
}
function accuracy() {
  if (progress.total === 0) return 0;
  return Math.round((progress.correct / progress.total) * 100);
}
function ensureLessonPath(card) {
  // Fallback infer by slug if missing
  if (card.lessonPath) return card.lessonPath;
  const slug = (card.card || '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
  const guess = path.join('deckofcards', `${slug}.md`);
  const abs = path.join(ROOT, guess);
  return fs.existsSync(abs) ? guess : null;
}
function readLessonMarkdown(relPath) {
  if (!relPath) return null;
  const abs = path.isAbsolute(relPath) ? relPath : path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return null;
  const raw = fs.readFileSync(abs, 'utf-8');
  try {
    const { content } = matter(raw);
    return marked.parse(content || raw);
  } catch {
    return marked.parse(raw);
  }
}

// Routes
app.get('/', (req, res) => {
  res.render('home', {
    stats: {
      seen: progress.seen.size,
      totalCards: CARDS.length,
      streak: progress.streak,
      best: progress.bestStreak,
      correct: progress.correct,
      total: progress.total,
      acc: accuracy(),
    },
  });
});

// Practice: show a random card; user reveals and self-reports correctness
app.get('/practice', (req, res) => {
  // Generate card deterministically per request and embed only via the rendered form.
  // IMPORTANT: Do not mutate card between render and reveal. No redirects except explicit Next.
  const card = getRandomCard();
  res.set('Cache-Control', 'no-store'); // prevent any intermediate caching
  res.render('practice', { card });
});

// Fix: Reveal should reveal same card sent from form, not advance accidentally.
// Also embed a structured code object in reveal view for clarity.
app.post('/practice/reveal', (req, res) => {
  // Defensive: block accidental GET or missing payload
  if (!req.body || typeof req.body.card !== 'string' || !req.body.card.trim()) {
    return res.status(400).render('practice', { card: getRandomCard() });
  }

  let c;
  try {
    c = JSON.parse(req.body.card);
  } catch {
    // If payload corrupt, re-render practice with a new card explicitly
    return res.status(400).render('practice', { card: getRandomCard() });
  }

  // Ensure required fields exist; otherwise do not advance
  if (!c || !c.card || !c.concept || !c.snippet) {
    return res.status(400).render('practice', { card: getRandomCard() });
  }

  const shown = {
    card: c.card,
    concept: c.concept,
    topic: c.topic,
    snippet: c.snippet,
    lessonPath: ensureLessonPath(c),
  };

  // Progress strictly increments on reveal
  progress.seen.add(shown.card);
  progress.total += 1;
  saveProgress(progress);

  const codeObject = {
    title: `${shown.card} — ${shown.concept}`,
    snippet: shown.snippet,
    tip: `Focus on: ${shown.topic || 'general concept'}`,
  };

  // Never redirect here; render reveal for the same card
  res.set('Cache-Control', 'no-store');
  res.render('reveal', {
    card: shown,
    codeObject,
    stats: { ...progress, seenCount: progress.seen.size, acc: accuracy() },
  });
});

app.post('/practice/grade', (req, res) => {
  const { correct } = req.body; // "yes"/"no"
  if (correct === 'yes') {
    progress.correct += 1;
    progress.streak += 1;
    progress.bestStreak = Math.max(progress.bestStreak, progress.streak);
  } else {
    progress.streak = 0;
  }
  saveProgress(progress);
  res.redirect('/practice');
});

// Random lesson
app.get('/random-lesson', (req, res) => {
  const card = getRandomLessonCard();
  const lessonPath = ensureLessonPath(card);
  const html = readLessonMarkdown(lessonPath);
  if (lessonPath) {
    progress.seen.add(card.card);
    saveProgress(progress);
  }
  res.render('lesson', { card, lessonPath, html });
});

// Browse
app.get('/browse', (req, res) => {
  const list = [...CARDS].sort((a, b) => a.card.localeCompare(b.card));
  res.render('browse', { cards: list });
});

app.get('/card/:slug', (req, res) => {
  const slug = req.params.slug;
  // Support slug by "04-four-spades" OR by encoding card name
  const byPath = path.join('deckofcards', `${slug}.md`);
  const byPathAbs = path.join(ROOT, byPath);
  let card = CARDS.find(c => (c.lessonPath && c.lessonPath.includes(`${slug}.md`)));
  if (!card) {
    // try by card name slug
    const slugName = (c) => (c.card || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    card = CARDS.find(c => {
      const s = slugName(c);
      return fs.existsSync(byPathAbs) ? byPath.endsWith(`${slug}.md`) : s === slug;
    });
  }
  if (!card) return res.status(404).send('Card not found');
  const lessonPath = ensureLessonPath(card);
  const html = readLessonMarkdown(lessonPath);
  progress.seen.add(card.card);
  saveProgress(progress);
  res.render('lesson', { card, lessonPath, html });
});

// Progress page and reset
app.get('/progress', (req, res) => {
  res.render('progress', {
    stats: {
      seen: progress.seen.size,
      totalCards: CARDS.length,
      streak: progress.streak,
      best: progress.bestStreak,
      correct: progress.correct,
      total: progress.total,
      acc: accuracy(),
    },
  });
});

app.post('/progress/reset', (req, res) => {
  progress.seen = new Set();
  progress.correct = 0;
  progress.total = 0;
  progress.streak = 0;
  progress.bestStreak = 0;
  saveProgress(progress);
  res.redirect('/progress');
});

// Health
app.get('/health', (_, res) => res.json({ ok: true }));

// Start
app.listen(PORT, () => {
  console.log(`PokerJS web app running at http://localhost:${PORT}`);
});