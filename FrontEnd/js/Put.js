async function update() {
    const name = document.getElementById('name').value;
    const create = document.getElementById('create').value;
    const update = document.getElementById('update').value;
    let code = localStorage.getItem("ID");

    
    console.log(code, name, create, update);

    const registrationResult = await registerUpdate(code, name, create, update);

    // Verificar el resultado del registro y realizar acciones adicionales si es necesario
    if (registrationResult) {
        console.log("Registro exitoso:", registrationResult);
        // Redirigir a la página de inicio de sesión después del registro exitoso
    } else {
        console.log("Error al registrar usuario");
        // Mostrar un mensaje de error o realizar acciones adicionales si es necesario
    }
}

async function registerUpdate(code,name, create, update) {
    const url = `http://localhost:5087/Category/${code}`;
    let newUser = {
        code: code,
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