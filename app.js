var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDb          = require("./seeds"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local")
    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index")
    
// seedDb();

//db init
mongoose.connect('mongodb://localhost/yelp_camp');

app.use(express.static(__dirname + "/public"))// dirname safer to use public 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}) );//

//================
// passport config
//================
app.use(require("express-session")( {
    secret: "There is someone HAVE A FEELING TO HUANGQIN ",
    resave: false,
    saveUninitialized: false
} ));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware!!!
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

//routes

// ================================
// campgrounds
// ================================
app.use(indexRoutes);
app.use("/campgrounds/:id/comments" ,commentRoutes);
app.use("/campgrounds", campgroundRoutes);

//=====================================================
//comment
//=====================================================

// ======
// auth routes
// ======

app.get("*",  function(req, res) {
    res.send("404 NOT FOUND")
})
//listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log(" yelp Camp service has started!");
});