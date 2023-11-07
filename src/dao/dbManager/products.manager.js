// Importa el modelo de productos ("productsModel") desde la carpeta "dbManager/models".
import { productsModel } from "../dbManager/models/products.models.js";

// Exporta una clase llamada "Products".
export default class Products {
    // Constructor de la clase. Se ejecuta cuando se crea una instancia de la clase.
    constructor() {
        console.log("Working with products from DB");
    }

    // Método para obtener todos los productos de la base de datos.
    getAll = async () => {
        // Obtiene todos los productos y los convierte a un formato más legible (POJO).
        const products = await productsModel.find().lean();
        return products;
    }

    // Método para obtener un producto por su ID.
    getProductById = async (id) => {
        // Obtiene un producto por su ID y lo convierte a un formato más legible (POJO).
        const product = await productsModel.findOne({ _id: id }).lean();
        return product;
    }

    // Método para actualizar un producto por su ID.
    update = async (pid, product) => {
        // Actualiza un producto por su ID con la información proporcionada.
        const result = await productsModel.updateOne({ _id: pid }, product);
        return result;
    }

    // Método para eliminar un producto por su ID.
    delete = async (pid) => {
        // Elimina un producto por su ID.
        const result = await productsModel.deleteOne({ _id: pid });
        return result;
    }

    // Método para crear un nuevo producto en la base de datos.
    save = async (product) => {
        // Comprueba si ya existe un producto con el mismo código.
        const productAlreadyExists = await productsModel.findOne({ code: product.code });
        // Si no existe, crea el nuevo producto.
        const result = !productAlreadyExists && await productsModel.create(product);
        return result;
    }
};
