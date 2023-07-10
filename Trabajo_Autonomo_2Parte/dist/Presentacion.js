"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
En primer lugar, se importan los módulos necesarios: readlineSync para leer la entrada del usuario, BaseDeDatosProductos para acceder a la base de datos de productos,
MenuAdministrador y MenuCliente para manejar las opciones del administrador y del cliente respectivamente.
*/
const readlineSync = __importStar(require("readline-sync"));
const BaseDeDatosProductos_1 = __importDefault(require("./BaseDeDatosProductos"));
const MenuAdministrador_1 = __importDefault(require("./MenuAdministrador"));
const MenuCliente_1 = __importDefault(require("./MenuCliente"));
// Clase para la capa de presentación
class Presentacion {
    //Se crean instancias de MenuAdministrador y MenuCliente
    constructor() {
        this.clientesRegistrados = [];
        const baseDeDatos = BaseDeDatosProductos_1.default.obtenerInstancia();
        this.menuAdministrador = new MenuAdministrador_1.default(baseDeDatos);
        this.menuCliente = new MenuCliente_1.default(baseDeDatos, this.clientesRegistrados);
    }
    //El método iniciar se encarga de ejecutar el programa principal. Se muestra un menú con varias opciones y se le pide al usuario que seleccione una opción ingresando el número correspondiente.
    iniciar() {
        let opcion;
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
    registrarCliente() {
        console.log('');
        console.log('Registrarse como cliente...');
        console.log('');
        const nombreUsuario = readlineSync.question('Ingrese nombre de usuario con el que desea registrarse: ');
        const contrasena = readlineSync.question('Ingrese contraseña para registrarse: ');
        // Luego verifica si el nombre de usuario ya está registrado en la lista clientesRegistrados.
        const clienteExistente = this.clientesRegistrados.find((cliente) => cliente.nombreUsuario === nombreUsuario);
        //Si es así, muestra un mensaje indicando que el nombre de usuario ya está en uso. Si el nombre de usuario no está registrado, 
        //se agrega a la lista clientesRegistrados junto con la contraseña y se muestra un mensaje de registro exitoso.
        if (clienteExistente) {
            console.log('');
            console.log('El nombre de usuario ya está registrado. Por favor, elija otro nombre de usuario.');
        }
        else {
            this.clientesRegistrados.push({ nombreUsuario, contrasena });
            console.log('');
            console.log('Registro exitoso. Ahora puede iniciar sesión como cliente.');
        }
    }
}
//Finalmente, se exporta la clase Presentacion como el valor por defecto del módulo.
exports.default = Presentacion;
