const apiUrl = "https://proyecto1-cincuenta.vercel.app/oficinas";
const loadTable = () => {
  document.getElementById("table-body").innerHTML = "";
  document.getElementById("select-id").innerHTML = "";
  document.getElementById("selectEditar").innerHTML = "";
  const optionDefault = document.createElement("option");
  const optionDefaultEdit = document.createElement("option")
  optionDefault.value = "Seleccione un ID";
  optionDefault.innerText = "Seleccione un ID";

  document.getElementById("select-id").appendChild(optionDefault);
  optionDefaultEdit.value = "Seleccione un ID";
  optionDefaultEdit.innerText = "Seleccione un ID";
  document.getElementById("selectEditar").appendChild(optionDefaultEdit);

  return new Promise((resolve, reject) => {
    fetch(apiUrl)
      .then((datos) => datos.json())
      .then((datos) => {
        const select = document.getElementById("select-id");
        const selectEditar = document.getElementById("selectEditar");

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
          const optionEditar = document.createElement("option");
          optionEditar.value = oficina._id;
          optionEditar.innerText = oficina._id;
          selectEditar.appendChild(optionEditar);

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
const obtainDatos=() => { 
  const codeof = document.getElementById("code").value;
  const nameof = document.getElementById("nombre").value;
  const direccionof = document.getElementById("direccion").value;
  const capacidadof = document.getElementById("capacidad").value;
  if(codeof === "" || nameof === "" || direccionof === "" || capacidadof === ""){
    alert("Todos los campos son requeridos");
    
  }else{
    const  data ={
      code:codeof,
      name:nameof,
      direccion:direccionof,
      capacidad:capacidadof
    }
    return JSON.stringify(data);
  }
}
const add= ()=>{
  fetch("https://proyecto1-cincuenta.vercel.app/oficinas",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:obtainDatos(),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if(data.state){

      loadTable();
      alert("Oficina agregada con éxito");
    }else if(data.state==208){
      alert("La oficina ya existe");
    }
    else{
      alert("Error al agregar la oficina");
    }
  })
  .catch((error) => console.log(err.message));
};
const  editing=()=>{
    // Obtén el ID de la oficina seleccionada
    const officeId = document.getElementById('selectEditar').value;
    // Hacer una petición a la API para obtener los detalles de la oficina con el código seleccionado
  fetch(`https://proyecto1-cincuenta.vercel.app/oficinas/${officeId}`)
  .then(response => response.json())
  .then(data => {
    // Si la petición es exitosa, limpiar la tabla y añadir una nueva fila con los detalles de la oficina
      document.getElementById('updatecode').value = data.data.code;
      document.getElementById('updatenombre').value = data.data.name;
      document.getElementById('updatedireccion').value = data.data.direccion;
      document.getElementById('updatecapacidad').value = data.data.capacidad;
     
  })
  .catch(error => {
    // Si la petición falla, mostrar un mensaje de error
    console.log('Error:', error);
  });
  
  }
  const edit=()=>{
    const i= document.getElementById("selectEditar").value;
    const codeof = document.getElementById("updatecode").value;
    const nameof = document.getElementById("updatenombre").value;
    const direccionof = document.getElementById("updatedireccion").value;
    const capacidadof = document.getElementById("updatecapacidad").value;
    if(codeof === "" || nameof === "" || direccionof === "" || capacidadof === ""){
      alert("Todos los campos son requeridos");
      
    }
      const  data ={
        code:codeof,
        name:nameof,
        direccion:direccionof,
        capacidad:capacidadof
      }
      
    fetch(`https://proyecto1-cincuenta.vercel.app/oficinas/${i}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if(data.state){
  
        loadTable();
        document.getElementById('updatecode').value = "";
        document.getElementById('updatenombre').value = "";
        document.getElementById('updatedireccion').value = "";
        document.getElementById('updatecapacidad').value = "";
        alert("Oficina actalizada con éxito");
      }
      else{
        alert("Error al actualizar la oficina");
      }
    })
    .catch((error) => console.log(error.message));

  }
  const drop=(id)=>{
    fetch(`https://proyecto1-cincuenta.vercel.app/oficinas/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if(data.state){
  
        loadTable();
        alert("Oficina eliminada con éxito");
      }
      else{
        alert("Error al eliminar la oficina");
      }
    })
    .catch((error) => console.log(error.message));
  }


  