function loadHeader() {
  fetch('header/headerIndex.html')
    .then((res) => res.text())
    .then((data) => {
      const container = document.getElementById('header');
      if (!container) return;
      container.innerHTML = data;

      setupDropdowns();

      const userInfo = document.getElementById('user-info');
      const nickname = document.getElementById('nickname');
      const sesionContainer = document.getElementById('sesion');
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (userData && userData.nickname) {
        userInfo.style.display = 'flex';
        sesionContainer.style.display = 'none';
        nickname.textContent = userData.nickname;
      } else {
        sesionContainer.style.display = 'flex';
        userInfo.style.display = 'none';
      }
    });
}

function setupDropdowns() {
  const allDetails = document.querySelectorAll('nav details');
  allDetails.forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        allDetails.forEach((other) => {
          if (other !== detail) other.open = false;
        });
      }
    });
  });
}

function cerrarSesion() {
  localStorage.removeItem('userData');
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', loadHeader);
