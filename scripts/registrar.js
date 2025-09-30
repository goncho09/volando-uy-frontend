const rol = document.getElementById('role');
const nickname = document.getElementById('nickname');
const email = document.getElementById('email');
const image = document.getElementById('image');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const form = document.getElementById('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (
    !rol.value ||
    !nickname.value ||
    !email.value ||
    !password.value ||
    image.files.length === 0
  ) {
    alert('Por favor, complete todos los campos del formulario.');
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
    return;
  }

  localStorage.setItem(
    'userData',
    JSON.stringify({
      role: rol.value,
      nickname: nickname.value,
      email: email.value,
      image: URL.createObjectURL(image.files[0]),
      password: password.value,
    })
  );

  window.location.href = './registro-final.html';
});
