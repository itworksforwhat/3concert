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
const reserveTargetDate = new Date("2025-08-30T12:00:00+09:00");
function updateReserveCountdown() {
  const now = new Date();
  const diff = reserveTargetDate - now;
  if(diff > 0) {
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff/(1000*60*60)) % 24);
    const minutes = Math.floor((diff/(1000*60)) % 60);
    const seconds = Math.floor((diff/1000) % 60);
    document.getElementById('reserve-timer').textContent =
      `  ${(days < 10 ? '0' : '') + days}D ${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  } else {
    document.getElementById('reserve-timer').textContent = '00D 00:00:00';
  }
}
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
setInterval(updateConcertCountdown, 1000); updateConcertCountdown();
setInterval(updateReserveCountdown, 1000); updateReserveCountdown();
setInterval(updateMDShopCountdown, 1000); updateMDShopCountdown();

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
