/* ═══════════════════════════════════════
   BRAINYBOT — CODE EDITOR JS
   ═══════════════════════════════════════ */

// ── LESSON DATA ──
const LESSONS = {
  python: {
    title: 'Functions & Scope',
    lesson: `<h2>🐍 Python Functions & Scope</h2>
<p>A <strong>function</strong> is a reusable block of code that performs a specific task. In Python, we define functions using the <code>def</code> keyword.</p>
<pre><code>def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))  # Hello, Alice!</code></pre>
<div class="tip-box">💡 <strong>Tip:</strong> Use functions to avoid repeating code. The DRY principle — Don't Repeat Yourself!</div>
<p><strong>Scope</strong> determines where a variable is accessible. Variables defined inside a function are <em>local</em> to that function.</p>
<pre><code>x = 10  # global

def foo():
    x = 20  # local — doesn't affect global x
    print(x)  # 20

foo()
print(x)  # 10</code></pre>
<p>Use the <code>global</code> keyword to modify a global variable inside a function.</p>`,
    challenge: `<h3>🎯 Challenge: Scope Detective</h3>
<div class="task">
  <p>Create a function called <code>counter()</code> that:</p>
  <ul style="margin:8px 0 0 16px;font-size:.85rem;line-height:1.8">
    <li>Has a local variable <code>count = 0</code></li>
    <li>Increments <code>count</code> by 1</li>
    <li>Returns the current count</li>
    <li>Bonus: Make it so each call remembers the last count (closure!)</li>
  </ul>
</div>
<div class="test-cases">
<p style="margin-bottom:6px;font-weight:600;font-size:.82rem">Expected Output:</p>
<pre>Counter: 1
Counter: 2
Counter: 3</pre>
</div>`,
    solution: `<div class="solution-warning">⚠️ Try to solve the challenge yourself first! Peeking too early slows learning.</div>
<pre><code>def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

c = make_counter()
print(f"Counter: {c()}")  # 1
print(f"Counter: {c()}")  # 2
print(f"Counter: {c()}")  # 3</code></pre>
<p style="font-size:.85rem;margin-top:10px">This uses a <strong>closure</strong> — the inner function remembers the outer function's variables even after it returns!</p>`,
    starter: `# BrainyBot Challenge: Scope Detective
# -----------------------------------------
# Create a counter using closures
# Hint: look up the 'nonlocal' keyword!

def make_counter():
    # Your code here
    pass

# Test it:
# c = make_counter()
# print(f"Counter: {c()}")  # Should print 1
# print(f"Counter: {c()}")  # Should print 2
`,
    filename: 'main.py',
    mode: 'python',
  },
  javascript: {
    title: 'Promises & Async/Await',
    lesson: `<h2>⚡ JavaScript Promises & Async</h2>
<p>A <strong>Promise</strong> represents a value that may be available now, in the future, or never.</p>
<pre><code>const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data loaded!"), 1000);
  });
};

fetchData().then(data => console.log(data));</code></pre>
<div class="tip-box">💡 <strong>Async/Await</strong> makes asynchronous code look synchronous — much easier to read!</div>
<pre><code>async function loadData() {
  const data = await fetchData();
  console.log(data);
}
loadData();</code></pre>`,
    challenge: `<h3>🎯 Challenge: Async Chain</h3>
<div class="task">Create an async function that fetches user data, then fetches their posts, and returns a combined result.</div>`,
    solution: `<pre><code>async function getUserWithPosts(userId) {
  const user = await fetchUser(userId);
  const posts = await fetchPosts(userId);
  return { ...user, posts };
}</code></pre>`,
    starter: `// BrainyBot Challenge: Async/Await
// -----------------------------------
// Create an async function that simulates
// fetching data with a delay

async function fetchUser(id) {
  // Simulate API call
  return new Promise(resolve =>
    setTimeout(() => resolve({ id, name: "Alice" }), 500)
  );
}

// TODO: Create fetchPosts and getUserWithPosts
// Your code here...

console.log("Starting async operations...");
`,
    filename: 'main.js',
    mode: 'javascript',
  },
  java: {
    title: 'OOP: Classes & Inheritance',
    lesson: `<h2>☕ Java OOP Patterns</h2><p>Java is a strongly-typed OOP language. Define classes with fields and methods.</p>
<pre><code>public class Animal {
  String name;
  Animal(String name) { this.name = name; }
  void speak() { System.out.println(name + " makes a sound"); }
}

class Dog extends Animal {
  Dog(String name) { super(name); }
  void speak() { System.out.println(name + " barks!"); }
}</code></pre>`,
    challenge: `<h3>🎯 Challenge: Shape Calculator</h3>
<div class="task">Create a Shape base class with an area() method, then extend it for Circle and Rectangle.</div>`,
    solution: `<pre><code>abstract class Shape {
  abstract double area();
}
class Circle extends Shape {
  double r;
  Circle(double r) { this.r = r; }
  double area() { return Math.PI * r * r; }
}</code></pre>`,
    starter: `// Java OOP Challenge
// Note: Java runs in a sandbox — output shown below
public class Main {
  // Define your Shape classes here
  
  public static void main(String[] args) {
    // Test your shapes
    System.out.println("Shape Calculator");
  }
}
`,
    filename: 'Main.java',
    mode: 'text/x-java',
  },
  cpp: {
    title: 'Pointers & Memory',
    lesson: `<h2>⚙️ C++ Pointers & Memory</h2><p>Pointers store memory addresses. They're powerful but require careful management.</p>
<pre><code>int x = 42;
int* ptr = &x;    // ptr holds address of x
cout << *ptr;     // 42 (dereference)
*ptr = 100;       // modifies x through pointer
cout << x;        // 100</code></pre>`,
    challenge: `<h3>🎯 Challenge: Swap with Pointers</h3>
<div class="task">Write a function that swaps two integers using pointers (not references).</div>`,
    solution: `<pre><code>void swap(int* a, int* b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}
int x=5, y=10;
swap(&x, &y); // x=10, y=5</code></pre>`,
    starter: `#include <iostream>
using namespace std;

// TODO: Write swap function using pointers
void swapValues(int* a, int* b) {
    // Your code here
}

int main() {
    int x = 5, y = 10;
    // swapValues(&x, &y);
    cout << "x=" << x << " y=" << y << endl;
    return 0;
}
`,
    filename: 'main.cpp',
    mode: 'text/x-c++src',
  }
};

