/*
En primer lugar, se importan los módulos necesarios: readlineSync para leer la entrada del usuario, BaseDeDatosProductos para acceder a la base de datos de productos, 
MenuAdministrador y MenuCliente para manejar las opciones del administrador y del cliente respectivamente.
*/
import * as readlineSync from 'readline-sync';
import BaseDeDatosProductos from './BaseDeDatosProductos';
import MenuAdministrador from './MenuAdministrador';
import MenuCliente from './MenuCliente';

// Clase para la capa de presentación
class Presentacion {

  private menuAdministrador: MenuAdministrador;
  private menuCliente: MenuCliente;
  private clientesRegistrados: { nombreUsuario: string; contrasena: string }[];
  //Se crean instancias de MenuAdministrador y MenuCliente
  constructor() {
    this.clientesRegistrados = [];
    const baseDeDatos = BaseDeDatosProductos.obtenerInstancia();
    this.menuAdministrador = new MenuAdministrador(baseDeDatos);
    this.menuCliente = new MenuCliente(baseDeDatos, this.clientesRegistrados);
  }
//El método iniciar se encarga de ejecutar el programa principal. Se muestra un menú con varias opciones y se le pide al usuario que seleccione una opción ingresando el número correspondiente.
  public iniciar(): void {
    let opcion: string;
    //Dentro de un bucle do-while, se procesa la opción seleccionada por el usuario utilizando una instrucción switch.
    do {
      console.log('');
      console.log('1.- Iniciar como administrador');
      console.log('2.- Iniciar como cliente');
      console.log('3.- Registrarse como cliente');
      console.log('4.- Finalizar Proceso');
      console.log('');
      opcion = readlineSync.question('Seleccione el número de la opción que desea: ');
//Dependiendo de la opción seleccionada, se llama al método correspondiente en menuAdministrador, menuCliente o se llama al método registrarCliente definido en la clase Presentacion.
      switch (opcion) {
        case '1':
          this.menuAdministrador.iniciar();
          break;
        case '2':
          this.menuCliente.iniciar();
          break;
        case '3':
          this.registrarCliente();
          break;
        case '4':
          console.log('');
          console.log('Finalizando el programa...');
          break;
        default:
          console.log('');
          console.log('Opción inválida. Por favor, seleccione una opción válida.');
          break;
      }
    } while (opcion !== '4');
  }
  //Si el usuario selecciona la opción '4', el bucle se termina y se muestra un mensaje indicando que el programa está finalizando.
//El método registrarCliente se encarga de manejar el registro de nuevos clientes. Pide al usuario que ingrese un nombre de usuario y una contraseña
  private registrarCliente(): void {
    console.log('');
    console.log('Registrarse como cliente...');
    console.log('');
    const nombreUsuario = readlineSync.question('Ingrese nombre de usuario con el que desea registrarse: ');
    const contrasena = readlineSync.question('Ingrese contraseña para registrarse: ');
// Luego verifica si el nombre de usuario ya está registrado en la lista clientesRegistrados.
    const clienteExistente = this.clientesRegistrados.find(
      (cliente) => cliente.nombreUsuario === nombreUsuario
    );
//Si es así, muestra un mensaje indicando que el nombre de usuario ya está en uso. Si el nombre de usuario no está registrado, 
//se agrega a la lista clientesRegistrados junto con la contraseña y se muestra un mensaje de registro exitoso.
    if (clienteExistente) {
      console.log('');
      console.log('El nombre de usuario ya está registrado. Por favor, elija otro nombre de usuario.');
    } else {
      this.clientesRegistrados.push({ nombreUsuario, contrasena });
      console.log('');
      console.log('Registro exitoso. Ahora puede iniciar sesión como cliente.');
    }
  }
}
//Finalmente, se exporta la clase Presentacion como el valor por defecto del módulo.
export default Presentacion;
