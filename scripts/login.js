const form = document.getElementById('login-form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    window.location.replace('./index.html');
});