import { Dgenero } from "../datos/Dgenero";
export class Ngenero {
  public dGenero: Dgenero;

  constructor() {
    this.dGenero = new Dgenero();
  }

  async getTable(): Promise<any> {
    return await this.dGenero.getTable();
  }

  async setGenero(nro: number, genero: string): Promise<any> {
    this.dGenero.setNro(nro);
    this.dGenero.setNombre(genero);
    return await this.dGenero.guardarGenero();
  }

  async getGenero(nro: number): Promise<any> {
    this.dGenero.setNro(nro);
    return await this.dGenero.getGenero();
  }

  async eliminar(nro: number): Promise<any> {
    this.dGenero.setNro(nro);
    return await this.dGenero.eliminarGenero();
  }

  async modificar(nro: number, genero: string): Promise<any> {
    this.dGenero.setNro(nro);
    this.dGenero.setNombre(genero);
    return await this.dGenero.modificarGenero();
  }
}
