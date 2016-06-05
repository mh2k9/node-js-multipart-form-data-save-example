var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    multer  = require('multer'),
    storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + ".jpg")
        }
    }),
    upload = multer({ storage: storage }),
    fUpload = upload.fields([{name: 'photo',maxCount: 1}]),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Home page routing
 */
app.get("/", function(req, res){
    res.render("index.ejs", {title: "Multer Upload Example"});
});

/**
 * Upload routing.
 * Update form data. Upload file using multer.
 */
app.post('/upload', function (req, res, next) {
    // Field data
    console.log(req.body);
    // File details
    console.log(req.files);

    // Upload File
    fUpload(req, res, function (err) {
        if (err) {
            console.log("An error occurred when uploading");
        }else{
            res.send("Form data saved!");
        }
    });
});

module.exports = app;
