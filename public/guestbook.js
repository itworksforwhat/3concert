// --- Firebase 초기화 START ---
const firebaseConfig = {
  apiKey: "AIzaSyCdLSeqktGTZ1641vb1aWQUNrUpdNyyMT4",
  authDomain: "abconcert-55576.firebaseapp.com",
  databaseURL: "https://abconcert-55576-default-rtdb.firebaseio.com",
  projectId: "abconcert-55576",
  storageBucket: "abconcert-55576.firebasestorage.app",
  messagingSenderId: "490791836408",
  appId: "1:490791836408:web:495c47892ca583e420f90d",
  measurementId: "G-JFBB6MFC7W"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
// --- Firebase 초기화 END ---

// XSS 방지
function escapeHtml(str) {
  return str.replace(/[&<>\"]/g, function(tag) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    })[tag] || tag;
  });
}

// 롤링페이퍼 메시지 등록
function submitGuestbook(event) {
  event.preventDefault();
  const nameInput = document.getElementById('guestbook-name');
  const msgInput = document.getElementById('guestbook-message');
  const name = escapeHtml(nameInput.value.trim());
  const message = escapeHtml(msgInput.value.trim());
  if (!name || !message) {
    alert('닉네임과 메시지를 모두 입력해 주세요.');
    return;
  }

  db.ref('guestbook').push({
    name,
    message,
    date: new Date().toISOString()
  }).then(() => {
    alert('메시지가 롤링페이퍼에 등록되었습니다!');
    nameInput.value = '';
    msgInput.value = '';
    if (typeof renderGuestbookEntries === 'function') renderGuestbookEntries();
  }).catch((err) => {
    alert('오류: ' + err.message);
  });
}

// 롤링페이퍼 목록 렌더링
function renderGuestbookEntries() {
  const entriesDiv = document.getElementById('guestbook-entries');
  if (!entriesDiv) return;
  db.ref('guestbook').orderByChild('date').once('value', snapshot => {
    const entries = [];
    snapshot.forEach(item => {
      entries.unshift(item.val());
    });

    if (entries.length === 0) {
      entriesDiv.innerHTML = "<p>아직 메시지가 없습니다.</p>";
      return;
    }

    entriesDiv.innerHTML = entries.map(entry => `
      <div class="guestbook-entry">
        <div class="guestbook-entry-name">${entry.name}</div>
        <div class="guestbook-entry-message">${entry.message}</div>
        <div class="guestbook-entry-date">${new Date(entry.date).toLocaleString('ko-KR')}</div>
      </div>
    `).join('');
  });
}
