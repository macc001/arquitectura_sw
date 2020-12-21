
create database arquitectura;
	
drop table genero;
create table genero
(
	nro int,
	nombre varchar,
	primary key(nro)
);

INSERT INTO genero (nro,nombre) VALUES
	(1,'comedia'),
	(2,'terror'),
	(3,'accion');
select * from genero;


drop table pelicula;
create table pelicula
(
	cod varchar,
	titulo varchar,
	duracion int,
	precio float,
	nro int,
	primary key(cod),
	foreign key(nro) references genero(nro)
);

INSERT INTO pelicula (cod,titulo,duracion,precio,nro) VALUES
	('p001','el chavo del ocho',14,10,1),
	('p002','camino equivocado',2,10,2),
	('p003','llorona',3,10,2);
select * from pelicula;