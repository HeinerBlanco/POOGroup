document.getElementById("loadProfileBtn").addEventListener("click", async () => {
    await obtenerPerfiles();
    mostrarPerfiles(perfiles);
});


const perfiles = []

async function obtenerPerfiles() {
    try {
        const respuesta = await fetch("http://localhost:3000/perfiles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (respuesta.ok) {
            const todosLosPerfiles = await respuesta.json();

            // limpiar la lista de perfiles y agregar los nuevos
            perfiles.length = 0;
            perfiles.push(...todosLosPerfiles);

        } else {
            console.error("Error al obtener los perfiles", respuesta.status);
        }
    } catch (error) {
        console.error("Error en la solicitud", error);
    }
}

// Función para mostrar los perfiles en el DOM

function mostrarPerfiles(perfilesFiltrados) {
    const listaPerfiles = document.getElementById("cardSection");
    if (!listaPerfiles) {
        console.error("El elemento 'cardSection' no se encuentra en el DOM");
        return;
    }

    listaPerfiles.innerHTML = "";

    if (perfilesFiltrados.length === 0) {
        listaPerfiles.innerHTML = `<p class="modern-card">No se encontraron perfiles en la base de datos.</p>`;
        listaPerfiles.style.textAlign = "center";
        listaPerfiles.style.padding = "20px";
        listaPerfiles.style.fontSize = "1.5rem";
        listaPerfiles.style.color = "red";
        return;
    }

    perfilesFiltrados.forEach(perfil => {
        const card = document.createElement("div");
        card.classList.add("card", "modern-card");
    
        card.innerHTML = `
        <img src="${perfil.previstaImagen}" id="imagen" alt="Imagen de perfil" class="card-img-top" style="width: 100%; height: auto;">
        <div class="card-body">
            <h3 class="card-title text-center">${perfil.nombre}</h3>
            <p class="card-text descripcion">${perfil.email}</p>
            <p class="card-text job-type">${perfil.phone} <br>${perfil.experience} años de experiencia</p>
            <p class="card-text location"><strong>Modalidad:</strong> <br>${perfil.modalidad}</p>
            <p class="card-text salary"><strong>Tipo de trabajo:</strong> <br>${perfil.job_type}</p>
            <p class="card-text title2"><strong>Provincia:</strong> <br>${perfil.location}</p>
        </div>
    `;
            listaPerfiles.appendChild(card);
    });
}
