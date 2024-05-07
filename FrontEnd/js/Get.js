const listGet = async() => { 
    try {
        const peticion = await fetch("http://localhost:5087/Category");
        const json = await peticion.json();
        let selectId = document.querySelector("#tableBody");
        selectId.insertAdjacentHTML("beforeend", /* html */`
        ${json.map((value)=> {
                return(/* html */`
                <tr>
                    <td>${value.id}</td>
                    <td>${value.name}</td>
                    <td>${value.createdAt}</td>
                    <td>${value.updatedAt} </td>
                    <td>
                        <button type="button" class="btn" idUp=${value.id} >
                            <a href="Put.html">Actualizar</a>
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn" idUp=${value.id}>Eliminar</button>
                    </td>
                </tr>
            `)
            }).join("")}`)

            // Modificar el evento clic de los botones de Actualizar y Eliminar
            /* const idUpButtons = document.querySelectorAll('.btn[idUp]');
            idUpButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const id = event.target.getAttribute('idUp');
                    const action = event.target.innerText.trim();
                    if (action === 'Actualizar') {
                        handleUpdate(id);
                        window.location.href = "./Put.html";
                    } else if (action === 'Eliminar') {
                        handleDelete(id);
                    }
                });
            }); */

            const idUp = document.querySelectorAll(".btn")
            idUp.forEach(vid => {
                vid.addEventListener("click", () => {
                    let id = vid.getAttribute("idUp")
                    localStorage.setItem("ID",id)
                })
            })
        
    } catch (error) {
        console.error('Error obteniendo información:', error);
    }
}

async function update() {
    const name = document.getElementById('nameUp').value;
    const create = document.getElementById('createUp').value;
    const update = document.getElementById('updateUp').value;

    
    console.log(name, create, update);

    const registrationResult = await handleUpdate(name, create, update);

    // Verificar el resultado del registro y realizar acciones adicionales si es necesario
    if (registrationResult) {
        console.log("Registro exitoso:", registrationResult);
        // Redirigir a la página de inicio de sesión después del registro exitoso
    } else {
        console.log("Error al registrar usuario");
        // Mostrar un mensaje de error o realizar acciones adicionales si es necesario
    }
}

/* async function handleUpdate(id,name, create, update) {
    const url = `http://localhost:5087/Category/${id}`;
    let newUser = {
        name: name,
        create: create,
        update: update
    };

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Función para manejar la eliminación de un registro
const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:5087/Category/${id}`,{
            method: 'DELETE'
        });
        if (response.ok) {
            // Actualizar la interfaz después de eliminar el registro
            // Por ejemplo, podrías recargar la lista de registros
            // o eliminar el registro de la interfaz directamente
            console.log('Registro eliminado correctamente');
        } else {
            console.error('Error al eliminar el registro:', response.statusText);
        }
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
    }
} */

listGet();

