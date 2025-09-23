const rol = document.getElementById('role');
const nickname = document.getElementById('nickname');
const email = document.getElementById('email');
const image = document.getElementById('image');
const password = document.getElementById('password');
const form = document.getElementById('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (
    rol.value &&
    nickname.value &&
    email.value &&
    password.value &&
    image.files.length > 0
  ) {
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
  }
});
