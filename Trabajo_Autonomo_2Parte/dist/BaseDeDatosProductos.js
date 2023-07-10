"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Sujeto observado (Base de datos de productos)
//Se declara una clase llamada BaseDeDatosProductos. Tiene un atributo estático llamado instancia de tipo BaseDeDatosProductos
class BaseDeDatosProductos {
    constructor() {
        this.productos = [];
        this.observadores = [];
    }
    //Este método estático obtenerInstancia() se utiliza para obtener la instancia única de la base de datos.
    static obtenerInstancia() {
        if (!BaseDeDatosProductos.instancia) {
            BaseDeDatosProductos.instancia = new BaseDeDatosProductos();
        }
        return BaseDeDatosProductos.instancia;
    }
    //Estos métodos se utilizan para agregar y quitar observadores de la lista de observadores en la base de datos.
    agregarObservador(observador) {
        this.observadores.push(observador);
    }
    //Estos métodos se utilizan para agregar, quitar y editar productos en la base de datos. Cuando se realiza alguna de estas operaciones, 
    //se llama al método notificarObservadores() para informar a todos los observadores sobre los cambios en la lista de productos
    quitarObservador(observador) {
        this.observadores = this.observadores.filter((o) => o !== observador);
    }
    agregarProducto(producto) {
        this.productos.push(producto);
        this.notificarObservadores();
    }
    quitarProducto(id) {
        this.productos = this.productos.filter((producto) => producto.id !== id);
        this.notificarObservadores();
    }
    editarProducto(id, nuevoNombre, nuevoValor) {
        const producto = this.productos.find((p) => p.id === id);
        if (producto) {
            producto.nombre = nuevoNombre;
            producto.valor = nuevoValor;
            this.notificarObservadores();
        }
    }
    //Estos métodos se utilizan para obtener información de la base de datos. obtenerProductoPorId() 
    //busca un producto por su ID y lo devuelve, y obtenerListaProductos() devuelve una copia de la lista de productos actual.
    obtenerProductoPorId(id) {
        return this.productos.find((producto) => producto.id === id);
    }
    obtenerListaProductos() {
        return [...this.productos];
    }
    //Este método privado se utiliza para notificar a todos los observadores sobre los cambios en la lista de productos. 
    //Itera sobre la lista de observadores y llama al método actualizar() de cada observador, pasándole la lista de productos como argumento.
    notificarObservadores() {
        this.observadores.forEach((observador) => {
            observador.actualizar(this.productos);
        });
    }
}
//Finalmente, se exporta la clase BaseDeDatosProductos como el valor predeterminado del módulo para que pueda ser utilizado por otros archivos.
exports.default = BaseDeDatosProductos;
