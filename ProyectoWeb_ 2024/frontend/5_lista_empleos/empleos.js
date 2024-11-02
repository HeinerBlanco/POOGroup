/* Funcion para obtener los empleos desde MongoDB y mostrarlos */
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

/* Funcion que muestra los empleos en el DOM */
function mostrarEmpleos(empleos) {
    const listaEmpleos = document.getElementById("cardSection");
    listaEmpleos.innerHTML = ""; // Limpiar la sección antes de agregar los nuevos cards
    
    // Verificar si el array de empleos está vacío
    if (empleos.length === 0) {
        const card = document.createElement("div");
        card.classList.add("card", "modern-card");
        card.innerHTML = `
            <div class="card-body">
                <h3 class="card-title text-center">No hay empleos disponibles</h3>
            </div>
        `;
        listaEmpleos.appendChild(card);
        return;
    }
    
    empleos.forEach(empleo => {
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

window.onload = function () {
    cargarEmpleos();

    // Actualizar la lista cada cierto tiempo para que refleje los cambios
    setInterval(cargarEmpleos, 10000); // Actualiza cada 5 segundos
};
