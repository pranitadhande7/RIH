/* ═══════════════════════════════════════
   QUIZ ENGINE JAVASCRIPT
   ═══════════════════════════════════════ */

// ── QUESTION BANK ──
const QUESTION_BANK = {
  'python-basics': [
    {
      id: 'py1', topic: 'Variables', difficulty: 'easy', type: 'mcq',
      question: 'What is the output of this Python code?\n\nx = 5\ny = 2\nprint(x // y)',
      code: 'x = 5\ny = 2\nprint(x // y)',
      options: ['2.5', '2', '3', '7'],
      answer: 1,
      hint: 'The `//` operator performs floor division (integer division).',
      explanation: '`//` is Python\'s floor division operator. It divides and rounds down to the nearest integer. 5 // 2 = 2 (not 2.5). Use `/` for regular division.'
    },
    {
      id: 'py2', topic: 'Lists', difficulty: 'easy', type: 'mcq',
      question: 'Which method adds an element to the END of a Python list?',
      options: ['list.add()', 'list.insert()', 'list.append()', 'list.push()'],
      answer: 2,
      hint: 'Python lists have a method that "appends" items to the end.',
      explanation: '`list.append(item)` adds an element to the end. `insert(i, item)` adds at position i. `.add()` and `.push()` don\'t exist for lists.'
    },
    {
      id: 'py3', topic: 'Functions', difficulty: 'medium', type: 'mcq',
      question: 'What will this code print?\n\ndef greet(name, msg="Hello"):\n    print(f"{msg}, {name}!")\n\ngreet("Alice")\ngreet("Bob", "Hi")',
      code: 'def greet(name, msg="Hello"):\n    print(f"{msg}, {name}!")\n\ngreet("Alice")\ngreet("Bob", "Hi")',
      options: ['Hello, Alice!\nHi, Bob!', 'Hello, Alice!\nHello, Bob!', 'Error', 'Hi, Alice!\nHi, Bob!'],
      answer: 0,
      hint: 'When a default argument is provided, it\'s used only if the caller doesn\'t provide that argument.',
      explanation: 'Default arguments are used when not specified. `greet("Alice")` uses msg="Hello", giving "Hello, Alice!". `greet("Bob", "Hi")` overrides msg, giving "Hi, Bob!".'
    },
    {
      id: 'py4', topic: 'Scope', difficulty: 'medium', type: 'mcq',
      question: 'What is the output of this code?\n\nx = "global"\ndef foo():\n    x = "local"\n    print(x)\nfoo()\nprint(x)',
      code: 'x = "global"\ndef foo():\n    x = "local"\n    print(x)\nfoo()\nprint(x)',
      options: ['"local" then "global"', '"global" then "local"', '"local" then "local"', 'Error'],
      answer: 0,
      hint: 'A variable assigned inside a function is local and doesn\'t affect the global scope.',
      explanation: 'Inside `foo()`, `x = "local"` creates a **local** variable. It doesn\'t change the global `x`. So `foo()` prints "local" and `print(x)` outside prints "global".'
    },
    {
      id: 'py5', topic: 'Loops', difficulty: 'easy', type: 'mcq',
      question: 'How many times will "hello" be printed?\n\nfor i in range(3):\n    print("hello")',
      code: 'for i in range(3):\n    print("hello")',
      options: ['2', '3', '4', '0'],
      answer: 1,
      hint: '`range(3)` generates numbers 0, 1, 2 — count them!',
      explanation: '`range(3)` produces [0, 1, 2] — three values. The loop runs once for each value, so "hello" is printed 3 times.'
    },
    {
      id: 'py6', topic: 'Dictionaries', difficulty: 'medium', type: 'mcq',
      question: 'What is the correct way to access the value "Python" from this dict?\n\nd = {"lang": "Python", "year": 1991}',
      options: ['d[0]', 'd.lang', 'd["lang"]', 'd.get(0)'],
      answer: 2,
      hint: 'Dictionary values are accessed by their string key in square brackets.',
      explanation: 'Dictionaries are accessed by key: `d["lang"]` returns "Python". Unlike lists, you can\'t use integer indices. `d.lang` is not valid Python syntax.'
    },
    {
      id: 'py7', topic: 'List Comprehension', difficulty: 'hard', type: 'mcq',
      question: 'What does this list comprehension produce?\n\n[x**2 for x in range(5) if x % 2 == 0]',
      code: '[x**2 for x in range(5) if x % 2 == 0]',
      options: ['[0, 1, 4, 9, 16]', '[0, 4, 16]', '[1, 9]', '[0, 2, 4]'],
      answer: 1,
      hint: 'Filter even numbers (0, 2, 4) then square each one.',
      explanation: 'range(5) = [0,1,2,3,4]. Even numbers: 0, 2, 4. Squared: 0, 4, 16. Result: [0, 4, 16].'
    },
    {
      id: 'py8', topic: 'Exceptions', difficulty: 'medium', type: 'mcq',
      question: 'Which block always executes regardless of whether an exception occurred?',
      options: ['except', 'else', 'finally', 'catch'],
      answer: 2,
      hint: 'Think of the keyword that means "no matter what happens".',
      explanation: '`finally` always executes, whether an exception was raised or not. It\'s used for cleanup (e.g., closing files). `else` only runs if NO exception occurred.'
    },
  ],
  'js-fundamentals': [
    {
      id: 'js1', topic: 'Types', difficulty: 'easy', type: 'mcq',
      question: 'What does `typeof null` return in JavaScript?',
      options: ['"null"', '"undefined"', '"object"', '"boolean"'],
      answer: 2,
      hint: 'This is a famous JavaScript quirk from its early design.',
      explanation: '`typeof null === "object"` is a well-known JavaScript bug that has never been fixed for backward compatibility. null is NOT an object — it\'s a primitive value representing "no value".'
    },
    {
      id: 'js2', topic: 'Closures', difficulty: 'hard', type: 'mcq',
      question: 'What will this code log?\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}',
      code: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}',
      options: ['0, 1, 2', '3, 3, 3', '0, 0, 0', 'Error'],
      answer: 1,
      hint: '`var` is function-scoped. By the time the callbacks run, what is `i`?',
      explanation: '`var` is function-scoped and shared. All 3 setTimeout callbacks share the same `i`. By the time they execute, the loop is done and i=3. Use `let` to fix: each iteration gets its own `i`.'
    },
    {
      id: 'js3', topic: 'Async', difficulty: 'medium', type: 'mcq',
      question: 'What does an `async` function ALWAYS return?',
      options: ['The raw value', 'A Promise', 'undefined', 'A callback'],
      answer: 1,
      hint: 'Even if you return a plain number from an async function, it gets wrapped.',
      explanation: 'An `async` function always returns a Promise. If you return 42, the function actually returns `Promise.resolve(42)`. Use `await` to unwrap it.'
    },
    {
      id: 'js4', topic: 'Equality', difficulty: 'medium', type: 'mcq',
      question: 'What is the result of `0 == false` in JavaScript?',
      options: ['false', 'true', 'TypeError', 'undefined'],
      answer: 1,
      hint: '`==` uses type coercion. What does `false` coerce to numerically?',
      explanation: '`==` performs type coercion. `false` coerces to `0`, so `0 == false` is `true`. Always prefer `===` (strict equality) which checks type AND value, so `0 === false` is `false`.'
    },
    {
      id: 'js5', topic: 'Promises', difficulty: 'hard', type: 'mcq',
      question: 'What is the correct way to handle errors with async/await?',
      options: ['.catch()', 'try/catch block', 'onerror event', 'Both A and B'],
      answer: 3,
      hint: 'async/await is syntax sugar over Promises — both methods work!',
      explanation: 'You can handle async errors with `.catch()` on the returned Promise, OR with a `try/catch` block inside the async function. Both work because async functions return Promises.'
    },
  ],
  'data-structures': [
    {
      id: 'ds1', topic: 'Arrays', difficulty: 'easy', type: 'mcq',
      question: 'What is the time complexity of accessing an element by index in an array?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      answer: 2,
      hint: 'Arrays store elements in contiguous memory. You don\'t need to search!',
      explanation: 'Array access by index is O(1) — constant time. Since memory addresses are contiguous, the CPU can calculate the exact address directly: base_address + (index × element_size).'
    },
    {
      id: 'ds2', topic: 'Linked Lists', difficulty: 'medium', type: 'mcq',
      question: 'What is the time complexity of inserting at the BEGINNING of a linked list?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      answer: 2,
      hint: 'You only need to update a few pointers. You don\'t need to touch the rest of the list.',
      explanation: 'Inserting at the beginning of a linked list is O(1). You just: 1) create a new node, 2) point it to the current head, 3) update head. No traversal needed!'
    },
    {
      id: 'ds3', topic: 'Stacks', difficulty: 'easy', type: 'mcq',
      question: 'A Stack follows which principle?',
      options: ['FIFO', 'LIFO', 'Random Access', 'Priority'],
      answer: 1,
      hint: 'Think of a stack of plates. Which one do you take first?',
      explanation: 'A Stack follows LIFO (Last In, First Out). The last element pushed is the first popped. Example uses: undo operations, function call stack, expression evaluation.'
    },
  ],
  'algorithms': [
    {
      id: 'al1', topic: 'Sorting', difficulty: 'easy', type: 'mcq',
      question: 'What is the average time complexity of Quick Sort?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      answer: 1,
      hint: 'Quick Sort partitions the array — think divide and conquer.',
      explanation: 'Quick Sort has O(n log n) average case. It picks a pivot, partitions into 2 halves (O(n)), and recurses (log n levels). Worst case is O(n²) if the pivot is always min/max.'
    },
    {
      id: 'al2', topic: 'Recursion', difficulty: 'medium', type: 'mcq',
      question: 'What is the base case in a recursive fibonacci function?',
      options: ['fib(0) = 0', 'fib(1) = 1', 'Both fib(0)=0 and fib(1)=1', 'fib(2) = 1'],
      answer: 2,
      hint: 'Recursion needs a stopping condition. When does fibonacci not need to recurse?',
      explanation: 'Fibonacci needs TWO base cases: fib(0) = 0 and fib(1) = 1. Without both, the recursion would be infinite. The recursive case is fib(n) = fib(n-1) + fib(n-2).'
    },
  ]
};

