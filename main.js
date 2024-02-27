const ProductManager = require('./productManager'); //Importo la clase

const mainProductManager = new ProductManager("./products.json"); 

// EJECUCION DE LA APP //
runApp();
async function runApp() {
    await uploadProducts(); // Carga 6 productos.
    await deleteProducts(); // Borra producto ID 4, 5 y 6
    await noDescriptionProduct(); // Intenta cargar producto sin descripcion.
    await repeatedCode(); // Intenta cargar producto con codigo repetido
    await readProducts(); // Devuevle el array de productos de products.json
    await searchID(); // Busca ID 3 (existente), 10 y 15 no existentes.
    await changeProduct(); // Modifica el producto con ID 3. 
}

// Carga de productos
// title, description, price, thumbnail, stock, code
async function uploadProducts() {
    console.log("CARGA DE PRODUCTOS")
    await mainProductManager.addProduct("product-1", "desc-1", 1000, "../path1", 10, "codigo-1")
    await mainProductManager.addProduct("product-2", "desc-2", 2000, "../path2", 10, "codigo-2")
    await mainProductManager.addProduct("product-3", "desc-3", 3000, "../path3", 10, "codigo-3")
    await mainProductManager.addProduct("product-4", "desc-4", 4000, "../path4", 10, "codigo-4")
    await mainProductManager.addProduct("product-5", "desc-5", 5000, "../path5", 10, "codigo-5")
    await mainProductManager.addProduct("product-6", "desc-6", 6000, "../path6", 10, "codigo-6")
}

async function deleteProducts() {
    console.log("ELIMINANDO PRODUCTOS 4,5 Y 6:")
    await mainProductManager.deleteProduct(4)
    await mainProductManager.deleteProduct(5)
    await mainProductManager.deleteProduct(6)
}

async function changeProduct(){
    console.log("MODIFICANDO PRODUCTO 3...")
    await mainProductManager.updateProduct(3, {
        title: "newTitle",
        description: "newDescription",
        price: 1500,
        thumbnail: "new/path",
        stock: 20,
        code: "codigo-4",
    });
}

async function noDescriptionProduct() {
    console.log("CARGA DE PRODUCTO QUE LE FALTA DESCRIPCION:")
    await mainProductManager.addProduct("product-7", 7000, "../path7", 10, "codigo-7")
}

async function repeatedCode(){
    console.log("CARGA DE PRODUCTO CON CODE REPETIDO:")
    await mainProductManager.addProduct("product-1", "desc-1", 1000, "../path1", 10, "codigo-1")
    await mainProductManager.addProduct("product-2", "desc-2", 1000, "../path2", 10, "codigo-2")
    await mainProductManager.addProduct("product-3", "desc-3", 1000, "../path3", 10, "codigo-3")
}

async function readProducts(){
    console.log("CARGA DE ARRAY DE PRODUCTOS: ")
    console.log(await mainProductManager.getProducts());
    console.log("...")
}

async function searchID() {
    console.log("BUSQUEDA DEL ID 3:")
    console.log(await mainProductManager.getProductById(3));
    console.log(await mainProductManager.getProductById(10));
    console.log(await mainProductManager.getProductById(15));
    console.log("...")
}

