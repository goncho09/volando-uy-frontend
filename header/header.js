// Hacer que se cierre un <details> al abrir otro
function setupDropdowns() {
  const allDetails = document.querySelectorAll('nav details');

  allDetails.forEach((detail) => {
    detail.addEventListener('toggle', (e) => {
      if (detail.open) {
        allDetails.forEach((other) => {
          if (other !== detail) other.open = false;
        });
      }
    });
  });
}

function loadHeader() {
  const container = document.getElementById('header');
  if (!container) return;

  // Detectar la profundidad de la página
  const pathDepth =
    window.location.pathname.split('/').filter((part) => part).length - 1;

  // Construir la ruta al header.html relativa a la ubicación del HTML actual
  let fetchPath = '';
  for (let i = 0; i < pathDepth; i++) {
    fetchPath += '../';
  }
  fetchPath += 'header/header.html';

  fetch(fetchPath)
    .then((res) => {
      if (!res.ok) throw new Error('Header no encontrado');
      return res.text();
    })
    .then((data) => {
      container.innerHTML = data;

      // Inicializar dropdowns (función tuya)
      setupDropdowns();

      // Mostrar usuario o sesión
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
    })
    .catch((err) => {
      console.error('Error cargando header:', err);
    });
}

function toggleMenu() {
  const collapse = document.querySelector('.nav-collapse');
  collapse.classList.toggle('active');
}

function cerrarSesion() {
  localStorage.removeItem('userData');
  window.location.href = '/index.html';
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', loadHeader);
