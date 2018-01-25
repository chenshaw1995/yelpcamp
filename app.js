var express = require("express");
var app = express();
var bodyParser = require("body-parser");


var campgrounds = [
    {
        name: 'college station',
        image: 'https://photos.zillowstatic.com/p_e/ISukbrerb7ht9t0000000000.jpg'
    },
    {
        name: 'byran',
        image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Downtown-bryan2.jpg'
    }
    ];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}) );//

//routes
app.get('/', function(req, res){
    res.render('landing');
});
app.get('/campgrounds', function(req, res){
    
    res.render('campgrounds', {campgrounds: campgrounds} );
});
app.post('/campgrounds', function(req, res){
   // res.send('hit the post');
    // console.log(typeof req.body.name);
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {
        name: name, image: image
    };  // init object use {}      
    //body parser get from body, the data is in json, with body parser, we can get name by req.body.name
    campgrounds.push(newCamp);
    res.redirect('/campgrounds');
    //redirect to compground page,
})
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
})
//listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log(" yelp Camp service has started!");
});