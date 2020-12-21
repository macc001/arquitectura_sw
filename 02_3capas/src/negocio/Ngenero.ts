import { Dgenero } from "../datos/Dgenero";
export class Ngenero {
  public dGenero: Dgenero;

  async getTable() {
    this.dGenero = new Dgenero();
    return await this.dGenero.getTable();
  }

  async setGenero(nro: number, genero: string) {
    this.dGenero = new Dgenero();
    this.dGenero.setNro(nro);
    this.dGenero.setNombre(genero);
    return await this.dGenero.guardarGenero();
  }

  async getGenero(nro: number) {
    this.dGenero = new Dgenero();
    this.dGenero.setNro(nro);
    return await this.dGenero.getGenero();
  }

  async eliminar(nro: number) {
    this.dGenero = new Dgenero();
    this.dGenero.setNro(nro);
    return await this.dGenero.eliminarGenero();
  }

  async modificar(nro: number, genero: string) {
    this.dGenero = new Dgenero();
    this.dGenero.setNro(nro);
    this.dGenero.setNombre(genero);
    return await this.dGenero.modificarGenero();
  }
}
