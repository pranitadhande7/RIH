/* ═══════════════════════════════════════
   INSTRUCTOR DASHBOARD JAVASCRIPT
   ═══════════════════════════════════════ */

// ── STUDENT DATA ──
const STUDENTS = [
  { id:1, name:'Aisha Khan',     email:'aisha@example.com',  level:'Intermediate', progress:82, lastActive:'2h ago',   quizAvg:88, streak:7,  status:'excelling', colors:['#6c63ff','#a855f7'] },
  { id:2, name:'Rahul Mehta',    email:'rahul@example.com',  level:'Beginner',     progress:71, lastActive:'5h ago',   quizAvg:74, streak:3,  status:'active',    colors:['#38bdf8','#6c63ff'] },
  { id:3, name:'Priya Singh',    email:'priya@example.com',  level:'Advanced',     progress:94, lastActive:'1h ago',   quizAvg:95, streak:14, status:'excelling', colors:['#a855f7','#ec4899'] },
  { id:4, name:'James Wilson',   email:'james@example.com',  level:'Beginner',     progress:23, lastActive:'5 days',  quizAvg:42, streak:0,  status:'atrisk',    colors:['#ef4444','#f97316'] },
  { id:5, name:'Maria Garcia',   email:'maria@example.com',  level:'Beginner',     progress:45, lastActive:'2 days',  quizAvg:58, streak:1,  status:'active',    colors:['#22c55e','#38bdf8'] },
  { id:6, name:'Chen Wei',       email:'chen@example.com',   level:'Intermediate', progress:78, lastActive:'3h ago',  quizAvg:81, streak:5,  status:'active',    colors:['#f59e0b','#ef4444'] },
  { id:7, name:'Sara Ahmed',     email:'sara@example.com',   level:'Beginner',     progress:18, lastActive:'8 days',  quizAvg:35, streak:0,  status:'atrisk',    colors:['#ef4444','#f97316'] },
  { id:8, name:'Dev Patel',      email:'dev@example.com',    level:'Advanced',     progress:89, lastActive:'30m ago', quizAvg:91, streak:11, status:'excelling', colors:['#6c63ff','#38bdf8'] },
  { id:9, name:'Fatima Al-Noor', email:'fat@example.com',    level:'Beginner',     progress:52, lastActive:'1 day',  quizAvg:63, streak:2,  status:'active',    colors:['#a855f7','#6c63ff'] },
  { id:10,name:'Lucas Brown',    email:'lucas@example.com',  level:'Beginner',     progress:31, lastActive:'4 days', quizAvg:48, streak:0,  status:'atrisk',    colors:['#ef4444','#f97316'] },
  { id:11,name:'Yuki Tanaka',    email:'yuki@example.com',   level:'Intermediate', progress:66, lastActive:'6h ago', quizAvg:72, streak:4,  status:'active',    colors:['#38bdf8','#22c55e'] },
  { id:12,name:'Amara Osei',     email:'amara@example.com',  level:'Beginner',     progress:27, lastActive:'6 days', quizAvg:41, streak:0,  status:'atrisk',    colors:['#ef4444','#a855f7'] },
];

const CONCEPTS = [
  { name:'Variables',  classAvg:88 }, { name:'Loops',      classAvg:76 },
  { name:'Functions',  classAvg:64 }, { name:'Lists',      classAvg:58 },
  { name:'Dicts',      classAvg:47 }, { name:'Classes',    classAvg:32 },
  { name:'Files I/O',  classAvg:21 }, { name:'Exceptions', classAvg:44 },
  { name:'Decorators', classAvg:12 }, { name:'Generators', classAvg:8  },
  { name:'Async',      classAvg:5  }, { name:'Testing',    classAvg:18 },
];

const ASSIGNMENTS = [
  { title:'Functions Challenge', type:'code',    due:'Apr 22', submitted:18, total:24, avgScore:74 },
  { title:'Quiz: Lists & Dicts', type:'quiz',    due:'Apr 25', submitted:20, total:24, avgScore:68 },
  { title:'OOP Mini Project',    type:'code',    due:'Apr 30', submitted:5,  total:24, avgScore:null },
  { title:'Recursion Reading',   type:'reading', due:'Apr 21', submitted:22, total:24, avgScore:null },
];

const AT_RISK = [
  { name:'James Wilson',   reason:'No activity (5 days)', severity:'danger' },
  { name:'Sara Ahmed',     reason:'No activity (8 days)', severity:'danger' },
  { name:'Lucas Brown',    reason:'Stuck on loops (3 days)', severity:'warn' },
  { name:'Amara Osei',     reason:'Quiz avg dropped to 41%', severity:'warn' },
];