// ── STATE ──
let cmEditor = null;
let currentLang = 'python';
let stuckTimer = null;
let stuckSeconds = 0;
let autoSaveTimer = null;
let lastRunTime = null;
let keystrokeCount = 0;
let deleteCount = 0;
let emotionState = 'focused';
let lessonCollapsed = false;
let chatOpen = true;

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initEditor();
  loadProfile();
  checkMobile();
});

function initEditor() {
  const p = getProfile();
  currentLang = p.lang || 'python';
  document.getElementById('langSelect').value = currentLang;

  const lesson = LESSONS[currentLang];
  cmEditor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
    mode: lesson.mode,
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    lineWrapping: false,
    extraKeys: { 'Ctrl-Enter': runCode, 'Ctrl-/': cm => cm.execCommand('toggleComment') }
  });

  cmEditor.setValue(lesson.starter);
  renderLesson();

  // Track keystrokes for emotion detection
  cmEditor.on('change', (cm, change) => {
    keystrokeCount++;
    if (change.origin === '+delete' || change.origin === 'cut') deleteCount++;
    detectEmotion();
    scheduleAutoSave();
    resetStuckTimer();
  });

  startStuckTimer();

  // Autosave
  autoSaveTimer = setInterval(autoSave, 30000);
}

function loadProfile() {
  const p = getProfile();
  const init = (p.name || 'L')[0].toUpperCase();
  document.getElementById('sfAvatar').textContent = init;
  document.getElementById('sfName').textContent = p.name || 'Learner';
  document.getElementById('xpCount').textContent = (p.xp || 0);
  document.getElementById('streakCount').textContent = p.streak || 1;
  const lvl = getXPLevel(p.xp || 0);
  document.getElementById('sfLevel').textContent = lvl.icon + ' ' + lvl.level;
}

