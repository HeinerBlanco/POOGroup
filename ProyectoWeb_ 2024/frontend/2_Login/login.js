// Obtener datos por correo único
async function obtenerDatosPorCorreo(correo) {
    try {
        const respuesta = await fetch(`http://localhost:3000/empleos/${correo}`);
        console.log("Respuesta del servidor en obtenerDatosPorCorreo:", respuesta);

        if (!respuesta.ok) {
            throw new Error("Error al obtener datos del servidor");
        }

        const usuario = await respuesta.json();
        console.log("Datos del usuario obtenidos:", usuario);

        document.getElementById("nombreUsuario").textContent = usuario.name;
        
        // Almacenar el nombre de usuario en el localStorage
        localStorage.setItem("user", JSON.stringify(usuario.name));
    } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
    }
}

// Enviar formulario
async function enviarFormulario(evento) {
    evento.preventDefault();
    try {
        const correoElectronico = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Validar que no falten datos
        if (correoElectronico === "" || password === "") {
            alert("Faltan datos");
            return;
        }

        console.log("Enviando datos de inicio de sesión:", { correoElectronico, password});

        const respuesta = await fetch(`http://localhost:3000/users/email/${correoElectronico}`);
        console.log("Respuesta del servidor:", respuesta);

        if (respuesta.status === 200) {
            const usuario = await respuesta.json();
            console.log("Usuario encontrado:", usuario);
            alert(`Bienvenido ${usuario.name}`);
            // funcion que guarda el id del usuario en el localStorage para despues usarlo en las solicitudes de empleos
            localStorage.setItem("usuarioId", usuario._id);


            // Llamar a la función para obtener el usuario de la base de datos
            obtenerDatosPorCorreo(correoElectronico);

            // Almacenar el usuario en el localStorage
            localStorage.setItem("usuario", correoElectronico);

            window.location.href = "../3_Home/home.html";
        } else if (respuesta.status === 404) {
            alert("Correo o contraseña incorrectos");
        } else {
            alert("Error al iniciar sesión");
        }
    } catch (error) {
        alert("Error al iniciar sesión");
        console.error("Error en la solicitud:", error);
    }
}

// Añadir el evento al cargar la página
window.onload = function() {
    const formulario = document.getElementById("formularioLogin");
    formulario.addEventListener("submit", enviarFormulario);
};
