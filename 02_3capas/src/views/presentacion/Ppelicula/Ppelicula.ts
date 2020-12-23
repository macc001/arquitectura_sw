import { Router, Request, Response } from "express";
import { Npelicula } from "../../../negocio/Npelicula";
import { Ngenero } from "../../../negocio/Ngenero";

class Ppelicula {
  public router: Router = Router();
  public listPelicula: any[];
  public listGenero: any[];
  public nPelicula: Npelicula;
  public nGenero: Ngenero;

  constructor() {
    this.listPelicula = [];
    this.listGenero = [];
    this.nPelicula = new Npelicula();
    this.nGenero = new Ngenero();
    this.listarTabla();
    this.registrar();
    this.eliminar();
    this.getPelicula();
    this.modificar();
  }

  listarTabla(): void {
    this.router.route("/").get(async (req: Request, res: Response) => {
      const resultGen = await this.nGenero.getGener();
      this.listGenero = resultGen || [];
      const result = await this.nPelicula.getTable();
      this.listPelicula = result || [];
      res.render("presentacion/Ppelicula/pelicula", {
        listPelicula: this.listPelicula,
        listGenero: this.listGenero,
      });
    });
  }

  registrar(): void {
    this.router.route("/").post(async (req: Request, res: Response) => {
      const cod: string = req.body.cod;
      const titulo: string = req.body.titulo;
      const duracion: number = Number(req.body.duracion);
      const precio: number = Number(req.body.precio);
      const nro: number = Number(req.body.nro);
      const resp = await this.nPelicula.setPelicula(
        cod,
        titulo,
        duracion,
        precio,
        nro
      );
      res.redirect("/pelicula");
    });
  }

  eliminar(): void {
    this.router
      .route("/delete/:cod")
      .get(async (req: Request, res: Response) => {
        const cod: string = req.params.cod;
        const resp = await this.nPelicula.eliminar(cod);
        res.redirect("/pelicula");
      });
  }

  getPelicula(): void {
    this.router
      .route("/modificar/:cod/:nro")
      .get(async (req: Request, res: Response) => {
        const cod: string = req.params.cod;
        const nro: number = Number(req.params.nro);
        const resultGen = await this.nGenero.getGeneroCod(nro);
        const getPelicula = await this.nPelicula.getPelicula(cod);
        this.listGenero = resultGen || [];
        const selectGenero = this.listGenero[0];
        this.listGenero.shift();
        res.render("presentacion/Ppelicula/edit", {
          selectGenero: selectGenero,
          listGenero: this.listGenero,
          pelicula: getPelicula[0],
        });
      });
  }

  modificar(): void {
    this.router
      .route("/modificar/:cod")
      .post(async (req: Request, res: Response) => {
        const cod: string = req.params.cod;
        const titulo: string = req.body.titulo;
        const duracion: number = Number(req.body.duracion);
        const precio: number = Number(req.body.precio);
        const nro: number = Number(req.body.nro);
        const resp = await this.nPelicula.modificar(
          cod,
          titulo,
          duracion,
          precio,
          nro
        );
        res.redirect("/pelicula");
      });
  }
}

const PpeliculaRoutes = new Ppelicula();
export default PpeliculaRoutes.router;
