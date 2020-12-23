import { Dpelicula } from "../datos/Dpelicula";
export class Npelicula {
  public dPelicula: Dpelicula;

  constructor() {
    this.dPelicula = new Dpelicula();
  }

  async getTable(): Promise<any> {
    return await this.dPelicula.getTable();
  }

  async getGenero(): Promise<any> {
    return await this.dPelicula.getCombo();
  }

  async setPelicula(
    cod: string,
    titulo: string,
    duracion: number,
    precio: number,
    nro: number
  ): Promise<any> {
    this.dPelicula.setCod(cod);
    this.dPelicula.setTitulo(titulo);
    this.dPelicula.setDuracion(duracion);
    this.dPelicula.setPrecio(precio);
    this.dPelicula.setNro(nro);
    return await this.dPelicula.guardarPelicula();
  }

  async eliminar(cod: string): Promise<any> {
    this.dPelicula.setCod(cod);
    return await this.dPelicula.eliminarPelicula();
  }

  async getPelicula(cod: string): Promise<any> {
    this.dPelicula.setCod(cod);
    return await this.dPelicula.getPelicula();
  }

  async getGeneroCod(nro: number): Promise<any> {
    this.dPelicula.setNro(nro);
    return await this.dPelicula.getComboCod();
  }

  async modificar(
    cod: string,
    titulo: string,
    duracion: number,
    precio: number,
    nro: number
  ): Promise<any> {
    this.dPelicula.setCod(cod);
    this.dPelicula.setTitulo(titulo);
    this.dPelicula.setDuracion(duracion);
    this.dPelicula.setPrecio(precio);
    this.dPelicula.setNro(nro);
    return await this.dPelicula.modificarPelicula();
  }
}
