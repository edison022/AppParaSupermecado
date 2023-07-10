"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Clase abstracta para el menú
class Menu {
    constructor(baseDeDatos) {
        this.baseDeDatos = baseDeDatos;
    }
}
//Aquí estamos exportando la clase "Menu" como la exportación por defecto de este módulo. 
//Esto significa que cuando otro archivo importe este módulo, obtendrá la clase "Menu" como el valor de importación predeterminado.
exports.default = Menu;
