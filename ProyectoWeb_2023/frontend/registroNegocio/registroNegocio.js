

window.onload = function() {
  //Agregar evento al formulario
  const formulario=document.getElementById("formulario");
  formulario.addEventListener("submit",enviarFormulario);

  //Agregar eventos de cloudinary
  const boton = document.getElementById("subir-imagen");
  const previstaImagen = document.getElementById("prevista-imagen");


  let myWidget = cloudinary.createUploadWidget( // Variable que almacena la funcion de cloudinary
      {
      cloudName: 'dbhmj9ozd',
      uploadPresent: "271451",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Imagen subida correctamente", result.info.url);
       
        previstaImagen.src = result.info.url;
      }
    }

  );

  boton.addEventListener("click", function () {
    myWidget.open();
  },
  false
  );


};



async function enviarFormulario(evento) {
  evento.preventDefault();
  try { 
      const nombreNegocio = document.getElementById("nombreNegocio").value;
      const descripcion = document.getElementById("descripcion").value;
      const provincia = document.getElementById("provincia").value;
      const categoria = document.getElementById("categoria").value;
      const contacto = document.getElementById("contacto").value;
      const previstaImagen = document.getElementById("prevista-imagen");

      if (
        nombreNegocio === "" || 
        descripcion === "" || 
        provincia === "" || 
        categoria === "" || 
        contacto === "" ) {

          alert("Faltan datos");
          return;
      }

      const respuesta = await fetch("http://localhost:3000/negocios", {
          method: "POST",
          headers: {
              "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            nombreNegocio: nombreNegocio,
            descripcion: descripcion, // undefined
            provincia: provincia,
            categoria: categoria,
            contacto: contacto,
            imagen: previstaImagen.src


          }) 
      });  

      if (respuesta.status === 201) {
          alert("Negocio Registrado");
          window.location.href = "../alojamiento/alojamiento.html";
      }

  } catch (error) {
      alert("Error al Registrar el Negocio");
      console.error(error);
  }



}



