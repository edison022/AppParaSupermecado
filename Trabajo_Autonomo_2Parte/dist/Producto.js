"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Clase Producto
class Producto {
    constructor(id, nombre, valor) {
        this.id = id; //Se asigna el valor del parámetro "id" a la propiedad "id" del objeto actual (instancia de la clase Producto).
        this.nombre = nombre; //Se asigna el valor del parámetro "nombre" a la propiedad "nombre" del objeto actual.
        this.valor = valor; // Se asigna el valor del parámetro "valor" a la propiedad "valor" del objeto actual.
    }
}
//Se exporta la clase Producto como el valor predeterminado del módulo.
exports.default = Producto;
