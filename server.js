const express = require("express");
const db = require("./models/index");
const userRoutes = require("./routes/userRoutes");
const path = require('path');
require("dotenv").config();

const app = express();

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '/frontend/build/')));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});


//database connection
db.sequelize.sync({ force: false }).then(() => {
	console.log("db");
});
//middlewares
app.use(express.json());

//routes
app.use('/', userRoutes);


app.listen(port, () => {
	console.log(`App is running in port : ${port}`);
})
