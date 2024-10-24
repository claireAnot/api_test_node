const express = require("express")
const router = express.Router()

const users = [
	{ id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' },
	{ id: 2, firstName: 'Jane', lastName: 'Smith', role: 'user' },
	{ id: 3, firstName: 'Alice', lastName: 'Johnson', role: 'moderator' },
	{ id: 4, firstName: 'Bob', lastName: 'Brown', role: 'user' },
	{ id: 5, firstName: 'Charlie', lastName: 'Davis', role: 'admin' },
];

module.exports = router

// Obtenir tous les utilisateurs
router.get("/users", (req, res) => {
	res.json({msg: "ROUTER : Bienvenue à tous mes utlisateurs !"})
})


// Obtenir un utilisateur via son ID
router.get("/users/:id", (req, res) => {
	// Récupère l'ID donné dans l'URL
    const id = parseInt(req.params.id)

	// Récupère l'utilisateur selon l'ID donné en paramètres dans l'URL (en parcourant la liste users), et le renvoie s'il le trouve
	for (let j = 0; j < users.length; j++) {
		if (users[j].id == id) {
			return res.json(users[j])
		}
	}
		
	return res.status(404).json({msg: "Utilisateur non trouvé !"})
})


// Ajouter un nouvel utilisateur, basé sur les données dans le body
router.post("/users", (req, res) => {
	const { firstName, lastName, role } = req.body

	// Calculer le nouvel identifiant
    const lastUserId = users[users.length - 1].id
    const newId = lastUserId + 1 

	const newUser = {
		id: newId,
		firstName: firstName,
		lastName: lastName,
		role: role,
	}

	// Ajouter le nouvel utilisateur dans la liste
	users.push(newUser)
	res.status(201).json(newUser)
})


// Modifier un utilisateur basé sur les données envoyées dans le body et le paramètre passé dans l'URL
router.put("/users/:id", (req, res) => {
	// Récupère l'ID donné dans l'URL
    const id = parseInt(req.params.id)

	// Récupère les infos dans le body
	const {firstName, lastName, role} = req.body

	// Récupère l'index associé à l'ID de l'utilisateur
	const userIndex = users.findIndex((user) => user.id === id)
    
	if (userIndex > 0) {
        if (firstName) users[userIndex].firstName = firstName
		if (lastName) users[userIndex].lastName = lastName
		if (role) users[userIndex].role = role
		return res.json({
			msg: "Utilisateur mis à jour !",
			user: users[userIndex],
		});
    } else {
        return res.status(404).json({msg: "Utilisateur non trouvé !"})
    }
})


router.put("/users", (req, res) => {
    return res.json({msg: "ici le PUT !!!"});
})


//Supprimer un utilisateur basé sur le paramètre passé dans l'URL
router.delete("/users/:id", (req, res) => {
	const id = parseInt(req.params.id)

	// Récupère l'utilisateur selon l'ID donné en paramètres dans l'URL (en parcourant la liste users), et le supprime s'il le trouve
	for (let j = 0; j < users.length; j++) {
		if (users[j].id == id) {
			users.splice(j, 1)
			return res.json({
				msg: "Utilisateur supprimé !",
				users: users,
			});
		}
	}
        
	return res.status(404).json({msg: "Utilisateur non trouvé"})
})


router.delete("/users", (req, res) => {
	res.json({msg: "ici le DELETE !!!"})
})