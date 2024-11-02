window.onload = function() {
    const formulario = document.getElementById("formulario_publicar_empleo");
    formulario.addEventListener("submit", enviarFormulario);
};

// Enviar formulario a la base de datos
async function enviarFormulario(evento) {
    evento.preventDefault();
    try {
        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const salary = document.getElementById("salary").value;
        const location = document.getElementById("location").value;
        const job_type = document.getElementById("job_type").value;
        const modalidad = document.getElementById("modalidad").value;
        const expiration = document.getElementById("expiration").value;

        // Validación de los campos
        if (!titulo || !descripcion || !salary || !location || !job_type || !modalidad || !expiration) {
            alert("Faltan datos");
            return;
        }

        const respuesta = await fetch("http://localhost:3000/empleos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: titulo,
                descripcion: descripcion,
                salary: salary,
                location: location,
                job_type: job_type,
                modalidad: modalidad,
                expiration: expiration
            })
        });

        if (respuesta.status === 201) {
            alert("Empleo publicado exitosamente");
            // Limpia los campos del formulario
            document.getElementById("formulario_publicar_empleo").reset();
            window.location.href = "../5_lista_empleos/empleos.html";
        } else {
            const errorData = await respuesta.text(); // Obtener el mensaje de error del servidor
            alert("Error al publicar el empleo: " + errorData);
        }
    } catch (error) {
        alert("Error al publicar el empleo");
        console.error("Error:", error);
    }
}
