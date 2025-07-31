import fs from 'fs';
import path from 'path';
import readlineSync from 'readline-sync';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// Resolve project-root relative paths robustly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load data
const dataPath = path.join(__dirname, 'code_snippets.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const { cards } = data;

// Tracking store
const progressPath = path.join(__dirname, 'progress.json');
function loadProgress() {
  try {
    const raw = fs.readFileSync(progressPath, 'utf-8');
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
  fs.writeFileSync(progressPath, JSON.stringify(out, null, 2), 'utf-8');
}
const progress = loadProgress();

// Utilities
function getRandomCard() {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}
function getRandomLessonCard() {
  // prefer unseen first
  const unseen = cards.filter(c => !progress.seen.has(c.card));
  const pool = unseen.length ? unseen : cards;
  return pool[Math.floor(Math.random() * pool.length)];
}
function openLesson(lessonPath) {
  if (!lessonPath) return;
  const abs = path.isAbsolute(lessonPath) ? lessonPath : path.join(__dirname, lessonPath);
  // Windows 'start', macOS 'open', Linux 'xdg-open'
  const platform = process.platform;
  if (platform === 'win32') {
    require('child_process').exec(`start "" "${abs}"`);
  } else if (platform === 'darwin') {
    require('child_process').exec(`open "${abs}"`);
  } else {
    require('child_process').exec(`xdg-open "${abs}"`);
  }
}
function pause(msg = 'Press any key to continue...') {
  readlineSync.keyInPause(msg);
}
function keyPrompt(msg) {
  return readlineSync.keyIn(msg, { hideEchoBack: true, mask: '', limit: null });
}
function yesNo(msg) {
  const ans = readlineSync.keyInYNStrict(msg);
  return ans === true;
}
function clear() {
  console.clear();
}
function title(t) {
  console.log(chalk.bold.blue(t));
}
function showCardDetail(card) {
  console.log(chalk.bold.yellow(`Card: ${chalk.white(card.card)}`));
  console.log(chalk.bold.green(`Topic: ${chalk.white(card.topic || 'n/a')}`));
  console.log(chalk.cyan(`Concept: ${chalk.white(card.concept)}`));
}
function reveal(card) {
  clear();
  showCardDetail(card);
  console.log(chalk.gray("\n--- Code Snippet ---"));
  console.log(chalk.green(card.snippet));
  console.log(chalk.gray("--------------------\n"));
}

// Modes
function practiceMode() {
  while (true) {
    clear();
    title("=== Practice Mode ===");
    console.log(chalk.gray(`Seen: ${progress.seen.size}/${cards.length} | Streak: ${progress.streak} (Best ${progress.bestStreak}) | Correct: ${progress.correct}/${progress.total}`));
    const card = getRandomCard();

    console.log(chalk.bold.yellow(`\nYour card is: ${chalk.white(card.card)}`));
    console.log(chalk.cyan("What is the JavaScript concept for this card?"));
    pause("\nThink, then press any key to reveal (or press 'Q' now to return to menu)...");
    const k1 = keyPrompt("Press 'Q' to return, any other to reveal: ");
    if (typeof k1 === 'string' && k1.trim().toLowerCase().startsWith('q')) break;

    reveal(card);

    // mark seen
    progress.seen.add(card.card);
    progress.total += 1;

    // self-report correctness
    const correct = yesNo("Did you recall correctly? [y/n]");
    if (correct) {
      progress.correct += 1;
      progress.streak += 1;
      progress.bestStreak = Math.max(progress.bestStreak, progress.streak);
    } else {
      progress.streak = 0;
    }
    saveProgress(progress);

    // Post-reveal options
    console.log("\nOptions:");
    console.log("  [L] Open lesson markdown");
    console.log("  [N] Next card");
    console.log("  [Q] Return to main menu");
    const opt = keyPrompt("Choose: L/N/Q: ");
    if (typeof opt === 'string') {
      const o = opt.trim().toLowerCase()[0];
      if (o === 'l') {
        if (card.lessonPath) openLesson(card.lessonPath);
      } else if (o === 'q') {
        break;
      }
    }
  }
}

function randomLessonMode() {
  while (true) {
    clear();
    title("=== Random Lesson Mode ===");
    const card = getRandomLessonCard();
    showCardDetail(card);
    console.log("\nOpen this lesson?");
    const open = yesNo("Open now? [y/n]");
    if (open) {
      if (card.lessonPath) openLesson(card.lessonPath);
      progress.seen.add(card.card);
      saveProgress(progress);
    }
    const cont = yesNo("Another random lesson? [y/n]");
    if (!cont) break;
  }
}

function browseCardsMode() {
  // simple pager through all cards sorted alphabetically
  const list = [...cards].sort((a, b) => a.card.localeCompare(b.card));
  let idx = 0;
  while (true) {
    clear();
    title("=== Browse Cards ===");
    const card = list[idx];
    showCardDetail(card);
    console.log(chalk.gray(`\nIndex ${idx + 1}/${list.length}`));
    console.log("\nActions: [O]pen lesson  [R]eveal snippet  [P]rev  [N]ext  [Q]uit");
    const k = keyPrompt("Choose: O/R/P/N/Q: ");
    if (!k) continue;
    const c = k.trim().toLowerCase()[0];
    if (c === 'o') {
      if (card.lessonPath) openLesson(card.lessonPath);
      progress.seen.add(card.card);
      saveProgress(progress);
    } else if (c === 'r') {
      reveal(card);
      pause();
    } else if (c === 'p') {
      idx = (idx - 1 + list.length) % list.length;
    } else if (c === 'n') {
      idx = (idx + 1) % list.length;
    } else if (c === 'q') {
      break;
    }
  }
}

// Main menu
function mainMenu() {
  while (true) {
    clear();
    title("=== JavaScript Poker Card — Main Menu ===");
    console.log(chalk.gray(`Progress: Seen ${progress.seen.size}/${cards.length} | Streak ${progress.streak} (Best ${progress.bestStreak}) | Correct ${progress.correct}/${progress.total}`));
    console.log("\n1) Practice");
    console.log("2) Random Lesson");
    console.log("3) Browse Cards");
    console.log("4) Reset Progress");
    console.log("Q) Quit");

    const sel = keyPrompt("\nSelect: 1/2/3/4/Q: ");
    if (!sel) continue;
    const s = sel.trim().toLowerCase()[0];
    if (s === '1') {
      practiceMode();
    } else if (s === '2') {
      randomLessonMode();
    } else if (s === '3') {
      browseCardsMode();
    } else if (s === '4') {
      const sure = yesNo("Reset all progress? [y/n]");
      if (sure) {
        progress.seen = new Set();
        progress.correct = 0;
        progress.total = 0;
        progress.streak = 0;
        progress.bestStreak = 0;
        saveProgress(progress);
        console.log(chalk.red("Progress reset."));
        pause();
      }
    } else if (s === 'q') {
      break;
    }
  }
}

// Start
mainMenu();
