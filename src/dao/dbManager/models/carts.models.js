// Importa la librería mongoose, que se utiliza para interactuar con bases de datos MongoDB desde Node.js.
import mongoose from "mongoose";

// Define el nombre de la colección como "carts".
const cartsCollection = "carts";

// Define el esquema (estructura) de los documentos en la colección "carts".
const cartsSchema = new mongoose.Schema({
    // El campo "products" es un arreglo de objetos que contienen información sobre los productos en el carrito.
    products: {
        type: [{
            // "product" es un identificador único de un documento en la colección "products".
            product: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "products" // Hace referencia a la colección "products".
            },
            // "quantity" es la cantidad de ese producto en el carrito. Por defecto, es 1 si no se proporciona.
            quantity: {
                type: Number,
                default: 1
            }
        }],
        default: [] // Por defecto, el carrito está vacío.
    }
});

// Middleware que se ejecuta antes de las consultas "find" o "findOne" en la colección "carts".
cartsSchema.pre(["find", "findOne"], function() {
    // Realiza una operación de "populación", llenando los campos que hacen referencia a otros documentos.
    this.populate("products.product");
});

// Exporta el modelo de Mongoose para la colección "carts".
export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
