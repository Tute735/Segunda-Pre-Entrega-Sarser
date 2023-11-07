// Importa la librería mongoose para interactuar con bases de datos MongoDB desde Node.js.
import mongoose from "mongoose";

// Define el nombre de la colección como "products".
const productsCollecion = "products";

// Importa el plugin de paginación para Mongoose.
import mongoosePaginate from "mongoose-paginate-v2";

// Define el esquema (estructura) de los documentos en la colección "products".
const productsSchema = new mongoose.Schema({
    // "title" es el título del producto y es de tipo String. Es obligatorio (required).
    title: {
        type: String,
        required: true
    },
    // "description" es la descripción del producto y es de tipo String. También es obligatorio.
    description: {
        type: String,
        required: true
    },
    // "price" es el precio del producto y es de tipo Number. También es obligatorio.
    price: {
        type: Number,
        required: true
    },
    // "thumbnail" es una imagen en miniatura del producto y es de tipo String.
    thumbanil: {
        type: String
    },
    // "code" es un código identificador del producto y es de tipo String. Es obligatorio.
    code: {
        type: String,
        required: true
    },
    // "category" es la categoría del producto y es de tipo String. También es obligatorio.
    category: {
        type: String,
        required: true
    },
    // "stock" es la cantidad de productos en stock y es de tipo Number. Es obligatorio.
    stock: {
        type: Number,
        required: true
    },
    // "status" indica si el producto está activo o no. Por defecto es true (activo).
    status: {
        type: Boolean,
        default: true
    }
});

// Aplica el plugin de paginación a este esquema.
productsSchema.plugin(mongoosePaginate);

// Exporta el modelo de Mongoose para la colección "products".
export const productsModel = mongoose.model(productsCollecion, productsSchema);