function renderLesson() {
  const lesson = LESSONS[currentLang];
  document.getElementById('lessonTitle').textContent = lesson.title;
  document.getElementById('lessonBody').innerHTML = lesson.lesson;
  document.getElementById('challengeBody').innerHTML = lesson.challenge;
  document.getElementById('solutionBody').innerHTML = lesson.solution;
  document.getElementById('editorFilename').textContent = lesson.filename;
}

// ── LANGUAGE CHANGE ──
function changeLang() {
  currentLang = document.getElementById('langSelect').value;
  const lesson = LESSONS[currentLang];
  cmEditor.setOption('mode', lesson.mode);
  cmEditor.setValue(lesson.starter);
  renderLesson();
  clearOutput();
  showToast(`Switched to ${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`, 'info');
}

// ── RUN CODE ──
function runCode() {
  const btn = document.getElementById('runBtn');
  const code = cmEditor.getValue();
  if (!code.trim()) { showToast('Write some code first!', 'warning'); return; }

  btn.innerHTML = '<span class="run-spinner"></span> Running...';
  btn.disabled = true;
  clearOutput();
  switchOutput('output', document.querySelector('.op-tab'));

  if (currentLang === 'python') {
    runPython(code);
  } else if (currentLang === 'javascript') {
    runJavaScript(code);
  } else {
    simulateRun();
  }

  lastRunTime = Date.now();
  addXP(5);
}

function runPython(code) {
  const output = [];
  Sk.configure({
    output: txt => output.push(txt),
    read: builtinRead,
    execLimit: 5000,
  });
  Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true))
    .then(() => {
      showOutput(output.join('') || '(no output)', 'success');
      document.getElementById('runBtn').innerHTML = '▶ Run Code';
      document.getElementById('runBtn').disabled = false;
      addToHistory(code, output.join(''));
    })
    .catch(err => {
      const msg = err.toString().replace('Traceback (most recent call last):\n', '');
      showOutput('❌ ' + msg, 'error');
      showErrors(msg);
      document.getElementById('runBtn').innerHTML = '▶ Run Code';
      document.getElementById('runBtn').disabled = false;
      detectBugPattern(msg);
    });
}

function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined)
    throw new Error("File not found: '" + x + "'");
  return Sk.builtinFiles['files'][x];
}

function runJavaScript(code) {
  const output = [];
  const origLog = console.log;
  const origErr = console.error;
  console.log = (...args) => output.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
  console.error = (...args) => output.push('ERROR: ' + args.join(' '));
  try {
    // eslint-disable-next-line no-new-func
    new Function(code)();
    showOutput(output.join('\n') || '(no output)', 'success');
  } catch (err) {
    showOutput('❌ ' + err.message, 'error');
    showErrors(err.message);
    detectBugPattern(err.message);
  } finally {
    console.log = origLog;
    console.error = origErr;
    document.getElementById('runBtn').innerHTML = '▶ Run Code';
    document.getElementById('runBtn').disabled = false;
  }
}

function simulateRun() {
  setTimeout(() => {
    showOutput('✅ Code compiled and ran successfully!\n(Sandbox: ' + currentLang.toUpperCase() + ' execution simulated)', 'success');
    document.getElementById('runBtn').innerHTML = '▶ Run Code';
    document.getElementById('runBtn').disabled = false;
  }, 800);
}

// ── OUTPUT ──
function showOutput(text, type = 'success') {
  const body = document.getElementById('opBody');
  body.innerHTML = `<span class="op-${type}">${escapeHtml(text)}</span>`;
}

function showErrors(msg) {
  const body = document.getElementById('opErrors');
  body.innerHTML = `<span class="op-error">⚠ ${escapeHtml(msg)}</span>`;
}

const runHistory = [];
function addToHistory(code, output) {
  runHistory.unshift({ code, output, time: new Date().toLocaleTimeString() });
  if (runHistory.length > 10) runHistory.pop();
}

