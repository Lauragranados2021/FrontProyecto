const apiUrl = "https://proyecto1-cincuenta.vercel.app/oficinas";
const loadTable = () => {
  document.getElementById("table-body").innerHTML = "";
  document.getElementById("select-id").innerHTML = "";
  const optionDefault = document.createElement("option");
  optionDefault.value = "Seleccione un ID";
  optionDefault.innerText = "Seleccione un ID";
  document.getElementById("select-id").appendChild(optionDefault);

  return new Promise((resolve, reject) => {
    fetch(apiUrl)
      .then((datos) => datos.json())
      .then((datos) => {
        const select = document.getElementById("select-id");

        datos.data.forEach((oficina) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                  <td>${oficina._id}</td>
                  <td>${oficina.code}</td>
                  <td>${oficina.name}</td>
                  <td>${oficina.direccion || "N/A"}</td>
                  <td>${oficina.capacidad || "N/A"}</td>
                  <td>      
                  <td><i class="bi bi-x-circle" data-value='${
                    oficina._id
                  }' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;">
                  </i></td>`;

          const option = document.createElement("option");
          option.value = oficina._id;
          option.innerText = oficina._id;
          select.appendChild(option);

          document.getElementById("table-body").appendChild(row);
        });
      })
      .catch((error) => console.log(error));
  });
};

loadTable();
function findById() {
  // Obtener el valor seleccionado del menú desplegable
  const selectedId = document.getElementById('select-id').value;

  // Si el valor seleccionado es "Seleccione un ID", limpiar la tabla y salir de la función
  if (selectedId === 'Seleccione un ID de oficina') {
    document.getElementById('table-body').innerHTML = '';
    return;
  }

  // Hacer una petición a la API para obtener los detalles de la oficina con el código seleccionado
  fetch(`https://proyecto1-cincuenta.vercel.app/oficinas/${selectedId}`)
    .then(response => response.json())
    .then(data => {
      // Si la petición es exitosa, limpiar la tabla y añadir una nueva fila con los detalles de la oficina
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = '';
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${data.data._id}</td>
        <td>${data.data.code}</td>
        <td>${data.data.name}</td>
        <td>${data.data.direccion || 'N/A'}</td>
        <td>${data.data.capacidad || 'N/A'}</td>
        <td><i class="bi bi-x-circle" data-value='${
                    data.data._id
                  }' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;">
                  </i></td>`;
      tableBody.appendChild(row);
    })
    .catch(error => {
      // Si la petición falla, mostrar un mensaje de error
      console.log('Error:', error);
    });


}



