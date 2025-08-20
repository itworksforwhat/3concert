// ---- 타이머 관련 함수 정의 ----
const concertTargetDate = new Date("2025-10-11T18:00:00+09:00");
const guestbookOpenDate = new Date(concertTargetDate.getTime() - 10 * 24 * 60 * 60 * 1000);


function updateConcertCountdown() {
  const now = new Date();
  const diff = concertTargetDate - now;
  if(diff > 0) {
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff/(1000*60*60)) % 24);
    const minutes = Math.floor((diff/(1000*60)) % 60);
    const seconds = Math.floor((diff/1000) % 60);
    document.getElementById('days').textContent = 'D - ' + days;
    document.getElementById('timer').textContent =
      `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}s`;
  } else {
    document.getElementById('days').textContent = '-00D';
    document.getElementById('timer').textContent = '00:00:00s';
  }
}
function updatePreReserveCountdown() {
  const preDate = new Date("2025-09-01T18:00:00+09:00");
  const now = new Date();
  const diff = preDate - now;
  const el = document.getElementById('pre-reserve-timer');
  if (el) {
    if (diff > 0) {
      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff/(1000*60*60)) % 24);
      const minutes = Math.floor((diff/(1000*60)) % 60);
      const seconds = Math.floor((diff/1000) % 60);
      el.textContent = `${days}D ${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    } else {
      el.textContent = '00D 00:00:00';
    }
  }
}
function updateNormalReserveCountdown() {
  const normalDate = new Date("2025-09-02T18:00:00+09:00");
  const now = new Date();
  const diff = normalDate - now;
  const el = document.getElementById('normal-reserve-timer');
  if (el) {
    if (diff > 0) {
      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff/(1000*60*60)) % 24);
      const minutes = Math.floor((diff/(1000*60)) % 60);
      const seconds = Math.floor((diff/1000) % 60);
      el.textContent = `${days}D ${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    } else {
      el.textContent = '00D 00:00:00';
    }
  }
}
const mdshopTargetDate = new Date("2025-09-10T12:00:00+09:00");
function updateMDShopCountdown() {
  const now = new Date();
  const diff = mdshopTargetDate - now;
  if(diff > 0) {
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff/(1000*60*60)) % 24);
    const minutes = Math.floor((diff/(1000*60)) % 60);
    const seconds = Math.floor((diff/1000) % 60);
    document.getElementById('mdshop-timer').textContent =
      `${days}D ${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  } else {
    document.getElementById('mdshop-timer').textContent = '00D 00:00:00';
  }
}

// ---- 방명록 버튼 업데이트 ----
function updateGuestbookButtons() {
    const now = new Date();
    const btn = document.getElementById('guestbook-btn');
    const btnsActive = document.getElementById('guestbook-active-btns');
    const guestbookOpenDate = new Date(concertTargetDate.getTime() - 10 * 24 * 60 * 60 * 1000);
    if(now >= guestbookOpenDate) {
        btn.style.display = "none";
        btnsActive.style.display = "flex";
    } else {
        btn.style.display = "inline-block";
        btnsActive.style.display = "none";
        btn.classList.add('guestbook-btn-disabled'); // 비주얼만 비활성
    }
}

// ??? 버튼 클릭시 팝업 (disabled 아님!)
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('guestbook-btn');
    btn.addEventListener('click', function(e){
        // 아직 방명록 비활성일 때만 작동
        const now = new Date();
        const guestbookOpenDate = new Date(concertTargetDate.getTime() - 10 * 24 * 60 * 60 * 1000);
        if(now < guestbookOpenDate) {
            const diff = Math.ceil((guestbookOpenDate - now)/(1000*60*60*24));
            alert(`${diff}일 후를 기대해주세요!`);
            e.preventDefault();
            return false;
        }
    });
});


// ---- 페이지가 완전히 준비된 후 모든 타이머+지도 실행 ----

  // 타이머 실시간 실행
// ---- [타이머 setInterval(1초마다 반복)] ----
setInterval(updateConcertCountdown, 1000);
setInterval(updatePreReserveCountdown, 1000);
setInterval(updateNormalReserveCountdown, 1000);
setInterval(updateMDShopCountdown, 1000);
setInterval(updateGuestbookButtons, 1000);

// ---- [최초 1회 실행] ----
updateConcertCountdown();
updatePreReserveCountdown();
updateNormalReserveCountdown();
updateMDShopCountdown();
updateGuestbookButtons();

window.onload = function(){
  // 지도 초기화
  var container = document.getElementById('map');
  if (container) {
    var options = {
      center: new kakao.maps.LatLng(37.5126236, 127.0544177),
      level: 3
    };
    var map = new kakao.maps.Map(container, options);

    var imageSrc = "./free-icon-location-5582962.png";
    var imageSize = new kakao.maps.Size(44, 49);
    var imageOption = { offset: new kakao.maps.Point(22, 49) };
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    var markerPosition  = new kakao.maps.LatLng(37.5126236, 127.0544177);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage
    });
    marker.setMap(map);
  }
};

// 뒤로가기(옵션)
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'https://abconcert-55576.web.app/';
  }
}
