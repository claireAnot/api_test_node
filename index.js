const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        msg: "hello from API"
    })
})

app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

app.post("/", (req, res) => {
	res.json({
		msg: "ici le post !!!",
	})
})

app.post("/", (req, res) => {
    console.log(req.body);
    
	res.json({
		msg: "ici le post !!!",
	})
})