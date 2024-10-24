const express = require('express');
const app = express();
const port = 3000;

const usersRouter = require("./routes/users.js")

app.use(express.json()); // MIDDLEWARE
app.use("/api/", usersRouter) // Users endpoint

const users = [
	{ id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' },
	{ id: 2, firstName: 'Jane', lastName: 'Smith', role: 'user' },
	{ id: 3, firstName: 'Alice', lastName: 'Johnson', role: 'moderator' },
	{ id: 4, firstName: 'Bob', lastName: 'Brown', role: 'user' },
	{ id: 5, firstName: 'Charlie', lastName: 'Davis', role: 'admin' },
];


// Trace en console quand le serveur est en cours d'exécution
app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});


// Obtenir tous les utilisateurs
app.get("/", (req, res) => {
	res.json({msg: "APP : Bienvenue à tous mes utlisateurs !"})
})