// ============ APP STATE ============
let currentRole = "poster"; // "poster" or "helper"
let currentTaskId = null;
let lastScreenBeforeDetail = "screen-home";
let chatMessages = [...CHAT_MESSAGES];

// ============ NAVIGATION ============
function goTo(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
  const nav = document.getElementById("bottom-nav");
  const navScreens = ["screen-home", "screen-map", "screen-chat", "screen-earnings", "screen-profile"];
  nav.style.display = navScreens.includes(screenId) ? "flex" : "none";
  window.scrollTo(0, 0);
}

function navTo(screenId) {
  goTo(screenId);
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.screen === screenId);
  });
}

function setRoleAndGo(role) {
  currentRole = role;
  document.getElementById("switch-role-label").textContent = role === "poster" ? "Helper" : "Poster";
  navTo("screen-home");
  renderHome();
}

function toggleRole() {
  currentRole = currentRole === "poster" ? "helper" : "poster";
  document.getElementById("switch-role-label").textContent = currentRole === "poster" ? "Helper" : "Poster";
  renderHome();
  goTo(currentRole === "helper" ? "screen-map" : "screen-home");
}

// ============ INIT ============
window.addEventListener("DOMContentLoaded", () => {
  renderCategoryChips();
  renderHome();
  renderMapTaskList();
  renderNotifications();
  renderProfileTab("posted");
  renderChat();
  renderEarnings();
  goTo("screen-splash");
});

// ============ CATEGORY CHIPS ============
function renderCategoryGrid() {
  const container = document.getElementById("category-grid");
  const shown = CATEGORIES.filter(c => c !== "All");
  container.innerHTML = shown.map(cat => `
    <div class="category-card" onclick="filterByCategory('${cat}')">
      <span class="cat-icon">${CATEGORY_ICONS[cat] || "📌"}</span>
      <span class="cat-label">${cat}</span>
    </div>
  `).join("");
}
function filterByCategory(cat, el) {
  document.querySelectorAll("#category-chips .chip").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
  const filtered = cat === "All" ? TASKS : TASKS.filter(t => t.category === cat);
  renderTaskList("task-list", filtered);
}

// ============ TASK CARDS ============
function statusLabel(status) {
  if (status === "open") return { text: "Open", cls: "status-open" };
  if (status === "in_progress") return { text: "In Progress", cls: "status-progress" };
  return { text: "Completed", cls: "status-completed" };
}

function renderTaskList(containerId, tasks) {
  const container = document.getElementById(containerId);
  container.innerHTML = tasks.map(t => {
    const s = statusLabel(t.status);
    return `
      <div class="task-card" onclick="openTask('${t.id}')">
        <div class="task-card-top">
          <div class="task-card-title">${t.title}</div>
          <div class="task-card-budget">₹${t.budget}</div>
        </div>
        <div class="task-card-meta">
          <span class="status-pill ${s.cls}">${s.text}</span>
          <span>${t.category}</span>
          <span>·</span>
          <span>${t.distance}</span>
          <span>·</span>
          <span>${t.time}</span>
        </div>
      </div>`;
  }).join("");
}

function renderHome() {
  renderTaskList("task-list", TASKS);
}

function renderMapTaskList() {
  renderTaskList("task-list-2", TASKS.slice(0, 5));
}

// ============ POST TASK ============
function submitTask() {
  // Purely visual — in a real app this would create a task via API.
  goTo("screen-confirm");
}

// ============ TASK DETAIL ============
function openTask(taskId) {
  currentTaskId = taskId;
  const activeScreen = document.querySelector(".screen.active");
  if (activeScreen) lastScreenBeforeDetail = activeScreen.id;

  const task = TASKS.find(t => t.id === taskId);
  const poster = USERS[task.posterId];
  const s = statusLabel(task.status);
  const applicants = APPLICANTS[taskId] || [];

  const applicantsHtml = applicants.length ? `
    <h3 style="margin:18px 0 10px;">Applicants (${applicants.length})</h3>
    ${applicants.map(a => {
      const u = USERS[a.userId];
      return `
        <div class="applicant-card">
          <img class="avatar-sm" src="${u.avatar}" alt="">
          <div class="applicant-info">
            <div class="applicant-name">${u.name} · ⭐ ${u.rating}</div>
            <div class="applicant-meta">Quoted ₹${a.quote} — ${a.note}</div>
          </div>
          <div class="applicant-actions">
            <button class="mini-btn" onclick="openChatWith('${u.id}')">Chat</button>
            <button class="mini-btn primary" onclick="hireApplicant()">Hire</button>
          </div>
        </div>`;
    }).join("")}
  ` : `
    <div style="margin-top:20px;">
      <button class="btn btn-primary btn-block" onclick="applyToTask()">Apply for this task</button>
    </div>
  `;

  document.getElementById("task-detail-content").innerHTML = `
    <span class="status-pill ${s.cls}">${s.text}</span>
    <h2 class="detail-title" style="margin-top:8px;">${task.title}</h2>
    <div class="detail-meta-row">
      <span>${task.category}</span><span>·</span><span>${task.distance}</span><span>·</span><span>${task.time}</span>
    </div>
    <div class="detail-budget">₹${task.budget}</div>
    <p class="detail-desc">${task.desc}</p>
    <div class="applicant-card" style="background:transparent;border:none;padding:0;">
      <img class="avatar-sm" src="${poster.avatar}" alt="">
      <div class="applicant-info">
        <div class="applicant-name">Posted by ${poster.name}</div>
        <div class="applicant-meta">⭐ ${poster.rating} · ${poster.occupation}</div>
      </div>
    </div>
    ${applicantsHtml}
  `;
  goTo("screen-task-detail");
}

