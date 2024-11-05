// Función para obtener los empleos desde MongoDB y mostrarlos
async function cargarEmpleos() {
    try {
        const respuesta = await fetch("http://localhost:3000/empleos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (respuesta.ok) {
            const empleos = await respuesta.json();
            mostrarEmpleos(empleos);
        } else {
            console.error("Error al obtener los empleos", respuesta.status);
        }
    } catch (error) {
        console.error("Error en la solicitud", error);
    }
}

// Función para filtrar empleos según los filtros seleccionados
function aplicarFiltros(empleos) {
    const titulo = document.getElementById("titulo").value;
    const jobType = document.getElementById("job_type").value;
    const modalidad = document.getElementById("modalidad").value;
    const salary = document.getElementById("salary").value;
    const location = document.getElementById("location").value;

    return empleos.filter(empleo => {
        return (
            (titulo === "" || empleo.titulo === titulo) &&
            (jobType === "" || empleo.job_type === jobType) &&
            (modalidad === "" || empleo.modalidad === modalidad) &&
            (salary === "" || empleo.salary === salary) &&
            (location === "" || empleo.location === location)
        );
    });
}

// Función que muestra los empleos en el DOM
function mostrarEmpleos(empleos) {
    const listaEmpleos = document.getElementById("cardSection");
    listaEmpleos.innerHTML = ""; // Limpiar la sección antes de agregar los nuevos cards
    
    const empleosFiltrados = aplicarFiltros(empleos); // Aplicar filtros
    
    if (empleosFiltrados.length === 0) {
        const card = document.createElement("div");
        card.classList.add("card-body2");
        card.innerHTML = `
            <div class="card-body2">
                <h3 class="card-title text-center">No hay empleos disponibles</h3>
            </div>
        `;
        listaEmpleos.appendChild(card);
        return;
    }
    
    empleosFiltrados.forEach(empleo => {
        const card = document.createElement("div");
        card.classList.add("card", "modern-card");

        card.innerHTML = `
            <div class="card-body">
                <h3 class="card-title text-center">${empleo.titulo}</h3>
                <p class="card-text descripcion">${empleo.descripcion}</p>
                <p class="card-text job-type">${empleo.job_type} <br>(${empleo.modalidad})</p>
                <p class="card-text location" ><strong>Lugar:</strong> <br>${empleo.location}</p>
                <p class="card-text salary"><strong>Salario:</strong> <br>${empleo.salary}</p>
                <p class="card-text title2"><strong>Vencimiento:</strong> <br> ${empleo.expiration}</p>
                <button class="btn btn-outline-primary apply-button">Solicitar Ahora</button>
            </div>
        `;

        listaEmpleos.appendChild(card);
    });
}

// Función para actualizar la lista de empleos cuando el usuario cambia los filtros
function actualizarEmpleos() {
    cargarEmpleos(); // Recargar los empleos y aplicar filtros
}

window.onload = function () {
    cargarEmpleos();

    // Escuchar cambios en los filtros
    document.getElementById("titulo").addEventListener("change", actualizarEmpleos);
    document.getElementById("job_type").addEventListener("change", actualizarEmpleos);
    document.getElementById("modalidad").addEventListener("change", actualizarEmpleos);
    document.getElementById("salary").addEventListener("change", actualizarEmpleos);
    document.getElementById("location").addEventListener("change", actualizarEmpleos);
};

function limpiarFiltros() {
    document.getElementById("titulo").value = "";
    document.getElementById("job_type").value = "";
    document.getElementById("modalidad").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("location").value = "";
    actualizarEmpleos();
}