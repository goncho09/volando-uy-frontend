const userData = JSON.parse(localStorage.getItem('userData'));
const form = document.getElementById('form');

const aerolineaDescripcion = document.getElementById('aerolinea-desc');
const aerolineaWebsite = document.getElementById('aerolinea-webs');

const clienteApellido = document.getElementById('cliente-apellido');
const clienteFechaNac = document.getElementById('cliente-fecha-nac');
const clienteTipoDocumento = document.getElementById('cliente-tipo-doc');
const clienteNumDocumento = document.getElementById('cliente-num-doc');

if (!userData || !userData.role) {
  window.location.href = 'registrar-usuario.html';
}

document.getElementById('cliente-inputs').style.display =
  userData.role === 'cliente' ? 'block' : 'none';
document.getElementById('aerolinea-inputs').style.display =
  userData.role === 'aerolinea' ? 'block' : 'none';

form.addEventListener('submit', (e) => {
  e.preventDefault();

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
    userData.apellido = clienteApellido.value;
    userData.fechaNac = clienteFechaNac.value;
    userData.tipoDocumento = clienteTipoDocumento.value;
    userData.numDocumento = clienteNumDocumento.value;
  } else {
    if (!aerolineaDescripcion.value || !aerolineaWebsite.value) {
      alert('Por favor, complete todos los campos requeridos para aerolínea.');
      return;
    }
    userData.descripcion = aerolineaDescripcion.value;
    userData.website = aerolineaWebsite.value;
  }

  localStorage.setItem('userData', JSON.stringify(userData));
  alert('Registro completado con éxito.');
  window.location.href = 'iniciar-sesion.html';
});
