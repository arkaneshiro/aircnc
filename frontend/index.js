const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'public'))); 


app.set("view engine", "pug");

app.get('/', (req, res) => {
    res.render('home')


app.get('/listings', (req, res) => {
    res.render('listingMain');


app.get('/listings/create', (req, res) => {
    res.render('createKitchen');
});

app.get('/profile', (req, res) => {
    res.render('profile')
})

/*******************************************
 *  Route '/kitchen/:id'
 *      GET endpoint
 *          - renders kitchen details page
 *          - API call to GET '/kitchen/:id'
 *******************************************/
app.get('/kitchen/:id(\\d+)', (req, res) => {
    res.render('kitchen-details');
});

app.listen(4000, () => console.log(`Listening on port 4000...`));
