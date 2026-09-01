import { PIN, initialStudents, sampleMarks, paperTypes } from './data.js';

const STORAGE_KEY = 'combined-maths-state';
const HASH_STATE_KEY = 'state';

const state = {
  students: [...initialStudents].sort((a, b) => a.localeCompare(b)),
  marks: JSON.parse(JSON.stringify(sampleMarks)),
  selectedStudent: initialStudents[0],
  currentView: 'paper',
  currentPaperNumber: 1,
  adminPanel: 'edit',
  pin: PIN,
  chartMode: 'default',
  adminAuthenticated: false
};

function mergeMarksWithDefaults(loadedMarks) {
  const merged = Array.isArray(loadedMarks) ? [...loadedMarks] : [];
  const existingKeys = new Set(merged.map((mark) => `${mark.paperNumber}:${mark.studentName}`));

  sampleMarks.forEach((mark) => {
    const key = `${mark.paperNumber}:${mark.studentName}`;
    if (!existingKeys.has(key)) {
      merged.push({ ...mark });
      existingKeys.add(key);
    }
  });

  return merged;
}

function getStateSnapshot() {
  return {
    students: state.students,
    marks: state.marks,
    pin: state.pin,
    selectedStudent: state.selectedStudent,
    currentPaperNumber: state.currentPaperNumber,
    currentView: state.currentView,
    adminPanel: state.adminPanel,
    chartMode: state.chartMode,
    adminAuthenticated: state.adminAuthenticated
  };
}

function loadState() {
  try {
    let parsed = null;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) parsed = JSON.parse(saved);
    } catch (error) {
      console.warn('Unable to read local storage state', error);
    }

    if (!parsed) {
      try {
        const sessionSaved = sessionStorage.getItem(STORAGE_KEY);
        if (sessionSaved) parsed = JSON.parse(sessionSaved);
      } catch (error) {
        console.warn('Unable to read session storage state', error);
      }
    }

    if (!parsed) {
      try {
        const hash = window.location.hash;
        if (hash.startsWith(`#${HASH_STATE_KEY}=`)) {
          parsed = JSON.parse(decodeURIComponent(hash.slice(HASH_STATE_KEY.length + 2)));
        }
      } catch (error) {
        console.warn('Unable to read URL state', error);
      }
    }

    if (!parsed) return;

    state.students = (Array.isArray(parsed.students) && parsed.students.length > 0) ? parsed.students : state.students;
    const incomingMarks = Array.isArray(parsed.marks) ? parsed.marks : state.marks;
    state.marks = mergeMarksWithDefaults(incomingMarks.length > 0 ? incomingMarks : state.marks);
    state.pin = parsed.pin || state.pin;
    state.selectedStudent = parsed.selectedStudent || state.selectedStudent;
    state.currentPaperNumber = Number.isFinite(parsed.currentPaperNumber) ? parsed.currentPaperNumber : state.currentPaperNumber;
    state.currentView = parsed.currentView || state.currentView;
    state.adminPanel = parsed.adminPanel || state.adminPanel;
    state.chartMode = parsed.chartMode || state.chartMode;
    state.adminAuthenticated = Boolean(parsed.adminAuthenticated);
    saveState();
  } catch (error) {
    console.warn('Unable to load stored state', error);
  }
}

