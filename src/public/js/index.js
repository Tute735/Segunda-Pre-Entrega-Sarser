// Imprime en la consola el mensaje "Connected" cuando se ejecuta este script
console.log("Connected")

// Establece una conexión de socket con el servidor
const socket = io()

// Variable para almacenar el nombre de usuario
let user; 

// Obtiene los elementos del DOM con los IDs 'chatBox' y 'messageLogs'
const chatBox = document.getElementById("chatBox");
const messagesLog = document.getElementById("messageLogs");

// Se muestra un cuadro de diálogo para que el usuario ingrese su nombre
Swal.fire({
    title: "Who are you?",
    input: "text",
    text: "Ingrese su email.",
    inputValidator: (value) =>{
        return !value && "El email es requerido para ingresar al chat."
    },
    allowOutsideClick: false, // No permite salir haciendo clic fuera
    allowEscapeKey: false // No permite salir con la tecla escape
}).then(result => {
    user = result.value;
    socket.emit("authenticated", user);
});

// Evento para detectar cuando se presiona una tecla en el chatBox
chatBox.addEventListener("keyup", evt => {
    if(evt.key === "Enter"){
        if (chatBox.value.trim().length > 0){
            // Evita mensajes en blanco
            socket.emit("message", { user, message: chatBox.value })
            // En el evento message enviamos el user y el message como data.
            chatBox.value = ""; // Limpia el chatbox
        }
    }
})

// Escucha el evento 'messageLogs' enviado por el servidor
socket.on("messageLogs", data => {
    let messages = "";
    data.forEach(message => {
        messages += `${message.user} says: ${message.message}<br/>`
    });
    messagesLog.innerHTML = messages;
})

// Escucha el evento 'newUserConnected' enviado por el servidor
socket.on("newUserConnected", data => {
    // Muestra un mensaje de notificación cuando un nuevo usuario se conecta
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        title: `${data} has joined`,
        icon: "success"
    })
})
