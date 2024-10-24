const express = require("express")
const router = express.Router()

module.exports = router
const db = require("../database")


// Obtenir tous les utilisateurs
router.get("/users", (req, res) => {
	db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(rows);
        }
      });
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
	// Récupère les infos dans le body
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


// PUT test
router.put("/users", (req, res) => {
    return res.json({msg: "ici le PUT !!!"});
})


// Supprimer un utilisateur basé sur le paramètre passé dans l'URL
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


// DELETE test
router.delete("/users", (req, res) => {
	res.json({msg: "ici le DELETE !!!"})
})
