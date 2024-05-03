// Función para obtener datos de la base de datos
const getDataFromDatabase = async () => {
    try {
        // Realizar la solicitud GET al servidor intermedio que maneja las solicitudes a la base de datos
        const response = await fetch(`http://localhost:5087/Category`);
        
        // Verificar si la solicitud fue exitosa (código de respuesta 200)
        if (!response.ok) {
            // Si la respuesta no es exitosa, lanzar un error con el mensaje de error recibido del servidor
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        
        // Extraer el cuerpo de la respuesta como JSON
        const data = await response.json();
        
        // Retornar los datos obtenidos
        return data;
    } catch (error) {
        // Manejar cualquier error que pueda surgir durante la conexión
        console.error('Error al obtener datos:', error.message);
        // Retornar null en caso de error para indicar que no se pudieron obtener los datos
        return null;
    }
};

// Función para mostrar los datos obtenidos en la consola
const displayData = async () => {
    // Obtener los datos de la base de datos
    const data = await getDataFromDatabase();
    
    // Verificar si se obtuvieron datos correctamente
    if (data !== null) {
        // Mostrar los datos en la consola
        console.log(data);
    } else {
        // Mostrar un mensaje de error en caso de que no se pudieran obtener los datos
        console.log('No se pudieron obtener los datos.');
    }
};

// Llamar a la función para mostrar los datos
displayData();
