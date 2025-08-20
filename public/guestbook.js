// 방명록 key
const STORAGE_KEY = "concertGuestbook";

// XSS 방지용
function escapeHtml(str) {
    return str.replace(/[&<>"]/g, function(tag) {
        return ({
            '&':'&amp;',
            '<':'&lt;',
            '>':'&gt;',
            '"':'&quot;'
        })[tag] || tag;
    });
}

// 방명록 보기 페이지: 목록 렌더링 (삭제버튼 없음)
function renderGuestbookEntries() {
    const entriesDiv = document.getElementById('guestbook-entries');
    if (!entriesDiv) return;
    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (entries.length === 0) {
        entriesDiv.innerHTML = "<div style='color:#8e8e8e;'>아직 등록된 메시지가 없습니다.</div>";
        return;
    }
    entriesDiv.innerHTML = entries.map(entry =>
        `<div class="guestbook-entry">
            <div class="guestbook-entry-name">${escapeHtml(entry.name)}</div>
            <div class="guestbook-entry-message">${escapeHtml(entry.message)}</div>
            <div class="guestbook-entry-date">${entry.createdAt}</div>
        </div>`
    ).join('');
}

// 방명록 작성 폼 처리
const guestbookForm = document.getElementById('guestbook-form');
if (guestbookForm) {
    guestbookForm.onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById('guestbook-name').value.trim();
        const message = document.getElementById('guestbook-message').value.trim();
        if (!name || !message) {
            alert("닉네임과 메시지는 모두 필수입니다!");
            return false;
        }
        const date = new Date();
        const createdAt = `${date.getFullYear()}-${('0'+(date.getMonth()+1)).slice(-2)}-${('0'+date.getDate()).slice(-2)}`
                        + ` ${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`;
        const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        entries.push({ name, message, createdAt });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        alert("성공적으로 등록되었습니다!");
        window.location.href = "guestbook_view.html";
    };
}

// 관리자 콘솔용: 인덱스로 삭제
// 사용법: deleteEntry(삭제할 인덱스)
window.deleteEntry = function(index) {
    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!entries.length) {
        alert("삭제할 메시지가 없습니다.");
        return false;
    }
    if (typeof index !== "number" || index < 0 || index >= entries.length) {
        alert("올바른 인덱스를 입력하세요. (0 ~ "+(entries.length-1)+")");
        return false;
    }
    if (!confirm(`정말로 메시지 #${index+1}을(를) 삭제할까요?\n(${entries[index].name}: "${entries[index].message.slice(0,22)}...")`)) {
        return false;
    }
    entries.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    alert("메시지가 삭제되었습니다.\n새로고침 시 반영됩니다.");
    return true;
};

// 페이지마다 리스트 자동 렌더
window.addEventListener('DOMContentLoaded', function() {
    renderGuestbookEntries();
});
