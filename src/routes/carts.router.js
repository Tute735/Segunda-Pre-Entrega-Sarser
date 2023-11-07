// Importa el módulo 'Router' de Express para definir rutas.
import { Router } from 'express';

// Importa rutas de archivos y productos desde 'utils.js'.
import { cartPath } from '../utils.js';
import { productPath } from '../utils.js';

// Importa la librería 'fs' para trabajar con el sistema de archivos.
import fs from 'fs';

// Importa la clase 'CartManager' desde la carpeta correspondiente.
import CartManager from "../dao/dbManager/carts.manager.js";

// Importa la clase 'ProductManager' desde la carpeta correspondiente.
import ProductManager from "../dao/dbManager/products.manager.js"

// Crea una instancia de Router.
const router = Router();

// Crea instancias de 'CartManager' y 'ProductManager' con las rutas especificadas.
const cartManager = new CartManager(cartPath);
const productManager = new ProductManager(productPath);

// Define una ruta para obtener un carrito por su ID.
router.get("/:cid", async(req,res)=>{
    try{
        const {cid} =req.params;
        const cart = await cartManager.getCartById(cid)
        if (!cart){
            return res.status(404).send({status:"error",message:"Cart not found"})
        }
        res.send({status:"success",payload:cart});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({error:error.message});
    }
});

// Define una ruta para crear un nuevo carrito.
router.post('/', async (req, res) => {
    try {
        const result = await cartManager.save();
        res.status(201).send({ status: 'success', message: "cart created", payload: result });
    }
    catch (error){
        console.log(error.message);
        res.status(500).send({error:error.message});
    }
});

// Define una ruta para añadir un producto a un carrito.
router.post('/:cid/product/:pid', async (req,res)=>{
    try{
        const cid =req.params.cid;
        const pid =req.params.pid;
        const cart = await cartManager.getCartById(cid);
        const product = await productManager.getProductById(pid);
        if (!cart){
            return res.status(404).send({status:"error",message:"Cart not found"})
        }
        if (!product){
            return res.status(404).send({status:"error",message:"Product not found"})
        }
        if (cart.products.length===0){
            cart.products.push({"product":pid,"quantity":1})
        } else{
            const indexProductInCart = cart.products.findIndex(product=>product.product._id.toString()===pid)
            if (indexProductInCart!==-1){
                cart.products[indexProductInCart].quantity++;
            } else {
                cart.products.push({"product":pid,"quantity":1});
            };
        }            
        const result = await cartManager.update(cid,{"products": cart.products});
        res.status(201).send({status:"success",payload:result});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({error:error.message});
    }
});

// Define una ruta para eliminar un carrito por su ID.
router.delete("/:cid", async (req,res)=>{
    try {
        const {cid} =req.params;
        const cart = await cartManager.getCartById(cid);
        if (!cart){
            return res.status(404).send({status:"error",message:"Cart not found"})
        }
        const result = await cartManager.delete(cid);
        res.status(200).send({status:"success",payload:result});
    }
    catch(error) {
        res.status(500).send({status:"error",message:error.message})
    }
});

// Define una ruta para eliminar un producto de un carrito por sus IDs.
router.delete('/:cid/product/:pid', async (req,res)=>{
    try{
        const cid =req.params.cid;
        const pid =req.params.pid;
        const cart = await cartManager.getCartById(cid);
        const product = await productManager.getProductById(pid);
        if (!cart){
            return res.status(404).send({status:"error",message:"Cart not found"})
        }
        if (!product){
            return res.status(404).send({status:"error",message:"Product not found"})
        }
        if (cart.products.length!==0){
            const indexProductInCart = cart.products.findIndex(product=>product.product._id.toString()===pid)
            if (indexProductInCart!==-1){
                cart.products.splice(indexProductInCart,1);
            } 
        }            
        const result = await cartManager.update(cid,{"products": cart.products});
        res.status(200).send({status:"success",payload:result});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({error:error.message});
    }
});

// Define una ruta para actualizar un carrito por su ID.
router.put("/:cid", async (req,res)=>{
    try {
        const {products} = req.body;
        const {cid} =req.params;
        if (!products) {
            return res.status(400).send({status:"error", message:"incomplete values"})
        };
        const result = await cartManager.update(cid,{"products": products})
        res.status(201).send({status:"success",payload:result});
    }
    catch(error) {
        res.status(500).send({status:"error",message:error.message})
    }
});

// Define una ruta para actualizar la cantidad de un producto en un carrito por sus IDs.
router.put('/:cid/products/:pid', async (req,res)=>{
    try{
        const cid =req.params.cid;
        const pid =req.params.pid;
        const amount = req.body;
        const cart = await cartManager.getCartById(cid);
        const product = await productManager.getProductById(pid);
        if (!cart){
            return res.status(404).send({status:"error",message:"Cart not found"})
        }
        if (!product){
            return res.status(404).send({status:"error",message:"Product not found"})
        }
        if (cart.products.length===0){
            cart.products.push({"product":pid,"quantity":amount.quantity})
        } else{
            const indexProductInCart = cart.products.findIndex(product=>product.product._id.toString()===pid)
            if (indexProductInCart!==-1){
                cart.products[indexProductInCart].quantity+=amount.quantity;
            } else {
                cart.products.push({"product":pid,"quantity":amount.quantity});
            };
        }            
        const result = await cartManager.update(cid,{"products": cart.products});
        res.status(201).send({status:"success",payload:result});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({error:error.message});
    }
});

// Exporta el router con las rutas definidas.
export default router;
