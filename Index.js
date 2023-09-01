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
