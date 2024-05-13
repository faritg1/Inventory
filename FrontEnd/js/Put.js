const Update = async() => {
    let storageId = localStorage.getItem("ID");
    const nameUp = document.getElementById('nameUp').value;
    const createUp = document.getElementById('createUp').value;
    const updateUp = document.getElementById('updateUp').value;
    if(!((nameUp === null) || (nameUp === undefined) || (nameUp === ""))){
        try {
            const url = `http://localhost:5087/Category/${storageId}`;

            let newUser = {
                name: nameUp,
                create: createUp,
                update: updateUp
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