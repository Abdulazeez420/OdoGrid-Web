import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js';
import {
  getFirestore,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  writeBatch,
  where,
} from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBndQjWg1KPtn8VhQLDbieFOIj2LgzfPn4',
  authDomain: 'odogrid.firebaseapp.com',
  projectId: 'odogrid',
  storageBucket: 'odogrid.firebasestorage.app',
  messagingSenderId: '45065859722',
    appId: '1:45065859722:web:534b9fa89945f75e957373',
  measurementId: 'G-M3Q7MK7KWE',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ALLOWED_EMAIL = 'azeez3254@gmail.com';
const EXPECTED_TESTERS = 12;
const TRACKING_DAYS = 14;
const HIDDEN_HASH = '#closed-testing-dashboard';

const dashboardRoot = document.getElementById('closed-testing-dashboard');
const loginForm = document.getElementById('closed-login-form');
const emailInput = document.getElementById('closed-email');
const passwordInput = document.getElementById('closed-password');
const authError = document.getElementById('closed-auth-error');
const dashboardContent = document.getElementById('closed-dashboard-content');
const authUser = document.getElementById('closed-auth-user');
const signOutBtn = document.getElementById('closed-signout');
const resetDataBtn = document.getElementById('closed-reset-data');
const statsContainer = document.getElementById('closed-stats');
const topActionsList = document.getElementById('closed-top-actions');
const eventsContainer = document.getElementById('closed-events');

let unsubscribeDashboard = null;
let unsubscribeAuth = null;

boot().catch((error) => {
  console.error('closed-testing bootstrap failed', error);
});

async function boot() {
  updateVisibilityFromHash();
  window.addEventListener('hashchange', updateVisibilityFromHash);
}

function updateVisibilityFromHash() {
  const showDashboard = window.location.hash === HIDDEN_HASH;

  if (showDashboard) {
    dashboardRoot?.classList.remove('hidden');
    hideLandingSections();
    attachDashboardHandlers();
  } else {
    dashboardRoot?.classList.add('hidden');
    showLandingSections();
    detachDashboardListener();
  }
}

function hideLandingSections() {
  const sections = document.body.querySelectorAll('nav, section:not(#closed-testing-dashboard), footer');
  sections.forEach((el) => el.classList.add('hidden'));
}

function showLandingSections() {
  const sections = document.body.querySelectorAll('nav, section:not(#closed-testing-dashboard), footer');
  sections.forEach((el) => el.classList.remove('hidden'));
}

function attachDashboardHandlers() {
  if (!loginForm || !signOutBtn || !resetDataBtn) return;

  if (!loginForm.dataset.bound) {
    loginForm.addEventListener('submit', onLoginSubmit);
    loginForm.dataset.bound = '1';
  }

  if (!signOutBtn.dataset.bound) {
    signOutBtn.addEventListener('click', onSignOut);
    signOutBtn.dataset.bound = '1';
  }

  if (!resetDataBtn.dataset.bound) {
    resetDataBtn.addEventListener('click', onResetLogs);
    resetDataBtn.dataset.bound = '1';
  }

  if (!unsubscribeAuth) {
    unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      const isAdmin = user?.email?.toLowerCase() === ALLOWED_EMAIL;
      if (isAdmin) {
        showDashboard(user.email || ALLOWED_EMAIL);
        startDashboardStream();
        return;
      }

      showLogin();
    });
  }
}

function detachDashboardListener() {
  if (unsubscribeDashboard) {
    unsubscribeDashboard();
    unsubscribeDashboard = null;
  }

  if (unsubscribeAuth) {
    unsubscribeAuth();
    unsubscribeAuth = null;
  }
}

async function onLoginSubmit(event) {
  event.preventDefault();

  const email = (emailInput?.value || '').trim();
  const password = passwordInput?.value || '';
  authError.textContent = '';

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const loginEmail = credential.user.email?.toLowerCase();
    if (loginEmail !== ALLOWED_EMAIL) {
      await signOut(auth);
      authError.textContent = 'This email is not allowed for dashboard access.';
      return;
    }
  } catch (error) {
    authError.textContent = error?.message || 'Sign-in failed.';
  }
}

async function onSignOut() {
  await signOut(auth);
  showLogin();
}