function saveState() {
  const snapshot = getStateSnapshot();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (error) {
    console.warn('Unable to save state to local storage', error);
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (error) {
    console.warn('Unable to save state to session storage', error);
  }

  try {
    const hashValue = encodeURIComponent(JSON.stringify(snapshot));
    const nextHash = `#${HASH_STATE_KEY}=${hashValue}`;
    if (window.location.hash !== nextHash) {
      const url = `${window.location.pathname}${window.location.search}${nextHash}`;
      window.history.replaceState(null, '', url);
    }
  } catch (error) {
    console.warn('Unable to save state to URL hash', error);
  }
}

function resetAppData() {
  state.students = [...initialStudents].sort((a, b) => a.localeCompare(b));
  state.marks = JSON.parse(JSON.stringify(sampleMarks));
  state.selectedStudent = initialStudents[0];
  state.currentPaperNumber = 1;
  state.currentView = 'paper';
  state.adminPanel = 'edit';
  state.chartMode = 'default';
  state.adminAuthenticated = false;
  saveState();
}

function getStudentNameSuggestions() {
  return [...initialStudents].sort((a, b) => a.localeCompare(b));
}

function getPaperNumbers() {
  const numbers = Array.from(new Set(state.marks.map((mark) => mark.paperNumber))).filter((value) => Number.isFinite(value));
  return numbers.sort((a, b) => a - b);
}

function getMarksForPaper(paperNumber) {
  return state.marks.filter((mark) => mark.paperNumber === paperNumber);
}

function getStudentMarks(studentName) {
  return state.marks.filter((mark) => mark.studentName === studentName);
}

function getStudentMatches(studentName, paperNumber) {
  return getMarksForPaper(paperNumber).filter((mark) => mark.studentName === studentName);
}

function calculateRankings(paperNumber) {
  const records = getMarksForPaper(paperNumber);
  const byStudent = new Map();
  records.forEach((record) => {
    if (!byStudent.has(record.studentName)) {
      byStudent.set(record.studentName, []);
    }
    byStudent.get(record.studentName).push(record);
  });

  const totals = [];
  byStudent.forEach((items, studentName) => {
    const total = items.reduce((sum, item) => sum + item.score, 0);
    totals.push({ studentName, total });
  });

  totals.sort((a, b) => b.total - a.total || a.studentName.localeCompare(b.studentName));

  let previousScore = null;
  let currentRank = 1;
  const ranked = totals.map((entry, index) => {
    if (previousScore !== null && entry.total < previousScore) {
      currentRank = index + 1;
    }
    previousScore = entry.total;
    return { ...entry, rank: currentRank };
  });
  return ranked;
}

function getPaperAverage(paperNumber) {
  const records = getMarksForPaper(paperNumber);
  const total = records.reduce((sum, record) => sum + record.score, 0);
  return records.length ? (total / records.length).toFixed(1) : '0.0';
}

function getStudentProgress(studentName) {
  const records = getStudentMarks(studentName);
  const grouped = records.reduce((acc, record) => {
    if (!acc[record.paperNumber]) acc[record.paperNumber] = [];
    acc[record.paperNumber].push(record);
    return acc;
  }, {});

  return Object.entries(grouped).map(([paperNumber, items]) => ({
    paperNumber: Number(paperNumber),
    papers: items.sort((a, b) => a.paperNumber - b.paperNumber),
    totalAverage: items.reduce((sum, item) => sum + item.score, 0) / items.length
  }));
}

function getStudentAchievements(studentName) {
  const rankings = getPaperNumbers().map((paperNumber) => {
    const ranking = calculateRankings(paperNumber).find((entry) => entry.studentName === studentName);
    return ranking ? ranking.rank : null;
  }).filter((rank) => Number.isInteger(rank));

  const rankCounts = [1, 2, 3, 4, 5].reduce((acc, rank) => {
    acc[rank] = rankings.filter((item) => item === rank).length;
    return acc;
  }, {});

  const streaks = [];
  [1, 2, 3, 4, 5].forEach((rank) => {
    let streak = 0;
    let current = 0;
    rankings.forEach((item) => {
      if (item === rank) {
        current += 1;
        streak = Math.max(streak, current);
      } else {
        current = 0;
      }
    });
    if (streak > 0) streaks.push({ rank, streak });
  });

  const averages = getPaperNumbers().map((paperNumber) => {
    const studentScores = getStudentMatches(studentName, paperNumber).reduce((sum, item) => sum + item.score, 0);
    const paperAverage = getPaperAverage(paperNumber);
    return { paperNumber, studentScores, paperAverage: Number(paperAverage) };
  });

  const aboveAverage = averages.filter((entry) => entry.studentScores > entry.paperAverage).length;
  const belowAverage = averages.filter((entry) => entry.studentScores < entry.paperAverage).length;

  const byType = ['Pure', 'Applied'].map((type) => ({
    type,
    average: getStudentMarks(studentName)
      .filter((item) => item.paperType === type)
      .reduce((sum, item) => sum + item.score, 0) / Math.max(1, getStudentMarks(studentName).filter((item) => item.paperType === type).length)
  }));

  const weakPoint = byType.reduce((weakest, current) => (current.average < weakest.average ? current : weakest), byType[0]);
  const weakPointText = weakPoint?.average < byType[1]?.average ? `${weakPoint.type} maths is your current weak point.` : `${weakPoint.type} maths is your current weak point.`;

  const achievements = [];
  if (rankCounts[1] > 0) achievements.push(`You have been rank 1 for ${rankCounts[1]} paper${rankCounts[1] > 1 ? 's' : ''}.`);
  if (rankCounts[2] > 0) achievements.push(`You have been rank 2 for ${rankCounts[2]} paper${rankCounts[2] > 1 ? 's' : ''}.`);
  if (rankCounts[3] > 0) achievements.push(`You have been rank 3 for ${rankCounts[3]} paper${rankCounts[3] > 1 ? 's' : ''}.`);
  if (rankCounts[4] > 0) achievements.push(`You have been rank 4 for ${rankCounts[4]} paper${rankCounts[4] > 1 ? 's' : ''}.`);
  if (rankCounts[5] > 0) achievements.push(`You have been rank 5 for ${rankCounts[5]} paper${rankCounts[5] > 1 ? 's' : ''}.`);
  streaks.forEach((item) => {
    if (item.streak > 1) achievements.push(`You have been rank ${item.rank} for ${item.streak} papers straight.`);
  });

  return { rankCounts, achievements, aboveAverage, belowAverage, weakPointText };
}

function getChartData(studentName, mode) {
  const studentMarks = getStudentMarks(studentName).sort((a, b) => a.paperNumber - b.paperNumber);
  const papers = [...new Set(studentMarks.map((item) => item.paperNumber))].sort((a, b) => a - b);

  if (mode === 'pure') {
    return papers.map((paperNumber) => {
      const item = studentMarks.find((entry) => entry.paperNumber === paperNumber && entry.paperType === 'Pure');
      return { label: `Paper ${paperNumber}`, value: item ? item.score : null };
    }).filter((item) => item.value !== null);
  }

  if (mode === 'applied') {
    return papers.map((paperNumber) => {
      const item = studentMarks.find((entry) => entry.paperNumber === paperNumber && entry.paperType === 'Applied');
      return { label: `Paper ${paperNumber}`, value: item ? item.score : null };
    }).filter((item) => item.value !== null);
  }

  if (mode === 'total') {
    const pairs = [];
    for (let i = 0; i < papers.length; i += 2) {
      const first = papers[i];
      const second = papers[i + 1];
      const firstValue = studentMarks.find((entry) => entry.paperNumber === first)?.score || 0;
      const secondValue = second ? studentMarks.find((entry) => entry.paperNumber === second)?.score || 0 : 0;
      pairs.push({ label: `Pair ${Math.floor(i / 2) + 1}`, value: second ? (firstValue + secondValue) / 2 : firstValue });
    }
    return pairs;
  }

  return studentMarks.map((entry) => ({ label: `P${entry.paperNumber}`, value: entry.score }));
}

function showPinModal(onSuccess, onCancel) {
  const existing = document.getElementById('pinModal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'pinModal';
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-card">
      <h3>Admin access</h3>
      <p>Enter the admin PIN to continue.</p>
      <input id="pinInput" type="password" placeholder="Enter PIN" />
      <div class="modal-actions">
        <button class="secondary-btn" id="cancelPinBtn">Cancel</button>
        <button class="primary-btn" id="confirmPinBtn">Continue</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const input = overlay.querySelector('#pinInput');
  input.focus();

  overlay.querySelector('#confirmPinBtn').addEventListener('click', () => {
    if (input.value === state.pin) {
      overlay.remove();
      onSuccess();
    } else {
      alert('Incorrect PIN');
      input.value = '';
      input.focus();
    }
  });

  overlay.querySelector('#cancelPinBtn').addEventListener('click', () => {
    overlay.remove();
    if (onCancel) onCancel();
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      overlay.remove();
      if (onCancel) onCancel();
    }
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      overlay.querySelector('#confirmPinBtn').click();
    }
  });
}

