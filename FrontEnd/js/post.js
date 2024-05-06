async function performRegister() {
    const name = document.getElementById('nameRegister').value;
    const create = document.getElementById('createRegister').value;
    const update = document.getElementById('updateRegister').value;
    
    console.log(name, create, update);

    const registrationResult = await register(name, create, update);

    // Verificar el resultado del registro y realizar acciones adicionales si es necesario
    if (registrationResult) {
        console.log("Registro exitoso:", registrationResult);
        // Redirigir a la página de inicio de sesión después del registro exitoso
    } else {
        console.log("Error al registrar usuario");
        // Mostrar un mensaje de error o realizar acciones adicionales si es necesario
    }
}

async function register(name, create, update) {
    const url = "http://localhost:5087/Category";
    let newUser = {
        name: name,
        create: create,
        update: update
    };

    const options = {
        method: 'POST',
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