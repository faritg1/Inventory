const Post = async() => {
    const name = document.getElementById('nameRegister').value;
    if(!((name === ""))){
        try {
            let newUser = {
                name: name,
            };
            
            const url = "http://localhost:5087/Category";
            const options = {
                method: 'POST',
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
            return "Hay un error" + error;
        }
    }else{
        alert("Hay un campo vacio!!!");
    }
} 