# Multer Upload Example

Multer is a node.js middleware for processing `multipart/form-data` and which is used for uploading files.

## Installation

```sh
$ npm install multer
```

## How to use?

app.js 

```javascript
var express = require('express'),
    multer  = require('multer'),
    storage = multer.diskStorage({
    destination: function (req, file, next) {
          next(null, './uploads')
       },
       filename: function (req, file, next) {
          next(null, 'avatar-' + Date.now() + ".jpg")
       }
    }),
    upload = multer({ storage: storage }),
    fUpload = upload.fields([{name: 'photo', maxCount: 1}]),
    app = express();

/**
 * Upload routing.
 * Update form data. Upload file using multer.
 */
app.post('/upload', fUpload, function (req, res, next) {
    // Field data
    console.log(req.body);
    // File details
    console.log(req.files);

    // Error handling
    fUpload(req, res, function (err) {
        if (err) {
            console.log("An error occurred when uploading");
        }else{
            res.send("Form data saved!");
        }
    });
});
```

## HTML form (index.ejs)

```html
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="text" name="username" placeholder="Username...">
    <input type="file" name="photo">
    <input type="submit" value="Save">
</form>
```