function goBackFromDetail() {
  goTo(lastScreenBeforeDetail);
}

function applyToTask() {
  alert("Application sent! (demo only — no backend)");
  goBackFromDetail();
}

function hireApplicant() {
  alert("Helper hired! (demo only — no backend)");
  goTo("screen-chat");
}

// ============ CHAT ============
function openChatWith(userId) {
  const u = USERS[userId];
  document.getElementById("chat-avatar").src = u.avatar;
  document.getElementById("chat-name").textContent = u.name;
  goTo("screen-chat");
}

function renderChat() {
  const defaultUser = USERS["u3"];
  document.getElementById("chat-avatar").src = defaultUser.avatar;
  document.getElementById("chat-name").textContent = defaultUser.name;

  const container = document.getElementById("chat-messages");
  container.innerHTML = chatMessages.map(m => `
    <div class="msg ${m.from === "me" ? "msg-me" : "msg-them"}">
      ${m.text}
      <div class="msg-time">${m.time}</div>
    </div>
  `).join("");
  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  chatMessages.push({ from: "me", text, time });
  input.value = "";
  renderChat();
}

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && document.activeElement.id === "chat-input") {
    sendMessage();
  }
});

function quickAction(type) {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  let text = "";
  if (type === "price") text = "Confirming the price we discussed. 👍";
  if (type === "location") text = "Sharing my location for the task. 📍";
  if (type === "complete") text = "Marking this task as complete. ✅";
  chatMessages.push({ from: "me", text, time });
  renderChat();
}

// ============ NOTIFICATIONS ============
function renderNotifications() {
  const container = document.getElementById("notif-list");
  container.innerHTML = NOTIFICATIONS.map(n => `
    <div class="notif-item">
      <div class="notif-icon">${n.icon}</div>
      <div>
        <div class="notif-text">${n.text}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>
  `).join("");
}

// ============ PROFILE ============
function switchProfileTab(btn, tab) {
  document.querySelectorAll(".tab-row .tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderProfileTab(tab);
}

function renderProfileTab(tab) {
  const container = document.getElementById("profile-tab-content");
  if (tab === "posted") {
    const posted = TASKS.filter(t => t.posterId === "u1");
    renderInto(container, posted);
  } else if (tab === "completed") {
    const completed = TASKS.filter(t => t.status === "completed");
    renderInto(container, completed);
  } else {
    container.innerHTML = REVIEWS.map(r => {
      const u = USERS[r.reviewerId];
      return `
        <div class="review-card">
          <div class="review-top"><span>${u.name}</span><span>${"⭐".repeat(r.rating)}</span></div>
          <div class="review-text">${r.text}</div>
        </div>`;
    }).join("");
  }

  function renderInto(container, tasks) {
    if (!tasks.length) {
      container.innerHTML = `<p class="muted center" style="padding:30px 0;">Nothing here yet.</p>`;
      return;
    }
    container.innerHTML = `<div class="task-list">` + tasks.map(t => {
      const s = statusLabel(t.status);
      return `
        <div class="task-card" onclick="openTask('${t.id}')">
          <div class="task-card-top">
            <div class="task-card-title">${t.title}</div>
            <div class="task-card-budget">₹${t.budget}</div>
          </div>
          <div class="task-card-meta">
            <span class="status-pill ${s.cls}">${s.text}</span>
            <span>${t.category}</span>
          </div>
        </div>`;
    }).join("") + `</div>`;
  }
}

// ============ EARNINGS ============
function renderEarnings() {
  const max = Math.max(...WEEKLY_EARNINGS.map(d => d.amount));
  const chart = document.getElementById("bar-chart");
  chart.innerHTML = WEEKLY_EARNINGS.map(d => `
    <div class="bar-col">
      <div class="bar" style="height:${(d.amount / max) * 100}%;"></div>
      <div class="bar-label">${d.day}</div>
    </div>
  `).join("");

  const payoutList = document.getElementById("payout-list");
  payoutList.innerHTML = PAYOUTS.map(p => `
    <div class="payout-item">
      <span>${p.title}<br><span class="muted small">${p.date}</span></span>
      <span class="payout-amount">+₹${p.amount}</span>
    </div>
  `).join("");
}