function applyTheme(theme) {
  document.body.classList.toggle('light-mode', theme === 'light');
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.textContent = theme === 'light' ? '☀️ Light mode' : '🌙 Dark mode';
  }
}

function renderLoginPage() {
  const select = document.getElementById('studentSelect');
  if (!select) return;
  select.innerHTML = '';

  const placeholderOption = document.createElement('option');
  placeholderOption.value = '';
  placeholderOption.textContent = 'Choose the name';
  placeholderOption.selected = true;
  placeholderOption.disabled = true;
  select.appendChild(placeholderOption);

  state.students.forEach((student) => {
    const option = document.createElement('option');
    option.value = student;
    option.textContent = student;
    select.appendChild(option);
  });
  const savedTheme = localStorage.getItem('combined-maths-theme') || 'dark';
  applyTheme(savedTheme);

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
      applyTheme(nextTheme);
      localStorage.setItem('combined-maths-theme', nextTheme);
    });
  }

  document.getElementById('viewStudentBtn').addEventListener('click', () => {
    const student = select.value;
    if (!student) {
      alert('Please choose your name before opening the report.');
      return;
    }
    state.selectedStudent = student;
    saveState();
    window.location.href = './student.html';
  });
  document.getElementById('adminBtn').addEventListener('click', () => {
    showPinModal(() => {
      window.location.href = './admin.html';
    });
  });
}

