const Register = async() => {
    const email = document.getElementById('email').value;
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
    if(!((email === "") || (user === "") || (pass === ""))){
        try {
            let newUser = {
                email: email,
                username: user,
                password: pass,
            };
            const url = "http://localhost:5087/User/register";
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            };
            console.log(options);
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
            return window.location.href = "./Login.html";
        } catch (error) {
            console.log("Hay un error" + error);
        }
    }else{
        alert("Hay un campo vacio!!!");
    }
} 