const ACTIVITY = [
  { icon:'✅', text:'<strong>Priya Singh</strong> completed "Advanced Closures" with 95% score', time:'2m ago' },
  { icon:'⚠️', text:'<strong>Sara Ahmed</strong> has not logged in for 8 days', time:'auto' },
  { icon:'🎯', text:'<strong>Aisha Khan</strong> scored 100% on the Functions Quiz', time:'1h ago' },
  { icon:'🚀', text:'<strong>Dev Patel</strong> earned the "Speed Coder" badge', time:'2h ago' },
  { icon:'💡', text:'<strong>Maria Garcia</strong> used AI hint 8 times on recursion', time:'3h ago' },
  { icon:'📥', text:'<strong>18 students</strong> submitted Functions Challenge', time:'5h ago' },
];

let assignType = 'code';
let currentView = 'overview';

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  renderAlerts();
  renderClassHeatmap();
  renderPerformers();
  renderActivityFeed();
  renderStudentsTable(STUDENTS);
  renderAssignments();
  initClassProgressChart();
  initDistChart();
});

// ── VIEWS ──
function switchView(view, btn) {
  document.querySelectorAll('.instructor-view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.topbar .tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('view-' + view).classList.add('active');
  btn.classList.add('active');
  currentView = view;
}

// ── ALERTS ──
function renderAlerts() {
  const list = document.getElementById('alertList');
  if (!list) return;
  list.innerHTML = AT_RISK.map(a => `
    <div class="alert-item ${a.severity === 'warn' ? 'warning' : ''}">
      <span class="ai-avatar-sm">${a.severity === 'danger' ? '🚨' : '⚠️'}</span>
      <div class="ai-info">
        <strong>${a.name}</strong>
        <small>${a.reason}</small>
      </div>
      <span class="ai-reason ${a.severity}">${a.severity === 'danger' ? 'Critical' : 'Warning'}</span>
      <button class="btn btn-ghost btn-sm" onclick="contactStudent('${a.name}')">Reach Out</button>
    </div>
  `).join('');
}

function contactStudent(name) {
  showToast(`Message sent to ${name}. They'll receive a nudge notification.`, 'success');
}

// ── CLASS HEATMAP ──
function renderClassHeatmap() {
  const grid = document.getElementById('classHeatmap');
  if (!grid) return;
  grid.innerHTML = CONCEPTS.map(c => {
    const lvl = c.classAvg >= 80 ? 4 : c.classAvg >= 60 ? 3 : c.classAvg >= 40 ? 2 : c.classAvg >= 20 ? 1 : 0;
    return `<div class="heatmap-cell heat-${lvl}" data-tip="${c.name}: ${c.classAvg}% class avg">
      <div class="hc-topic">${c.name}</div>
      <div class="hc-pct">${c.classAvg}%</div>
    </div>`;
  }).join('');
}

// ── PERFORMERS ──
function renderPerformers() {
  const sorted = [...STUDENTS].sort((a, b) => b.quizAvg - a.quizAvg);
  const top = document.getElementById('topPerformers');
  const bottom = document.getElementById('bottomPerformers');
  if (top) top.innerHTML = sorted.slice(0, 4).map((s, i) => performerRow(s, i + 1, true)).join('');
  if (bottom) bottom.innerHTML = sorted.slice(-4).reverse().map((s, i) => performerRow(s, i + 1, false)).join('');
}

function performerRow(s, rank, isTop) {
  const rankIcons = ['🥇','🥈','🥉','4️⃣'];
  return `<div class="perf-item" onclick="openStudentModal(${s.id})">
    <span class="perf-rank">${rankIcons[rank-1] || rank}</span>
    <div class="st-avatar" style="background:linear-gradient(135deg,${s.colors[0]},${s.colors[1]})">${s.name[0]}</div>
    <div class="perf-info"><strong>${s.name}</strong><small>${s.level}</small></div>
    <span class="perf-score ${isTop ? 'high' : 'low'}">${s.quizAvg}%</span>
  </div>`;
}

// ── ACTIVITY FEED ──
function renderActivityFeed() {
  const feed = document.getElementById('activityFeed');
  if (!feed) return;
  feed.innerHTML = ACTIVITY.map(a => `
    <div class="af-item">
      <span class="af-icon">${a.icon}</span>
      <span class="af-text">${a.text}</span>
      <span class="af-time">${a.time}</span>
    </div>
  `).join('');
}

// ── STUDENTS TABLE ──
function renderStudentsTable(students) {
  const tbody = document.getElementById('studentsBody');
  if (!tbody) return;
  tbody.innerHTML = students.map(s => `
    <tr onclick="openStudentModal(${s.id})" style="cursor:pointer">
      <td>
        <div class="st-name">
          <div class="st-avatar" style="background:linear-gradient(135deg,${s.colors[0]},${s.colors[1]})">${s.name[0]}</div>
          <div class="st-info"><strong>${s.name}</strong><small>${s.email}</small></div>
        </div>
      </td>
      <td><span class="badge ${s.level==='Advanced'?'badge-primary':s.level==='Intermediate'?'badge-accent':'badge-success'}">${s.level}</span></td>
      <td>
        <div class="progress-cell">
          <div class="progress"><div class="progress-fill" style="width:${s.progress}%"></div></div>
          <span style="color:${s.progress>=70?'var(--brand-success)':s.progress>=40?'var(--brand-warning)':'var(--brand-danger)'}">${s.progress}%</span>
        </div>
      </td>
      <td style="color:var(--text-muted);font-size:.82rem">${s.lastActive}</td>
      <td style="font-weight:700;color:${s.quizAvg>=80?'var(--brand-success)':s.quizAvg>=60?'var(--brand-warning)':'var(--brand-danger)'}">${s.quizAvg}%</td>
      <td style="font-size:.85rem">${s.streak > 0 ? '🔥 ' + s.streak + 'd' : '—'}</td>
      <td><span class="status-chip ${s.status}">${{excelling:'⭐ Excelling', active:'✅ Active', atrisk:'🚨 At Risk', inactive:'💤 Inactive'}[s.status]}</span></td>
      <td><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openStudentModal(${s.id})">View</button></td>
    </tr>
  `).join('');
  document.getElementById('studentCount').textContent = `${students.length} students`;
}

function filterStudents() {
  const q = document.getElementById('studentSearch').value.toLowerCase();
  const f = document.getElementById('studentFilter').value;
  let filtered = STUDENTS.filter(s => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q));
  if (f === 'atrisk') filtered = filtered.filter(s => s.status === 'atrisk');
  else if (f === 'top') filtered = filtered.filter(s => s.status === 'excelling');
  else if (f === 'inactive') filtered = filtered.filter(s => s.streak === 0);
  renderStudentsTable(filtered);
}

