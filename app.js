/* ═══════════════════════════════════════
   BRAINYBOT — GLOBAL APP UTILITIES
   ═══════════════════════════════════════ */

// ── PROFILE HELPERS ──
function getProfile() {
  const raw = localStorage.getItem('bb_profile');
  if (raw) return JSON.parse(raw);
  return {
    name: 'Learner', lang: 'python', level: 'beginner', goal: 'hobby',
    xp: 120, streak: 3, badges: ['first_login', 'first_run'],
    completedLessons: ['py-basics-1', 'py-basics-2'],
    createdAt: Date.now() - 86400000 * 3
  };
}

function saveProfile(profile) {
  localStorage.setItem('bb_profile', JSON.stringify(profile));
}

function addXP(amount) {
  const p = getProfile();
  p.xp = (p.xp || 0) + amount;
  saveProfile(p);
  showToast(`+${amount} XP earned! 🎉`, 'success');
}

function getXPLevel(xp) {
  if (xp < 200) return { level: 'Beginner', next: 200, icon: '🌱' };
  if (xp < 600) return { level: 'Explorer', next: 600, icon: '🔍' };
  if (xp < 1200) return { level: 'Coder', next: 1200, icon: '💻' };
  if (xp < 2500) return { level: 'Developer', next: 2500, icon: '🚀' };
  if (xp < 5000) return { level: 'Senior Dev', next: 5000, icon: '⭐' };
  return { level: 'Architect', next: Infinity, icon: '🏆' };
}

// ── TOAST ──
function showToast(msg, type = 'info', duration = 3500) {
  let tc = document.querySelector('.toast-container');
  if (!tc) { tc = document.createElement('div'); tc.className = 'toast-container'; document.body.appendChild(tc); }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.innerHTML = `<span style="font-size:1.1rem">${icons[type] || 'ℹ️'}</span><span style="font-size:.88rem;font-weight:500">${msg}</span>`;
  tc.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(110%)'; setTimeout(() => toast.remove(), 300); }, duration);
}

// ── NAV SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.style.background = window.scrollY > 60 ? 'rgba(10,10,15,.95)' : 'rgba(10,10,15,.8)';
});

// ── ANIMATE ON SCROLL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animate-fadeInUp'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.feature-card, .step, .stat-card').forEach(el => observer.observe(el));

console.log('%c🧠 BrainyBot', 'font-size:24px;font-weight:900;background:linear-gradient(135deg,#6c63ff,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent');
console.log('%cAdaptive AI Programming Tutor — Ready!', 'color:#6c63ff;font-size:12px');
