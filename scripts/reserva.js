document.addEventListener('DOMContentLoaded', function() {
    const cantidadPasajes = document.getElementById('cantidad-pasajes');
    const nombresPasajeros = document.getElementById('nombres-pasajeros');
    const tipoAsiento = document.getElementById('tipo-asiento');
    const equipajeExtra = document.getElementById('equipaje-extra');
    const pagoPaquete = document.getElementById('pago-paquete');
    const selectorPaquete = document.getElementById('selector-paquete');
    
    // Actualizar pasajeros según cantidad
    cantidadPasajes.addEventListener('change', function() {
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
    pagoPaquete.addEventListener('change', function() {
        if (this.checked) {
            selectorPaquete.style.display = 'block';
        } else {
            selectorPaquete.style.display = 'none';
        }
    });
    
    // Actualizar costos 
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
    
    // Envío del formulario
    document.getElementById('form-reserva').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Reserva confirmada exitosamente!');
        window.location.href = 'reservas.html';
    });
});