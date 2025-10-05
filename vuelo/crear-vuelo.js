// Datos de prueba estáticos 
const datosCrearVuelo = {
    aerolinea: {
        id: 'zulufly',
        nombre: 'ZuluFly'
    },
    rutas: [
        {
            id: 'zl1502',
            codigo: 'ZL1502',
            nombre: 'Montevideo - Río de Janeiro',
            origen: 'Montevideo, Uruguay (Carrasco)',
            destino: 'Río de Janeiro, Brasil (Galeão)',
            hora: '12:50',
            costoTurista: 'USD 75',
            costoEjecutivo: 'USD 190',
            estado: 'Confirmada'
        },
        {
            id: 'zl0801',
            codigo: 'ZL0801',
            nombre: 'Montevideo - Buenos Aires',
            origen: 'Montevideo, Uruguay (Carrasco)',
            destino: 'Buenos Aires, Argentina (Ezeiza)',
            hora: '08:00',
            costoTurista: 'USD 50',
            costoEjecutivo: 'USD 120',
            estado: 'Confirmada'
        },
        {
            id: 'zl2003',
            codigo: 'ZL2003',
            nombre: 'Montevideo - São Paulo',
            origen: 'Montevideo, Uruguay (Carrasco)',
            destino: 'São Paulo, Brasil (Guarulhos)',
            hora: '16:30',
            costoTurista: 'USD 85',
            costoEjecutivo: 'USD 200',
            estado: 'Ingresada' 
        }
    ],
    vuelosExistentes: ['ZL1502001', 'ZL1502002', 'ZL0801001'] // Para validar nombre único
};

let estadoCreacion = {
    rutaSeleccionada: null
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando creación de vuelo...');
    inicializarCrearVuelo();
});

function inicializarCrearVuelo() {
    const selectRuta = document.getElementById('select-ruta');
    const form = document.getElementById('form-crear-vuelo');

    // Cargar rutas confirmadas de la aerolínea
    const rutasConfirmadas = datosCrearVuelo.rutas.filter(ruta => ruta.estado === 'Confirmada');
    
    rutasConfirmadas.forEach(ruta => {
        const option = document.createElement('option');
        option.value = ruta.id;
        option.textContent = `${ruta.codigo} - ${ruta.nombre}`;
        selectRuta.appendChild(option);
    });

    // Cambio de ruta
    selectRuta.addEventListener('change', function() {
        const rutaId = this.value;
        const infoRuta = document.getElementById('info-ruta');

        if (rutaId) {
            const ruta = datosCrearVuelo.rutas.find(r => r.id === rutaId);
            estadoCreacion.rutaSeleccionada = ruta;
            
            document.getElementById('ruta-nombre').textContent = ruta.nombre;
            document.getElementById('ruta-codigo').textContent = ruta.codigo;
            document.getElementById('ruta-origen').textContent = ruta.origen;
            document.getElementById('ruta-destino').textContent = ruta.destino;
            document.getElementById('ruta-hora').textContent = ruta.hora;
            document.getElementById('ruta-costo-turista').textContent = ruta.costoTurista;
            document.getElementById('ruta-costo-ejecutivo').textContent = ruta.costoEjecutivo;
            document.getElementById('ruta-estado').textContent = ruta.estado;
            
            infoRuta.classList.remove('d-none');
            
            actualizarResumen();
        } else {
            estadoCreacion.rutaSeleccionada = null;
            infoRuta.classList.add('d-none');
            actualizarResumen();
        }
    });

    // Event listeners para actualizar resumen en tiempo real
    document.getElementById('nombre-vuelo').addEventListener('input', actualizarResumen);
    document.getElementById('fecha-vuelo').addEventListener('change', actualizarResumen);
    document.getElementById('hora-vuelo').addEventListener('change', actualizarResumen);
    document.getElementById('duracion-vuelo').addEventListener('input', actualizarResumen);
    document.getElementById('asientos-turista').addEventListener('input', actualizarResumen);
    document.getElementById('asientos-ejecutivo').addEventListener('input', actualizarResumen);

    // Vista previa de imagen
    document.getElementById('imagen-vuelo').addEventListener('change', function(e) {
        const file = e.target.files[0];
        const vistaPrevia = document.getElementById('vista-previa');
        const previewImagen = document.getElementById('preview-imagen');

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImagen.src = e.target.result;
                vistaPrevia.classList.remove('d-none');
            };
            reader.readAsDataURL(file);
        } else {
            vistaPrevia.classList.add('d-none');
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        crearVuelo();
    });

    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fecha-vuelo').min = hoy;
}

