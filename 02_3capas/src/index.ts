import express from "express";
import exphbs from "express-handlebars";
import path from "path";

import Pgenero from "./views/presentacion/Pgenero/Pgenero";
import Ppelicula from "./views/presentacion/Ppelicula/Ppelicula";

const app = express();

app.set("port", 3000);

app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    partialsDir: path.join(app.get("views"), "partials"),
    layoutsDir: path.join(app.get("views"), "layout"),
    defaultLayout: "main",
  })
);
app.set("view engine", ".hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/genero", Pgenero);
app.use("/pelicula", Ppelicula);

app.listen(app.get("port"), () => {
  console.log(`Server On Port ${app.get("port")}`);
});
