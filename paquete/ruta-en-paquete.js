const selectPaquete = document.getElementById("select-paquete");
const selectAerolinea = document.getElementById("select-aerolinea");
const selectRuta = document.getElementById("select-ruta");
const inputCantidad = document.getElementById("input-cantidad");
const selectAsiento = document.getElementById("select-asiento");
const btnAgregar = document.getElementById("btn-agregar");

const paquetes = [
    { id: 1, nombre: "Ej paquete" },
    { id: 2, nombre: "Ej paquete 2" },
    { id: 3, nombre: "Ej paquete 3" }
];

const aerolineas = [
    { id: 1, nombre: "vuelos123" },
    { id: 2, nombre: "vuelospro" },
    { id: 3, nombre: "vuelosCristal" }
];

const rutas = {
    1: [ 
        { id: 101, nombre: "Montevideo - Santa Cruz" },
        { id: 102, nombre: "Santa Cruz - Lima" }
    ],
    2: [ 
        { id: 201, nombre: "Montevideo - Santiago" },
        { id: 202, nombre: "Santiago - Lima" }
    ],
    3: [ 
        { id: 301, nombre: "Montevideo - Madrid" },
        { id: 302, nombre: "Madrid - París" }
    ]
};

function cargarOpciones(select, datos, texto = "Selecciona una opción") {
    select.innerHTML = `<option value="">${texto}</option>`;
    datos.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.nombre;
        select.appendChild(option);
    });
}

function limpiarSelect(select, texto = "Selecciona una opción") {
    select.innerHTML = `<option value="">${texto}</option>`;
}

document.addEventListener("DOMContentLoaded", () => {
    cargarOpciones(selectPaquete, paquetes, "Selecciona un paquete");
});


selectPaquete.addEventListener("change", () => {
    if (selectPaquete.value) {
        cargarOpciones(selectAerolinea, aerolineas, "Selecciona una aerolínea");
        selectAerolinea.disabled = false;
    } else {
        selectAerolinea.disabled = true;
        selectRuta.disabled = true;
        inputCantidad.disabled = true;
        selectAsiento.disabled = true;
        btnAgregar.disabled = true;
    }
});

selectAerolinea.addEventListener("change", () => {
    if (selectAerolinea.value) {
        const idAerolinea = selectAerolinea.value;
        cargarOpciones(selectRuta, rutas[idAerolinea], "Selecciona una ruta de vuelo");
        selectRuta.disabled = false;
    } else {
        limpiarSelect(selectRuta, "Selecciona una ruta de vuelo");
        selectRuta.disabled = true;
        inputCantidad.disabled = true;
        selectAsiento.disabled = true;
        btnAgregar.disabled = true;
    }
});

selectRuta.addEventListener("change", () => {
    if (selectRuta.value) {
        inputCantidad.disabled = false;
        selectAsiento.disabled = false;
        btnAgregar.disabled = false;
    } else {
        inputCantidad.disabled = true;
        selectAsiento.disabled = true;
        btnAgregar.disabled = true;
    }
});

document.getElementById("form-ruta-paquete").addEventListener("submit", (e) => {
    e.preventDefault();

    const paquete = selectPaquete.options[selectPaquete.selectedIndex].text;
    const aerolinea = selectAerolinea.options[selectAerolinea.selectedIndex].text;
    const ruta = selectRuta.options[selectRuta.selectedIndex].text;
    const cantidad = inputCantidad.value;
    const asiento = selectAsiento.options[selectAsiento.selectedIndex].text;

    if (!cantidad || cantidad <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
    }

 
    document.getElementById("form-ruta-paquete").reset();
    selectAerolinea.disabled = true;
    selectRuta.disabled = true;
    inputCantidad.disabled = true;
    selectAsiento.disabled = true;
    btnAgregar.disabled = true;
});