function renderStudentPage() {
  const studentName = state.selectedStudent || state.students[0];
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.onclick = () => {
      window.location.href = './index.html';
    };
  }

  document.getElementById('greeting').textContent = `HI ${studentName}, Here's your personal evaluation report. GOOD LUCK!`;
  document.getElementById('studentBadge').textContent = studentName;

  const paperSelect = document.getElementById('paperSelect');
  if (paperSelect) {
    paperSelect.innerHTML = '';
    const paperNumbers = getPaperNumbers();
    if (!paperNumbers.includes(state.currentPaperNumber)) {
      state.currentPaperNumber = paperNumbers[0] || 1;
    }
    paperNumbers.forEach((paperNumber) => {
      const option = document.createElement('option');
      option.value = paperNumber;
      option.textContent = `Paper ${paperNumber}`;
      if (paperNumber === state.currentPaperNumber) option.selected = true;
      paperSelect.appendChild(option);
    });
    paperSelect.onchange = (event) => {
      state.currentPaperNumber = Number(event.target.value);
      saveState();
      renderStudentPage();
    };
  }

  renderPaperSection(studentName);
  renderProgressSection(studentName);
  renderDashboardSection(studentName);

  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.onclick = () => {
      document.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      state.currentView = button.dataset.view;
      document.querySelectorAll('.content-pane').forEach((pane) => pane.classList.remove('active'));
      document.getElementById(`${state.currentView}Section`).classList.add('active');
    };
  });
}

