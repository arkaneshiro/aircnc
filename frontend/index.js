const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'public'))); 


app.set("view engine", "pug");

app.get('/', (req, res) => {
    res.render('home')


app.get('/listings', (req, res) => {
    res.render('listingMain');


app.get('/kitchens/create', (req, res) => {
    res.render('createKitchen');
});

app.get('/profile', (req, res) => {
    res.render('profile')
})


app.listen(4000, () => console.log(`Listening on port 4000...`));
