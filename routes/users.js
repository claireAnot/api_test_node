const express = require("express")
const router = express.Router()

// Fonctions importées de userControllers
const { 
	getAllUsers,
	getOneUser,
	addNewUser,
	modifyUser,
	deleteUser,
 } = require("../controllers/usersControllers")


module.exports = router


// Obtenir tous les utilisateurs
router.get("/users", getAllUsers)


// Obtenir un utilisateur via son ID
router.get("/users/:id", getOneUser)


// Ajouter un nouvel utilisateur, basé sur les données dans le body
router.post("/users", addNewUser)


// Modifier un utilisateur basé sur les données envoyées dans le body et l'ID passé dans l'URL
router.put("/users/:id", modifyUser)


// PUT test
router.put("/users", (req, res) => {
    return res.json({msg: "ici le PUT !!!"});
})


// Supprimer un utilisateur basé sur le paramètre passé dans l'URL
router.delete("/users/:id", deleteUser)


// DELETE test
router.delete("/users", (req, res) => {
	res.json({msg: "ici le DELETE !!!"})
})