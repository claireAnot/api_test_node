const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const users = [
	{ id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' },
	{ id: 2, firstName: 'Jane', lastName: 'Smith', role: 'user' },
	{ id: 3, firstName: 'Alice', lastName: 'Johnson', role: 'moderator' },
	{ id: 4, firstName: 'Bob', lastName: 'Brown', role: 'user' },
	{ id: 5, firstName: 'Charlie', lastName: 'Davis', role: 'admin' }
];

app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

// Lire tous les utilisateurs
app.get("/", (req, res) => {
    // res.json({
    //     msg: "ici le GET"
    // })

	res.json(users)
})

// Modifier un utilisateur basé sur les données envoyées dans le corps et le paramètre passés dans l'URL
app.post("/", (req, res) => {
	const { firstName, lastName, role } = req.body
	console.log(req.body);

	const newUser = {
		firstName,
		lastName,
		role,
	}

	// calculer le nouvel identifiant
    const lastUserId = users[users.length - 1].id
    const newId = lastUserId + 1 

	//ajouter le nouvel identifiant au nouvel utilisateur
    newUser.id = newId

	res.status(201).json(newUser)
	users.push(newUser)
})

// Modifier un utilisateur basé sur les données envoyées dans le corps et le paramètre passés dans l'URL
app.put("/:id", (req, res) => {
	console.log(req.params)

	res.json({
		msg: "ici le PUT !!!",
	})
})

//Supprimer un utilisateur basé sur le paramètre passé dans l'URL
app.delete("/", (req, res) => {
	res.json({
		msg: "ici le DELETE !!!",
	})
})