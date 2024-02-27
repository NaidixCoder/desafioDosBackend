const fs = require("fs");

class ProductManager {
    
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(title, description, price, thumbnail, stock, code) {

        if (this.validateInputs(title, description, price, thumbnail, stock, code)) {
            return;
        };

        const product = {
            id: this.#getID(),
            code: code,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            stock: stock,
        };

        this.products.push(product);
        await this.writeProductsJson(product);
    }

    validateInputs(title, description, price, thumbnail, stock, code) {
        if (!title || !description || !price || !thumbnail || !stock || !code) {
            console.error('Error: Todos los campos son obligatorios');
            return true;
        }
    
        if (this.products.some(prod => prod.code === code)) {
            console.error(`Error: Ya existe un producto con el código: "${code}"`);
            return true;
        }
    
        return false;  // False ---> si no hay errores
    }

    #getID() {
        if (this.products.length === 0) return 1;
        return this.products[this.products.length - 1].id + 1;
    }

    async getProducts() {
        try {
            const readFile = await fs.promises.readFile(this.path , "utf-8");
            const productsObj = JSON.parse(readFile)
            return productsObj;
        }catch (error){
            console.error("Error al obtener productos" , error);
            return;
        }
    }

    async getProductById(productId) {
        await fs.promises.readFile(this.path, 'utf8');
        const myProduct = this.products.find((product) => product.id === productId);
        if (myProduct) {
            return myProduct;
        }else{
            return `Error: Producto con ID ${productId} no encontrado`;
        }
    }

    async updateProduct(productId, updatedData) {
        try {
            const readFile = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(readFile);
    
            const index = this.products.findIndex(product => product.id === productId);
    
            if (index !== -1) {
                const { code: newCode } = updatedData;
                
                // Validación del nuevo código
                if (this.products.some(prod => prod.code === newCode)) {
                    console.error(`Error: Ya existe un producto con el código: "${newCode}"`);
                    return;
                }
    
                this.products[index] = {
                    ...this.products[index],
                    ...updatedData,
                };
    
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
    
                console.log(`Producto actualizado: ${JSON.stringify(this.products[index])}`);
            } else {
                console.error(`Error: Producto con ID ${productId} no encontrado para actualizar`);
            }
        } catch (error) {
            console.error("Error al actualizar el producto: ", error);
        }
    }
    
    
    async writeProductsJson(product) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
            console.log(`Producto agregado: ${JSON.stringify(product)}`);
        } catch (error) {
            console.error("Error al guardar los productos: ", error);
        }
    }

    async deleteProduct(productId) {
        const index = this.products.findIndex(prod => prod.id === productId);
    
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1)[0];
            try {
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
                console.log(`Producto eliminado: ${JSON.stringify(deletedProduct)}`);
            } catch (error) {
                console.error("Error al guardar los productos: ", error);
            }
        } else {
            console.error(`Error: ID ${productId} no encontrado para eliminar`);
        }
    }
}

module.exports = ProductManager;