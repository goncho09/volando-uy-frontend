// Datos de prueba estáticos
const datosConsulta = {
    aerolineas: [
        {
            id: 'zulufly',
            nombre: 'ZuluFly',
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
                    equipajeExtra: 'USD 30',
                    vuelos: [
                        {
                            id: 'zl1502001',
                            codigo: 'ZL1502001',
                            fecha: '25/10/2024',
                            hora: '12:50',
                            duracion: '2 h 30 min',
                            asientosTurista: 150,
                            asientosEjecutivo: 30,
                            fechaAlta: '28/07/2024',
                            imagen: '../assets/vuelo1.jpg',
                            tieneReserva: true
                        },
                        {
                            id: 'zl1502002',
                            codigo: 'ZL1502002',
                            fecha: '26/10/2024',
                            hora: '18:30',
                            duracion: '2 h 30 min',
                            asientosTurista: 148,
                            asientosEjecutivo: 28,
                            fechaAlta: '28/07/2024',
                            imagen: '../assets/vuelo2.jpg',
                            tieneReserva: false
                        }
                    ]
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
                    equipajeExtra: 'USD 20',
                    vuelos: [
                        {
                            id: 'zl0801001',
                            codigo: 'ZL0801001',
                            fecha: '25/10/2024',
                            hora: '08:00',
                            duracion: '45 min',
                            asientosTurista: 180,
                            asientosEjecutivo: 20,
                            fechaAlta: '15/08/2024',
                            imagen: '../assets/vuelo3.jpg',
                            tieneReserva: false
                        }
                    ]
                }
            ]
        },
        {
            id: 'skywings',
            nombre: 'SkyWings',
            rutas: [
                {
                    id: 'sw2001',
                    codigo: 'SW2001',
                    nombre: 'Montevideo - Santiago',
                    origen: 'Montevideo, Uruguay (Carrasco)',
                    destino: 'Santiago, Chile (Pudahuel)',
                    hora: '14:15',
                    costoTurista: 'USD 90',
                    costoEjecutivo: 'USD 210',
                    equipajeExtra: 'USD 25',
                    vuelos: [
                        {
                            id: 'sw2001001',
                            codigo: 'SW2001001',
                            fecha: '27/10/2024',
                            hora: '14:15',
                            duracion: '3 h 00 min',
                            asientosTurista: 200,
                            asientosEjecutivo: 40,
                            fechaAlta: '10/09/2024',
                            imagen: '../assets/vuelo1.jpg',
                            tieneReserva: false
                        }
                    ]
                }
            ]
        }
    ]
};

let estadoConsulta = {
    aerolinea: null,
    ruta: null
};

// Inicializar cuando el js esté listo
document.addEventListener('DOMContentLoaded', function () {
    console.log('Inicializando consulta de vuelo...');
    inicializarSelectores();
});

function inicializarSelectores() {
    const selectAerolinea = document.getElementById('select-aerolinea');
    const selectRuta = document.getElementById('select-ruta');
    const btnBuscar = document.getElementById('btn-buscar');
    const btnVolverLista = document.getElementById('btn-volver-lista');

    if (!selectAerolinea) {
        console.error('No se encontró el elemento select-aerolinea');
        return;
    }

    // Cargar aerolíneas
    datosConsulta.aerolineas.forEach((aerolinea) => {
        const option = document.createElement('option');
        option.value = aerolinea.id;
        option.textContent = aerolinea.nombre;
        selectAerolinea.appendChild(option);
    });

    // Evento cambio aerolínea
    selectAerolinea.addEventListener('change', function () {
        const aerolineaId = this.value;

        // Resetear select de rutas
        selectRuta.innerHTML = '<option value="">Selecciona una ruta</option>';
        selectRuta.disabled = true;
        btnBuscar.disabled = true;

        if (aerolineaId) {
            const aerolinea = datosConsulta.aerolineas.find(a => a.id === aerolineaId);
            estadoConsulta.aerolinea = aerolinea;
            selectRuta.disabled = false;

            // Cargar rutas
            aerolinea.rutas.forEach((ruta) => {
                const option = document.createElement('option');
                option.value = ruta.id;
                option.textContent = `${ruta.codigo} - ${ruta.nombre}`;
                selectRuta.appendChild(option);
            });
        } else {
            estadoConsulta.aerolinea = null;
        }
    });

    // Cambio ruta
    selectRuta.addEventListener('change', function () {
        const rutaId = this.value;

        if (rutaId && estadoConsulta.aerolinea) {
            const ruta = estadoConsulta.aerolinea.rutas.find(r => r.id === rutaId);
            estadoConsulta.ruta = ruta;
            btnBuscar.disabled = false;
        } else {
            estadoConsulta.ruta = null;
            btnBuscar.disabled = true;
        }
    });

    // Botón buscar
    btnBuscar.addEventListener('click', function () {
        if (estadoConsulta.ruta) {
            mostrarListaVuelos();
        }
    });

    // Botón volver a lista
    btnVolverLista.addEventListener('click', function () {
        mostrarListaVuelos();
    });
}