async function onResetLogs() {
  const userEmail = auth.currentUser?.email?.toLowerCase();
  if (userEmail !== ALLOWED_EMAIL) {
    authError.textContent = 'Only admin can reset logs.';
    return;
  }

  const confirmed = window.confirm(
    'This will permanently delete all closed-testing activity logs. Continue?',
  );
  if (!confirmed) return;

  const challenge = window.prompt('Type RESET to confirm data wipe.');
  if (challenge !== 'RESET') return;

  authError.textContent = '';
  resetDataBtn.disabled = true;
  const originalLabel = resetDataBtn.textContent;
  resetDataBtn.textContent = 'Resetting...';

  try {
    const deleted = await clearClosedTestingActivity();

    authError.style.color = '#34d399';
    authError.textContent = `Reset complete. Deleted ${deleted} log(s).`;
  } catch (error) {
    authError.style.color = '#f87171';
    authError.textContent = `Reset failed: ${error?.message || String(error)}`;
  } finally {
    resetDataBtn.disabled = false;
    resetDataBtn.textContent = originalLabel;
  }
}

async function clearClosedTestingActivity() {
  const collectionRef = collection(db, 'closed_testing_activity');
  const batchSize = 400;
  let deleted = 0;

  while (true) {
    const snapshot = await getDocs(query(collectionRef, limit(batchSize)));
    if (snapshot.empty) break;

    const batch = writeBatch(db);
    snapshot.docs.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    await batch.commit();

    deleted += snapshot.size;

    if (snapshot.size < batchSize) break;
  }

  return deleted;
}

function showLogin() {
  loginForm?.classList.remove('hidden');
  dashboardContent?.classList.add('hidden');
  if (authUser) authUser.textContent = '';
  if (authError) {
    authError.style.color = '#f87171';
  }
  detachDashboardListener();
}

function showDashboard(email) {
  loginForm?.classList.add('hidden');
  dashboardContent?.classList.remove('hidden');
  if (authUser) authUser.textContent = `Signed in as ${email}`;
}

function startDashboardStream() {
  if (unsubscribeDashboard) return;

  const cutoff = new Date(Date.now() - TRACKING_DAYS * 24 * 60 * 60 * 1000);
  const activitiesRef = collection(db, 'closed_testing_activity');
  const q = query(
    activitiesRef,
    where('source', '==', 'app'),
    where('clientTimestamp', '>=', Timestamp.fromDate(cutoff)),
    orderBy('clientTimestamp', 'desc'),
    limit(1200),
  );

  unsubscribeDashboard = onSnapshot(
    q,
    (snapshot) => {
      const rows = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      renderDashboard(rows);
    },
    (error) => {
      if (eventsContainer) {
        eventsContainer.innerHTML = `<div class="closed-dashboard__event">Failed to load dashboard data: ${escapeHtml(
          String(error),
        )}</div>`;
      }
    },
  );
}

function renderDashboard(rows) {
  const summary = buildSummary(rows);
  renderStats(summary);
  renderTopActions(summary.topActions);
  renderRecentEvents(rows);
}

