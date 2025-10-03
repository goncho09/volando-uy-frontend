let mostrandoAerolineas = false;

const aerolineasDiv = document.getElementById('aerolineas');
const clientesDiv = document.getElementById('clientes');
const toggleBtn = document.getElementById('cambio');

function mostrarAerolineas() {
    aerolineasDiv.style.display = 'block';
    clientesDiv.style.display = 'none';
}

function mostrarClientesDiv() {
    aerolineasDiv.style.display = 'none';
    clientesDiv.style.display = 'block';
}

toggleBtn.addEventListener('click', () => {
    if (mostrandoAerolineas) {
        mostrarClientesDiv();
    } else {
        mostrarAerolineas();
    }
    mostrandoAerolineas = !mostrandoAerolineas;
});

// Inicialmente muestra clientes
mostrarClientesDiv();