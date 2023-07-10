//El programa comienza importando las dependencias necesarias
import * as readlineSync from 'readline-sync';
import Producto from './Producto';
import BaseDeDatosProductos from './BaseDeDatosProductos';
import Menu from './Menu';

// Importar ClienteObserver desde BaseDeDatosProductos.ts
import { ClienteObserver } from './BaseDeDatosProductos';

// A continuación, se define la clase MenuCliente, que extiende la clase Menu e implementa la interfaz ClienteObserver
class MenuCliente extends Menu implements ClienteObserver {
  private carrito: Producto[];
  private clientesRegistrados: { nombreUsuario: string; contrasena: string }[];
//La clase MenuCliente tiene propiedades privadas como carrito (que es un arreglo de Producto) y clientesRegistrados (que es un arreglo de objetos con las propiedades nombreUsuario y contrasena). 
//Estas propiedades se inicializan en el constructor de la clase
  constructor(baseDeDatos: BaseDeDatosProductos, clientesRegistrados: { nombreUsuario: string; contrasena: string }[]) {
    super(baseDeDatos);
    this.carrito = [];
    this.clientesRegistrados = clientesRegistrados;
  }
//El método público iniciar() se encarga de mostrar un mensaje de bienvenida, solicitar al usuario su nombre de usuario y contraseña, y luego validar las credenciales ingresadas
  public iniciar(): void {
    console.log('');
    console.log('Bienvenido al modo Cliente');
    console.log('');
    const nombreUsuario = readlineSync.question('Ingrese nombre de usuario: ');
    const contrasena = readlineSync.question('Ingrese contraseña: ', { hideEchoBack: true });

    if (this.validarCliente(nombreUsuario, contrasena)) {
      this.baseDeDatos.agregarObservador(this);
//Si las credenciales son válidas, se muestra un menú de opciones al cliente y se espera su elección
      let opcion: string;
      do {
        console.log('');
        console.log('\nMenú de Cliente');
        console.log('1.- Agregar Producto');
        console.log('2.- Quitar Producto');
        console.log('3.- Calcular total');
        console.log('4.- Atrás');
        console.log('');
        opcion = readlineSync.question('Seleccione el número de la opción que desea: ');

        switch (opcion) {
          case '1':
            this.agregarProducto();
            break;
          case '2':
            this.quitarProducto();
            break;
          case '3':
            this.calcularTotal();
            break;
          case '4':
            console.log('');
            console.log('Regresando al menú principal...\n');
            break;
          default:
            console.log('');
            console.log('Opción inválida. Por favor, seleccione una opción válida.');
            break;
        }
      } while (opcion !== '4');

      this.baseDeDatos.quitarObservador(this);
    } else {
      console.log('');
      console.log('Nombre de usuario o contraseña incorrectos.');
    }
  }
//El método validarCliente() verifica si las credenciales ingresadas coinciden con alguno de los clientes registrados
  private validarCliente(nombreUsuario: string, contrasena: string): boolean {
    const clienteRegistrado = this.clientesRegistrados.find(
      (cliente) => cliente.nombreUsuario === nombreUsuario && cliente.contrasena === contrasena
    );

    return clienteRegistrado !== undefined;
  }
//El método agregarProducto() muestra una lista de productos disponibles y permite al cliente agregar un producto al carrito
  private agregarProducto(): void {
    console.log('');
    console.log('\nLista de productos:');
    this.baseDeDatos.obtenerListaProductos().forEach((producto) => {
      console.log(`${producto.id}\t${producto.nombre}\t${producto.valor}$`);
    });
    console.log('');
    const id = readlineSync.question('Ingrese el ID del producto que desea agregar al carrito: ');

    const producto = this.baseDeDatos.obtenerProductoPorId(id);
    if (!producto) {
      console.log('');
      console.log('No es válido agregar el producto. La ID no se encuentra en la lista.');
    } else {
      console.log('');
      this.carrito.push(producto);
      console.log('El producto ha sido agregado al carrito con éxito.');

      let opcion: string;
      do {
        console.log('');
        console.log('\nOpciones:');
        console.log('');
        console.log('1.- Agregar otro producto');
        console.log('2.- Finalizar compra');
        console.log('');
        opcion = readlineSync.question('Seleccione una opción: ');

        switch (opcion) {
          case '1':
            this.agregarProducto();
            break;
          case '2':
            console.log('');
            console.log('Finalizando compra...\n');
            break;
          default:
            console.log('');
            console.log('Opción inválida. Por favor, seleccione una opción válida.');
            break;
        }
      } while (opcion !== '2');
    }
  }
//El método quitarProducto() muestra la lista de productos en el carrito y permite al cliente quitar un producto seleccionado
  private quitarProducto(): void {
    console.log('');
    console.log('\nLista de productos en el carrito:');
    this.carrito.forEach((producto, index) => {
      console.log(`${index + 1}. ${producto.nombre}\t${producto.valor}$`);
    });
    console.log('');
    const opcion = readlineSync.question('Ingrese el número del producto que desea quitar del carrito: ');

    const indice = parseInt(opcion) - 1;
    if (isNaN(indice) || indice < 0 || indice >= this.carrito.length) {
      console.log('');
      console.log('No es válido quitar el producto. Seleccione un número válido.');
    } else {
      console.log('');
      const productoQuitado = this.carrito.splice(indice, 1);
      console.log('El producto ha sido quitado del carrito con éxito.');

      let opcion: string;
      do {
        console.log('');
        console.log('\nOpciones:');
        console.log('');
        console.log('1.- Quitar otro producto');
        console.log('2.- Finalizar el proceso');
        console.log('');
        opcion = readlineSync.question('Seleccione una opción: ');

        switch (opcion) {
          case '1':
            this.quitarProducto();
            break;
          case '2':
            console.log('');
            console.log('Finalizando el proceso...\n');
            break;
          default:
            console.log('');
            console.log('Opción inválida. Por favor, seleccione una opción válida.');
            break;
        }
      } while (opcion !== '2');
    }
  }
//El método calcularTotal() muestra la lista de productos en el carrito, calcula el subtotal, el impuesto al valor agregado (IVA) y el total de la compra
  private calcularTotal(): void {
    console.log('');
    console.log('\nLista de productos en el carrito:');
    this.carrito.forEach((producto) => {
      console.log(`${producto.nombre}\t${producto.valor}$`);
    });

    const subtotal = this.carrito.reduce((total, producto) => total + producto.valor, 0);
    const iva = subtotal * 0.12;
    const total = subtotal + iva;
    console.log('');
    console.log('\nFactura:');
    console.log('');
    console.log(`Subtotal\t${subtotal.toFixed(2)}$`);
    console.log(`IVA\t\t${iva.toFixed(2)}$`);
    console.log('');
    console.log(`Total\t\t${total.toFixed(2)}$`);

    let opcion: string;
    do {
      console.log('');
      console.log('\nOpciones:');
      console.log('');
      console.log('1.- Finalizar proceso de compra');
      console.log('2.- Regresar al menú anterior');
      console.log('');
      opcion = readlineSync.question('Seleccione una opción: ');

      switch (opcion) {
        case '1':
          console.log('');
          console.log('Finalizando el proceso de compra...\n');
          break;
        case '2':
          console.log('');
          console.log('Regresando al menú anterior...\n');
          break;
        default:
          console.log('');
          console.log('Opción inválida. Por favor, seleccione una opción válida.');
          break;
      }
    } while (opcion !== '1' && opcion !== '2');
  }
//El método actualizar() se implementa de la interfaz ClienteObserver y muestra una lista actualizada de productos
  public actualizar(listaProductos: Producto[]): void {
    console.log('');
    console.log('\nLista de productos actualizada:');
    listaProductos.forEach((producto) => {
      console.log(`${producto.id}\t${producto.nombre}\t${producto.valor}$`);
    });
  }
}
//Finalmente, se exporta la clase MenuCliente como un valor por defecto
export default MenuCliente;