function switchOutput(tab, btn) {
  document.querySelectorAll('.op-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById('opBody').classList.add('hidden');
  document.getElementById('opErrors').classList.add('hidden');
  document.getElementById('opHistory').classList.add('hidden');
  if (tab === 'output') document.getElementById('opBody').classList.remove('hidden');
  else if (tab === 'errors') document.getElementById('opErrors').classList.remove('hidden');
  else if (tab === 'history') {
    const hBody = document.getElementById('opHistory');
    hBody.classList.remove('hidden');
    hBody.innerHTML = runHistory.length
      ? runHistory.map(h => `<div style="margin-bottom:10px;border-bottom:1px solid var(--bg-border);padding-bottom:8px"><span class="op-info">[${h.time}]</span> ${escapeHtml(h.output.slice(0,80))}${h.output.length > 80 ? '...' : ''}</div>`).join('')
      : '<span class="op-placeholder">No runs yet.</span>';
  }
}

function clearOutput() {
  document.getElementById('opBody').innerHTML = '<div class="op-placeholder">Run your code to see output here...</div>';
  document.getElementById('opErrors').innerHTML = '';
}

// ── LESSON TABS ──
function switchLessonTab(tab, btn) {
  document.querySelectorAll('.lesson-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('lessonContent').classList.add('hidden');
  document.getElementById('challengeContent').classList.add('hidden');
  document.getElementById('solutionContent').classList.add('hidden');
  document.getElementById(tab + 'Content').classList.remove('hidden');
}

// ── LESSON COLLAPSE ──
function toggleLesson() {
  lessonCollapsed = !lessonCollapsed;
  document.getElementById('lessonPanel').classList.toggle('collapsed', lessonCollapsed);
  document.getElementById('lessonCollapseBtn').title = lessonCollapsed ? 'Expand lesson' : 'Collapse lesson';
}

// ── EDITOR UTILS ──
function formatCode() {
  const code = cmEditor.getValue();
  // Basic Python formatting
  const lines = code.split('\n');
  cmEditor.setValue(lines.map(l => l.trimEnd()).join('\n'));
  showToast('Code formatted ✓', 'success');
}

function resetCode() {
  if (confirm('Reset code to starter? Your changes will be lost.')) {
    cmEditor.setValue(LESSONS[currentLang].starter);
    showToast('Code reset to starter', 'info');
  }
}

function copyCode() {
  navigator.clipboard.writeText(cmEditor.getValue())
    .then(() => showToast('Code copied to clipboard!', 'success'))
    .catch(() => showToast('Copy failed — use Ctrl+A, Ctrl+C', 'warning'));
}

// ── AUTO SAVE ──
let saveTimeout;
function scheduleAutoSave() {
  clearTimeout(saveTimeout);
  document.getElementById('saveStatus').textContent = '● Unsaved';
  document.getElementById('saveStatus').style.color = 'var(--brand-warning)';
  saveTimeout = setTimeout(autoSave, 3000);
}

function autoSave() {
  const code = cmEditor?.getValue();
  if (!code) return;
  localStorage.setItem('bb_code_' + currentLang, code);
  document.getElementById('saveStatus').textContent = '● Saved';
  document.getElementById('saveStatus').style.color = 'var(--brand-success)';
}

// ── STUCK TIMER ──
function startStuckTimer() {
  stuckTimer = setInterval(() => {
    stuckSeconds++;
    document.getElementById('stuckSecs').textContent = stuckSeconds;
    if (stuckSeconds >= 90) {
      document.getElementById('stuckTimer').style.display = 'flex';
      document.getElementById('autoHintPopup').classList.remove('hidden');
      clearInterval(stuckTimer);
    }
    if (stuckSeconds > 30) updateEmotion('confused');
    if (stuckSeconds > 60) updateEmotion('frustrated');
  }, 1000);
}

function resetStuckTimer() {
  stuckSeconds = 0;
  document.getElementById('stuckTimer').style.display = 'none';
  document.getElementById('autoHintPopup').classList.add('hidden');
  if (stuckTimer) clearInterval(stuckTimer);
  startStuckTimer();
}

// ── EMOTION DETECTION ──
function detectEmotion() {
  const ratio = keystrokeCount > 10 ? deleteCount / keystrokeCount : 0;
  if (ratio > 0.4) updateEmotion('frustrated');
  else if (ratio > 0.2) updateEmotion('confused');
  else updateEmotion('focused');
}

function updateEmotion(state) {
  emotionState = state;
  const chip = document.getElementById('emotionChip');
  const labels = {
    focused: '😊 Focused',
    confused: '🤔 Confused',
    frustrated: '😤 Frustrated',
    bored: '😴 Bored',
  };
  chip.textContent = labels[state] || '😊 Focused';
  chip.className = 'emotion-chip ' + (state !== 'focused' ? state : '');
}

// ── BUG PATTERN DETECTION ──
function detectBugPattern(error) {
  const patterns = [
    { re: /IndexError|index out of range/i, msg: '🐛 Off-by-one error detected! Arrays start at index 0, not 1.' },
    { re: /NameError|is not defined/i, msg: '🐛 Variable not defined! Did you forget to declare it or check the spelling?' },
    { re: /SyntaxError/i, msg: '🐛 Syntax error! Check for missing colons, brackets, or quotes.' },
    { re: /TypeError/i, msg: '🐛 Type mismatch! You may be combining incompatible types (e.g. string + number).' },
    { re: /IndentationError/i, msg: '🐛 Indentation error! Python requires consistent indentation (use 4 spaces).' },
    { re: /ZeroDivisionError/i, msg: '🐛 Division by zero! Add a check before dividing.' },
    { re: /is not a function|not a function/i, msg: '🐛 Trying to call something that\'s not a function!' },
  ];
  for (const p of patterns) {
    if (p.re.test(error)) {
      setTimeout(() => addBotMessage(p.msg, false), 800);
      break;
    }
  }
}

// ── AUTO HINT ──
function getAutoHint() {
  const hints = {
    python: "💡 Think about what `nonlocal` does. How does a closure remember state?",
    javascript: "💡 Remember: `async` functions always return a Promise. Use `await` to unwrap them.",
    java: "💡 Start with `abstract class Shape` and think about what methods every shape needs.",
    cpp: "💡 The `*` operator dereferences a pointer. What does `*a = *b` do?",
  };
  addBotMessage(hints[currentLang] || "💡 Break the problem into smaller steps. What's the first thing your function needs to do?");
  dismissHint();
}

function dismissHint() {
  document.getElementById('autoHintPopup').classList.add('hidden');
  resetStuckTimer();
}

// ── CHAT PANEL ──
function toggleChatPanel() {
  chatOpen = !chatOpen;
  const panel = document.getElementById('chatPanel');
  if (window.innerWidth <= 900) {
    panel.classList.toggle('open', chatOpen);
  } else {
    panel.classList.toggle('collapsed', !chatOpen);
  }
}

function setChatMode(mode, btn) {
  document.querySelectorAll('.cp-actions .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const info = document.querySelector('.cia-info span');
  if (info) info.textContent = mode === 'hint'
    ? '💡 Hint mode: Bot guides you, doesn\'t solve for you'
    : '📖 Explain mode: Get full explanations';
}

// ── VOICE INPUT ──
let recognition = null;
function toggleVoice() {
  const btn = document.getElementById('voiceBtn');
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    showToast('Voice input not supported in this browser', 'warning'); return;
  }
  if (recognition) {
    recognition.stop(); recognition = null;
    btn.classList.remove('active'); return;
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.onresult = e => {
    document.getElementById('chatInput').value = e.results[0][0].transcript;
    btn.classList.remove('active'); recognition = null;
  };
  recognition.onerror = () => { btn.classList.remove('active'); recognition = null; };
  recognition.start();
  btn.classList.add('active');
}

// ── SIDEBAR / UTILS ──
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }
function checkMobile() {
  if (window.innerWidth <= 900) {
    document.getElementById('chatPanel').classList.remove('collapsed');
    chatOpen = false;
  }
}

function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Quick prompt from chat suggestions
function quickPrompt(text) {
  document.getElementById('chatInput').value = text;
  sendMessage();
}
