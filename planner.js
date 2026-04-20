/* ═══════════════════════════════════════
   STUDY PLANNER JAVASCRIPT
   ═══════════════════════════════════════ */

const WEEK_SESSIONS = {
  Mon: [{ type:'lesson', title:'Functions & Scope', dur:'45m' }, { type:'review', title:'Variables Review', dur:'15m' }],
  Tue: [{ type:'lesson', title:'Lists & Dicts', dur:'40m' }],
  Wed: [],
  Thu: [{ type:'quiz', title:'Quiz: Functions', dur:'20m' }, { type:'lesson', title:'File I/O', dur:'30m' }],
  Fri: [],
  Sat: [{ type:'lesson', title:'Classes & OOP', dur:'50m' }, { type:'review', title:'Loops Spaced Rep.', dur:'20m' }],
  Sun: [],
};

const SR_ITEMS = [
  { icon:'📝', topic:'List Comprehensions', last:'3 days ago', due:'today', dueClass:'today' },
  { icon:'🔄', topic:'Recursion', last:'5 days ago', due:'today', dueClass:'today' },
  { icon:'⚡', topic:'Lambda Functions', last:'2 days ago', due:'tomorrow', dueClass:'soon' },
  { icon:'🔡', topic:'String Methods', last:'7 days ago', due:'today', dueClass:'today' },
  { icon:'🔢', topic:'While Loops', last:'4 days ago', due:'in 2 days', dueClass:'later' },
];

const LEARNING_PATH = [
  { icon:'✅', label:'Variables & Types', status:'done', badge:'badge-success', badgeText:'Mastered' },
  { icon:'✅', label:'Control Flow', status:'done', badge:'badge-success', badgeText:'Mastered' },
  { icon:'✅', label:'Functions', status:'done', badge:'badge-success', badgeText:'Mastered' },
  { icon:'🔥', label:'Lists & Dicts', status:'current', badge:'badge-warning', badgeText:'In Progress' },
  { icon:'📖', label:'File I/O', status:'upcoming', badge:'badge-accent', badgeText:'Next Up' },
  { icon:'🏗️', label:'Classes & OOP', status:'upcoming', badge:'badge-accent', badgeText:'Locked' },
  { icon:'🔒', label:'Decorators', status:'locked', badge:'', badgeText:'' },
  { icon:'🔒', label:'Async Programming', status:'locked', badge:'', badgeText:'' },
];

const MILESTONES = [
  { icon:'🌱', title:'First Lesson', desc:'Complete your first lesson', progress:100, achieved:true },
  { icon:'🔥', title:'3-Day Streak', desc:'Study 3 days in a row', progress:100, achieved:true },
  { icon:'💻', title:'10 Lessons Done', desc:'8/10 completed', progress:80, achieved:false },
  { icon:'⚡', title:'Speed Learner', desc:'Finish a lesson in under 20 min', progress:0, achieved:false },
  { icon:'🏆', title:'Quiz Master', desc:'Score 90%+ on 3 quizzes', progress:33, achieved:false },
  { icon:'🚀', title:'Week Warrior', desc:'Study every day for a week', progress:43, achieved:false },
];

let studyMinutes = 45;
let focusMode = 'balanced';
const activeDays = new Set(['Mon', 'Tue', 'Thu', 'Sat']);

document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  renderWeekGrid();
  renderSRList();
  renderLearningPath();
  renderMilestones();
  initStudyChart();
});

function loadProfile() {
  const p = getProfile();
  document.getElementById('sfAvatar').textContent = (p.name||'L')[0].toUpperCase();
  document.getElementById('sfName').textContent = p.name || 'Learner';
  document.getElementById('xpCount').textContent = p.xp || 0;
  document.getElementById('streakCount').textContent = p.streak || 1;
  document.getElementById('icStreak').textContent = p.streak || 1;
  const lvl = getXPLevel(p.xp || 0);
  document.getElementById('sfLevel').textContent = lvl.icon + ' ' + lvl.level;
}

// ── WEEK GRID ──
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const today = new Date();

function renderWeekGrid() {
  const grid = document.getElementById('weekGrid');
  if (!grid) return;
  const startOfWeek = new Date(today);
  const dow = (today.getDay() + 6) % 7; // Mon=0
  startOfWeek.setDate(today.getDate() - dow);

  grid.innerHTML = DAYS.map((day, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    const isToday = d.toDateString() === today.toDateString();
    const sessions = WEEK_SESSIONS[day] || [];
    const isRest = !activeDays.has(day);
    return `
      <div class="week-day ${isToday ? 'today' : ''} ${isRest ? 'rest' : ''}">
        <div class="wd-header">
          <span class="wd-dayname">${day}</span>
          <span class="wd-date">${d.getDate()}</span>
        </div>
        <div class="wd-sessions">
          ${isRest ? '<div class="wd-session rest-label">Rest Day</div>' :
            sessions.length
              ? sessions.map(s => `<div class="wd-session ${s.type}" title="${s.title} · ${s.dur}">${s.title.length > 14 ? s.title.slice(0,14)+'…' : s.title}</div>`).join('')
              : '<div class="wd-session rest-label">Free slot</div>'
          }
          ${!isRest ? '<button class="wd-add" onclick="addSession(\'' + day + '\')">+ Add</button>' : ''}
        </div>
      </div>
    `;
  }).join('');
}

