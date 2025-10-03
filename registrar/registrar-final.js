const userData = JSON.parse(localStorage.getItem('userData'));
const form = document.getElementById('form');

const aerolineaDescripcion = document.getElementById('aerolinea-desc');
const aerolineaWebsite = document.getElementById('aerolinea-web');

const clienteApellido = document.getElementById('cliente-apellido');
const clienteFechaNac = document.getElementById('cliente-fecha-nac');
const clienteTipoDocumento = document.getElementById('cliente-tipo-doc');
const clienteNumDocumento = document.getElementById('cliente-num-doc');

if (!userData || !userData.role) {
  window.location.href = '/pages/signup/registrar-usuario.html';
}

document.getElementById('cliente-inputs').style.display =
  userData.role === 'cliente' ? 'block' : 'none';
document.getElementById('aerolinea-inputs').style.display =
  userData.role === 'aerolinea' ? 'block' : 'none';

form.addEventListener('submit', (e) => {
  e.preventDefault();

  try {
    if (userData.role === 'cliente') {
      if (
        !clienteApellido.value ||
        !clienteFechaNac.value ||
        !clienteTipoDocumento.value ||
        !clienteNumDocumento.value
      ) {
        alert('Por favor, complete todos los campos requeridos para cliente.');
        return;
      }
    } else if (userData.role === 'aerolinea') {
      if (!aerolineaDescripcion.value || !aerolineaWebsite.value) {
        alert(
          'Por favor, complete todos los campos requeridos para aerolínea.'
        );
        return;
      }
    } else {
      alert('Rol de usuario no válido.');
      return;
    }

    alert('Registro completado con éxito.');
    window.location.href = '/login/login.html';
  } catch (error) {
    console.error('Error durante el registro:', error);
  }
});
