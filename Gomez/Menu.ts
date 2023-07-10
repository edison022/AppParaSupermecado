//Aquí estamos importando la clase "BaseDeDatosProductos" desde el archivo "BaseDeDatosProductos.ts" que se encuentra en el mismo directorio que este archivo.
import BaseDeDatosProductos from './BaseDeDatosProductos';

// Clase abstracta para el menú
abstract class Menu {
  //Aquí se define una clase abstracta llamada "Menu". Una clase abstracta es una clase que no se 
  //puede instanciar directamente, sino que se utiliza como base para otras clases que la extienden.
  protected baseDeDatos: BaseDeDatosProductos;

  constructor(baseDeDatos: BaseDeDatosProductos) {
    this.baseDeDatos = baseDeDatos;
  }
//La clase "Menu" también tiene un método abstracto llamado "iniciar" que no tiene cuerpo y no devuelve ningún valor. 
//Esto significa que las clases que extiendan "Menu" deberán implementar este método.
  public abstract iniciar(): void;
}
//Aquí estamos exportando la clase "Menu" como la exportación por defecto de este módulo. 
//Esto significa que cuando otro archivo importe este módulo, obtendrá la clase "Menu" como el valor de importación predeterminado.
export default Menu;
