// Datos de prueba estáticos para cliente
const datosConsultaReserva = {
    usuarioActual: {
        nombre: 'Juan Pérez',
        email: 'juan@email.com'
    },

    aerolineas: [
        {
            id: 'zulufly',
            nombre: 'ZuluFly',
            rutas: [
                {
                    id: 'zl1502',
                    codigo: 'ZL1502',
                    nombre: 'Montevideo - Río de Janeiro',
                    vuelos: [
                        {
                            id: 'zl1502001',
                            codigo: 'ZL1502001',
                            fecha: '25/10/2024',
                            hora: '12:50',
                            duracion: '2h 30min',
                            // El cliente Juan Pérez tiene reserva en este vuelo
                            reservaCliente: {
                                id: 'res001',
                                codigo: 'RES-2024-001',
                                pasajeros: 2,
                                tipoAsiento: 'Ejecutivo',
                                estado: 'Confirmada',
                                total: 'USD 380',
                                equipajeExtra: 1,
                                fechaReserva: '15/10/2024',
                                metodoPago: 'General',
                                pasajerosDetalle: [
                                    { nombre: 'Juan', apellido: 'Pérez' },
                                    { nombre: 'María', apellido: 'Gómez' }
                                ]
                            }
                        },
                        {
                            id: 'zl1502002',
                            codigo: 'ZL1502002',
                            fecha: '26/10/2024',
                            hora: '18:30',
                            duracion: '2h 30min',
                            reservaCliente: null // Cliente no tiene reserva en este vuelo
                        }
                    ]
                },
                {
                    id: 'zl0801',
                    codigo: 'ZL0801',
                    nombre: 'Montevideo - Buenos Aires',
                    vuelos: [
                        {
                            id: 'zl0801001',
                            codigo: 'ZL0801001',
                            fecha: '25/10/2024',
                            hora: '08:00',
                            duracion: '45min',
                            reservaCliente: null
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
                    vuelos: [
                        {
                            id: 'sw2001001',
                            codigo: 'SW2001001',
                            fecha: '27/10/2024',
                            hora: '14:15',
                            duracion: '3h 00min',
                            reservaCliente: null
                        }
                    ]
                }
            ]
        }
    ]
};

let estadoConsulta = {
    aerolinea: null,
    ruta: null,
    vuelo: null
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando consulta de reserva...');
    inicializarConsultaReserva();
});

function inicializarConsultaReserva() {
    const selectAerolinea = document.getElementById('cliente-aerolinea');
    const selectRuta = document.getElementById('cliente-ruta');
    const selectVuelo = document.getElementById('cliente-vuelo');

    // Cargar aerolíneas
    datosConsultaReserva.aerolineas.forEach(aerolinea => {
        const option = document.createElement('option');
        option.value = aerolinea.id;
        option.textContent = aerolinea.nombre;
        selectAerolinea.appendChild(option);
    });

    // Evento cambio aerolínea
    selectAerolinea.addEventListener('change', function() {
        const aerolineaId = this.value;
        selectRuta.innerHTML = '<option value="">Selecciona una ruta</option>';
        selectRuta.disabled = true;
        selectVuelo.innerHTML = '<option value="">Selecciona un vuelo</option>';
        selectVuelo.disabled = true;

        if (aerolineaId) {
            const aerolinea = datosConsultaReserva.aerolineas.find(a => a.id === aerolineaId);
            estadoConsulta.aerolinea = aerolinea;
            selectRuta.disabled = false;

            aerolinea.rutas.forEach(ruta => {
                const option = document.createElement('option');
                option.value = ruta.id;
                option.textContent = `${ruta.codigo} - ${ruta.nombre}`;
                selectRuta.appendChild(option);
            });
        }
    });

    // Evento cambio ruta
    selectRuta.addEventListener('change', function() {
        const rutaId = this.value;
        selectVuelo.innerHTML = '<option value="">Selecciona un vuelo</option>';
        selectVuelo.disabled = true;

        if (rutaId && estadoConsulta.aerolinea) {
            const ruta = estadoConsulta.aerolinea.rutas.find(r => r.id === rutaId);
            estadoConsulta.ruta = ruta;
            selectVuelo.disabled = false;

            ruta.vuelos.forEach(vuelo => {
                const option = document.createElement('option');
                option.value = vuelo.id;
                option.textContent = `${vuelo.codigo} - ${vuelo.fecha} ${vuelo.hora}`;
                selectVuelo.appendChild(option);
            });
        }
    });

    // Evento cambio vuelo
    selectVuelo.addEventListener('change', function() {
        const vueloId = this.value;
        
        if (vueloId && estadoConsulta.ruta) {
            const vuelo = estadoConsulta.ruta.vuelos.find(v => v.id === vueloId);
            estadoConsulta.vuelo = vuelo;
            mostrarReservaCliente(vuelo);
        }
    });
}

function mostrarReservaCliente(vuelo) {
    limpiarResultados();
    
    if (vuelo.reservaCliente) {
        const reserva = vuelo.reservaCliente;
        const detalleDiv = document.getElementById('cliente-reserva-detalle');
        
        detalleDiv.innerHTML = `
            <div class="row">
                <div class="col-md-8">
                    <div class="card bg-light mb-4">
                        <div class="card-body">
                            <h6 class="card-title">${reserva.codigo}</h6>
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>Vuelo:</strong> ${vuelo.codigo}</p>
                                    <p><strong>Ruta:</strong> ${estadoConsulta.ruta.nombre}</p>
                                    <p><strong>Aerolínea:</strong> ${estadoConsulta.aerolinea.nombre}</p>
                                    <p><strong>Fecha y Hora:</strong> ${vuelo.fecha} ${vuelo.hora}</p>
                                    <p><strong>Duración:</strong> ${vuelo.duracion}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong>Estado:</strong> <span class="badge bg-success">${reserva.estado}</span></p>
                                    <p><strong>Tipo Asiento:</strong> ${reserva.tipoAsiento}</p>
                                    <p><strong>Total:</strong> ${reserva.total}</p>
                                    <p><strong>Equipaje Extra:</strong> ${reserva.equipajeExtra}</p>
                                    <p><strong>Método de Pago:</strong> ${reserva.metodoPago}</p>
                                    <p><strong>Fecha de Reserva:</strong> ${reserva.fechaReserva}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h6 class="mb-3">Detalle de Pasajeros</h6>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${reserva.pasajerosDetalle.map((pasajero, index) => `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${pasajero.nombre}</td>
                                        <td>${pasajero.apellido}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        `;
        
        document.getElementById('resultado-cliente').classList.remove('d-none');
    } else {
        document.getElementById('sin-resultados').classList.remove('d-none');
    }
}

function limpiarResultados() {
    document.getElementById('resultado-cliente').classList.add('d-none');
    document.getElementById('sin-resultados').classList.add('d-none');
}

function volverABusqueda() {
    limpiarResultados();
    
    // Resetear selects
    document.getElementById('cliente-aerolinea').value = '';
    document.getElementById('cliente-ruta').innerHTML = '<option value="">Primero selecciona aerolínea</option>';
    document.getElementById('cliente-ruta').disabled = true;
    document.getElementById('cliente-vuelo').innerHTML = '<option value="">Primero selecciona ruta</option>';
    document.getElementById('cliente-vuelo').disabled = true;
    
    estadoConsulta = {
        aerolinea: null,
        ruta: null,
        vuelo: null
    };
}

function imprimirReserva() {
    alert('Función de impresión simulada - En Parte 2 se implementará');
    // En Parte 2: window.print() o generar PDF
}

function cancelarReserva(reservaId) {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?\n\nEsta acción no se puede deshacer.')) {
        // En Parte 2, aquí se llamaría al backend para cancelar
        alert('Reserva cancelada exitosamente (simulación)');
        volverABusqueda();
    }
}