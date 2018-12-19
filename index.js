let express = require('express');
let bodyParser = require('body-parser');
let _ = require('underscore');
const path = require('path');

let app = express();
let PORT = process.env.PORT || 3000;
let messages = [];

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

app.get('/messages', function(req, res){
    res.json(messages);
});

app.post('/messages', function(req, res){
    let body = _.pick(req.body, "message", 'name');

    if (!_.isString(body.name) || !_.isString(body.message) || body.message.trim().length === 0) {
		return res.status(400).send();
    }

    messages.push(body);
    
    res.json(body);
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});