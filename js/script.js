//URL de la API - EndPoint
const API_URL = "https://retoolapi.dev/raxrWS/EXPO";

//funcion para llamr a la API y traer el JSON
async function ObtenerPersonas(){
    //Obtenemos la respuesta del servidor
    const res = await fetch(API_URL);

    //Convertir la respuesta del servidor en formato JSON
    const data = await res.json();

    CrearTabla(data); //Enviamos el JSON a la funcion "Crear Tabla"
}


//Funcion que creara las filas de la tabla en base a los registros que vienen de la API
function CrearTabla(datos){ //"datos" representa al JSON que viene de la API
    //Se llama al "tbody" dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody")

    //Para inyectar codigo HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(persona => (
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.edad}</td>
                <td>${persona.Correo}</td>
                <td>
                    <button>Editar</button>
                    <button onClick= "EliminarRegistro(${persona.id})">Eliminar</button>
                </td>
            <tr>
        `
    ));
}

ObtenerPersonas();







//proceso para agregar un nuevo registro
const modal = document.getElementById("modalAgregar");
const btnAgregar = document.getElementById ("btnAbriModal");
const btnCerrar = document.getElementById ("btnCerrarModal");

btnAgregar.addEventListener("click", ()=>{
    modal.showModal();
});

btnCerrar.addEventListener("click", ()=>{
    modal.close();
});


document.getElementById("frmAgregarIntegrante").addEventListener("submit", async e =>{
    e.preventDefault();

    //capturamos los valores del formulario 
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const Correo = document.getElementById("email").value.trim();

    if (!nombre|| !apellido|| !edad || !Correo){
        alert("Complete todos los campos");
        return;
    }
    //llamar a la API para enviar enviar el usuario 
    const respuesta = await fetch (API_URL, {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({nombre, apellido, edad, Correo})
    });

    if (respuesta.ok){
        alert("El registro fue agregado recientemente")
        document.getElementById("frmAgregarIntegrante").reset();
        modal.close();

        ObtenerPersonas();
    }
    else {
        alert("Hubo un error al agregar")
    }
},); //fin del formulario

//para eliminar registros 
async function EliminarRegistro(id) {
    if (confirm("¿ estas seguro que quieres borrar este Registro?")){
        await fetch(`${API_URL}/${id}`,{method: `DELETE`});
        
    }
    ObtenerPersonas();
}