function actualizarResumen() {
    const ruta = estadoCreacion.rutaSeleccionada;
    const nombreVuelo = document.getElementById('nombre-vuelo').value;
    const fechaVuelo = document.getElementById('fecha-vuelo').value;
    const horaVuelo = document.getElementById('hora-vuelo').value;
    const duracionVuelo = document.getElementById('duracion-vuelo').value;
    const asientosTurista = parseInt(document.getElementById('asientos-turista').value) || 0;
    const asientosEjecutivo = parseInt(document.getElementById('asientos-ejecutivo').value) || 0;
    const totalAsientos = asientosTurista + asientosEjecutivo;

    // Actualizar resumen
    document.getElementById('resumen-ruta').textContent = ruta ? `${ruta.codigo} - ${ruta.nombre}` : '-';
    document.getElementById('resumen-nombre').textContent = nombreVuelo || '-';
    document.getElementById('resumen-fecha').textContent = fechaVuelo || '-';
    document.getElementById('resumen-hora').textContent = horaVuelo || '-';
    document.getElementById('resumen-duracion').textContent = duracionVuelo || '-';
    document.getElementById('resumen-turista').textContent = asientosTurista || '0';
    document.getElementById('resumen-ejecutivo').textContent = asientosEjecutivo || '0';
    document.getElementById('resumen-total').textContent = totalAsientos;
}

function crearVuelo() {
    const ruta = estadoCreacion.rutaSeleccionada;
    const nombreVuelo = document.getElementById('nombre-vuelo').value.trim();
    const fechaVuelo = document.getElementById('fecha-vuelo').value;
    const horaVuelo = document.getElementById('hora-vuelo').value;
    const duracionVuelo = document.getElementById('duracion-vuelo').value.trim();
    const asientosTurista = parseInt(document.getElementById('asientos-turista').value);
    const asientosEjecutivo = parseInt(document.getElementById('asientos-ejecutivo').value);

    // Validaciones
    if (!ruta) {
        alert('Por favor, selecciona una ruta para el vuelo.');
        return;
    }

    if (!nombreVuelo) {
        alert('Por favor, ingresa un nombre para el vuelo.');
        document.getElementById('nombre-vuelo').focus();
        return;
    }

    // Validar nombre único
    if (datosCrearVuelo.vuelosExistentes.includes(nombreVuelo.toUpperCase())) {
        alert('Ya existe un vuelo con ese nombre. Por favor, elige un nombre diferente.');
        document.getElementById('nombre-vuelo').focus();
        return;
    }

    if (!fechaVuelo) {
        alert('Por favor, selecciona una fecha para el vuelo.');
        return;
    }

    if (!horaVuelo) {
        alert('Por favor, selecciona una hora para el vuelo.');
        return;
    }

    if (!duracionVuelo) {
        alert('Por favor, ingresa la duración del vuelo.');
        document.getElementById('duracion-vuelo').focus();
        return;
    }

    if (asientosTurista < 1) {
        alert('Por favor, ingresa una cantidad válida de asientos turista.');
        document.getElementById('asientos-turista').focus();
        return;
    }

    if (asientosEjecutivo < 1) {
        alert('Por favor, ingresa una cantidad válida de asientos ejecutivo.');
        document.getElementById('asientos-ejecutivo').focus();
        return;
    }

    const vueloCreado = {
        codigo: nombreVuelo,
        ruta: ruta.nombre,
        fecha: fechaVuelo,
        hora: horaVuelo,
        duracion: duracionVuelo,
        asientosTurista: asientosTurista,
        asientosEjecutivo: asientosEjecutivo,
        fechaCreacion: new Date().toLocaleDateString()
    };

    alert(`¡Vuelo creado exitosamente!\n\nCódigo: ${vueloCreado.codigo}\nRuta: ${vueloCreado.ruta}\nFecha: ${vueloCreado.fecha}\nHora: ${vueloCreado.hora}`);
    
    window.location.href = '../vuelo/vuelo.html';
}