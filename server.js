const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', (log + '\n'), (err) => {
        if (err) {
            console.log('Unable to append to server log.')
        }
    })
    next();
});

/*app.use((req, res, next) => {
    res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    console.log('Running Server');
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Welcome',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my website!',
        name: 'Mayank',
        likes: [
            'Programming',
            'Gaming'
        ]
    })
});

app.get('/user/:user_id', (req, res, next) => {
    console.log('Incoming User ID:', req.params.user_id);
    console.log(JSON.stringify(req.params, undefined, 2));
    res.send('Getting details of User ID: ' + req.params.user_id);
});

app.get('/about', (req, res) => {
    // res.send('<b>About</b> Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});