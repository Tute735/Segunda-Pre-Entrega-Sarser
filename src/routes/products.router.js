// Importa el módulo 'Router' de Express para definir rutas.
import { Router } from 'express';

// Importa la ruta de productos desde 'utils.js'.
import { productPath } from '../utils.js';

// Crea una instancia de Router.
const router = Router();

// Importa la clase 'ProductManager' desde la carpeta correspondiente.
import ProductManager from "../dao/dbManager/products.manager.js"

// Crea una instancia de 'ProductManager' con la ruta especificada.
const productManager = new ProductManager(productPath);

// Ruta para obtener todos los productos.
router.get('/', async (req, res) => {
    try{
        const products = await productManager.getAll();
        return res.status(200).send({status: "success", payload:products})
    }
    catch(error) {
        return res.send({ status: 'error', error: error })
    }
});

// Ruta para obtener un producto por su ID.
router.get("/:pid", async(req,res)=>{
    try{
        const {pid} =req.params;
        const product = await productManager.getProductById(pid)
        if (!product){
            return res.status(404).send({status:"error",message:"Product not found"})
        }
        res.send({status:"success",payload:product});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({error:error.message});
    }
});

// Ruta para eliminar un producto por su ID.
router.delete("/:pid", async (req,res)=>{
    try {
        const {pid} =req.params;
        const result = await productManager.delete(pid);
        const io = req.app.get('socketio');
        const products=await productManager.getAll();
        io.emit("showProducts", {products:await productManager.getAll()});
        res.status(201).send({status:"success",payload:result});
    }
    catch(error) {
        res.status(500).send({status:"error",message:error.message})
    }
});

// Ruta para crear un nuevo producto.
router.post("/", async (req,res)=>{
    try {
        const {title,description,price,thumbnail,code,category,stock,status} = req.body;
        const io = req.app.get('socketio');
        if (!title || !description || !price || !code || !category ||!stock) {
            return res.status(400).send({status:"error", message:"incomplete values"})};
        const result = await productManager.save({
            title, 
            description,
            price,
            thumbnail,
            code,
            category,
            stock,
            status});
        if (!result) {return res.status(400).send({status:"error",message:"product already exists"})};
        const products=await productManager.getAll();
        io.emit("showProducts", {products:products});
        res.status(201).send({status:"success",payload:result});
    }
    catch(error) {
        res.status(500).send({status:"error",message:error.message})
    }
});

// Ruta para actualizar un producto por su ID.
router.put("/:pid", async (req,res)=>{
    try {
        const {title,description,price,thumbnail,code,category,stock,status} = req.body;
        const {pid} =req.params;
        const io = req.app.get('socketio');
        if (!title || !description || !price || !code || !category ||!stock) {
            return res.status(400).send({status:"error", message:"incomplete values"})};
        const result = await productManager.update(pid,{
            title, 
            description,
            price,
            thumbnail,
            code,
            category,
            stock,
            status});
        const products=await productManager.getAll();
        io.emit("showProducts", {products:products});
        res.status(201).send({status:"success",payload:result});
    }
    catch(error) {
        res.status(500).send({status:"error",message:error.message})
    }
});

// Exporta el router con las rutas definidas.
export default router;
