// 콘서트 카운트다운 (2025-10-11 18:00)
const concertTargetDate = new Date("2025-10-11T18:00:00+09:00");
function updateConcertCountdown() {
  const now = new Date();
  const diff = concertTargetDate - now;
  if(diff > 0) {
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff/(1000*60*60)) % 24);
    const minutes = Math.floor((diff/(1000*60)) % 60);
    const seconds = Math.floor((diff/1000) % 60);
    document.getElementById('days').textContent = 'D - ' + (days < 10 ? '0' : '') + days;
    document.getElementById('timer').textContent =
      `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}s`;
  } else {
    document.getElementById('days').textContent = '-00D';
    document.getElementById('timer').textContent = '00:00:00s';
  }
}
// 예매 카운트다운 (2025-08-30 12:00)
// 선예매(9월1일 18:00) / 일반예매(9월2일 18:00)
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
// 실행
setInterval(updatePreReserveCountdown, 1000);
setInterval(updateNormalReserveCountdown, 1000);
updatePreReserveCountdown();
updateNormalReserveCountdown();

// MD 카운트다운 (2025-09-10 12:00)
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
      `  ${(days < 10 ? '0' : '') + days}D ${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  } else {
    document.getElementById('mdshop-timer').textContent = '00D 00:00:00';
  }
}
// 이렇게만 두세요
updatePreReserveCountdown();
updateNormalReserveCountdown();
updateMDShopCountdown();
updateConcertCountdown();

// 카카오 지도 (정방향 마커)
window.onload = function() {
  var container = document.getElementById('map');
  var options = {
    center: new kakao.maps.LatLng(37.5126236, 127.0544177),
    level: 3
  };
  var map = new kakao.maps.Map(container, options);

  // 노란 핀 PNG. 이미지는 반드시 위/아래 올바른 방향이어야 함
  var imageSrc = "./free-icon-location-5582962.png";
  var imageSize = new kakao.maps.Size(44, 49);
  var imageOption = { offset: new kakao.maps.Point(22, 49) }; // offset: 중앙하단
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  var markerPosition  = new kakao.maps.LatLng(37.5126236, 127.0544177);

  var marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage
  });
  marker.setMap(map);
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'https://abconcert-55576.web.app/';  // 또는 이동을 원하는 기본 주소
  }
}
