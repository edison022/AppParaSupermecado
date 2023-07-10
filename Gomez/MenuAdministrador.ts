import * as readlineSync from 'readline-sync';//Se importa la librería readline-sync que permite leer la entrada del usuario desde la consola.
import Producto from './Producto';//Se importa la clase Producto desde el archivo "Producto.js".
import BaseDeDatosProductos from './BaseDeDatosProductos';//Se importa la clase BaseDeDatosProductos desde el archivo "BaseDeDatosProductos.js".
import Menu from './Menu';//Se importa la clase Menu desde el archivo "Menu.js".

class MenuAdministrador extends Menu {//Se declara la clase MenuAdministrador que extiende la clase Menu.
  public iniciar(): void {//Se define el método iniciar() que muestra un mensaje de bienvenida y solicita al usuario que ingrese un nombre de usuario y una contraseña.
    console.log('Bienvenido al modo Administrador');
    console.log('');
    const nombreUsuario = readlineSync.question('Ingrese nombre de usuario: ');
    const contrasena = readlineSync.question('Ingrese contraseña: ', { hideEchoBack: true });
    console.log('');
//Se verifica si el nombre de usuario es "admin" y la contraseña es "root". Si los datos ingresados son correctos, se muestra un menú con varias opciones.
    if (nombreUsuario === 'admin' && contrasena === 'root') {
      let opcion: string;
      do {
        console.log('');
        console.log('\nMenú de Administrador');
        console.log('1.- Agregar Producto');
        console.log('2.- Quitar Producto');
        console.log('3.- Editar Valores de Producto');
        console.log('4.- Atrás');
        console.log('');
        opcion = readlineSync.question('Seleccione el número de la opción que desea: ');
//El menú se muestra en un bucle hasta que el usuario seleccione la opción "4" para salir.
//Dependiendo de la opción seleccionada, se llama a los métodos correspondientes: agregarProducto(), quitarProducto() o editarProducto().
        switch (opcion) {
          case '1':
            this.agregarProducto();
            break;
          case '2':
            this.quitarProducto();
            break;
          case '3':
            this.editarProducto();
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
    } else {
      console.log('');
      console.log('Nombre de usuario o contraseña incorrectos.');
    }
  }
//El método agregarProducto() muestra la lista de productos existentes y solicita al usuario que ingrese el ID, el nombre y el valor de un nuevo producto.
//Se realizan varias comprobaciones para asegurarse de que el ID y el nombre del producto sean únicos, y que el valor sea un número válido.
  private agregarProducto(): void {
    console.log('\nLista de productos:');
    console.log('');
    this.baseDeDatos.obtenerListaProductos().forEach((producto) => {
      console.log(`${producto.id}\t${producto.nombre}\t${producto.valor}$`);
    });

    const id = readlineSync.question('ID: ');
    const nombre = readlineSync.question('Nombre Producto: ');
    const valor = parseFloat(readlineSync.question('Valor: '));

    if (this.baseDeDatos.obtenerProductoPorId(id)) {
      console.log('');
      console.log('No es válido agregar el producto. La ID ya está en uso.');
    } else if (this.baseDeDatos.obtenerListaProductos().some((producto) => producto.nombre === nombre)) {
      console.log('');
      console.log('No es válido agregar el producto. El nombre del producto ya existe.');
    } else if (isNaN(valor)) {
      console.log('');
      console.log('No es válido agregar el producto. El valor debe ser un número válido.');
    } else {
      const nuevoProducto = new Producto(id, nombre, valor);
      this.baseDeDatos.agregarProducto(nuevoProducto);
      console.log('');
      console.log('El producto ha sido agregado con éxito.');
      //Si todas las comprobaciones son exitosas, se crea un nuevo objeto Producto y se agrega a la base de datos.
    }
  }
//El método quitarProducto() muestra la lista de productos existentes y solicita al usuario que ingrese el ID de un producto para eliminarlo.
  private quitarProducto(): void {
    console.log('');
    console.log('\nLista de productos:');
    this.baseDeDatos.obtenerListaProductos().forEach((producto) => {
      console.log(`${producto.id}\t${producto.nombre}\t${producto.valor}$`);
    });
    console.log('');
    const id = readlineSync.question('Ingrese la ID del producto para borrar: ');
//Se verifica si el producto con el ID especificado existe en la base de datos y, si es así, se elimina.
    const producto = this.baseDeDatos.obtenerProductoPorId(id);
    if (!producto) {
      console.log('');
      console.log('No es válido borrar el producto. La ID no se encuentra en la lista.');
    } else {
      console.log('');
      this.baseDeDatos.quitarProducto(id);
      console.log('El producto ha sido borrado con éxito.');
    }
  }
//El método editarProducto() muestra la lista de productos existentes y solicita al usuario que ingrese el ID de un producto para editarlo.
  private editarProducto(): void {
    console.log('');
    console.log('\nLista de productos:');
    this.baseDeDatos.obtenerListaProductos().forEach((producto) => {
      console.log(`${producto.id}\t${producto.nombre}\t${producto.valor}$`);
    });
    console.log('');
    const id = readlineSync.question('Ingrese la ID del producto para editar: ');

    const producto = this.baseDeDatos.obtenerProductoPorId(id);
    if (!producto) {
      console.log('');
      console.log('No es válido editar el producto. La ID no se encuentra en la lista.');
    } else {
      console.log('');
      const nuevoNombre = readlineSync.question('Nuevo Nombre Producto: ');
      const nuevoValor = parseFloat(readlineSync.question('Nuevo Valor: '));
//Se verifica si el producto con el ID especificado existe en la base de datos y, si es así, se solicita al usuario que ingrese un nuevo nombre y valor para el producto.
      if (this.baseDeDatos.obtenerListaProductos().some((p) => p.nombre === nuevoNombre && p.id !== id)) {
        console.log('');
        console.log('No es válido editar el producto. El nombre del producto ya existe.');
      } else if (isNaN(nuevoValor)) {
        console.log('');
        console.log('No es válido editar el producto. El valor debe ser un número válido.');
      } else {
        this.baseDeDatos.editarProducto(id, nuevoNombre, nuevoValor);
        console.log('');
        console.log('El producto ha sido editado con éxito.');
      }
    }
  }
}
//La clase MenuAdministrador se exporta como un módulo para poder ser utilizada en otros archivos.
export default MenuAdministrador;
