/* 

class ProductManager {
  static products = [];

  static addProducts(title, description, price, thumbnail, code, stock) {
    if (this.products.some((e) => e.code === code)) {
      return console.log("Codigo repetido, error");
    }
    const product = {
      id: this.products.length
        ? this.products[this.products.length - 1].id + 1
        : 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
  }

  static getProducts() {
    return this.products;
  }

  static getProductsById(busqueda) {
    return this.products.find((product) => product.id === busqueda)
      ? "producto encontrado"
      : "inexistente";
  }
}

// se añade un producto valido
console.log("1:");

ProductManager.addProducts(
  "producto prueba",
  "Este producto es una prueba",
  200,
  "sin imagen",
  "abc123",
  25
);
console.log(ProductManager.getProducts());

//se repite el codigo por lo que no se añade al array
console.log("2:");

ProductManager.addProducts(
  "producto prueba",
  "Este producto es una prueba",
  200,
  "sin imagen",
  "abc123",
  25
);

// Se busca un producto por el id valido
console.log(ProductManager.getProductsById(1));
//se busca un id inexistente
console.log(ProductManager.getProductsById(10));
*/

// async AñadirProducto(producto) {

// return this.getProducts().then((productos) => {
//   let id;
//   productos.length
//     ? (id = productos[productos.length - 1].id + 1)
//     : (id = 1);
// });

//   try {
//     const users = await this.getUsers();
//     let id;
//     if (!users.length) {
//       id = 1;
//     } else {
//       id = users[users.length - 1].id + 1;
//     }
//     users.push({ id, ...obj });
//     await fs.promises.writeFile(this.path, JSON.stringify(users));
//   } catch (error) {
//     return error;
//   }

//DESAFIO 2

//import { error } from "console"; // Esto se añadió solo por alguna extensión que tenia instalada previamente, sospecho que alguna dirigida a react; por las dudas lo dejo asi
const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const info = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(info);
    } catch (error) {
      return [];
    }
  }
  //
  async addProducts(title, description, price, thumbnail, code, stock) {
    try {
      let productos = await this.getProducts();

      const producto = {
        id: productos.length ? productos[productos.length - 1].id + 1 : 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      productos.push(producto);
      await fs.promises.writeFile(this.path, JSON.stringify(productos));
    } catch (error) {
      return error;
    }
  }

  async getProductbyID(ID) {
    try {
      const Productos = await this.getProducts();
      const producto = Productos.find((p) => p.id === ID);
      return producto ? producto : "no encontrado";
    } catch (error) {
      return error;
    }
  }

  updateProduct() {}

  async deleteProduct(ID) {
    try {
      const Lista = await this.getProducts();
      const NuevaLista = Lista.filter((p) => p.id !== ID);
      await fs.promises.writeFile(this.path, JSON.stringify(NuevaLista));
    } catch (error) {
      return error;
    }
  }
}

async function test() {
  const ListaProductos = new ProductManager("Productos.json");

  //ITEM 1
  await ListaProductos.addProducts(
    "titulo",
    "descripcion",
    2,
    "no hay",
    "acv123",
    4
  );
  //ITEM 2
  await ListaProductos.addProducts(
    "titulo del id a encontrar",
    "descripcion del id a encontrar",
    2,
    "no hay",
    "aceev123",
    4
  );
  console.log("buscar por id");
  console.log(await ListaProductos.getProductbyID(99));

  console.log("mostrar todos los productos");
  const productos = await ListaProductos.getProducts();
  console.log(productos);

  console.log("borrar id 1");
  await ListaProductos.deleteProduct(1);
  const productosnuevo = await ListaProductos.getProducts();
  console.log(productosnuevo);
}

test();
