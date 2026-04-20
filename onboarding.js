/* ═══════════════════════════════════════
   BRAINYBOT — ONBOARDING LOGIC
   ═══════════════════════════════════════ */

const diagQuestions = [
  {
    q: "What will this Python code print?\n\nx = [1, 2, 3]\nprint(x[1])",
    opts: ["1", "2", "3", "[1,2,3]"],
    answer: 1
  },
  {
    q: "Which of the following is a correct way to define a function in Python?",
    opts: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
    answer: 1
  },
  {
    q: "What does the following JavaScript return?\n\ntypeof null",
    opts: ['"null"', '"undefined"', '"object"', '"boolean"'],
    answer: 2
  }
];

let currentStep = 1;
let diagAnswers = {};
let diagScore = 0;

function selectOption(el, gridId, hiddenId) {
  document.querySelectorAll(`#${gridId} .option-btn`).forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById(hiddenId).value = el.dataset.value;
}

function nextStep(to) {
  // validation
  if (to === 2) {
    const name = document.getElementById('userName')?.value?.trim();
    const goal = document.getElementById('userGoal')?.value;
    if (!name) { showToast('Please enter your name', 'error'); return; }
    if (!goal) { showToast('Please select a goal', 'error'); return; }
  }
  if (to === 3) {
    const lang = document.getElementById('userLang')?.value;
    const level = document.getElementById('userLevel')?.value;
    if (!lang) { showToast('Please select a language', 'error'); return; }
    if (!level) { showToast('Please select a level', 'error'); return; }
    buildDiagnostic();
  }
  if (to === 4) {
    evaluateDiag();
    buildSuccessScreen();
  }

  document.getElementById(`step${currentStep}`)?.classList.remove('active');
  document.getElementById(`step${to}`)?.classList.add('active');
  currentStep = to;

  const pct = (to / 4) * 100;
  document.getElementById('obProgressBar').style.width = pct + '%';
  document.getElementById('obStepLabel').textContent = `Step ${to} of 4 — ${['Your Profile','Language & Level','Diagnostic Test','All Done!'][to-1]}`;
}

function prevStep(to) {
  document.getElementById(`step${currentStep}`)?.classList.remove('active');
  document.getElementById(`step${to}`)?.classList.add('active');
  currentStep = to;
  const pct = (to / 4) * 100;
  document.getElementById('obProgressBar').style.width = pct + '%';
  document.getElementById('obStepLabel').textContent = `Step ${to} of 4 — ${['Your Profile','Language & Level','Diagnostic Test','All Done!'][to-1]}`;
}

function buildDiagnostic() {
  const container = document.getElementById('diagQuiz');
  if (!container) return;
  container.innerHTML = '';
  diagAnswers = {};

  diagQuestions.forEach((q, qi) => {
    const div = document.createElement('div');
    div.className = 'diag-question';
    div.innerHTML = `
      <div class="diag-q-text"><span style="color:var(--brand-primary);font-size:.78rem;font-weight:700;">Q${qi+1}.</span> <pre style="display:inline;white-space:pre-wrap;font-family:inherit;">${q.q}</pre></div>
      <div class="diag-options" id="diagOpts${qi}">
        ${q.opts.map((opt,oi) => `
          <div class="diag-opt" onclick="selectDiagOpt(${qi},${oi},this)" id="dopt-${qi}-${oi}">
            <span class="diag-opt-marker" style="width:20px;height:20px;border-radius:50%;border:2px solid var(--bg-border);display:inline-block;flex-shrink:0;"></span>
            ${opt}
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(div);
  });
}

function selectDiagOpt(qi, oi, el) {
  document.querySelectorAll(`#diagOpts${qi} .diag-opt`).forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  diagAnswers[qi] = oi;
}

function evaluateDiag() {
  diagScore = 0;
  diagQuestions.forEach((q, qi) => {
    if (diagAnswers[qi] === q.answer) diagScore++;
  });
}

function buildSuccessScreen() {
  const lang = document.getElementById('userLang')?.value || 'python';
  const level = document.getElementById('userLevel')?.value || 'beginner';
  const goal = document.getElementById('userGoal')?.value || 'hobby';
  const name = document.getElementById('userName')?.value?.trim() || 'Learner';

  const langMap = { python: '🐍 Python', javascript: '⚡ JavaScript', java: '☕ Java', cpp: '⚙️ C++' };
  const goalMap = { job: '💼 Get a Job', academic: '🎓 Academic', hobby: '🎮 Hobby', career: '🚀 Career Switch' };
  const levelMap = { beginner: '🌱 Beginner', intermediate: '🔥 Intermediate', advanced: '⚡ Advanced' };

  const pct = Math.round((diagScore / diagQuestions.length) * 100);
  const skillPct = level === 'beginner' ? 15 + pct * 0.2 : level === 'intermediate' ? 40 + pct * 0.3 : 65 + pct * 0.25;

  document.getElementById('profileSummary').innerHTML = `
    <span class="badge badge-primary">${langMap[lang]}</span>
    <span class="badge badge-accent">${levelMap[level]}</span>
    <span class="badge badge-warning">${goalMap[goal]}</span>
    <span class="badge badge-success">🎯 Quiz: ${diagScore}/${diagQuestions.length}</span>
  `;

  setTimeout(() => {
    const fillEl = document.getElementById('skillFill');
    const pctEl = document.getElementById('skillPct');
    if (fillEl) fillEl.style.width = skillPct + '%';
    if (pctEl) pctEl.textContent = Math.round(skillPct) + '%';
  }, 400);
}

function saveProfile() {
  const profile = {
    name: document.getElementById('userName')?.value?.trim() || 'Learner',
    lang: document.getElementById('userLang')?.value || 'python',
    level: document.getElementById('userLevel')?.value || 'beginner',
    goal: document.getElementById('userGoal')?.value || 'hobby',
    diagScore,
    xp: 50,
    streak: 1,
    badges: ['first_login'],
    completedLessons: [],
    createdAt: Date.now()
  };
  localStorage.setItem('bb_profile', JSON.stringify(profile));
}

// Toast utility
function showToast(msg, type = 'info') {
  let tc = document.querySelector('.toast-container');
  if (!tc) {
    tc = document.createElement('div');
    tc.className = 'toast-container';
    document.body.appendChild(tc);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
  tc.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
