var mongoose = require('mongoose');
var app = require('./app');
require('dotenv').config();


var uri = process.env.MONGODB_URI2;
//mongoose.Promise - global.Promise;
mongoose.set('strictQuery', false);

app.set('port', process.env.PORT || 3800);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('DB is Connect');
        //create server
        app.listen(app.get('port'), () => {
            console.log("URI: ", "MongoAtlas"); //uri);
            console.log("Port: ", app.get('port'));
        });
    })
    .catch(err => console.log(err));