const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'public'))); 


app.set("view engine", "pug");

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/listings', (req, res) => {
    res.render('listingMain');
});

app.get('/kitchens/create', (req, res) => {
    res.render('createKitchen');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/bookings/(:id(\\d+))', (req, res) => {
    res.render('bookings');
}); 

app.get('/signup', (req, res) => {
    res.render('sign-up');
});
/*******************************************
 *  Route '/kitchen/:id'
 *      GET endpoint
 *          - renders kitchen details page
 *          - API call to GET '/kitchen/:id'
 *******************************************/                  
app.get('/listings/:id(\\d+)', (req, res) => {
    res.cookie("kitchenId", req.params.id);
            res.render('kitchen-details');              
        });
    
app.get('/bookings/:id(\\d+)/guestReview', (req, res) => {
        res.cookie("id", req.params.id);
        res.render('guest-review');
    }); 

app.get('/bookings/:id(\\d+)/kitchenReview', (req, res) => {
    res.cookie("bookingId", req.params.id); res.render('kitchen-review')
        });

    app.get('/calendar', (req, res) => {
        res.render('calendar');
    });

app.listen(4000, () => console.log(`Listening on port 4000...`));
