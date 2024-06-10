const loadTable = () => {
  document.getElementById("table-body").innerHTML = "";
  document.getElementById("select-id").innerHTML = "";
  document.getElementById("selectEditar").innerHTML = "";

  const optionDefault = document.createElement("option");
  const optionDefaultEdit = document.createElement("option");

  optionDefault.value = "Seleccione un ID";
  optionDefault.innerText = "Seleccione un ID";

  document.getElementById("select-id").appendChild(optionDefault);
  optionDefaultEdit.value = "Seleccione un ID";
  optionDefaultEdit.innerText = "Seleccione un ID";
  document.getElementById("selectEditar").appendChild(optionDefaultEdit);

  return new Promise((resolve, reject) => {
    fetch("https://proyecto1-cincuenta.vercel.app/alquiler")
      .then((datos) => datos.json())
      .then((datos) => {
        const select = document.getElementById("select-id");
        const selectEditar = document.getElementById("selectEditar");

        datos.data.forEach((contrato) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                    <td>${contrato._id}</td>
                    <td>${contrato.code}</td>
                    <td>${contrato.ContractStartDate}</td>
                    <td>${contrato.ContractEndDate || "N/A"}</td>
                    <td>${contrato.price || "N/A"}</td>
                    <td>${contrato.oficina.name || "N/A"}</td>
                    <td>      
                    <td><i class="bi bi-x-circle" data-value='${
                      contrato._id
                    }' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;">
                    </i></td>`;

          const option = document.createElement("option");
          option.value = contrato._id;
          option.innerText = contrato._id;
          select.appendChild(option);
          const optionEditar = document.createElement("option");
          optionEditar.value = contrato._id;
          optionEditar.innerText = contrato._id;
          selectEditar.appendChild(optionEditar);

          document.getElementById("table-body").appendChild(row);
        });
      })
      .catch((error) => console.log(error));
  });
};

loadTable();
const loadTableOficina = () => {
  document.getElementById("selectOficina").innerHTML = "";
  document.getElementById("selectOficinaUpdate").innerHTML = "";
  const optionDefaultOficina = document.createElement("option");
  const optionDefaultOficinaUpdate = document.createElement("option");
  optionDefaultOficina.value = "Seleccione un ID";
  optionDefaultOficina.innerText = "Seleccione un ID";
  document.getElementById("selectOficina").appendChild(optionDefaultOficina);
  optionDefaultOficinaUpdate.value = "Seleccione un ID";
  optionDefaultOficinaUpdate.innerText = "Seleccione un ID";
  document
    .getElementById("selectOficinaUpdate")
    .appendChild(optionDefaultOficinaUpdate);
  fetch("https://proyecto1-cincuenta.vercel.app/oficinas")
    .then((datos) => datos.json())
    .then((datos) => {
      const selectOficina = document.getElementById("selectOficina");
      const selectOficinaUpdate = document.getElementById(
        "selectOficinaUpdate"
      );
      datos.data.forEach((oficina) => {
        const optionOficina = document.createElement("option");
        optionOficina.value = oficina._id;
        optionOficina.innerText = oficina.name;
        selectOficina.appendChild(optionOficina);
        const optionOficinaUpdate = document.createElement("option");
        optionOficinaUpdate.value = oficina._id;
        optionOficinaUpdate.innerText =oficina.name;
        selectOficinaUpdate.appendChild(optionOficinaUpdate);
      });
    })
    .catch((error) => console.log(error));
};
loadTableOficina();


function findById() {
  // Obtener el valor seleccionado del menú desplegable
  const selectedId = document.getElementById('select-id').value;

  // Si el valor seleccionado es "Seleccione un ID", limpiar la tabla y salir de la función
  if (selectedId === 'Seleccione un ID de Contrato') {
    document.getElementById('table-body').innerHTML = '';
    return;
  }

  // Hacer una petición a la API para obtener los detalles de la oficina con el código seleccionado
  fetch(`https://proyecto1-cincuenta.vercel.app/alquiler/${selectedId}`)
    .then(response => response.json())
    .then(data => {
      // Si la petición es exitosa, limpiar la tabla y añadir una nueva fila con los detalles de la oficina
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = '';
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${data.data._id}</td>
        <td>${data.data.ContractStartDate}</td>
        <td>${data.data.ContractEndDate}</td>
        <td>${data.data.price || 'N/A'}</td>
        <td>${data.data.oficina.name || 'N/A'}</td>
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
const add=() => { 
  const codeof = document.getElementById("code").value;
  const inicio = document.getElementById("inicio").value;
  const fin = document.getElementById("fin").value;
  const price = document.getElementById("precio").value;
  const oficina = document.getElementById("selectOficinaUpdate").value;
    const  data ={
      code:codeof,
      ContractStartDate:inicio,
      ContractEndDate:fin,
      price:price
    }
    fetch(`https://proyecto1-cincuenta.vercel.app/alquiler/${oficina}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if(data.state){
  
        loadTable();
        alert("Contrato agregada con éxito");
        document.getElementById("code").value="";
        document.getElementById("inicio").value="";
        document.getElementById("fin").value="";
        document.getElementById("precio").value="";
        document.getElementById("selectOficinaUpdate").value="";
      }else if(data.state==208){
        alert("El contrato ya existe");
      }
      else if(data.state==404){
        alert("La oficina no existe");
      }
      else{
        alert("Error al agregar la oficina");
      }
    })
    .catch((error) => console.log(err.message));

  }
  const  editing=()=>{
    // Obtén el ID de la oficina seleccionada
    const alquiler = document.getElementById('selectEditar').value;
    // Hacer una petición a la API para obtener los detalles de la oficina con el código seleccionado
  fetch(`https://proyecto1-cincuenta.vercel.app/alquiler/${alquiler}`)
  .then(response => response.json())
  .then(data => {
    let startDate = new Date(data.data.ContractStartDate);
  let formattedStartDate = startDate.toISOString().substring(0, 16);

  let endDate = new Date(data.data.ContractEndDate);
  let formattedEndDate = endDate.toISOString().substring(0, 16);
    // Si la petición es exitosa, limpiar la tabla y añadir una nueva fila con los detalles de la oficina
    document.getElementById('updatecode').value = data.data.code;
  document.getElementById('updateinicio').value = formattedStartDate;
  document.getElementById('updatefin').value = formattedEndDate;
  document.getElementById('updateprecio').value = data.data.price;
  document.getElementById('selectOficina').value = data.data.oficina.name;
     
  })
  .catch(error => {
    // Si la petición falla, mostrar un mensaje de error
    console.log('Error:', error);
  });
  
  }
  const edit=()=>{
    const i= document.getElementById("selectEditar").value;
    const codeof = document.getElementById("updatecode").value;
    const inicio = document.getElementById("updateinicio").value;
    const fin = document.getElementById("updatefin").value;
    const precio= document.getElementById("updateprecio").value;
    const oficinas = document.getElementById("selectOficina").value;
    alert(oficinas)
    
      const  data ={
        code:codeof,
        ContractStartDate:inicio,
        ContractEndDate:fin,
        price:precio,
        oficinasId:oficinas
      }
      
    fetch(`https://proyecto1-cincuenta.vercel.app/alquiler/${i}`,{
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
        document.getElementById('updateinicio').value = "";
        document.getElementById('updatefin').value = "";
        document.getElementById('updateprecio').value = "";
        document.getElementById("selectOficina").value="";
        alert("Contrato actalizada con éxito");
      }
      else{
        alert("Error al actualizar el contrato");
      }
    })
    .catch((error) => console.log(error.message));

  }
  const drop=(id)=>{
    fetch(`https://proyecto1-cincuenta.vercel.app/alquiler/${id}`,{
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
