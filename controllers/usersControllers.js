const db = require("../database")


exports.getAllUsers = function (req, res) {
    // Exécute la commande SQL : sélectionne tous les utilisateurs de la liste et les renvoie
	db.all("SELECT * FROM users", [], (err, rows) => {
		if (err) {
			res.status(500).json({error: err.message})
		} else {
			res.json(rows)
		}
	})
}


exports.getOneUser = function (req, res) {
    // Récupère l'ID donné dans l'URL
    const id = parseInt(req.params.id)

    // Exécute la commande SQL : sélectionne l'utilisateur de la liste avec l'ID demandé (si existant) et le renvoie
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, rows) => {
		if (err) {
			res.status(500).json({error: err.message})
		} else {
			res.json(rows)
		}
	})
}


exports.addNewUser = function (req, res) {
    // Récupère les données dans le body
    const {firstName, lastName} = req.body

    // Teste si une chaine de caractères n'est composée que de lettres, chiffres et espaces
    function isAlphaNum(str) {
        const regex = /^[a-zA-Zz0-9]+|[\s]+$/
        return regex.test(str)
    }

    // Tests + envoie d'erreurs si nécessaire
    if (!firstName || !lastName) return res.status(400).json({error:"The first name and the last name are required !"})
    if (typeof firstName !== "string" || typeof lastName !== "string") return res.status(400).json({error:"That's a weird firstName/lastName !"})
    if (!isAlphaNum(firstName) || !isAlphaNum(lastName)) return res.status(400).json({error:"That firstName/lastName is not allowed !"})

    // S'il n'y a pas eu d'erreur, exécute la commande SQL : insère un nouvel utilisateur à la liste
    db.run("INSERT INTO users (firstName, lastName) VALUES (?, ?)", [firstName, lastName], function (err) {
        if (err) {
            res.status(500).json({error: err.message})
        } else {
            res.status(201).json({
                id: this.lastID, 
                firstName: firstName, 
                lastName: lastName
            })
        }
    })
}


exports.modifyUser = function (req, res) {
    // Récupère les données dans le body
    const {firstName, lastName} = req.body

    // Récupère l'ID donné dans l'URL
    const id = parseInt(req.params.id)


    // Champs à mettre à jour
    let updateFields = []

    // Valeurs associées
	let queryParams = []

	if (firstName) {
		updateFields.push("firstName = ?")
		queryParams.push(firstName)
	}

	if (lastName) {
		updateFields.push("lastName = ?")
		queryParams.push(lastName)
	}

	if (updateFields.length > 0) {
		// Ajoute id aux paramètres de la requête
		queryParams.push(id)

		// Construit la requête dynamiquement
		const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`

        // Exécute la commande SQL : met à jour l'utilisateur avec l'ID indiqué dans l'URL (si existant) et avec les données dans le body
		db.run(query, queryParams, function (err) {
			if (err) res.status(500).json({error: err.message})
			else if (this.changes === 0) res.status(404).json({msg: "Utilisateur non trouvé !"})
			else res.json({msg: "Utilisateur mis à jour !", id, firstName, lastName})
		})
	} else {
		res.status(400).json({msg: "Aucun champ à mettre à jour"})
	}
}


exports.deleteUser = function (req, res) {
    // Récupère l'ID donné dans l'URL
    const id = parseInt(req.params.id)

	// Exécute la commande SQL : supprime l'utilisateur avec l'ID donné dans l'URL
	db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
		if (err) res.status(500).json({error: err.message})
        else if (this.changes === 0) res.status(404).json({msg: "Utilisateur non trouvé !"})
		else res.status(200).json({msg: "Utilisateur supprimé!"})
	})
}