// ── STATE ──
let currentQuiz = null;
let currentQIdx = 0;
let quizQuestions = [];
let selectedOption = null;
let quizTimer = null;
let quizSeconds = 0;
let correctCount = 0;
let skillLevel = 0.45;
let hintsUsed = 0;
let quizXP = 0;
const answers = [];

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  renderHistory();
});

function loadProfile() {
  const p = getProfile();
  document.getElementById('sfAvatar').textContent = (p.name||'L')[0].toUpperCase();
  document.getElementById('sfName').textContent = p.name || 'Learner';
  document.getElementById('xpCount').textContent = p.xp || 0;
  document.getElementById('streakCount').textContent = p.streak || 1;
  const lvl = getXPLevel(p.xp || 0);
  document.getElementById('sfLevel').textContent = lvl.icon + ' ' + lvl.level;
}

function renderHistory() {
  const raw = localStorage.getItem('bb_quiz_history');
  const history = raw ? JSON.parse(raw) : [
    { title:'Python Basics', score:78, date:'Apr 18', questions:10 },
    { title:'JS Fundamentals', score:65, date:'Apr 15', questions:8 },
  ];
  const list = document.getElementById('quizHistoryList');
  if (!list) return;
  list.innerHTML = history.map(h => `
    <div class="qhl-item">
      <span class="qhl-icon">${h.score >= 80 ? '🏆' : h.score >= 60 ? '📊' : '📉'}</span>
      <div class="qhl-info"><strong>${h.title}</strong><small>${h.date} · ${h.questions} questions</small></div>
      <span class="qhl-score" style="color:${h.score>=80?'var(--brand-success)':h.score>=60?'var(--brand-warning)':'var(--brand-danger)'}">${h.score}%</span>
    </div>
  `).join('') || '<p class="text-muted text-sm">No quizzes taken yet.</p>';
}

