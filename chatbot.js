/* ═══════════════════════════════════════
   BRAINYBOT — AI CHATBOT ENGINE
   ═══════════════════════════════════════ */

// ── AI RESPONSES DATABASE ──
const AI_RESPONSES = {
  hint: {
    scope: [
      "💡 Think about where the variable is created. Is it inside or outside the function?",
      "💡 Remember: variables declared inside a function are only visible **inside** that function.",
      "💡 Python looks for variables in this order: Local → Enclosing → Global → Built-in (LEGB rule).",
    ],
    closure: [
      "💡 A closure is when an inner function 'remembers' variables from its outer function. What keyword lets you modify an outer variable?",
      "💡 Hint: `nonlocal` is your friend here. What does it do?",
      "💡 Think of it like a backpack — the inner function carries variables from the outer scope with it.",
    ],
    loop: [
      "💡 Check your loop condition. When should it stop?",
      "💡 Are you updating the loop variable? An infinite loop often means a variable never changes.",
      "💡 Try adding a `print()` inside your loop to see what's happening each iteration.",
    ],
    error: [
      "💡 Error messages are your friends! Read the **last line** of the error — that's the most important part.",
      "💡 The line number in the error tells you exactly where to look.",
      "💡 Don't panic — every programmer gets errors. What specific part of the error message is confusing?",
    ],
    general: [
      "💡 Break the problem down. What's the **first** thing your solution needs to do?",
      "💡 What do you already know? Start with what works, then extend it.",
      "💡 Try explaining the problem out loud (rubber duck debugging!). Sometimes saying it aloud reveals the solution.",
      "💡 Write pseudocode first — describe the solution in plain English before coding it.",
    ]
  },
  explain: {
    scope: "📖 **Scope** in Python defines where a variable is accessible. \n\n**Local scope** — variables inside a function:\n```python\ndef foo():\n    x = 10  # only visible inside foo\n```\n\n**Global scope** — variables outside all functions:\n```python\ny = 20  # visible everywhere\n```\n\nThe LEGB rule says Python looks for variables in: **L**ocal → **E**nclosing → **G**lobal → **B**uilt-in order.",
    closure: "📖 A **closure** is a function that remembers variables from its enclosing scope, even after that scope has finished executing.\n\n```python\ndef outer():\n    count = 0\n    def inner():\n        nonlocal count\n        count += 1\n        return count\n    return inner\n\nc = outer()\nprint(c())  # 1\nprint(c())  # 2 — remembers count!\n```\n\nClosures are used for data encapsulation and creating factory functions.",
    async: "📖 **Async/Await** lets you write asynchronous code that reads like synchronous code.\n\n- `async def` — marks a function as asynchronous\n- `await` — pauses execution until the Promise resolves\n- The function returns a **Promise** automatically\n\nThis prevents 'callback hell' and makes async code much more readable.",
    general: "📖 Great question! Let me explain that concept clearly for you. What specific part would you like me to focus on — the concept itself, a code example, or how it connects to what you're building?",
  },
  socratic: [
    "🤔 Good thinking! What happens if you test that theory with a simple example?",
    "🤔 Interesting approach! What's the expected output, and what are you actually getting?",
    "🤔 You're close! What if the variable was declared **outside** the function instead?",
    "🤔 What does the error message say? Let's read it together — which line is it pointing to?",
    "🤔 That's a valid approach! Can you think of an edge case where it might break?",
  ],
  encouragement: [
    "🎉 Great work! You're making solid progress.",
    "💪 That's exactly the right way to think about it!",
    "⭐ Excellent! You've got the right idea.",
    "🚀 You're getting it! Keep going.",
    "✅ Perfect understanding! Now try applying it to the challenge.",
  ],
  confused: [
    "🤗 It's completely normal to find this tricky! Scope confuses almost every beginner.",
    "💙 Don't worry — this concept clicked for me too after a few tries. Let's approach it differently.",
    "🌱 Learning takes time. You're building understanding brick by brick!",
  ],
  frustrated: [
    "😮‍💨 I can tell this is frustrating. Let's take a step back and approach it differently.",
    "🤝 Frustration means you care about getting it right — that's a good sign! Let's break it down.",
    "🧘 Deep breath. The bug is *always* findable. Let's look at it fresh.",
  ]
};

const chatHistory = [];
let chatMode = 'hint';
let isTyping = false;

// ── SEND MESSAGE ──
function sendMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg || isTyping) return;

  input.value = '';
  addUserMessage(msg);
  chatHistory.push({ role: 'user', content: msg });
  showTypingIndicator();

  const delay = 800 + Math.random() * 800;
  setTimeout(() => {
    hideTypingIndicator();
    const response = generateResponse(msg);
    addBotMessage(response);
    chatHistory.push({ role: 'bot', content: response });
  }, delay);
}

