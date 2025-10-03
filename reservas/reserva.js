const datosReserva = {
  aerolineas: [
    {
      id: 'zulufly',
      nombre: 'ZuluFly',
      descripcion: 'Aerolínea premium con destinos internacionales',
      imagen: '/assets/aerolinea1.png',
      rutas: [
        {
          id: 'zl1502',
          codigo: 'ZL1502',
          nombre: 'Montevideo - Río de Janeiro',
          descripcion: 'Vuelo directo a las playas de Brasil',
          imagen: '/assets/rio.jpg',
          vuelos: [
            {
              id: 'zl1502001',
              codigo: 'ZL1502001',
              fecha: '25/10/2024',
              hora: '12:50',
              duracion: '2 h 30 min',
              asientosDisponibles: 28,
              imagen: '/assets/vuelo1.jpg',
            },
            {
              id: 'zl1502002',
              codigo: 'ZL1502002',
              fecha: '26/10/2024',
              hora: '18:30',
              duracion: '2 h 30 min',
              asientosDisponibles: 15,
              imagen: '/assets/vuelo2.jpg',
            },
          ],
        },
        {
          id: 'zl0801',
          codigo: 'ZL0801',
          nombre: 'Montevideo - Buenos Aires',
          descripcion: 'Conectando las capitales del Río de la Plata',
          imagen: '/assets/vuelo2.jpg',
          vuelos: [
            {
              id: 'zl0801001',
              codigo: 'ZL0801001',
              fecha: '25/10/2024',
              hora: '08:00',
              duracion: '45 min',
              asientosDisponibles: 50,
              imagen: '/assets/vuelo3.jpg',
            },
          ],
        },
      ],
    },
    {
      id: 'skywings',
      nombre: 'SkyWings',
      descripcion: 'Vuelos nacionales e internacionales económicos',
      imagen: '/assets/aerolinea2.png',
      rutas: [
        {
          id: 'sw2001',
          codigo: 'SW2001',
          nombre: 'Montevideo - Santiago',
          descripcion: 'Descubre los Andes chilenos',
          imagen: '/assets/vuelo3.jpg',
          vuelos: [
            {
              id: 'sw2001001',
              codigo: 'SW2001001',
              fecha: '27/10/2024',
              hora: '14:15',
              duracion: '3 h 00 min',
              asientosDisponibles: 40,
              imagen: '/assets/vuelo1.jpg',
            },
          ],
        },
      ],
    },
  ],
};

let estadoReserva = {
  aerolinea: null,
  ruta: null,
  vuelo: null,
};

// Inicializar datos
document.addEventListener('DOMContentLoaded', function () {
  cargarAerolineas();
  inicializarFormulario();
});

function cargarAerolineas() {
  const container = document.getElementById('aerolineas-container');
  if (!container) return;

  container.innerHTML = '';

  datosReserva.aerolineas.forEach((aerolinea) => {
    const col = document.createElement('div');
    col.className = 'col-md-6';
    col.innerHTML = `
            <div class="card shadow h-100">
                <img src="${aerolinea.imagen}" alt="${aerolinea.nombre}" class="card-img-top img-fluid" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${aerolinea.nombre}</h5>
                    <p class="card-text">${aerolinea.descripcion}</p>
                    <button type="button" onclick="seleccionarAerolinea('${aerolinea.id}')">Seleccionar Aerolínea</button>
                </div>
            </div>
        `;
    container.appendChild(col);
  });
}

// Seleccionar aerolínea
function seleccionarAerolinea(aerolineaId) {
  const aerolinea = datosReserva.aerolineas.find((a) => a.id === aerolineaId);
  estadoReserva.aerolinea = aerolinea;

  // ocultar paso de aerolínea
  document.getElementById('step-aerolinea').classList.add('d-none');
  document.getElementById('step-ruta').classList.remove('d-none');

  // mostrar aerolínea seleccionada
  document.getElementById('nombre-aerolinea').textContent = aerolinea.nombre;
  document.getElementById('resumen-aerolinea').textContent = aerolinea.nombre;

  cargarRutas(aerolinea);
}

