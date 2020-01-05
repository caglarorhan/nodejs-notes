const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controller/error');

const app = express();
const users = [];

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
// middlewares
app.use(bodyParser.urlencoded({ extended: false })); // register body-parser as a middleware
app.use(express.static(path.join(__dirname, 'public'))); // static ve public erisimi olan dosyayi bu sekilde belirtiyoruz, css, img ve statik js dosyalari burada oluyor.


app.use('/admin', adminRoutes.routes);
 
app.use('/',(req, res, next) => {
    res.render('landing-page', { pageTitle: 'Welcome to my page', activeUsersList: false, path:'landing-page'});
  });

app.use(errorController.get404);

app.listen(3000);
