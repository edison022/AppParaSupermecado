import Producto from './Producto'; // importa la clase Producto desde un archivo llamado 'Producto'.


// Observador para la actualización del menú del cliente
export interface ClienteObserver {
actualizar(listaProductos: Producto[]): void;
  }
// Sujeto observado (Base de datos de productos)
//Se declara una clase llamada BaseDeDatosProductos. Tiene un atributo estático llamado instancia de tipo BaseDeDatosProductos
class BaseDeDatosProductos {
  private static instancia: BaseDeDatosProductos;
  private productos: Producto[];
  private observadores: ClienteObserver[];

  private constructor() {
    this.productos = [];
    this.observadores = [];
  }
//Este método estático obtenerInstancia() se utiliza para obtener la instancia única de la base de datos.
  public static obtenerInstancia(): BaseDeDatosProductos {
    if (!BaseDeDatosProductos.instancia) {
      BaseDeDatosProductos.instancia = new BaseDeDatosProductos();
    }
    return BaseDeDatosProductos.instancia;
  }
//Estos métodos se utilizan para agregar y quitar observadores de la lista de observadores en la base de datos.
  public agregarObservador(observador: ClienteObserver): void {
    this.observadores.push(observador);
  }
//Estos métodos se utilizan para agregar, quitar y editar productos en la base de datos. Cuando se realiza alguna de estas operaciones, 
//se llama al método notificarObservadores() para informar a todos los observadores sobre los cambios en la lista de productos
  public quitarObservador(observador: ClienteObserver): void {
    this.observadores = this.observadores.filter((o) => o !== observador);
  }

  public agregarProducto(producto: Producto): void {
    this.productos.push(producto);
    this.notificarObservadores();
  }

  public quitarProducto(id: string): void {
    this.productos = this.productos.filter((producto) => producto.id !== id);
    this.notificarObservadores();
  }

  public editarProducto(id: string, nuevoNombre: string, nuevoValor: number): void {
    const producto = this.productos.find((p) => p.id === id);
    if (producto) {
      producto.nombre = nuevoNombre;
      producto.valor = nuevoValor;
      this.notificarObservadores();
    }
  }
//Estos métodos se utilizan para obtener información de la base de datos. obtenerProductoPorId() 
//busca un producto por su ID y lo devuelve, y obtenerListaProductos() devuelve una copia de la lista de productos actual.
  public obtenerProductoPorId(id: string): Producto | undefined {
    return this.productos.find((producto) => producto.id === id);
  }

  public obtenerListaProductos(): Producto[] {
    return [...this.productos];
  }
//Este método privado se utiliza para notificar a todos los observadores sobre los cambios en la lista de productos. 
//Itera sobre la lista de observadores y llama al método actualizar() de cada observador, pasándole la lista de productos como argumento.
  private notificarObservadores(): void {
    this.observadores.forEach((observador) => {
      observador.actualizar(this.productos);
    });
  }
}
//Finalmente, se exporta la clase BaseDeDatosProductos como el valor predeterminado del módulo para que pueda ser utilizado por otros archivos.
export default BaseDeDatosProductos;