// ── RESPONSE ENGINE ──
function generateResponse(msg) {
  const lower = msg.toLowerCase();
  const code = cmEditor ? cmEditor.getValue() : '';
  const emotion = emotionState || 'focused';

  // Emotion-aware responses
  if (emotion === 'frustrated') {
    const r = pickRandom(AI_RESPONSES.frustrated);
    return r + '\n\n' + generateContextualHint(lower, code);
  }
  if (emotion === 'confused' && lower.includes('help')) {
    return pickRandom(AI_RESPONSES.confused) + '\n\n' + generateContextualHint(lower, code);
  }

  // Direct question matching
  if (lower.match(/what is|explain|how does|tell me|define/)) {
    return generateExplanation(lower);
  }
  if (lower.match(/hint|stuck|help|don't understand|confused|cant|can't/)) {
    return generateContextualHint(lower, code);
  }
  if (lower.match(/wrong|error|bug|fix|broken|doesn't work|doesn't work/)) {
    return generateErrorHelp(lower, code);
  }
  if (lower.match(/good|done|finished|solved|works|correct/)) {
    return pickRandom(AI_RESPONSES.encouragement);
  }
  if (lower.match(/scope/)) return chatMode === 'explain' ? AI_RESPONSES.explain.scope : pickRandom(AI_RESPONSES.hint.scope);
  if (lower.match(/closure|nonlocal/)) return chatMode === 'explain' ? AI_RESPONSES.explain.closure : pickRandom(AI_RESPONSES.hint.closure);
  if (lower.match(/loop|iteration|for|while/)) return pickRandom(AI_RESPONSES.hint.loop);
  if (lower.match(/async|await|promise/)) return chatMode === 'explain' ? AI_RESPONSES.explain.async : pickRandom(AI_RESPONSES.hint.general);

  // Socratic fallback
  return pickRandom(AI_RESPONSES.socratic);
}

function generateContextualHint(msg, code) {
  if (chatMode === 'explain') return generateExplanation(msg);

  // Analyze the code for issues
  if (code.includes('pass')) return "💡 I see you still have `pass` in your code. Replace it with your actual logic. What should that section do?";
  if (code.includes('# Your code here') || code.includes('# TODO')) return "💡 Look for the comment `# Your code here` — that's where you need to add your solution. Start by defining what the function should do in English.";
  if (code.split('\n').length < 5) return "💡 You haven't written much yet! Start by sketching out the function structure. What are the inputs and outputs?";

  return pickRandom(AI_RESPONSES.hint.general);
}

function generateExplanation(msg) {
  if (msg.includes('scope')) return AI_RESPONSES.explain.scope;
  if (msg.includes('closure')) return AI_RESPONSES.explain.closure;
  if (msg.includes('async') || msg.includes('await')) return AI_RESPONSES.explain.async;
  return AI_RESPONSES.explain.general;
}

function generateErrorHelp(msg, code) {
  const errorHints = [
    "🔍 Can you paste the error message here? I'll help you decode it.",
    "🔍 Let's debug step by step. Add `print()` statements to see what each variable contains.",
    "🔍 Check the line number in the error. What does that line do?",
  ];
  return pickRandom(AI_RESPONSES.hint.error);
}

// ── MESSAGE RENDERING ──
function addUserMessage(text) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.innerHTML = `
    <div class="cm-avatar">👤</div>
    <div class="cm-bubble">${formatMessage(text)}</div>
  `;
  container.appendChild(div);
  scrollToBottom();
}

function addBotMessage(text, scroll = true) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.innerHTML = `
    <div class="cm-avatar">🤖</div>
    <div class="cm-bubble">${formatMessage(text)}</div>
  `;
  container.appendChild(div);
  if (scroll) scrollToBottom();
  // Text-to-speech for explanation mode
  if (chatMode === 'explain' && 'speechSynthesis' in window) {
    const clean = text.replace(/[*#`>]/g, '').slice(0, 200);
    // Only speak if user has enabled it (localStorage flag)
    if (localStorage.getItem('bb_tts') === 'true') {
      const utt = new SpeechSynthesisUtterance(clean);
      utt.rate = 0.95;
      window.speechSynthesis.speak(utt);
    }
  }
}

function formatMessage(text) {
  // Simple markdown-like formatting
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```[\w]*\n?([\s\S]*?)```/g, '<pre style="margin-top:8px">$1</pre>')
    .replace(/\n/g, '<br/>');
}

function showTypingIndicator() {
  isTyping = true;
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="cm-avatar">🤖</div>
    <div class="typing-indicator"><div class="ti-dot"></div><div class="ti-dot"></div><div class="ti-dot"></div></div>
  `;
  container.appendChild(div);
  scrollToBottom();
}

function hideTypingIndicator() {
  isTyping = false;
  document.getElementById('typingIndicator')?.remove();
}

function scrollToBottom() {
  const msgs = document.getElementById('chatMessages');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}

function setChatMode(mode, btn) {
  chatMode = mode;
  document.querySelectorAll('.cp-actions .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const info = document.querySelector('.cia-info span');
  if (info) info.textContent = mode === 'hint'
    ? '💡 Hint mode: Bot guides you, doesn\'t solve for you'
    : '📖 Explain mode: Get full explanations & examples';
}

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
