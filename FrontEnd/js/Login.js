function LoginOk() {
    // Obtener los valores de los campos de entrada
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    performLogin(username, password);
}

async function login(username, password) {
    const url = "http://localhost:5271/User/login";
    let update = {
        username: username,
        password: password,

    };
    console.log(update)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update)
    };
    console.log(options)
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return (result);
    } catch (error) {
        console.error(error);
        return null;
    }

}
async function performLogin(usernameLogin, passwordLogin) {
    const token = await login(usernameLogin, passwordLogin);
    console.log(token);

    const arrayT = token.split('.');
    const tokenPay = JSON.parse(atob(arrayT[1]));
    console.log(tokenPay);
    let dateToken = Math.floor(new Date().getTime() / 1000) >= tokenPay?.sub
    console.log(dateToken);
    if (dateToken === false) {
        console.log("Login exitoso. Token:");
        window.location.href = "./Index.html";
    }
    
}