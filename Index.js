/*  DESAFIO 1

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

//DESAFIO 2

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

  //

  async getProductbyID(ID) {
    try {
      const Productos = await this.getProducts();
      const producto = Productos.find((p) => p.id === ID);
      return producto ? producto : "no encontrado";
    } catch (error) {
      return error;
    }
  }

  //

  async updateProduct(
    ID,
    newtitle,
    newdescription,
    newprice,
    newthumbnail,
    newcode,
    newstock
  ) {
    try {
      let Productos = await this.getProducts();
      Productos = Productos.map((producto) => {
        if (producto.id === ID) {
          producto.title = newtitle || producto.title;
          producto.description = newdescription || producto.description;
          producto.price = newprice || producto.price;
          producto.thumbnail = newthumbnail || producto.thumbnail;
          producto.code = newcode || producto.code;
          producto.stock = newstock || producto.stock;
        }
        return producto;
      });
      await fs.promises.writeFile(this.path, JSON.stringify(Productos));
      console.log("¡Producto actualizado!");
    } catch (error) {
      return error;
    }
  }

  //

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
  //Ir descomentando a medida que se va probando para ir testeando

  /*  Aqui añade 2 productos (el array comienza con 10 que ya dejaré creados)
  //ITEM 1
  await ListaProductos.addProducts(
    "titulo impar",
    "descripcion impar",
    1,
    "no hay",
    "codigo impar",
    1
  );
  // //ITEM 2
  await ListaProductos.addProducts(
    "titulo par",
    "descripcion par",
    2,
    "no hay",
    "codigo par",
    2
  );
  */

  /* Aqui se puede buscar un id en especifico y devolverlo, dejo  puesto como 99
  console.log("buscar por id:");
  let Busqueda = await ListaProductos.getProductbyID(3);
  console.log(Busqueda);
  */

  /* Muestra todo el Array actual
  //   console.log("mostrar todos los productos");
  //   const productos = await ListaProductos.getProducts();
  //   console.log(productos);
  */

  /* Borra el ID indicado 
  //   console.log("borrar id 1");
  //   await ListaProductos.deleteProduct(1);
  //   const ListaSinIdBorrado = await ListaProductos.getProducts();
  //   console.log(ListaSinIdBorrado);
  */

  /* Actualiza el Producto de ID indicado
  //   console.log("Actualizar Producto 5");
  //   await ListaProductos.updateProduct(5, "titulo nuevo mas nuevo");
  //   const productosactualizados = await ListaProductos.getProductbyID(5);
  //   console.log(productosactualizados);
  //
  */
}
test();
