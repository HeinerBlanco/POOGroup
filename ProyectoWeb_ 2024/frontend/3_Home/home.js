window.onload = function () {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    
    if (usuario) {
        const nombreUsuario = document.getElementById("nombreUsuario");
        nombreUsuario.textContent = usuario.name;
    }
};

function salir() {
    Swal.fire({
        title: '¿Deseas cerrar sesión?',
        text: "Se eliminará el usuario de la sesión actual.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('usuario');
            
            Swal.fire({
                icon: 'success',
                title: 'Sesión cerrada',
                text: 'Has salido de tu cuenta con éxito.',
                showConfirmButton: false,
                timer: 1500
            });
            
            setTimeout(() => {
                window.location.href = '../2_Login/login.html';
            }, 1500);
        }
    });
}