// ── STUDENT MODAL ──
function openStudentModal(id) {
  const s = STUDENTS.find(s => s.id === id);
  if (!s) return;
  const content = document.getElementById('studentModalContent');
  content.innerHTML = `
    <div class="smd-header">
      <div class="smd-avatar" style="background:linear-gradient(135deg,${s.colors[0]},${s.colors[1]})">${s.name[0]}</div>
      <div>
        <div class="smd-name">${s.name}</div>
        <div class="smd-meta">${s.email} · ${s.level}</div>
        <div style="margin-top:6px"><span class="status-chip ${s.status}">${{excelling:'⭐ Excelling',active:'✅ Active',atrisk:'🚨 At Risk',inactive:'💤 Inactive'}[s.status]}</span></div>
      </div>
    </div>
    <div class="smd-stats">
      <div class="smd-stat"><div class="val gradient-text">${s.progress}%</div><div class="lbl">Progress</div></div>
      <div class="smd-stat"><div class="val gradient-text">${s.quizAvg}%</div><div class="lbl">Quiz Avg</div></div>
      <div class="smd-stat"><div class="val gradient-text">${s.streak > 0 ? '🔥'+s.streak+'d' : '—'}</div><div class="lbl">Streak</div></div>
    </div>
    <div style="margin-bottom:14px">
      <label style="font-size:.78rem;color:var(--text-muted);display:block;margin-bottom:6px">Course Progress</label>
      <div class="progress" style="height:10px"><div class="progress-fill" style="width:${s.progress}%"></div></div>
    </div>
    <div class="smd-insights">
      <strong>🤖 AI Insights:</strong><br/>
      ${s.status === 'atrisk'
        ? `${s.name.split(' ')[0]} has been inactive for multiple days and shows a pattern of repeated errors in loop constructs. Recommend: schedule a 1:1 check-in and assign beginner-level loop exercises.`
        : s.status === 'excelling'
        ? `${s.name.split(' ')[0]} is consistently excelling! Consider assigning advanced challenges to prevent boredom. Their learning style appears to be kinesthetic (code-first).`
        : `${s.name.split(' ')[0]} is making steady progress. Detected some difficulty with ${['recursion', 'list comprehensions', 'scope', 'exceptions'][Math.floor(Math.random()*4)]}. Spaced repetition scheduled.`
      }
    </div>
    <div style="display:flex;gap:10px;margin-top:16px">
      <button class="btn btn-primary btn-full" onclick="sendNudge('${s.name}')">📩 Send Nudge</button>
      <button class="btn btn-ghost btn-full" onclick="closeModal()">Close</button>
    </div>
  `;
  document.getElementById('studentModal').classList.add('open');
}

