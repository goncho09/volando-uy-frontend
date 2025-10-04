const datosReserva = {
  aerolineas: [
    {
      id: 'zulufly',
      nombre: 'ZuluFly',
      descripcion: 'Aerolínea premium con destinos internacionales',
      imagen: '../assets/aerolinea1.png',
      rutas: [
        {
          id: 'zl1502',
          codigo: 'ZL1502',
          nombre: 'Montevideo - Río de Janeiro',
          descripcion: 'Vuelo directo a las playas de Brasil',
          imagen: '../assets/rio.jpg',
          vuelos: [
            {
              id: 'zl1502001',
              codigo: 'ZL1502001',
              fecha: '25/10/2024',
              hora: '12:50',
              duracion: '2 h 30 min',
              asientosDisponibles: 28,
              imagen: '../assets/vuelo1.jpg',
            },
            {
              id: 'zl1502002',
              codigo: 'ZL1502002',
              fecha: '26/10/2024',
              hora: '18:30',
              duracion: '2 h 30 min',
              asientosDisponibles: 15,
              imagen: '../assets/vuelo2.jpg',
            },
          ],
        },
        {
          id: 'zl0801',
          codigo: 'ZL0801',
          nombre: 'Montevideo - Buenos Aires',
          descripcion: 'Conectando las capitales del Río de la Plata',
          imagen: '../assets/vuelo2.jpg',
          vuelos: [
            {
              id: 'zl0801001',
              codigo: 'ZL0801001',
              fecha: '25/10/2024',
              hora: '08:00',
              duracion: '45 min',
              asientosDisponibles: 50,
              imagen: '../assets/vuelo3.jpg',
            },
          ],
        },
      ],
    },
    {
      id: 'skywings',
      nombre: 'SkyWings',
      descripcion: 'Vuelos nacionales e internacionales económicos',
      imagen: '../assets/aerolinea2.png',
      rutas: [
        {
          id: 'sw2001',
          codigo: 'SW2001',
          nombre: 'Montevideo - Santiago',
          descripcion: 'Descubre los Andes chilenos',
          imagen: '../assets/vuelo3.jpg',
          vuelos: [
            {
              id: 'sw2001001',
              codigo: 'SW2001001',
              fecha: '27/10/2024',
              hora: '14:15',
              duracion: '3 h 00 min',
              asientosDisponibles: 40,
              imagen: '../assets/vuelo1.jpg',
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
  inicializarSelectores();
  inicializarFormulario();
});

function inicializarSelectores() {
  const selectAerolinea = document.getElementById('select-aerolinea');
  const selectRuta = document.getElementById('select-ruta');
  const selectVuelo = document.getElementById('select-vuelo');
  const btnReservar = document.getElementById('btn-reservar');

  if (!selectAerolinea) return;

  // Cargar aerolíneas
  datosReserva.aerolineas.forEach((aerolinea) => {
    const option = document.createElement('option');
    option.value = aerolinea.id;
    option.textContent = aerolinea.nombre;
    selectAerolinea.appendChild(option);
  });

  // Evento cambio aerolínea
  selectAerolinea.addEventListener('change', function () {
    const aerolineaId = this.value;
    
    // Resetear selects dependientes
    selectRuta.innerHTML = '<option value="">Selecciona una ruta</option>';
    selectVuelo.innerHTML = '<option value="">Selecciona un vuelo</option>';
    selectRuta.disabled = true;
    selectVuelo.disabled = true;
    btnReservar.disabled = true;

    if (aerolineaId) {
      const aerolinea = datosReserva.aerolineas.find(a => a.id === aerolineaId);
      estadoReserva.aerolinea = aerolinea;
      selectRuta.disabled = false;

      // Cargar rutas
      aerolinea.rutas.forEach((ruta) => {
        const option = document.createElement('option');
        option.value = ruta.id;
        option.textContent = `${ruta.codigo} - ${ruta.nombre}`;
        selectRuta.appendChild(option);
      });
    } else {
      estadoReserva.aerolinea = null;
    }
  });

  // Evento cambio ruta
  selectRuta.addEventListener('change', function () {
    const rutaId = this.value;
    
    // Resetear select de vuelos
    selectVuelo.innerHTML = '<option value="">Selecciona un vuelo</option>';
    selectVuelo.disabled = true;
    btnReservar.disabled = true;

    if (rutaId && estadoReserva.aerolinea) {
      const ruta = estadoReserva.aerolinea.rutas.find(r => r.id === rutaId);
      estadoReserva.ruta = ruta;
      selectVuelo.disabled = false;

      // Cargar vuelos
      ruta.vuelos.forEach((vuelo) => {
        const option = document.createElement('option');
        option.value = vuelo.id;
        option.textContent = `${vuelo.codigo} - ${vuelo.fecha} ${vuelo.hora}`;
        selectVuelo.appendChild(option);
      });
    } else {
      estadoReserva.ruta = null;
    }
  });

  // Evento cambio vuelo
  selectVuelo.addEventListener('change', function () {
    const vueloId = this.value;

    if (vueloId && estadoReserva.ruta) {
      const vuelo = estadoReserva.ruta.vuelos.find(v => v.id === vueloId);
      estadoReserva.vuelo = vuelo;
      btnReservar.disabled = false;
    } else {
      estadoReserva.vuelo = null;
      btnReservar.disabled = true;
    }
  });

  // Evento botón reservar
  btnReservar.addEventListener('click', function () {
    if (estadoReserva.vuelo) {
      mostrarFormularioReserva();
    }
  });
}

function mostrarFormularioReserva() {
  const vuelo = estadoReserva.vuelo;
  const ruta = estadoReserva.ruta;
  const aerolinea = estadoReserva.aerolinea;

  // Actualizar UI con datos del vuelo seleccionado
  document.getElementById('resumen-aerolinea').textContent = aerolinea.nombre;
  document.getElementById('resumen-ruta').textContent = `${ruta.nombre} (${ruta.codigo})`;
  document.getElementById('resumen-vuelo').textContent = `${vuelo.codigo} (${vuelo.fecha} ${vuelo.hora})`;
  document.getElementById('imagen-vuelo').src = vuelo.imagen;
  document.getElementById('detalles-vuelo').textContent = `${vuelo.codigo} - ${ruta.nombre}`;
  document.getElementById('detalle-fecha').textContent = vuelo.fecha;
  document.getElementById('detalle-hora').textContent = vuelo.hora;
  document.getElementById('detalle-duracion').textContent = vuelo.duracion;
  document.getElementById('detalle-asientos').textContent = vuelo.asientosDisponibles;

  // Mostrar formulario y ocultar selección
  document.getElementById('seleccion-vuelo').classList.add('d-none');
  document.getElementById('formulario-reserva').classList.remove('d-none');
}

function volverASeleccion() {
  // Ocultar formulario y mostrar selección
  document.getElementById('formulario-reserva').classList.add('d-none');
  document.getElementById('seleccion-vuelo').classList.remove('d-none');
}

// Inicializar funcionalidad del formulario (MANTENEMOS EL CÓDIGO ORIGINAL)
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

    document.getElementById('costo-pasajes').textContent = `USD ${costoPasajes}`;
    document.getElementById('costo-equipaje').textContent = `USD ${costoEquipaje}`;
    document.getElementById('total').textContent = `USD ${total}`;
  }

  // Manejar envío del formulario
  document.getElementById('form-reserva').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validaciones básicas
    const cantidad = parseInt(cantidadPasajes.value);
    const inputsNombres = nombresPasajeros.querySelectorAll('input[type="text"]');
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
      alert('Por favor, completa todos los nombres y apellidos de los pasajeros.');
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

  actualizarCostos()
}