const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Evita el envío del formulario por defecto

  if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
    alert('Por favor, completa todos los campos.');
    return;
  }

  localStorage.setItem(
    'userData',
    JSON.stringify({
      nickname: emailInput.value,
    })
  );

  window.location.href = '../index.html';
});
