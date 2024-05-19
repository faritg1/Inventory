function LoginOk() {
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
            throw new Error(`Error en la solicitud de inicio de sesión: ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        throw error; // Lanza el error para manejarlo en performLogin
    }
}

async function performLogin(usernameLogin, passwordLogin) {
    const warningDiv = document.getElementById('login-warning');
    warningDiv.style.display = 'none'; // Ocultar advertencia al iniciar
    
    try {
        const result = await login(usernameLogin, passwordLogin);
        
        if (!result || !result.token) {
            warningDiv.textContent = 'Inicio de sesión fallido o token no recibido';
            warningDiv.style.display = 'block';
            return;
        }
        
        const token = result.token;
        localStorage.setItem('token', token);

        const arrayT = token.split('.');
        if (arrayT.length !== 3) {
            warningDiv.textContent = 'Token JWT inválido';
            warningDiv.style.display = 'block';
            return;
        }

        const tokenPay = JSON.parse(atob(arrayT[1]));
        
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const isTokenExpired = currentTimestamp >= tokenPay.exp;
        
        if (!isTokenExpired) {
            console.log("Login exitoso. Token:");
            window.location.href = "./Index.html";
        } else {
            warningDiv.textContent = 'El token ha expirado';
            warningDiv.style.display = 'block';
        }
    } catch (error) {
        warningDiv.textContent = 'Nombre de usuario o contraseña incorrectos';
        warningDiv.style.display = 'block';
    }
}