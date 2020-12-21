import { Conexion } from "./Conexion";

export class Dpelicula {
  private cod: string;
  private titulo: string;
  private duracion: number;
  private precio: number;
  private nro: number;

  protected conexion: Conexion;

  constructor() {
    this.conexion = new Conexion();
  }

  setCod(cod: string): void {
    this.cod = cod;
  }

  setTitulo(titulo: string): void {
    this.titulo = titulo;
  }
  setDuracion(duracion: number): void {
    this.duracion = duracion;
  }
  setPrecio(precio: number): void {
    this.precio = precio;
  }
  setNro(nro: number): void {
    this.nro = nro;
  }

  async getTable() {
    this.conexion.getConexion();
    const query: string =
      "select pe.cod, pe.titulo, pe.duracion, pe.precio, pe.nro, ge.nombre as genero from pelicula pe, genero ge where pe.nro=ge.nro";
    const result = await this.conexion.ejecutarQuery(query, []);
    this.conexion.cerrarConexion();
    return result;
  }

  async getCombo() {
    this.conexion.getConexion();
    const query: string = "select * from genero";
    const result = await this.conexion.ejecutarQuery(query, []);
    this.conexion.cerrarConexion();
    return result;
  }

  async guardarPelicula() {
    this.conexion.getConexion();
    const query: string = `INSERT INTO pelicula (cod,titulo,duracion,precio,nro) VALUES ($1,$2,$3,$4,$5)`;
    const result = await this.conexion.ejecutarQuery(query, [
      this.cod,
      this.titulo,
      this.duracion.toString(),
      this.precio.toString(),
      this.nro.toString(),
    ]);
    const error: boolean = this.conexion.isErrorState();
    this.conexion.cerrarConexion();
    if (error) {
      return 0; // hay error
    }
    return 1; // exitoso
  }

  async eliminarPelicula() {
    this.conexion.getConexion();
    const query: string = `delete from pelicula where cod=$1`;
    const result = await this.conexion.ejecutarQuery(query, [this.cod]);
    const error: boolean = this.conexion.isErrorState();
    this.conexion.cerrarConexion();
    if (error) {
      return 0;
    }
    return 1;
  }

  async getPelicula() {
    this.conexion.getConexion();
    const query: string = "select * from pelicula pe where pe.cod=$1";
    const result = await this.conexion.ejecutarQuery(query, [this.cod]);
    this.conexion.cerrarConexion();
    return result;
  }

  async getComboCod() {
    this.conexion.getConexion();
    const query: string =
      "select ge.nro, ge.nombre from genero ge order by ge.nro=$1 desc";
    const result = await this.conexion.ejecutarQuery(query, [
      this.nro.toString(),
    ]);
    this.conexion.cerrarConexion();
    return result;
  }

  async modificarPelicula() {
    this.conexion.getConexion();
    const query: string =
      "update pelicula set titulo=$2, duracion=$3, precio=$4, nro=$5    where cod=$1";
    const result = await this.conexion.ejecutarQuery(query, [
      this.cod,
      this.titulo,
      this.duracion.toString(),
      this.precio.toString(),
      this.nro.toString(),
    ]);
    const error: boolean = this.conexion.isErrorState();
    this.conexion.cerrarConexion();
    if (error) {
      return 0;
    }
    return 1;
  }
}
