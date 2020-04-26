import { logOut, isLoggedIn, createListing, goToDashboard } from "./tools.js";
const userId = localStorage.getItem("AIRCNC_CURRENT_USER_ID")
const pastBookingsContainer = document.querySelector(".pastBookings");
const currentBookingsContainer = document.querySelector(".currentBookings");
const kitchensContainer = document.querySelector(".kitchens-container");

if (localStorage.getItem("AIRCNC_CURRENT_USER_ROLE") === 2) {
    window.location.href = "/listings";
}

// event listener for cancel buttons
currentBookingsContainer.addEventListener("click", async () => {
    if ((event.target.value).startsWith("bookings/")) {
        try {
            const res = await fetch(`http://localhost:8080/${event.target.value}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "AIRCNC_ACCESS_TOKEN"
                    )}`,
                    "Content-Type": "application/json",
                },
            });
            // sends user back to profile
            window.location.href = `/profile`;
            return;
        } catch (e) {
            console.error(e);
        }
    }
})

document.addEventListener("DOMContentLoaded", async () => {
    isLoggedIn();
    logOut();
    createListing();
    goToDashboard();
    try {
        // fetch call to get hosts kitchens
        const res = await fetch(`http://localhost:8080/users/${userId}/kitchens`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "AIRCNC_ACCESS_TOKEN"
                )}`,
                "Content-Type": "application/json",
            },
        });

        // fetch call to get hosts bookings
        const resII = await fetch(`http://localhost:8080/users/${userId}/kitchens/bookings`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "AIRCNC_ACCESS_TOKEN"
                )}`,
            },
        });

        const { kitchens: hostKitchens } = await res.json();
        const { hostBookings } = await resII.json();

        // generate kitchen details
        const kitchenDetailHtml = hostKitchens.map(({
            imgPath,
            streetAddress,
            name,
            id: kitchenId,
            rate,
            kitchenFeature,
            city: { cityName },
            state: { stateName } }) => {

            let features = "";
            if (kitchenFeature) {
                kitchenFeature.forEach(({ feature }, i) => {
                    if (i === kitchenFeature.length - 1) {
                        features += `${feature.feature}`
                    } else {
                        features += `${feature.feature} •`
                    }
                });
            }
            return `
            <div class="kitchen-container" id="kitchen-${kitchenId}">
                <div class="kitchen-image-container">
                    <img src="${imgPath[0]}">
                </div>
                <div class="kitchen-detail-container">
                    <div class="kitchen-name-and-star-rating">
                        <span class="kitchen-name" > ${name} </span>
                        <span class="kitchen-star-rating" > Star Rating (${Math.floor(Math.random() * (5)) + 1})</span>
                    </div>
                    <div class="kitchen-address"> ${streetAddress}, ${cityName}, ${stateName} </div>
                    <div class="kitchen-detail"> •${features} </div>
                    <div class="kitchen-reviews-and-price">
                        <span class="kitchen-detail-reviews"> ${Math.floor(Math.random() * (100))} people would rent again </span>
                        <span class="kitchen-rate"> $${rate} </span>
                    </div>
                </div>
            </div>
            `
        });


        // divides bookings into current and past by comparing to today's date
        const pastBookings = [];
        const currentBookings = [];
        const today = new Date()

        hostBookings.forEach(booking => {
            if (Date.parse(booking.endDate) > Date.parse(today)) {
                currentBookings.push(booking)
            } else {
                pastBookings.unshift(booking)
            }
        });


        // generates HTML for each past booking
        const pastBookHtml = pastBookings.map(({
            Kitchen: { name, imgPath, streetAddress, city: { cityName: city }, state: { stateName: state } },
            isConfirmed,
            id,
            startDate,
            endDate }) => {

            let confirmation = '';
            const startYear = startDate.substring(0,4);
            const startMonth = startDate.substring(5,7);
            const startDay = startDate.substring(8,10);
            const endYear = endDate.substring(0,4);
            const endMonth = endDate.substring(5,7);
            const endDay = endDate.substring(8,10);


            if (isConfirmed) {
                confirmation = "Confirmed!";
            } else {
                confirmation = "Cancelled!";
            }

            return `
            <div class="past-booking-container past-booking${id}">
                <div class="past-booking-detail">
                    <div class="past-booking-kitchen-name"> ${name} </div>
                    <div class="past-booking-kitchen-address"> ${streetAddress} ${city}, ${state} </div>
                    <div class="past-booking-date"> ${startMonth}/${startDay}/${startYear} to ${endMonth}/${endDay}/${endYear} </div>
                    <div class="past-booking-confirmation"> ${confirmation} </div>
                </div>
            </div>`;
        });

        // generates HTML for each current booking
        const currentBookHtml = currentBookings.map(({
            Kitchen: { name, imgPath, streetAddress, city: { cityName: city }, state: { stateName: state } },
            isConfirmed,
            id,
            startDate,
            endDate }) => {

            let confirmation = '';
            let cancelButton = '';
            const startYear = startDate.substring(0,4);
            const startMonth = startDate.substring(5,7);
            const startDay = startDate.substring(8,10);
            const endYear = endDate.substring(0,4);
            const endMonth = endDate.substring(5,7);
            const endDay = endDate.substring(8,10);

            if (isConfirmed) {
                confirmation = "Confirmed!";
                cancelButton = `<button class="cancel-booking-button" value="bookings/${id}">Cancel</button>`;
            } else {
                confirmation = "Cancelled!";
            }

            return `
            <div class="current-booking-container current-booking${id}">
                <div class="current-booking-detail">
                    <div class="current-booking-kitchen-name"> ${name} </div>
                    <div class="current-booking-kitchen-address"> ${streetAddress} ${city}, ${state} </div>
                    <div class="current-booking-date"> ${startMonth}/${startDay}/${startYear} to ${endMonth}/${endDay}/${endYear} </div>
                    <div class="current-booking-confirmation"> ${confirmation} </div>
                    ${cancelButton}
                </div>
            </div>`;
        });


        // setting generated html to innerHTML
        kitchensContainer.innerHTML = `${kitchenDetailHtml.join("")}`;
        pastBookingsContainer.innerHTML = `<div class="past-booking-header"> Past Bookings </div> <div class="past-bookings">${pastBookHtml.join("")}</div>`;
        currentBookingsContainer.innerHTML = `<div class="current-booking-header"> Current Bookings </div> <div class="current-bookings">${currentBookHtml.join("")}</div>`;

    } catch (e) {
        console.error(e);
    }
});