function renderPaperSection(studentName) {
  const container = document.getElementById('paperContent');
  const rankings = calculateRankings(state.currentPaperNumber);
  const average = getPaperAverage(state.currentPaperNumber);
  container.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          ${rankings.map((entry) => `
            <tr class="${entry.studentName === studentName ? 'highlight' : ''}">
              <td>${entry.rank}</td>
              <td>${entry.studentName}</td>
              <td>${entry.total}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="metric-card" style="margin-top: 12px;">
      <h3>Paper average</h3>
      <p>${average}</p>
    </div>
  `;
}

function renderProgressSection(studentName) {
  const container = document.getElementById('progressContent');
  const filterRow = document.getElementById('chartFilters');
  const modes = [
    { mode: 'default', label: 'Default', className: 'blue', color: '#3a6fd8' },
    { mode: 'pure', label: 'Pure', className: 'red', color: '#d9484a' },
    { mode: 'applied', label: 'Applied', className: 'yellow', color: '#e3b22c' },
    { mode: 'total', label: 'Total', className: 'green', color: '#2e9d5b' }
  ];
  filterRow.innerHTML = modes.map((item) => `
    <button class="filter-btn ${item.className} ${state.chartMode === item.mode ? 'active' : ''}" data-mode="${item.mode}">
      ${item.label}
    </button>
  `).join('');

  filterRow.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      state.chartMode = button.dataset.mode;
      renderProgressSection(studentName);
    });
  });

  const data = getChartData(studentName, state.chartMode);
  const modeColor = modes.find((m) => m.mode === state.chartMode)?.color || '#3a6fd8';
  container.innerHTML = `
    <div class="chart-card">
      <canvas id="progressChart"></canvas>
    </div>
  `;
  renderChart(data, modeColor);
}

