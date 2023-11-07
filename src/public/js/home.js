// Imprime en la consola el mensaje "Connected" cuando se ejecuta este script
console.log("Connected")

// Establece una conexión de socket con el servidor
const socket = io()

// Obtiene el elemento con el ID 'container'
const container = document.getElementById('container')

// Escucha el evento 'showProducts' enviado por el servidor
socket.on('showProducts', data => {
    // Limpia el contenido del elemento 'container'
    container.innerHTML = ``

    // Para cada producto en los datos recibidos
    data.products.forEach(prod => {
        // Agrega una lista con información del producto al 'container'
        container.innerHTML += `
            <ul>
                <li>title: ${prod.title}</li> 
                <li>description: ${prod.description}</li>
                <li>code: ${prod.code}</li>
                <li>price: ${prod.price}</li>
                <li>status: ${prod.status}</li>
                <li>stock: ${prod.stock}</li>
                <li>category: ${prod.category}</li>
                <li>id: ${prod.id}</li>
            </ul>
        `
    })
})

