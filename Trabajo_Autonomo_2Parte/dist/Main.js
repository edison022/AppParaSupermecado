"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Presentacion_1 = __importDefault(require("./Presentacion")); //El programa comienza importando la clase "Presentacion" desde un archivo llamado "Presentacion".
// Función principal
function main() {
    //Dentro de la función "main", se crea una nueva instancia de la clase "Presentacion" y se asigna a la variable "presentacion".
    const presentacion = new Presentacion_1.default();
    presentacion.iniciar();
}
// Ejecutar la función principal
main();
