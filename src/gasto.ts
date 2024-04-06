export class Gasto {
  nombre: string;
  cantidad: number;
  costo: number;

  constructor(nombreGasto: string, cantidadGasto: number, costo: number) {
    this.nombre = nombreGasto;
    this.cantidad = cantidadGasto;
    this.costo = costo;
  }
}
