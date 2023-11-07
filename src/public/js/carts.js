// Selecciona todos los elementos con la clase "addButton"
const addButton = document.querySelectorAll(".addButton");

// Asigna un evento de click a cada botón de agregar
addButton.forEach(addBtn => {
  addBtn.addEventListener("click", (event) => {
    // Obtiene el ID del producto desde el atributo 'id' del botón
    const productId = event.target.id;

    // Define la cantidad a agregar, en este caso es 1
    const amount = {"quantity": 1};

    // Realiza una solicitud PUT a la API para agregar el producto al carrito
    fetch(`/api/carts/6545642cca55f5b5ab6ea0d6/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(amount),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(result => result.json())
    .then(json => console.log(json));
  })
})

// Función de ejemplo 'addToCart', parece que no se utiliza en este archivo
const addToCart = (id) => {
  console.log("id:", id);
  console.log("Agregado");
}
