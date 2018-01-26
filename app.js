var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

//db init
mongoose.connect('mongodb://localhost/yelp_camp');

var campSchema = new mongoose.Schema({
    name: String,
    image: String
})

var campground = mongoose.model('Campground', campSchema);

// campground.create({
    // name: 'byran',
    // image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Downtown-bryan2.jpg'
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('new campground created');
//         console.log(campground);
//     }
// })

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}) );//

//routes
app.get('/', function(req, res){
    res.render('landing');
});
app.get('/campgrounds', function(req, res){
    campground.find({}, function(err, campgrounds){
        if(err) {
            console.log(err);
        }
        else {
            res.render('campgrounds', {campgrounds: campgrounds} );
        }
    })
    
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
    campground.create(newCamp, function(err, newCampground){
        if(err) {
            console.log(err);
        }
        else
        {
            //console.log(newCampground);
             res.redirect('/campgrounds');
        }
    })
   
    //redirect to compground page,
})
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
})
app.get('/campgrounds/:id', function(req, res) {
    campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
        }
        else {
            res.render('show', {campground: foundCamp});
        }
    });
})
//listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log(" yelp Camp service has started!");
});