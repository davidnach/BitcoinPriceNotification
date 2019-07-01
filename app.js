const express = require('express')
const path = require('path');
const router = express.Router();

const app = express();
const port = (process.env.PORT || 3000);


app.use('/public',express.static('public'));


router.get('/', (req, res) => res.sendFile(path.join(__dirname,'index.html')));

router.get('/about', (req, res) => res.send("Hello world!"));

app.use('/',router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