// ── START QUIZ ──
function startQuiz(quizId) {
  currentQuiz = quizId;
  const bank = QUESTION_BANK[quizId] || QUESTION_BANK['python-basics'];
  quizQuestions = [...bank].sort(() => Math.random() - 0.5);
  currentQIdx = 0;
  correctCount = 0;
  skillLevel = 0.45;
  hintsUsed = 0;
  quizXP = 0;
  quizSeconds = 0;
  answers.length = 0;
  selectedOption = null;

  showScreen('quizActive');
  const titles = { 'python-basics':'🐍 Python Basics','js-fundamentals':'⚡ JS Fundamentals','data-structures':'🏗️ Data Structures','algorithms':'⚙️ Algorithms' };
  document.getElementById('quizTitle').textContent = titles[quizId] || 'Adaptive Quiz';

  startTimer();
  renderQuestion();
}

function renderQuestion() {
  const q = quizQuestions[currentQIdx];
  if (!q) { finishQuiz(); return; }

  selectedOption = null;
  document.getElementById('qcNum').textContent = `Question ${currentQIdx + 1}`;
  document.getElementById('qcTopic').textContent = q.topic;
  document.getElementById('qcType').textContent = q.type === 'mcq' ? 'Multiple Choice' : 'Code Challenge';
  document.getElementById('qcQuestion').textContent = q.question.split('\n')[0];
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('submitBtn').textContent = 'Submit Answer';
  document.getElementById('hintBtn').style.display = '';
  document.getElementById('hintText').classList.add('hidden');
  document.getElementById('hintText').textContent = '';
  document.getElementById('feedbackCard').classList.add('hidden');
  document.getElementById('questionCard').classList.remove('hidden');

  // Code block
  const codeEl = document.getElementById('qcCode');
  if (q.code) {
    codeEl.classList.remove('hidden');
    document.getElementById('qcCodePre').textContent = q.code;
  } else {
    codeEl.classList.add('hidden');
  }

  // Progress
  const pct = ((currentQIdx + 1) / quizQuestions.length) * 100;
  document.getElementById('quizProgressBar').style.width = pct + '%';
  document.getElementById('quizProgressText').textContent = `Q ${currentQIdx + 1} of ${quizQuestions.length}`;

  // Difficulty badge
  const diffEl = document.getElementById('diffBadge');
  diffEl.textContent = { easy:'Easy ✓', medium:'Medium ◆', hard:'Hard ★' }[q.difficulty] || 'Medium';
  diffEl.className = 'diff-badge ' + (q.difficulty === 'easy' ? 'easy' : q.difficulty === 'hard' ? 'hard' : '');

  // Options
  const opts = document.getElementById('qcOptions');
  opts.innerHTML = q.options.map((o, i) => `
    <div class="quiz-option" id="opt-${i}" onclick="selectOption(${i})">
      <span class="opt-letter">${String.fromCharCode(65+i)}</span>
      <span>${o}</span>
    </div>
  `).join('');

  // Update skill meter
  document.getElementById('smpFill').style.width = (skillLevel * 100) + '%';
  document.getElementById('smpPct').textContent = Math.round(skillLevel * 100) + '%';
  document.getElementById('smpConf').textContent = currentQIdx < 3 ? 'Building confidence...' : currentQIdx < 6 ? 'Getting accurate...' : 'High confidence';
}

