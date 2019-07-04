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


var sns = new AWS.SNS();
var dynamodb = new AWS.DynamoDB();





app.use('/public',express.static('public'));


router.get('/', (req, res) => res.sendFile(path.join(__dirname,'index.html')));


router.post('/submitForm', function(req,res) {
	var item = {
		 TableName: "EmailSubscriber",
		 Item: {
			 "emailAddress" :{
				 S :  req.body.email
			 },
			 "name" : {
				 S :  req.body.name
			 }
		}
	
	};
	
	dynamodb.putItem(item, function(err,data) {
		if(err){
			res.status(err).end();
			console.log('DDB error: ' + err);
		} else {
			var params = {
				Protocol: 'EMAIL',
				TopicArn: "arn:aws:sns:us-east-2:474675807735:bitcoinPriceNotification",
				Endpoint: req.body.email
			}
			var subscribePromise = sns.subscribe(params).promise();

			subscribePromise.then(
  				function(data) {
    					console.log("Subscription ARN is " + data.SubscriptionArn);
  					}).catch(
    						function(err) {
    						console.error(err, err.stack);
  					});


			res.status(201).end();

		}
	});
	
	res.end();
	console.log(req.body);
});
	

app.use('/',router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