function closeModal() { document.getElementById('studentModal').classList.remove('open'); }
function sendNudge(name) { showToast(`Nudge sent to ${name}!`, 'success'); closeModal(); }

// ── ASSIGNMENTS ──
function renderAssignments() {
  const list = document.getElementById('assignList');
  if (!list) return;
  list.innerHTML = ASSIGNMENTS.map((a, i) => {
    const pct = Math.round((a.submitted / a.total) * 100);
    const icons = { code:'💻', quiz:'🎯', reading:'📖' };
    return `<div class="assign-card">
      <div class="ac-header">
        <span class="ac-title">${icons[a.type]} ${a.title}</span>
        <span class="badge ${a.due < 'Apr 22' ? 'badge-danger' : 'badge-warning'}">Due ${a.due}</span>
      </div>
      <div class="ac-meta">
        <span>${a.submitted}/${a.total} submitted</span>
        ${a.avgScore ? `<span>· Class avg: ${a.avgScore}%</span>` : ''}
      </div>
      <div class="ac-progress">
        <div class="ac-progress-label"><span>Submission Rate</span><span>${pct}%</span></div>
        <div class="progress"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="ac-actions">
        <button class="btn btn-ghost btn-sm" onclick="viewSubmissions(${i})">View Submissions</button>
        <button class="btn btn-ghost btn-sm" onclick="editAssign(${i})">Edit</button>
      </div>
    </div>`;
  }).join('');
}

function viewSubmissions(i) { showToast(`Opening submissions for "${ASSIGNMENTS[i].title}"...`, 'info'); }
function editAssign(i) { showToast(`Editing "${ASSIGNMENTS[i].title}"...`, 'info'); }

function openCreateAssign() {
  const form = document.getElementById('createAssignForm');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
  // Set default due date
  const d = new Date(); d.setDate(d.getDate() + 7);
  document.getElementById('aDue').value = d.toISOString().split('T')[0];
}
function closeCreateAssign() { document.getElementById('createAssignForm').style.display = 'none'; }

function selectAType(type, el) {
  assignType = type;
  document.querySelectorAll('.create-assign-section .option-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function createAssignment() {
  const title = document.getElementById('aTitle').value.trim();
  const desc = document.getElementById('aDesc').value.trim();
  if (!title) { showToast('Please enter a title', 'error'); return; }
  showToast(`✅ Assignment "${title}" created and assigned!`, 'success');
  closeCreateAssign();
  document.getElementById('aTitle').value = '';
  document.getElementById('aDesc').value = '';
}

// ── CHARTS ──
function initClassProgressChart() {
  const ctx = document.getElementById('classProgressChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [
        { label:'Avg Progress', data:[58,62,64,66,68,70,67], borderColor:'#6c63ff', backgroundColor:'rgba(108,99,255,.1)', fill:true, tension:.4, borderWidth:2, pointRadius:4 },
        { label:'Active Students', data:[18,20,16,22,19,21,14], borderColor:'#38bdf8', backgroundColor:'transparent', tension:.4, borderWidth:2, pointRadius:4, borderDash:[4,4] },
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ labels:{ color:'#9090b0', font:{size:11} } } },
      scales:{
        x:{ grid:{color:'rgba(255,255,255,.04)'}, ticks:{color:'#5a5a7a',font:{size:11}} },
        y:{ grid:{color:'rgba(255,255,255,.04)'}, ticks:{color:'#5a5a7a',font:{size:11}} }
      }
    }
  });
}

function initDistChart() {
  const ctx = document.getElementById('distChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['0-20%','21-40%','41-60%','61-80%','81-100%'],
      datasets: [{
        label: 'Students',
        data: [2, 3, 5, 8, 6],
        backgroundColor: ['#ef4444','#f97316','#f59e0b','#38bdf8','#22c55e'],
        borderRadius: 6,
      }]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ display:false } },
      scales:{
        x:{ grid:{display:false}, ticks:{color:'#5a5a7a',font:{size:11}} },
        y:{ grid:{color:'rgba(255,255,255,.04)'}, ticks:{color:'#5a5a7a',font:{size:11}} }
      }
    }
  });
}

function exportReport() {
  showToast('📥 Generating class report PDF...', 'info');
  setTimeout(() => showToast('✅ Report downloaded: BrainyBot_Report_Apr2026.pdf', 'success'), 1500);
}

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }

// Close modal on overlay click
document.getElementById('studentModal')?.addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
