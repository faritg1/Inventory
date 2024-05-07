const Post = async() => {
    const name = document.getElementById('nameRegister').value;
    const create = document.getElementById('createRegister').value;
    const update = document.getElementById('updateRegister').value;
    
    let newUser = {
        name: name,
        create: create,
        update: update
    };
    
    const url = "http://localhost:5087/Category";
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