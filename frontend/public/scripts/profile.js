import { logOut, isLoggedIn, goToListings } from "./tools.js";

if (localStorage.getItem("AIRCNC_CURRENT_USER_ROLE") === '1') {
    window.location.href = "/dashboard";
}

document.addEventListener("DOMContentLoaded", async () => {
    isLoggedIn();
    logOut();
    goToListings()

    const userId = localStorage.getItem("AIRCNC_CURRENT_USER_ID")
    try {
        const res = await fetch(`http://localhost:8080/users/${userId}/bookings`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "AIRCNC_ACCESS_TOKEN"
                )}`,
            },
        });
        if (res.status === 401) {
            window.location.href = "/listings";
            return;
        }

        const { guestBookings } = await res.json();
        const pastBookings = [];
        const currentBookings = [];
        const today = new Date()
        guestBookings.forEach(booking => {
            if (Date.parse(booking.endDate) > Date.parse(today)) {
                currentBookings.push(booking)
            } else {
                pastBookings.unshift(booking)
            }


        });

        const pastBookingsContainer = document.querySelector(".pastBookings");
        const pastBookHtml = pastBookings.map(
            ({ Kitchen: { name, imgPath, streetAddress, city: { cityName: city }, state: { stateName: state } }, isConfirmed, id }) => {
                let confirmation = ''

                if (isConfirmed) {
                    confirmation = "Confirmed!"
                } else {
                    confirmation = "Cancelled!"
                }

                return `
                <div class="past-booking-container past-booking${id}">
                    <div class="past-booking-image-container">
                        <img class="past-booking-image" src="${imgPath[0]}">
                    </div>
                    <div class="past-booking-detail">
                        <div class="past-booking-kitchen-name"> ${name} </div>
                        <div class="past-booking-kitchen-address"> ${streetAddress} ${city}, ${state} </div>
                        <div class="past-booking-confirmation"> ${confirmation} </div>
                    </div>
                </div>
                `
                // Here is the code to add the image, once the images in the database makes sense: <img src="${imgPath[0]}">
            });
        pastBookingsContainer.innerHTML = `<div class="past-booking-header"> Past Bookings </div> <div class="past-bookings">${pastBookHtml.join("")}</div>`;

        const currentBookingsContainer = document.querySelector(".currentBookings");
        const currentBookHtml = currentBookings.map(
            ({ Kitchen: { name, imgPath, streetAddress, city: { cityName: city }, state: { stateName: state } }, isConfirmed, id }) => {
                let confirmation = ''
                let cancelButton = ''

                if (isConfirmed) {
                    confirmation = "Confirmed!"
                    cancelButton = `<button class="cancel-booking-button" value="/bookings/${id}">Cancel</button>`
                } else {
                    confirmation = "Cancelled!"
                }

                return `
                <div class="current-booking-container current-booking${id}">
                    <div class="current-booking-image-container">
                        <img class="current-booking-image" src="${imgPath[0]}">
                    </div>
                    <div class="current-booking-detail">
                        <div class="current-booking-kitchen-name"> ${name} </div>
                        <div class="current-booking-kitchen-address"> ${streetAddress} ${city}, ${state} </div>
                        <div class="current-booking-confirmation"> ${confirmation} </div>
                        ${cancelButton}
                    </div>
                </div>
                `

                // Here is the code to add the image, once the images in the database makes sense: <img src="${imgPath[0]}">
            });
        currentBookingsContainer.innerHTML = `<div class="current-booking-header"> Current Bookings </div> <div class="current-bookings">${currentBookHtml.join("")}</div>`;

        currentBookingsContainer.addEventListener("click", async () => {
            if((event.target.value).startsWith("/bookings/")) {
                window.location.href = `${event.target.value}`;
            }


        })


    } catch (e) {
        console.error(e);
    }

});
