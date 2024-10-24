const express = require('express');
const app = express();
const port = 3000;

// Connexion avec le router
const usersRouter = require("./routes/users.js")

// MIDDLEWARE
app.use(express.json());

// Users endpoint
app.use("/api/", usersRouter)


// Liste d'utilisateurs
/* const users = [
	{ id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' },
	{ id: 2, firstName: 'Jane', lastName: 'Smith', role: 'user' },
	{ id: 3, firstName: 'Alice', lastName: 'Johnson', role: 'moderator' },
	{ id: 4, firstName: 'Bob', lastName: 'Brown', role: 'user' },
	{ id: 5, firstName: 'Charlie', lastName: 'Davis', role: 'admin' },
]; */


// Laisse une trace en console quand le serveur est en cours d'exécution
app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});


// Ecris un message de bienvenue sur le serveur
app.get("/", (req, res) => {
	res.json({msg: "APP : Bienvenue à tous mes utlisateurs !"})
})