function mostrarListaVuelos() {
    document.getElementById('mensaje-inicial').classList.add('d-none');
    document.getElementById('detalle-vuelo-container').classList.add('d-none');
    
    document.getElementById('lista-vuelos-container').classList.remove('d-none');
    
    document.getElementById('titulo-lista-vuelos').textContent = 
        `Vuelos Disponibles - ${estadoConsulta.ruta.nombre}`;

    const listaVuelos = document.getElementById('lista-vuelos');
    listaVuelos.innerHTML = '';

    if (estadoConsulta.ruta.vuelos.length === 0) {
        const mensaje = document.createElement('div');
        mensaje.className = 'text-center py-5';
        mensaje.innerHTML = `
            <i class="fas fa-plane-slash fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">No hay vuelos disponibles</h5>
            <p class="text-muted">No se encontraron vuelos para esta ruta</p>
        `;
        listaVuelos.appendChild(mensaje);
        return;
    }

    // Mostrar cada vuelo de la ruta seleccionada
    estadoConsulta.ruta.vuelos.forEach((vuelo) => {
        const vueloDiv = document.createElement('div');
        vueloDiv.className = 'border-bottom p-4';
        
        const row = document.createElement('div');
        row.className = 'row align-items-center';
        
        const colImg = document.createElement('div');
        colImg.className = 'col-md-2';
        const img = document.createElement('img');
        img.src = vuelo.imagen;
        img.alt = vuelo.codigo;
        img.className = 'img-fluid rounded';
        img.style = 'height: 80px; object-fit: cover;';
        colImg.appendChild(img);
        
        const colInfo = document.createElement('div');
        colInfo.className = 'col-md-6';
        colInfo.innerHTML = `
            <h6 class="fw-bold mb-1">${vuelo.codigo}</h6>
            <p class="mb-1"><strong>Fecha:</strong> ${vuelo.fecha}</p>
            <p class="mb-1"><strong>Hora:</strong> ${vuelo.hora} | <strong>Duración:</strong> ${vuelo.duracion}</p>
            <p class="mb-0"><strong>Asientos disponibles:</strong> Turista: ${vuelo.asientosTurista} | Ejecutivo: ${vuelo.asientosEjecutivo}</p>
        `;
        
        const colBtn = document.createElement('div');
        colBtn.className = 'col-md-4 text-end';
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.style = 'background-color: var(--azul-oscuro); border-color: var(--azul-oscuro);';
        btn.textContent = 'Ver Detalles';
        btn.onclick = function() { mostrarDetalleVuelo(vuelo.id); };
        colBtn.appendChild(btn);
        
        row.appendChild(colImg);
        row.appendChild(colInfo);
        row.appendChild(colBtn);
        vueloDiv.appendChild(row);
        listaVuelos.appendChild(vueloDiv);
    });
}

function mostrarDetalleVuelo(vueloId) {
    const vuelo = estadoConsulta.ruta.vuelos.find(v => v.id === vueloId);
    
    if (!vuelo) {
        console.error('Vuelo no encontrado:', vueloId);
        return;
    }

    document.getElementById('mensaje-inicial').classList.add('d-none');
    document.getElementById('lista-vuelos-container').classList.add('d-none');
    
    document.getElementById('detalle-vuelo-container').classList.remove('d-none');

    // Actualizar datos del vuelo
    document.getElementById('vuelo-imagen').src = vuelo.imagen;
    document.getElementById('vuelo-nombre').textContent = vuelo.codigo;
    document.getElementById('vuelo-aerolinea').textContent = estadoConsulta.aerolinea.nombre;
    document.getElementById('vuelo-ruta').textContent = `${estadoConsulta.ruta.codigo} - ${estadoConsulta.ruta.nombre}`;
    document.getElementById('vuelo-fecha').textContent = vuelo.fecha;
    document.getElementById('vuelo-duracion').textContent = vuelo.duracion;
    document.getElementById('vuelo-turista').textContent = vuelo.asientosTurista;
    document.getElementById('vuelo-ejecutivo').textContent = vuelo.asientosEjecutivo;
    document.getElementById('vuelo-fecha-alta').textContent = vuelo.fechaAlta;
    document.getElementById('vuelo-hora').textContent = vuelo.hora;

    // Actualizar información de la ruta
    document.getElementById('ruta-origen').textContent = estadoConsulta.ruta.origen;
    document.getElementById('ruta-destino').textContent = estadoConsulta.ruta.destino;
    document.getElementById('ruta-hora').textContent = estadoConsulta.ruta.hora;
    document.getElementById('ruta-costo-turista').textContent = estadoConsulta.ruta.costoTurista;
    document.getElementById('ruta-costo-ejecutivo').textContent = estadoConsulta.ruta.costoEjecutivo;
    document.getElementById('ruta-equipaje').textContent = estadoConsulta.ruta.equipajeExtra;

    // Mostrar/ocultar info de reserva
    const infoReserva = document.getElementById('info-reserva');
    if (vuelo.tieneReserva) {
        infoReserva.classList.remove('d-none');
        document.getElementById('nombre-usuario').textContent = 'Mirtha';
    } else {
        infoReserva.classList.add('d-none');
    }
}