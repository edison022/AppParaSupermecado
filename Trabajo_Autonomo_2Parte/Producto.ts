// Clase Producto
class Producto { //Se declara una clase llamada "Producto".
  id: string; //Se declara una propiedad llamada "id" de tipo string. Esta propiedad representa el identificador del producto
  nombre: string;//Se declara una propiedad llamada "nombre" de tipo string. Esta propiedad representa el nombre del producto.
  valor: number; //Se declara una propiedad llamada "valor" de tipo number. Esta propiedad representa el valor del producto.

  constructor(id: string, nombre: string, valor: number) { //Se define el constructor de la clase Producto con tres parámetros: "id" de tipo string, "nombre" de tipo string y "valor" de tipo number.
    this.id = id; //Se asigna el valor del parámetro "id" a la propiedad "id" del objeto actual (instancia de la clase Producto).
    this.nombre = nombre; //Se asigna el valor del parámetro "nombre" a la propiedad "nombre" del objeto actual.
    this.valor = valor;// Se asigna el valor del parámetro "valor" a la propiedad "valor" del objeto actual.
  }
}
//Se exporta la clase Producto como el valor predeterminado del módulo.
export default Producto;
