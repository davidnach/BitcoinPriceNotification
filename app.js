const express = require('express')
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
const port = (process.env.PORT || 3000);

const AWS = require("aws-sdk");

AWS.config.update({
	region: "us-east-2"
});


var dynamodb = new AWS.DynamoDB();

var params = {
	TableName: "EmailSubscriber",
	Item: {
		"emailAddress":{
			S: "davidnachson@gmail.com"
		},
		"name": {
			S: "david"
		}
	}
};





app.use('/public',express.static('public'));


router.get('/', (req, res) => res.sendFile(path.join(__dirname,'index.html')));


router.post('/submitForm', function(req,res) {
	dynamodb.putItem(params, function(err,data) {
		if(err){
			res.status(err).end();
			console.log('DDB error: ' + err);
		} else {

			res.status(201).end();
		}
	});
	console.log(req.body);
});
	

app.use('/',router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
