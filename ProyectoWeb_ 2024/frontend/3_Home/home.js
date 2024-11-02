

function openModal(title, description, imageSrc) {
    document.getElementById("modalTitle").innerText = `Sucursal ${title}`;
    document.getElementById("modalDescription").innerText = `Dirección: ${description}`;
    document.getElementById("modalImage").src = imageSrc;
    document.getElementById("modal").style.display = "block";
  }
  
  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }
  
  window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
