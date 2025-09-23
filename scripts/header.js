function loadHeader() {
  fetch('header.html')
    .then((res) => res.text())
    .then((data) => {
      const container = document.getElementById('header');
      container.innerHTML = data;

      const userInfo = document.getElementById('user-info');
      const nickname = document.getElementById('nickname');
      const sesionContainer = document.getElementById('sesion');
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (userData && userData.nickname) {
        userInfo.style.display = 'flex';
        sesionContainer.style.display = 'none';
        nickname.textContent = userData.nickname;
        console.log('Usuario autenticado:', userData.nickname);
      } else {
        sesionContainer.style.display = 'flex';
        userInfo.style.display = 'none';
      }
    });
}

function toggleMenu() {
  const collapse = document.querySelector('.nav-collapse');
  collapse.classList.toggle('active');
}

function cerrarSesion() {
  localStorage.removeItem('userData');
  window.location.href = 'index.html';
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', loadHeader);