function buildSummary(rows) {
  const testerIds = new Set();
  const activeDays = new Set();
  const firstSeenByTester = new Map();
  const actionCounts = new Map();

  let appEvents = 0;
  let sessionStarts = 0;
  let sessionEnds = 0;
  let endedSessionCount = 0;
  let totalSessionDurationSeconds = 0;

  rows.forEach((row) => {
    if (row.testerId) testerIds.add(row.testerId);
    if (row.dayKey) activeDays.add(row.dayKey);

    const tsDate = row.clientTimestamp?.toDate ? row.clientTimestamp.toDate() : null;
    if (row.testerId && tsDate) {
      const tsMs = tsDate.getTime();
      const prev = firstSeenByTester.get(row.testerId);
      if (prev == null || tsMs < prev) {
        firstSeenByTester.set(row.testerId, tsMs);
      }
    }

    if (row.source === 'app') appEvents += 1;

    const action = row.action || 'unknown';
    actionCounts.set(action, (actionCounts.get(action) || 0) + 1);

    if (action === 'app_start') {
      sessionStarts += 1;
    }

    if (action === 'app_terminate') {
      sessionEnds += 1;
      const duration = row.metadata?.sessionDurationSeconds;
      if (typeof duration === 'number' && Number.isFinite(duration) && duration >= 0) {
        totalSessionDurationSeconds += duration;
        endedSessionCount += 1;
      }
    }
  });

  const topActions = [...actionCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  let trackingDay = null;
  if (firstSeenByTester.size >= EXPECTED_TESTERS) {
    const sortedFirstSeen = [...firstSeenByTester.values()].sort((a, b) => a - b);
    const cohortStartMs = sortedFirstSeen[EXPECTED_TESTERS - 1];
    const elapsedDays = Math.max(
      0,
      Math.floor((Date.now() - cohortStartMs) / (24 * 60 * 60 * 1000)),
    );
    trackingDay = Math.min(elapsedDays, TRACKING_DAYS);
  }

  return {
    totalEvents: rows.length,
    uniqueTesters: testerIds.size,
    activeDays: activeDays.size,
    trackingDay,
    appEvents,
    sessionStarts,
    sessionEnds,
    averageSessionDurationSeconds:
      endedSessionCount > 0
        ? Math.round(totalSessionDurationSeconds / endedSessionCount)
        : null,
    topActions,
  };
}

function renderStats(summary) {
  if (!statsContainer) return;

  const trackingValue = summary.trackingDay == null
    ? `Waiting (${summary.uniqueTesters}/${EXPECTED_TESTERS})`
    : `${summary.trackingDay}/${TRACKING_DAYS}`;

  const cards = [
    ['App events (14 days)', String(summary.totalEvents)],
    ['Unique testers', `${summary.uniqueTesters}/${EXPECTED_TESTERS}`],
    ['Tracking day', trackingValue],
    ['Session starts', String(summary.sessionStarts)],
    ['Session ends', String(summary.sessionEnds)],
    [
      'Avg session duration',
      summary.averageSessionDurationSeconds == null
        ? '-'
        : formatDuration(summary.averageSessionDurationSeconds),
    ],
  ];

  statsContainer.innerHTML = cards
    .map(
      ([label, value]) =>
        `<article class="closed-dashboard__stat"><p>${escapeHtml(label)}</p><strong>${escapeHtml(
          value,
        )}</strong></article>`,
    )
    .join('');
}

function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

function renderTopActions(topActions) {
  if (!topActionsList) return;

  if (topActions.length === 0) {
    topActionsList.innerHTML = '<li>No actions tracked yet.</li>';
    return;
  }

  topActionsList.innerHTML = topActions
    .map(
      ([action, count]) =>
        `<li><span>${escapeHtml(action)}</span><strong>${escapeHtml(String(count))}</strong></li>`,
    )
    .join('');
}

function renderRecentEvents(rows) {
  if (!eventsContainer) return;

  if (rows.length === 0) {
    eventsContainer.innerHTML = '<div class="closed-dashboard__event">No recent events.</div>';
    return;
  }

  const maxRows = rows.slice(0, 120);
  eventsContainer.innerHTML = maxRows
    .map((row) => {
      const timestamp = row.clientTimestamp?.toDate
        ? row.clientTimestamp.toDate()
        : null;
      const when = timestamp ? formatEventDateTime(timestamp) : 'unknown time';
      const tester = row.testerId || '-';
      const source = row.source || '-';
      const action = row.action || '-';
      const metadata = row.metadata || {};
      const sessionId = metadata.sessionId || '-';
      const duration =
        typeof metadata.sessionDurationSeconds === 'number'
          ? `${metadata.sessionDurationSeconds}s`
          : null;
      const fcmToken = typeof metadata.fcmToken === 'string'
        ? metadata.fcmToken
        : null;
      const tokenPreview = fcmToken
        ? `${fcmToken.slice(0, 16)}...${fcmToken.slice(-8)}`
        : null;

      const extras = [
        `Session: ${escapeHtml(String(sessionId))}`,
        duration ? `Duration: ${escapeHtml(duration)}` : null,
        tokenPreview ? `FCM: ${escapeHtml(tokenPreview)}` : null,
      ]
        .filter(Boolean)
        .join(' | ');

      return `<article class="closed-dashboard__event">
        <div><strong>${escapeHtml(action)}</strong> [${escapeHtml(source)}]</div>
        <small>Tester: ${escapeHtml(tester)} | ${escapeHtml(when)}</small>
        <small>${extras}</small>
      </article>`;
    })
    .join('');
}

function formatEventDateTime(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
