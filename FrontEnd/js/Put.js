let storageId = localStorage.getItem("ID");

const GetUp = async() => {
    try {
        const peticion = await fetch(`http://localhost:5087/Category/${storageId}`,{
            method: 'GET'
        });
        const json = await peticion.json();
        let json2 = []
        json2.push(json);
        console.log(json2);
        let selectId = document.querySelector("#formPut");
        selectId.insertAdjacentHTML("beforeend", /* html */`
        ${json2.map((value)=> {
                return(/* html */`
                <label class="form-label" for="name">Name</label>
                <input class="form-control" type="text" name="name" id="nameUp" required placeholder="${value.name}">
                <button type="button" class="btn btn-success mt-2" onclick="Update()">
                    Actualizar
                </button>
            `)
            }).join("")}`)
        } catch (error) {
            console.error('Error obteniendo información:', error);
        }
}

const Update = async() => {
    const nameUp = document.getElementById('nameUp').value;
    if(!((nameUp === null) || (nameUp === undefined) || (nameUp === ""))){
        try {
            const url = `http://localhost:5087/Category/${storageId}`;

            let newUser = {
                name: nameUp,
            };
            console.log(newUser);
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            };
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            return window.location.href = "./Get.html";
        } catch (error) {
            return (error);
        }
    }else{
        alert("Hay un campo vacio!!!");
    }
} 

GetUp();
