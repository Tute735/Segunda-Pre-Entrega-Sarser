// Importa la librería 'fs' para trabajar con el sistema de archivos.
import fs from 'fs';

// Exporta una clase llamada 'ProductManager'.
export default class ProductManager {

    // Constructor de la clase que recibe una ruta de archivo 'path'.
    constructor(path){
        this.path=path;
    }

    // Método para obtener los productos desde el archivo.
    getProducts = async ()=> {
        try {
            // Verifica si el archivo existe en la ruta especificada.
            if (fs.existsSync(this.path)) {
                // Lee el contenido del archivo como texto.
                const data = await fs.promises.readFile(this.path, 'utf-8');
                // Convierte el texto a un objeto JavaScript (en este caso, un arreglo de productos).
                const products = JSON.parse(data);
                return products;
            } else {
                // Si el archivo no existe, devuelve un arreglo vacío.
                return [];
            }
        } catch (error) {
            // Si hay un error, devuelve un mensaje de error.
            return { status: 'error', error: error };
        }
    }

    // Método para eliminar un producto por su ID.
    deleteProduct=async (id_a_eliminar)=>{
        try{
            // Obtiene todos los productos.
            const products = await this.getProducts();
            // Encuentra el índice del producto con el ID especificado.
            const productIndex = products.findIndex(producto => producto.id === id_a_eliminar);
            // Elimina el producto y lo guarda en una variable.
            const productoEliminado = products.splice(productIndex, 1);
            // Escribe la lista de productos actualizada en el archivo.
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            // Devuelve el producto eliminado.
            return productoEliminado;
        } catch (error) {
            // Si hay un error, devuelve un mensaje de error.
            return { status: 'error', error: error };
        }
    };

    // Método para obtener un producto por su ID.
    getProductById=async (id_buscada)=>{
        try{
            // Obtiene todos los productos.
            const products = await this.getProducts();
            // Busca un producto con el ID especificado.
            const product_found = products.find((producto) => producto.id === id_buscada);
            return product_found;
        } catch (error) {
            // Si hay un error, devuelve un mensaje de error.
            return { status: 'error', error: error };
        }
    };

    // Método para guardar los productos en el archivo.
    saveProducts = async (products) =>{
        try {
            // Escribe la lista de productos en el archivo como texto JSON.
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        } catch (error){
            // Si hay un error, devuelve un mensaje de error.
            return { status: 'error', error: error };
        }
    }
}
