const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const { SESSION_SECRET, PORT } = process.env;

// routes
const infoRoutes = require('./routes/info');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({}));

// session config
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);

app.get('/', async function(req, res) {
	try {
		return res.json({
			success: true,
			message: `server is up and running.`
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message
		});
	}
});
app.use('/info', infoRoutes);

app.all('*', (req, res) => {
	res.status(404).json({
		message: `Error 404. requested path ${req.method}, ${req.url} not found.`,
		success: false
	});
});

app.use((err, req, res, next) => {
	if (err) {
		return res.json({
			success: false,
			message: err.message
		});
	}
	next();
});

app.listen(PORT || 3000, () => {
	console.log(`server is running on port: ${PORT},`);
});
