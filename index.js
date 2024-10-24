const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Liste d'utilisateurs
const users = [
	{ id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' },
	{ id: 2, firstName: 'Jane', lastName: 'Smith', role: 'user' },
	{ id: 3, firstName: 'Alice', lastName: 'Johnson', role: 'moderator' },
	{ id: 4, firstName: 'Bob', lastName: 'Brown', role: 'user' },
	{ id: 5, firstName: 'Charlie', lastName: 'Davis', role: 'admin' }
];


// Laisse une trace en console quand le serveur est en cours d'exécution
app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});


// Obtenir tous les utilisateurs
app.get("/", (req, res) => {
	res.json(users)
})


// Ajouter un nouvel utilisateur, basé sur les données dans le body
app.post("/", (req, res) => {
	// Récupère les informations dans le body
	const { firstName, lastName, role } = req.body

	// Ecris le contenu du body en console
	console.log(req.body);

	// Crée le nouvel utilisateur à insérer
	const newUser = {
		firstName,
		lastName,
		role,
	}

	// Calcule le nouvel identifiant
    const lastUserId = users[users.length - 1].id
    const newId = lastUserId + 1 

	// Ajoute le nouvel identifiant au nouvel utilisateur
    newUser.id = newId

	res.status(201).json(newUser)
	// Ajoute le nouvel utilisateur à la liste
	users.push(newUser)
})


// Renvoie l'utilisateur demandé par l'ID saisi dans l'URL
app.put("/:id", (req, res) => {
	// Récupère l'ID dans l'URL
    const i = parseInt(req.params.id)

    if (i > 0 && i <= users.length) {
	// Renvoie l'utilisateur à la position correspondante
        return res.json(users.at(i-1));
    } else {
        return res.json({
            msg: "Utilisateur non trouvé !"
        });
    }
})


// PUT test
app.put("/", (req, res) => {
    return res.json({
            msg: "ici le PUT !!!"
        });
})


// Supprimer un utilisateur basé sur l'ID passé dans l'URL
app.delete("/:id", (req, res) => {
	// Récupère l'ID dans l'URL
	const i = parseInt(req.params.id)

	// Parcours la liste 'users' et supprime l'utilisateur pour lequel l'ID match avec celui demandé
	for (let j = 0; j < users.length; j++) {
		if (users[j].id == i) {
			users.splice(j, 1)
			return res.json(users);
		}
	}
        
    return res.json({
            msg: "Utilisateur non trouvé !"
        });
})


// DELETE test
app.delete("/", (req, res) => {
	res.json({
		msg: "ici le DELETE !!!",
	})
})