function addSession(day) {
  showToast(`Adding session to ${day}... (feature coming soon!)`, 'info');
}

// ── SPACED REPETITION ──
function renderSRList() {
  const list = document.getElementById('srList');
  if (!list) return;
  list.innerHTML = SR_ITEMS.map(item => `
    <div class="sr-item">
      <span class="sr-icon">${item.icon}</span>
      <div class="sr-info">
        <strong>${item.topic}</strong>
        <small>Last reviewed ${item.last}</small>
      </div>
      <span class="sr-due ${item.dueClass}">Due ${item.due}</span>
      <div class="sr-actions">
        <a href="editor.html" class="btn btn-primary btn-sm">Review</a>
        <button class="btn btn-ghost btn-sm" onclick="snoozeReview('${item.topic}')">Snooze</button>
      </div>
    </div>
  `).join('');
}

function snoozeReview(topic) {
  showToast(`"${topic}" snoozed for tomorrow`, 'info');
}

// ── LEARNING PATH ──
function renderLearningPath() {
  const path = document.getElementById('learningPath');
  if (!path) return;
  path.innerHTML = LEARNING_PATH.map(item => `
    <div class="lp-item">
      <div class="lp-dot ${item.status}">${item.icon}</div>
      <div class="lp-content">
        <strong>${item.label}</strong>
        ${item.badge ? `<div class="lp-badge"><span class="badge ${item.badge}" style="font-size:.7rem">${item.badgeText}</span></div>` : ''}
      </div>
    </div>
  `).join('');
}

// ── MILESTONES ──
function renderMilestones() {
  const list = document.getElementById('milestoneList');
  if (!list) return;
  list.innerHTML = MILESTONES.map(m => `
    <div class="milestone-item ${m.achieved ? 'achieved' : m.progress === 0 ? 'locked' : ''}">
      <span class="mi-icon">${m.icon}</span>
      <div class="mi-info">
        <strong>${m.title}</strong>
        <small>${m.desc}</small>
        ${!m.achieved && m.progress > 0 ? `
          <div class="mi-progress mt-2">
            <div class="progress"><div class="progress-fill" style="width:${m.progress}%"></div></div>
          </div>` : ''}
      </div>
      ${m.achieved ? '<span class="mi-check">✅</span>' : m.progress === 0 ? '<span class="mi-check">🔒</span>' : `<span style="font-size:.75rem;color:var(--text-muted)">${m.progress}%</span>`}
    </div>
  `).join('');
}

// ── STUDY CHART ──
function initStudyChart() {
  const ctx = document.getElementById('studyTimeChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: DAYS,
      datasets: [{
        label: 'Minutes studied',
        data: [45, 40, 0, 50, 0, 70, 0],
        backgroundColor: DAYS.map((d, i) => {
          const isToday = i === (today.getDay() + 6) % 7;
          return isToday ? 'rgba(108,99,255,.9)' : activeDays.has(d) ? 'rgba(108,99,255,.4)' : 'rgba(108,99,255,.1)';
        }),
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#5a5a7a', font: { size: 11 } } },
        y: { grid: { color: 'rgba(255,255,255,.04)' }, ticks: { color: '#5a5a7a', font: { size: 11 } } }
      }
    }
  });
}

// ── CONTROLS ──
function adjustTime(delta) {
  studyMinutes = Math.max(15, Math.min(180, studyMinutes + delta));
  document.getElementById('studyTimeLabel').textContent = studyMinutes + ' min/day';
}

function toggleDay(el) {
  const day = el.dataset.day;
  el.classList.toggle('active');
  if (activeDays.has(day)) activeDays.delete(day);
  else activeDays.add(day);
}

function selectFocus(mode, el) {
  document.querySelectorAll('.fm-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  focusMode = mode;
}

function regeneratePlan() {
  showToast('Regenerating your study plan with AI...', 'info');
  setTimeout(() => {
    renderWeekGrid();
    showToast('✨ Plan updated based on your weak areas and schedule!', 'success');
  }, 1200);
}

function prevWeek() { showToast('Previous week view (coming soon)', 'info'); }
function nextWeek() { showToast('Next week view (coming soon)', 'info'); }
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }
