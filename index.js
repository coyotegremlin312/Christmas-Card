let express = require('express');
let bodyParser = require('body-parser');
let _ = require('underscore');
const path = require('path');
var db = require('./db.js');

let app = express();
let PORT = process.env.PORT || 5000;
let messages = [];

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

app.get('/messages', function(req, res){
    var query = req.query;
	var where = {};

	if (query.hasOwnProperty('name')) {
		where.name = query.name;
	}

	if (query.hasOwnProperty('message') && query.message.length > 0) {
		where.message = query.message;
	}

	db.note.findAll({
		where: where
	}).then(function(messages) {
		res.json(messages);
	}, function(e) {
		res.status(500).send();
	});
});

app.post('/messages', function(req, res){
    var body = _.pick(req.body, 'message', 'name');

	db.note.create(body).then(function(note) {
		res.json(note.toJSON());
	}, function(e) {
		res.status(400).json(e);
	});
});

app.listen(PORT, function () {
	console.log('Express listening on port' + PORT + ' !');
});