function renderChart(data, dotColor = '#3a6fd8') {
  const canvas = document.getElementById('progressChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const width = canvas.clientWidth || 600;
  const height = canvas.clientHeight || 260;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const padding = 36;
  const maxValue = Math.max(...data.map((item) => item.value), 100);
  const minValue = Math.min(...data.map((item) => item.value), 0);
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;
  const stepX = data.length > 1 ? chartWidth / (data.length - 1) : chartWidth;

  ctx.strokeStyle = '#d2a93c';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.stroke();

  // Draw y-axis labels
  ctx.fillStyle = '#fdfdfd';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const value = minValue + (maxValue - minValue) * (i / ySteps);
    const y = height - padding - (i / ySteps) * chartHeight;
    // Draw tick mark
    ctx.beginPath();
    ctx.moveTo(padding - 5, y);
    ctx.lineTo(padding, y);
    ctx.strokeStyle = '#d2a93c';
    ctx.lineWidth = 1;
    ctx.stroke();
    // Draw label
    ctx.fillText(Math.round(value).toString(), padding - 10, y);
  }

  ctx.strokeStyle = '#fdfdfd';
  ctx.lineWidth = 2;
  ctx.beginPath();
  data.forEach((point, index) => {
    const x = padding + index * stepX;
    const y = height - padding - ((point.value - minValue) / (maxValue - minValue || 1)) * chartHeight;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  data.forEach((point, index) => {
    const x = padding + index * stepX;
    const y = height - padding - ((point.value - minValue) / (maxValue - minValue || 1)) * chartHeight;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = dotColor;
    ctx.fill();
    ctx.fillStyle = '#fdfdfd';
    ctx.font = '12px sans-serif';
    ctx.fillText(point.label, x - 18, height - 10);
    ctx.fillText(String(point.value), x - 10, y - 10);
  });
}

function renderDashboardSection(studentName) {
  const container = document.getElementById('dashboardContent');
  const achievements = getStudentAchievements(studentName);
  container.innerHTML = `
    <div class="metric-grid">
      <div class="metric-card">
        <h3>Rank 1 papers</h3>
        <p>${achievements.rankCounts[1]}</p>
      </div>
      <div class="metric-card">
        <h3>Rank 2 papers</h3>
        <p>${achievements.rankCounts[2]}</p>
      </div>
      <div class="metric-card">
        <h3>Rank 3 papers</h3>
        <p>${achievements.rankCounts[3]}</p>
      </div>
      <div class="metric-card">
        <h3>Rank 4 papers</h3>
        <p>${achievements.rankCounts[4]}</p>
      </div>
      <div class="metric-card">
        <h3>Rank 5 papers</h3>
        <p>${achievements.rankCounts[5]}</p>
      </div>
      <div class="metric-card">
        <h3>Above average</h3>
        <p>${achievements.aboveAverage}</p>
      </div>
      <div class="metric-card">
        <h3>Below average</h3>
        <p>${achievements.belowAverage}</p>
      </div>
      <div class="metric-card">
        <h3>Weak point</h3>
        <p>${achievements.weakPointText}</p>
      </div>
    </div>
    <div class="achievement-box">
      <h3>Achievements</h3>
      <ul>
        ${achievements.achievements.length ? achievements.achievements.map((item) => `<li>${item}</li>`).join('') : '<li>No special achievements yet.</li>'}
      </ul>
    </div>
  `;
}

function renderAdminPage() {
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.onclick = () => {
      window.location.href = './index.html';
    };
  }

  document.querySelectorAll('.chip-btn').forEach((button) => {
    button.onclick = () => {
      state.adminPanel = button.dataset.panel;
      document.querySelectorAll('.chip-btn').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      document.querySelectorAll('.admin-panel').forEach((panel) => panel.classList.remove('active'));
      document.getElementById(`${state.adminPanel}Panel`).classList.add('active');
    };
  });

  renderEditPanel();
  renderInputPanel();
  renderClearPanel();
  renderPinPanel();
}

function renderEditPanel() {
  const container = document.getElementById('editPanel');
  const rows = state.marks.map((entry, index) => {
    const currentRank = calculateRankings(entry.paperNumber).find((item) => item.studentName === entry.studentName)?.rank || '-';
    return `
      <tr data-index="${index}">
        <td><input class="edit-paper" type="number" value="${entry.paperNumber}" style="width: 60px;" /></td>
        <td>${entry.paperType}</td>
        <td><input class="edit-rank" type="number" value="${currentRank}" style="width: 50px;" /></td>
        <td><input class="edit-student" type="text" value="${entry.studentName}" style="width: 150px;" /></td>
        <td><input class="edit-score" type="number" value="${entry.score}" style="width: 60px;" /></td>
      </tr>
    `;
  }).join('');
  
  container.innerHTML = `
    <h3>Edit marks</h3>
    <p style="font-size: 0.9rem; color: var(--muted);">Edit paper number, student name, rank, and score directly in the table below.</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Paper</th><th>Type</th><th>Rank</th><th>Student</th><th>Score</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <button class="primary-btn" id="saveEditBtn">Save changes</button>
  `;
  
  document.getElementById('saveEditBtn').addEventListener('click', () => {
    container.querySelectorAll('tr[data-index]').forEach((row) => {
      const index = Number(row.dataset.index);
      const newPaperNumber = Number(row.querySelector('.edit-paper').value);
      const newStudentName = row.querySelector('.edit-student').value.trim();
      const newScore = Number(row.querySelector('.edit-score').value);
      const newRank = Number(row.querySelector('.edit-rank').value);

      if (index >= 0 && index < state.marks.length) {
        const record = state.marks[index];
        record.paperNumber = newPaperNumber;
        record.studentName = newStudentName;
        record.score = newScore;
      }
    });
    
    saveState();
    renderAdminPage();
    alert('Marks updated successfully!');
  });
}

function renderInputPanel() {
  const container = document.getElementById('inputPanel');
  container.innerHTML = `
    <h3>Input marks</h3>
    <div class="form-grid">
      <label>Paper number<input id="paperNumberInput" type="number" value="${state.currentPaperNumber || 1}" /></label>
      <label>Paper type<select id="paperTypeInput">${paperTypes.map((type) => `<option value="${type}">${type}</option>`).join('')}</select></label>
    </div>
    <button class="primary-btn" id="buildInputBtn">Create entry form</button>
    <div id="inputForm"></div>
  `;
  document.getElementById('buildInputBtn').addEventListener('click', () => {
    const paperNumber = Number(document.getElementById('paperNumberInput').value);
    const paperType = document.getElementById('paperTypeInput').value;
    const formContainer = document.getElementById('inputForm');
    formContainer.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Student name</th><th>Score</th></tr></thead>
          <tbody>
            <tr>
              <td>
                <select id="studentNameSelect">
                  <option value="">Select existing student</option>
                  ${getStudentNameSuggestions().map((student) => `<option value="${student}">${student}</option>`).join('')}
                </select>
                <input id="studentNameInput" type="text" placeholder="Or type a new student name" />
              </td>
              <td><input id="scoreInput" type="number" placeholder="Enter score" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="primary-btn" id="saveInputBtn">Save paper</button>
    `;
    document.getElementById('saveInputBtn').addEventListener('click', () => {
      const selectedStudent = document.getElementById('studentNameSelect').value;
      const typedStudent = document.getElementById('studentNameInput').value.trim();
      const studentName = selectedStudent || typedStudent;
      const score = Number(document.getElementById('scoreInput').value);
      if (!studentName) {
        alert('Please enter or select a student name');
        return;
      }
      if (!state.students.includes(studentName)) {
        state.students.push(studentName);
        state.students.sort((a, b) => a.localeCompare(b));
      }
      state.currentPaperNumber = paperNumber;
      state.marks.push({ paperNumber, paperType, studentName, score });
      saveState();
      document.getElementById('studentNameSelect').value = '';
      document.getElementById('studentNameInput').value = '';
      document.getElementById('scoreInput').value = '';
      alert('Entry added');
    });
  });
}

function renderClearPanel() {
  const container = document.getElementById('clearPanel');
  container.innerHTML = `
    <h3>Clear data</h3>
    <button class="secondary-btn" id="clearAllBtn">Reset to default data</button>
    <button class="secondary-btn" id="clearWeekBtn">Clear current paper data</button>
  `;
  document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (confirm('Reset to default student data and marks?')) {
      resetAppData();
      renderAdminPage();
      alert('Data reset to defaults');
    }
  });
  document.getElementById('clearWeekBtn').addEventListener('click', () => {
    if (confirm('Clear current paper data?')) {
      state.marks = state.marks.filter((entry) => entry.paperNumber !== state.currentPaperNumber);
      saveState();
      renderAdminPage();
      alert('Paper data cleared');
    }
  });
}

function renderPinPanel() {
  const container = document.getElementById('pinPanel');
  container.innerHTML = `
    <h3>Change PIN</h3>
    <label>New PIN<input id="pinInput" type="text" value="${state.pin}" /></label>
    <button class="primary-btn" id="savePinBtn">Save new PIN</button>
  `;
  document.getElementById('savePinBtn').addEventListener('click', () => {
    state.pin = document.getElementById('pinInput').value;
    saveState();
    renderAdminPage();
    alert('PIN updated');
  });
}

function init() {
  loadState();
  const storedTheme = localStorage.getItem('combined-maths-theme') || 'dark';
  applyTheme(storedTheme);
  const page = document.body.dataset.page;
  if (page === 'login') renderLoginPage();
  if (page === 'student') renderStudentPage();
  if (page === 'admin') {
    if (!state.adminAuthenticated) {
      showPinModal(() => {
        state.adminAuthenticated = true;
        renderAdminPage();
      }, () => {
        window.location.href = './index.html';
      });
    } else {
      renderAdminPage();
    }
  }
}

window.addEventListener('resize', () => {
  if (document.body.dataset.page === 'student') {
    const studentName = state.selectedStudent || state.students[0];
    renderProgressSection(studentName);
  }
});

init();
