const express = require("express");
const bodyParser = require("body-parser");
const jugadores = require("./jugadores.json");
const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log("Servidor Iniciado"));

app.get("/api/jugadores", (req, res) => {
	res.statusCode = 200;
	res.send(jugadores);
});

//* Verifica que el ID sea válido
app.get("/api/jugadores/:id", (req, res) => {
	const id = req.params.id - 1;
	const jugador = jugadores.listaJugadores[id];
	if (jugador === undefined) {
		res.statusCode = 404;
	} else {
		res.statusCode = 200;
	}
	res.send(jugador);
});

//* Verifica que el ID sea único
app.post("/api/jugadores", (req, res) => {
	const datos = req.body;
	let jugadorId = jugadores.listaJugadores.find((jugador) => jugador.id == datos.id);
	if (jugadorId !== undefined) {
		res.statusCode = 409;
	} else {
		jugadorId ||= datos;
		jugadores.listaJugadores.push(datos);
		res.statusCode = 200;
	}
	res.send(jugadorId);
});
