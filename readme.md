CUE: IMPLEMENTACIÓN DE UNA API REST (I)
REBOUND EXERCISE: CREANDO UNA API REST CON NODE.JS Y EXPRESS
Para resolver este ejercicio, anteriormente debe haber revisado la lectura y los videos del CUE: API REST I.
EJERCICIO:
Desarrolla una API REST en backend con Node.JS y Express, que permita gestionar un conjunto de
jugadores de fútbol, los cuales contienen los siguientes atributos: id, nombre, posición.
Los endpoint tienen la siguiente estructura:
Ruta Verbo HTTP Descripción
/api/jugadores GET Listado de todos los jugadores.

```js
app.get("/api/jugadores", (req, res) => {
	res.statusCode = 200;
	res.send(jugadores);
});
```
/api/jugadores/:id GET Datos del jugador según id.

```js
app.get("/api/jugadores/:idJugador", (req, res) => {
	const id = req.params.idJugador - 1;
	const jugador = jugadores.listaJugadores[id];
	if (jugador === undefined) {
		res.statusCode = 404;
	} else {
		res.statusCode = 200;
	}
	res.send(jugador);
});
```
/api/jugadores POST Ingreso de un jugador.

```js
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
```