// Cargar rutas de la aerolínea seleccionada
function cargarRutas(aerolinea) {
  const container = document.getElementById('rutas-container');
  container.innerHTML = '';

  aerolinea.rutas.forEach((ruta) => {
    const col = document.createElement('div');
    col.className = 'col-md-6';
    col.innerHTML = `
            <div class="card shadow h-100">
                <img src="${ruta.imagen}" alt="${ruta.nombre}" class="card-img-top img-fluid" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${ruta.nombre}</h5>
                    <p class="card-text">${ruta.descripcion}</p>
                    <p><strong>Código:</strong> ${ruta.codigo}</p>
                    <button type="button" onclick="seleccionarRuta('${ruta.id}')">Seleccionar Ruta</button>
                </div>
            </div>
        `;
    container.appendChild(col);
  });
}

// Seleccionar ruta
function seleccionarRuta(rutaId) {
  const ruta = estadoReserva.aerolinea.rutas.find((r) => r.id === rutaId);
  estadoReserva.ruta = ruta;

  // Mostrar paso de vuelos
  document.getElementById('step-ruta').classList.add('d-none');
  document.getElementById('step-vuelo').classList.remove('d-none');

  // Actualizar UI
  document.getElementById(
    'resumen-ruta'
  ).textContent = `${ruta.nombre} (${ruta.codigo})`;

  cargarVuelos(ruta);
}

// Cargar vuelos de la ruta seleccionada
function cargarVuelos(ruta) {
  const container = document.getElementById('vuelos-container');
  container.innerHTML = '';

  ruta.vuelos.forEach((vuelo) => {
    const col = document.createElement('div');
    col.className = 'col-md-6';
    col.innerHTML = `
            <div class="card shadow h-100">
                <img src="${vuelo.imagen}" alt="${vuelo.codigo}" class="card-img-top img-fluid" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${vuelo.codigo}</h5>
                    <p><strong>Fecha:</strong> ${vuelo.fecha}</p>
                    <p><strong>Hora:</strong> ${vuelo.hora}</p>
                    <p><strong>Duración:</strong> ${vuelo.duracion}</p>
                    <p><strong>Asientos disponibles:</strong> ${vuelo.asientosDisponibles}</p>
                    <button type="button" onclick="seleccionarVuelo('${vuelo.id}')">Seleccionar Vuelo</button>
                </div>
            </div>
        `;
    container.appendChild(col);
  });
}

// Seleccionar vuelo
function seleccionarVuelo(vueloId) {
  const vuelo = estadoReserva.ruta.vuelos.find((v) => v.id === vueloId);
  estadoReserva.vuelo = vuelo;

  // Mostrar paso de formulario
  document.getElementById('step-vuelo').classList.add('d-none');
  document.getElementById('step-datos').classList.remove('d-none');

  // Actualizar UI con datos del vuelo seleccionado
  document.getElementById(
    'resumen-vuelo'
  ).textContent = `${vuelo.codigo} (${vuelo.fecha} ${vuelo.hora})`;
  document.getElementById('imagen-vuelo').src = vuelo.imagen;
  document.getElementById(
    'detalles-vuelo'
  ).textContent = `${vuelo.codigo} - ${estadoReserva.ruta.nombre}`;
  document.getElementById('detalle-fecha').textContent = vuelo.fecha;
  document.getElementById('detalle-hora').textContent = vuelo.hora;
  document.getElementById('detalle-duracion').textContent = vuelo.duracion;
  document.getElementById('detalle-asientos').textContent =
    vuelo.asientosDisponibles;
}

// Funciones para volver a pasos anteriores
function volverAAerolineas() {
  document.getElementById('step-ruta').classList.add('d-none');
  document.getElementById('step-aerolinea').classList.remove('d-none');
}

function volverARutas() {
  document.getElementById('step-vuelo').classList.add('d-none');
  document.getElementById('step-ruta').classList.remove('d-none');
}

function volverAVuelos() {
  document.getElementById('step-datos').classList.add('d-none');
  document.getElementById('step-vuelo').classList.remove('d-none');
}

