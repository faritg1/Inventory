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
                        <button type="button" class="btn" idUp=${value.id}>
                            <a href="Put.html">Actualizar</a>
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
                vid.addEventListener("click", () => {
                    let id = vid.getAttribute("idUp")
                    localStorage.setItem("ID",id)
                })
            })
        
    } catch (error) {
        console.error('Error obteniendo información:', error);
    }
}
listGet();