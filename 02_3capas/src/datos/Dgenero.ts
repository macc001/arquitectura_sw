import { Conexion } from "./Conexion";

export class Dgenero {
  private nro: number;
  private nombre: string;

  protected conexion: Conexion;

  constructor() {
    this.conexion = new Conexion();
  }

  setNro(nro: number): void {
    this.nro = nro;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  async getTable(): Promise<any> {
    this.conexion.getConexion();
    const query: string = "select * from genero";
    const result = await this.conexion.ejecutarQuery(query, []);
    this.conexion.cerrarConexion();
    return result;
  }

  async guardarGenero(): Promise<any> {
    this.conexion.getConexion();
    const query: string = `INSERT INTO genero (nro,nombre) VALUES
    ($1,$2)`;
    const result = await this.conexion.ejecutarQuery(query, [
      this.nro.toString(),
      this.nombre,
    ]);
    const error: boolean = this.conexion.isErrorState();
    this.conexion.cerrarConexion();
    if (error) {
      return 0; // hay error
    }
    return 1; // exitoso
  }

  async eliminarGenero(): Promise<any> {
    this.conexion.getConexion();
    const query: string = `delete from genero where nro=$1`;
    const result = await this.conexion.ejecutarQuery(query, [
      this.nro.toString(),
    ]);
    const error: boolean = this.conexion.isErrorState();
    this.conexion.cerrarConexion();
    if (error) {
      return 0;
    }
    return 1;
  }

  async getGenero(): Promise<any> {
    this.conexion.getConexion();
    const query: string = "select * from genero ge where ge.nro=$1";
    const result = await this.conexion.ejecutarQuery(query, [
      this.nro.toString(),
    ]);
    this.conexion.cerrarConexion();
    return result;
  }

  async modificarGenero(): Promise<any> {
    this.conexion.getConexion();
    const query: string = `update genero set nombre=$1
    where nro=$2`;
    const result = await this.conexion.ejecutarQuery(query, [
      this.nombre,
      this.nro.toString(),
    ]);
    const error: boolean = this.conexion.isErrorState();
    this.conexion.cerrarConexion();
    if (error) {
      return 0;
    }
    return 1;
  }

  async getCombo(): Promise<any> {
    this.conexion.getConexion();
    const query: string = "select * from genero";
    const result = await this.conexion.ejecutarQuery(query, []);
    this.conexion.cerrarConexion();
    return result;
  }

  async getComboCod(): Promise<any> {
    this.conexion.getConexion();
    const query: string =
      "select ge.nro, ge.nombre from genero ge order by ge.nro=$1 desc";
    const result = await this.conexion.ejecutarQuery(query, [
      this.nro.toString(),
    ]);
    this.conexion.cerrarConexion();
    return result;
  }
}