// Inicializar funcionalidad del formulario
function inicializarFormulario() {
  const cantidadPasajes = document.getElementById('cantidad-pasajes');
  const nombresPasajeros = document.getElementById('nombres-pasajeros');
  const tipoAsiento = document.getElementById('tipo-asiento');
  const equipajeExtra = document.getElementById('equipaje-extra');
  const pagoPaquete = document.getElementById('pago-paquete');
  const selectorPaquete = document.getElementById('selector-paquete');

  if (!cantidadPasajes) return; // Si no existe el formulario, salir

  // Actualizar nombres de pasajeros según cantidad
  cantidadPasajes.addEventListener('change', function () {
    const cantidad = parseInt(this.value);
    nombresPasajeros.innerHTML = '';

    for (let i = 1; i <= cantidad; i++) {
      const pasajeroDiv = document.createElement('div');
      pasajeroDiv.className = 'pasajero mb-3';
      pasajeroDiv.innerHTML = `
                <label class="form-label">Pasajero ${i}</label>
                <div class="row">
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Nombre" required>
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Apellido" required>
                    </div>
                </div>
            `;
      nombresPasajeros.appendChild(pasajeroDiv);
    }

    actualizarCostos();
  });

  // Mostrar/ocultar selector de paquete
  pagoPaquete.addEventListener('change', function () {
    if (this.checked) {
      selectorPaquete.classList.remove('d-none');
    } else {
      selectorPaquete.classList.add('d-none');
    }
  });

  // Actualizar costos cuando cambian las opciones
  tipoAsiento.addEventListener('change', actualizarCostos);
  equipajeExtra.addEventListener('input', actualizarCostos);

  function actualizarCostos() {
    const cantidad = parseInt(cantidadPasajes.value);
    const asiento = tipoAsiento.value;
    const equipaje = parseInt(equipajeExtra.value) || 0;

    const costoPorAsiento = asiento === 'turista' ? 75 : 190;
    const costoPasajes = cantidad * costoPorAsiento;
    const costoEquipaje = equipaje * 30;
    const total = costoPasajes + costoEquipaje;

    document.getElementById(
      'costo-pasajes'
    ).textContent = `USD ${costoPasajes}`;
    document.getElementById(
      'costo-equipaje'
    ).textContent = `USD ${costoEquipaje}`;
    document.getElementById('total').textContent = `USD ${total}`;
  }

  // Manejar envío del formulario
  document
    .getElementById('form-reserva')
    .addEventListener('submit', function (e) {
      e.preventDefault();

      // Validaciones básicas
      const cantidad = parseInt(cantidadPasajes.value);
      const inputsNombres =
        nombresPasajeros.querySelectorAll('input[type="text"]');
      let todosCompletos = true;

      inputsNombres.forEach((input) => {
        if (!input.value.trim()) {
          todosCompletos = false;
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
      });

      if (!todosCompletos) {
        alert(
          'Por favor, completa todos los nombres y apellidos de los pasajeros.'
        );
        return;
      }

      // Validar que se eligió un paquete
      if (pagoPaquete.checked) {
        const paqueteSelect = document.getElementById('paquete');
        if (!paqueteSelect.value) {
          alert('Por favor, selecciona un paquete para el pago.');
          paqueteSelect.classList.add('is-invalid');
          return;
        }
        paqueteSelect.classList.remove('is-invalid');
      }

      alert('¡Reserva confirmada exitosamente!');
      window.location.href = 'reservas.html';
    });

  actualizarCostos();
}

// Limpiar el estado
function volverAAerolineas() {
  estadoReserva = { aerolinea: null, ruta: null, vuelo: null };

  document.querySelectorAll('[id^="step-"]').forEach((step) => {
    step.classList.add('d-none');
  });

  document.getElementById('step-aerolinea').classList.remove('d-none');

  cargarAerolineas();
}

function volverARutas() {
  estadoReserva.ruta = null;
  estadoReserva.vuelo = null;

  document.querySelectorAll('[id^="step-"]').forEach((step) => {
    step.classList.add('d-none');
  });

  document.getElementById('step-ruta').classList.remove('d-none');

  cargarRutas(estadoReserva.aerolinea);
}

function volverAVuelos() {
  estadoReserva.vuelo = null;

  document.querySelectorAll('[id^="step-"]').forEach((step) => {
    step.classList.add('d-none');
  });

  document.getElementById('step-vuelo').classList.remove('d-none');

  cargarVuelos(estadoReserva.ruta);
}
