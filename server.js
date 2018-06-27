const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

//Create partials using hbs
hbs.registerPartials(__dirname + '/views/partials');
// Setting View Engine Template
app.set('view engine', 'hbs');

//  Create particular middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log!');
        }
    });
    next();
});

// Maintenance screen
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

// Setting statics objects directory
app.use(express.static(__dirname + '/public'));


// Registering a function as a helper for hbs
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my NODE project',
        name: 'Andrew',
        likes: [
            'Biking',
            'Cities'
        ]

    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request',
    });
})

app.listen(port, () => {
    console.log(`Server is up at port ${port} ...`)
});