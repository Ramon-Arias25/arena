var mongoose = require('mongoose');
var app = require('./app');

var uri = 'mongodb+srv://ramonariasbarreto:bBn6AeYq2L7nb4A6@cluster0.kugcbqe.mongodb.net/';

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