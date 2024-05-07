export const Get = async(url, options) => { 
    try {
        const peticion = await fetch(url, options);
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
                            <a>Actualizar</a>
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn" idUp=${value.id}>Eliminar</button>
                    </td>
                </tr>
            `)
            }).join("")}`)

            const idUp = document.querySelectorAll(".btn")
            idUp.forEach(vid => {
                vid.addEventListener("click", (event) => {
                    let id = vid.getAttribute("idUp")
                    localStorage.setItem("ID",id)
                    const action = event.target.innerText.trim();
                    if (action === 'Eliminar') {
                        Delete(id);
                    }else {
                        window.location.href = "./Put.html";
                    }
                })
            })
            const Delete = async (id) => {
                const confirmDelete = confirm(`¿Está seguro de que desea eliminar el registro con ID ${id}?`);
                if (confirmDelete) {
                    try {
                        const response = await fetch(`http://localhost:5087/Category/${id}`, {
                            method: 'DELETE'
                        });
                        if (response.ok) {
                            console.log('Registro eliminado correctamente');
                        } else {
                            console.error('Error al eliminar el registro:', response.statusText);
                        }
                        window.location.href = "./Get.html";
                    } catch (error) {
                        console.error('Error al eliminar el registro:', error);
                    }
                } else {
                    console.log('Operación de eliminación cancelada por el usuario');
                }
            };
    } catch (error) {
        console.error('Error obteniendo información:', error);
    }
}

