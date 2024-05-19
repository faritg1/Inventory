function LoginOk() {
    // Obtener los valores de los campos de entrada
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    performLogin(username, password);
}


async function login(username, password) {
    const url = "http://localhost:5087/User/token";
    let update = {
        username: username,
        password: password,
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update)
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Error en la solicitud de inicio de sesión');
        }
        const result = await response.json(); // Cambiado a response.json() para que coincida con el formato esperado
        return result;
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        return null;
    }
}

async function performLogin(usernameLogin, passwordLogin) {
    const result = await login(usernameLogin, passwordLogin);
    
    if (!result || !result.token) {
        console.error('Inicio de sesión fallido o token no recibido');
        return;
    }
    
    const token = result.token;
    localStorage.setItem('token', token);

    // Dividir el token en sus partes
    const arrayT = token.split('.');
    if (arrayT.length !== 3) {
        console.error('Token JWT inválido');
        return;
    }
    
    // Decodificar la carga útil (payload) del token
    const tokenPay = JSON.parse(atob(arrayT[1]));
    
    // Validar si el token ha expirado
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const isTokenExpired = currentTimestamp >= tokenPay.exp;
    
    if (!isTokenExpired) {
        console.log("Login exitoso. Token:");
        window.location.href = "./Index.html";
    } else {
        console.error('El token ha expirado');
    }
}