function selectOption(idx) {
  document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
  document.getElementById('opt-' + idx)?.classList.add('selected');
  selectedOption = idx;
  document.getElementById('submitBtn').disabled = false;
}

function submitAnswer() {
  if (selectedOption === null) return;
  const q = quizQuestions[currentQIdx];
  const correct = selectedOption === q.answer;

  // Mark options
  document.querySelectorAll('.quiz-option').forEach((el, i) => {
    el.classList.add('disabled');
    if (i === q.answer) el.classList.add('correct');
    else if (i === selectedOption && !correct) el.classList.add('wrong');
  });

  if (correct) {
    correctCount++;
    const xpGain = q.difficulty === 'easy' ? 10 : q.difficulty === 'medium' ? 20 : 30;
    quizXP += xpGain;
    skillLevel = Math.min(1, skillLevel + 0.06);
    showToast(`✅ Correct! +${xpGain} XP`, 'success');
  } else {
    skillLevel = Math.max(0, skillLevel - 0.04);
    showToast('❌ Incorrect. Review the explanation!', 'error');
  }

  answers.push({ q: q.question, correct, topic: q.topic });
  adaptDifficulty(correct);

  // Show feedback
  const fb = document.getElementById('feedbackCard');
  fb.classList.remove('hidden');
  document.getElementById('fcResult').innerHTML = correct
    ? `<span style="color:var(--brand-success);font-size:1.3rem">✅ Correct!</span>`
    : `<span style="color:var(--brand-danger);font-size:1.3rem">❌ Incorrect</span> — The answer was: <strong>${q.options[q.answer]}</strong>`;
  document.getElementById('fcExplanation').textContent = q.explanation;
  document.getElementById('fcSkill').textContent = `Skill level updated to ${Math.round(skillLevel * 100)}%`;

  document.getElementById('submitBtn').textContent = 'See Explanation ↓';
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('nextQBtn').textContent = currentQIdx < quizQuestions.length - 1 ? 'Next Question →' : 'See Results 🏆';

  document.getElementById('smpFill').style.width = (skillLevel * 100) + '%';
  document.getElementById('smpPct').textContent = Math.round(skillLevel * 100) + '%';
}

