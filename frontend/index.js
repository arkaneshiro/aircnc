const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'public'))); 


app.set("view engine", "pug");

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/listings', (req, res) => {
    res.render('listingMain');
})

app.get('/kitchens/create', (req, res) => {
    res.render('createKitchen');
})

app.get('/profile', (req, res) => {
    res.render('profile')
})

app.get('/bookings/(:id(\\d+))', (req, res) => {
                // localStorage.setItem("AIRCNC_CURRENT_BOOKING", req.params.id)
    res.render('bookings')
})

// ****************************************
// *  Route '/kitchen/:id'
// *      GET endpoint
// *          - renders kitchen details page
// *          - API call to GET '/kitchen/:id'
// *******************************************/


app.get('/kitchen/:id(\\d+)', (req, res) => {
    res.render('kitchen-details');
})

app.get('/listings/:id(\\d+)/checkout', (req, res) => {
    res.render('listing-checkout');
            });
        

app.listen(4000, () => console.log(`Listening on port 4000...`));
