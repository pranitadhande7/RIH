/* ═══════════════════════════════════════
   DASHBOARD JAVASCRIPT
   ═══════════════════════════════════════ */

// ── TOPICS + BADGES DATA ──
const TOPICS = [
  { name:'Variables', pct:90 }, { name:'Loops', pct:75 }, { name:'Functions', pct:60 },
  { name:'Lists', pct:55 }, { name:'Dicts', pct:40 }, { name:'Classes', pct:30 },
  { name:'Files I/O', pct:20 }, { name:'Errors', pct:45 }, { name:'Decorators', pct:10 },
  { name:'Generators', pct:5 }, { name:'Async', pct:0 }, { name:'Testing', pct:15 },
];

const ALL_BADGES = [
  { id:'first_login', icon:'👋', name:'First Login' },
  { id:'first_run', icon:'▶️', name:'First Run' },
  { id:'streak_3', icon:'🔥', name:'3-Day Streak' },
  { id:'quiz_ace', icon:'🎯', name:'Quiz Ace' },
  { id:'bug_hunter', icon:'🐛', name:'Bug Hunter' },
  { id:'speed_coder', icon:'⚡', name:'Speed Coder' },
  { id:'night_owl', icon:'🦉', name:'Night Owl' },
  { id:'early_bird', icon:'🐦', name:'Early Bird' },
];

// ── CHART DATA ──
const chartData = {
  xp:       { label:'XP Earned', data:[10,25,15,40,30,50,45], color:'#6c63ff' },
  accuracy: { label:'Accuracy %', data:[60,65,70,68,78,75,82], color:'#38bdf8' },
  time:     { label:'Time (min)', data:[20,35,25,40,30,50,45], color:'#a855f7' },
};
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
let activeChart = null;

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  renderHeatmap();
  renderBadges();
  initChart('xp');
  setGreeting();
});

function loadProfile() {
  const p = getProfile();

  // Sidebar profile
  const initial = (p.name || 'L')[0].toUpperCase();
  document.getElementById('sfAvatar').textContent = initial;
  document.getElementById('sfName').textContent = p.name || 'Learner';

  // Topbar
  const lvlInfo = getXPLevel(p.xp || 0);
  document.getElementById('sfLevel').textContent = lvlInfo.icon + ' ' + lvlInfo.level;
  document.getElementById('streakCount').textContent = p.streak || 1;
  document.getElementById('xpCount').textContent = (p.xp || 0).toLocaleString();
  document.getElementById('statStreak').textContent = '🔥 ' + (p.streak || 1);
  document.getElementById('statLessons').textContent = (p.completedLessons || []).length + 8;

  // XP card
  document.getElementById('xpLevelBadge').textContent = lvlInfo.icon + ' ' + lvlInfo.level;
  document.getElementById('xpTotal').textContent = (p.xp || 0).toLocaleString() + ' XP';
  const pctFill = Math.min(100, ((p.xp || 0) / (lvlInfo.next === Infinity ? 5000 : lvlInfo.next)) * 100);
  setTimeout(() => { document.getElementById('xpBarFill').style.width = pctFill + '%'; }, 300);
  document.getElementById('xpMilestone').textContent = (lvlInfo.next === Infinity ? '∞' : lvlInfo.next) + ' XP';
  const toNext = lvlInfo.next === Infinity ? 0 : lvlInfo.next - (p.xp || 0);
  document.getElementById('xpNextText').textContent = toNext > 0
    ? `${toNext} XP to next level → ${getNextLevelName(p.xp || 0)}`
    : 'Max level reached! 🏆';

  // Mission title
  const langTitles = { python:'Python Functions & Scope', javascript:'JavaScript Promises & Async', java:'Java OOP Patterns', cpp:'C++ Pointers & Memory' };
  document.getElementById('missionTitle').textContent = langTitles[p.lang] || 'Coding Fundamentals';
}

function getNextLevelName(xp) {
  if (xp < 200) return 'Explorer 🔍';
  if (xp < 600) return 'Coder 💻';
  if (xp < 1200) return 'Developer 🚀';
  if (xp < 2500) return 'Senior Dev ⭐';
  return 'Architect 🏆';
}

function setGreeting() {
  const h = new Date().getHours();
  const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const p = getProfile();
  document.getElementById('greetingText').textContent = `${greet}, ${p.name || 'Learner'}! 👋`;
  document.getElementById('greetingSubtitle').textContent = 'Ready to level up today?';
}

// ── HEATMAP ──
function renderHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  if (!grid) return;
  grid.innerHTML = TOPICS.map(t => {
    const level = t.pct >= 80 ? 4 : t.pct >= 60 ? 3 : t.pct >= 40 ? 2 : t.pct >= 20 ? 1 : 0;
    return `<div class="heatmap-cell heat-${level}" data-tip="${t.name}: ${t.pct}%">
      <div class="hc-topic">${t.name}</div>
      <div class="hc-pct">${t.pct}%</div>
    </div>`;
  }).join('');
}

// ── BADGES ──
function renderBadges() {
  const grid = document.getElementById('badgesGrid');
  if (!grid) return;
  const p = getProfile();
  const earned = p.badges || [];
  grid.innerHTML = ALL_BADGES.map(b => `
    <div class="badge-item ${earned.includes(b.id) ? '' : 'locked'}" data-tip="${b.name}${earned.includes(b.id) ? ' ✓' : ' (locked)'}">
      <div class="badge-icon">${b.icon}</div>
      <div class="badge-name">${b.name}</div>
    </div>
  `).join('');
}

// ── CHART ──
function initChart(type) {
  const ctx = document.getElementById('progressChart');
  if (!ctx) return;
  if (activeChart) activeChart.destroy();

  const d = chartData[type];
  activeChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: days,
      datasets: [{
        label: d.label,
        data: d.data,
        borderColor: d.color,
        backgroundColor: d.color + '20',
        borderWidth: 2.5,
        pointBackgroundColor: d.color,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,.04)' }, ticks: { color: '#5a5a7a', font: { size: 11 } } },
        y: { grid: { color: 'rgba(255,255,255,.04)' }, ticks: { color: '#5a5a7a', font: { size: 11 } } },
      },
      animation: { duration: 600 },
    }
  });
}

function switchChart(type, btn) {
  document.querySelectorAll('#chartTabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  initChart(type);
}

// ── SIDEBAR TOGGLE ──
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ── NOTIF PANEL ──
function toggleNotifs() {
  document.getElementById('notifPanel')?.classList.toggle('hidden');
}

function skipMission() {
  showToast('Mission skipped. We\'ll reschedule it for tomorrow.', 'info');
}

// Close notif panel on outside click
document.addEventListener('click', e => {
  const panel = document.getElementById('notifPanel');
  const btn = document.getElementById('notifBtn');
  if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
    panel.classList.add('hidden');
  }
});