function nextQuestion() {
  currentQIdx++;
  if (currentQIdx >= quizQuestions.length) { finishQuiz(); return; }
  renderQuestion();
}

function adaptDifficulty(wasCorrect) {
  if (wasCorrect && currentQIdx + 1 < quizQuestions.length) {
    const remaining = quizQuestions.slice(currentQIdx + 1);
    remaining.sort((a, b) => {
      const d = { easy: 1, medium: 2, hard: 3 };
      return wasCorrect ? d[b.difficulty] - d[a.difficulty] : d[a.difficulty] - d[b.difficulty];
    });
    quizQuestions.splice(currentQIdx + 1, remaining.length, ...remaining);
  }
}

function showQuizHint() {
  const q = quizQuestions[currentQIdx];
  const hintText = document.getElementById('hintText');
  hintText.textContent = '💡 ' + q.hint;
  hintText.classList.remove('hidden');
  hintsUsed++;
  quizXP = Math.max(0, quizXP - 5);
  document.getElementById('hintBtn').style.display = 'none';
  showToast('-5 XP for hint', 'warning');
}

function finishQuiz() {
  clearInterval(quizTimer);
  const pct = Math.round((correctCount / quizQuestions.length) * 100);
  showScreen('quizResults');

  document.getElementById('rcIcon').textContent = pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '📚';
  document.getElementById('rcTitle').textContent = pct >= 80 ? 'Excellent Work!' : pct >= 60 ? 'Good Job!' : 'Keep Practicing!';
  document.getElementById('scorePct').textContent = pct + '%';
  document.getElementById('rcsCorrect').textContent = correctCount;
  document.getElementById('rcsTaken').textContent = quizQuestions.length;
  document.getElementById('rcsXP').textContent = '+' + quizXP;
  document.getElementById('rcsTime').textContent = formatTime(quizSeconds);

  // Animate score ring
  setTimeout(() => {
    const circle = document.getElementById('scoreCircle');
    const offset = 283 - (283 * pct / 100);
    circle.style.transition = 'stroke-dashoffset 1.5s ease';
    circle.style.strokeDashoffset = offset;
  }, 300);

  // Breakdown
  const topics = {};
  answers.forEach(a => {
    if (!topics[a.topic]) topics[a.topic] = { correct: 0, total: 0 };
    topics[a.topic].total++;
    if (a.correct) topics[a.topic].correct++;
  });
  document.getElementById('rcBreakdown').innerHTML = `<h4>Topic Breakdown</h4>` +
    Object.entries(topics).map(([t, v]) => {
      const tp = Math.round((v.correct / v.total) * 100);
      return `<div class="rbi"><span class="rbi-icon">${tp >= 80 ? '✅' : tp >= 50 ? '⚠️' : '❌'}</span><span>${t}: ${v.correct}/${v.total} (${tp}%)</span></div>`;
    }).join('');

  // Insights
  const weakTopics = Object.entries(topics).filter(([,v]) => v.correct / v.total < 0.6).map(([t]) => t);
  document.getElementById('rcInsights').innerHTML = weakTopics.length
    ? `🎯 <strong>Focus Areas:</strong> ${weakTopics.join(', ')} — These topics need more practice. Head to the editor for targeted exercises!`
    : '🌟 <strong>Strong performance!</strong> You\'re mastering these topics. Ready for harder challenges?';

  // Save history + XP
  addXP(quizXP);
  const history = JSON.parse(localStorage.getItem('bb_quiz_history') || '[]');
  history.unshift({ title: currentQuiz.replace('-', ' '), score: pct, date: new Date().toLocaleDateString(), questions: quizQuestions.length });
  localStorage.setItem('bb_quiz_history', JSON.stringify(history.slice(0, 10)));
}

function retakeQuiz() { startQuiz(currentQuiz); }

function exitQuiz() {
  clearInterval(quizTimer);
  showScreen('quizSelection');
  renderHistory();
}

function showScreen(id) {
  document.querySelectorAll('.quiz-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startTimer() {
  clearInterval(quizTimer);
  quizSeconds = 0;
  quizTimer = setInterval(() => {
    quizSeconds++;
    document.getElementById('quizTimer').textContent = '⏱ ' + formatTime(quizSeconds);
  }, 1000);
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }
