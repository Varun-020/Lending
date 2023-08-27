const express = require("express");
const db = require("./models/index");
const userRoutes = require("./routes/userRoutes");
const path = require('path');
const cors = require("cors");
require("dotenv").config();

const app = express();
var corsOptions = {
	origin: "http://localhost:8081"
};
app.use(express.json());
app.use(cors(corsOptions));
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


//routes
app.use('/', userRoutes);


app.listen(port, () => {
	console.log(`App is running in port : ${port}`);
})
