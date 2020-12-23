import { Router, Request, Response } from "express";
import { Ngenero } from "../../../negocio/Ngenero";

class Pgenero {
  public router: Router = Router();
  public nGenero: Ngenero;
  public listGenero: any[];

  constructor() {
    this.listGenero = [];
    this.nGenero = new Ngenero();
    this.listarTabla();
    this.registrar();
    this.eliminar();
    this.getGenero();
    this.modificar();
  }

  listarTabla(): void {
    this.router.route("/").get(async (req: Request, res: Response) => {
      const result = await this.nGenero.getTable();
      this.listGenero = result || [];
      res.render("presentacion/Pgenero/genero", {
        listGenero: this.listGenero,
      });
    });
  }

  registrar(): void {
    this.router.route("/").post(async (req: Request, res: Response) => {
      const nro: number = Number(req.body.nro);
      const genero: string = req.body.genero;
      const resp = await this.nGenero.setGenero(nro, genero);
      res.redirect("/genero");
    });
  }

  eliminar(): void {
    this.router
      .route("/delete/:nro")
      .get(async (req: Request, res: Response) => {
        const nro: number = Number(req.params.nro);
        const resp = await this.nGenero.eliminar(nro);
        res.redirect("/genero");
      });
  }

  getGenero(): void {
    this.router
      .route("/modificar/:nro")
      .get(async (req: Request, res: Response) => {
        const nro: number = Number(req.params.nro);
        const getGenero = await this.nGenero.getGenero(nro);
        res.render("presentacion/Pgenero/edit", {
          genero: getGenero[0],
        });
      });
  }

  modificar(): void {
    this.router
      .route("/modificar/:nro")
      .post(async (req: Request, res: Response) => {
        const nro: number = Number(req.params.nro);
        const genero: string = req.body.genero;
        const resp = await this.nGenero.modificar(nro, genero);
        res.redirect("/genero");
      });
  }
}

const PgeneroRoutes = new Pgenero();
export default PgeneroRoutes.router;
