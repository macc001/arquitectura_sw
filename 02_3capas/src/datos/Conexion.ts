import { Pool } from "pg";

export class Conexion {
  protected host: string;
  protected user: string;
  protected database: string;
  protected password: string;
  protected port: number;
  private connection: Pool;
  private errorState: boolean;

  constructor() {
    this.host = "64.225.52.91";
    this.user = "postgres";
    this.database = "arquitectura";
    this.password = "123";
    this.port = 5433;
  }

  isErrorState() {
    return this.errorState;
  }

  getConexion(): void {
    try {
      const connectionData = {
        user: this.user,
        host: this.host,
        database: this.database,
        password: this.password,
        port: this.port,
      };
      this.connection = new Pool(connectionData);
      this.errorState = false;
    } catch (error) {
      this.errorState = true;
    }
  }

  cerrarConexion(): void {
    try {
      this.errorState = false;
      this.connection.end();
    } catch (error) {
      this.errorState = true;
    }
    this.connection = null;
  }

  async ejecutarQuery(query: string, params?: string[]) {
    try {
      const result: any = await this.connection.query(query, params);
      this.errorState = false;
      return result.rows;
    } catch (error) {
      this.errorState = true;
    }
  }
}
