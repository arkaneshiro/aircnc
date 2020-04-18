

Users

    POST /users - sign up
    PATCH /users/:id - edit user informations

Session
    POST /session - log in
    DELETE /session - log out

Kitchens
    GET /kitchens - returns all kitchens
    GET /kitchens/search - returns matching kitchens by query params (city, features etc)
    GET /kitchens/:id - returns a particular kitchen


    GET /users/:id/kitchens - returns all of a hosts kitchens
    POST /kitchens - create a kitchen
    DELETE /kitchens/:id - delete a kitchen


Bookings
    POST /kitchens/:id - guest creates a booking
    GET /users/:id/bookings - returns all of a guests bookings
    GET /bookings/:id - returns a particular booking
    PATCH /bookings/:id - a guest / host cancels a particular booking
    GET /kitchens/:id/bookings - returns all bookings for a particular kitchen
        GET /users/:id/kitchens/bookings - returns all of a hosts bookings

Reviewing
    GET /kitchens/:id/reviews - returns all reviews for a particular kitchen
    GET /users/:id/reviews - returns all reviews for a particular guest
    POST /kitchens/:id/reviews - guest creates a review for a kitchen
    POST /users/:id/reviews - host creates a review for a guest
