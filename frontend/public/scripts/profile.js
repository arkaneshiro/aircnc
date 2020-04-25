const logout = document.querySelector(".logoutButton")

if (localStorage.getItem("AIRCNC_ACCESS_TOKEN") === null) {
    window.location.href = "/";
}

logout.addEventListener("click", () => {
    localStorage.removeItem("AIRCNC_ACCESS_TOKEN");
    localStorage.removeItem("AIRCNC_CURRENT_USER_ID");
    localStorage.removeItem("AIRCNC_CURRENT_USER_ROLE");
})

document.addEventListener("DOMContentLoaded", async () => {
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
            window.location.href = "/kitchens";
            return;
        }

        const { guestBookings } = await res.json();
        // console.log(guestBookings);
        const pastBookings = [];
        const currentBookings = [];
        const today = new Date()
        guestBookings.forEach(booking => {
            if (Date.parse(booking.endDate) > Date.parse(today)) {
                currentBookings.push(booking)
            } else {
                pastBookings.push(booking)
            }


        });
        // console.log(currentBookings)

        const pastBookingsContainer = document.querySelector(".pastBookings");
        const pastBookHtml = pastBookings.map(
            ({ Kitchen: { name, imgPath }, kitchenId, isConfirmed, id }) => {
                if(isConfirmed){
                    return `
                <div class="past-booking" id="booking-${id}">
                    <div class="past-booking__header"> Past Bookings </div>
                    <div class="past-booking-kitchen-name"> ${name} </div>
                    <div class="past-booking-confirmed"> Confirmed! </div>
                    <a class="details-booking-${id}" href="/bookings/${id}">Details</a>
                </div>
                `
                } else {
                    return `
                <div class="past-booking" id="booking-${id}">
                    <div class="past-booking-kitchen-name"> ${name} </div>
                    <div class="past-booking-cancelled"> Cancelled! </div>
                    <a class="details-booking-${id}" href="/bookings/${id}">Details</a>
                </div>
                `
                }
                // Here is the code to add the image, once the images in the database makes sense: <img src="${imgPath[0]}">
            });
        pastBookingsContainer.innerHTML = `${pastBookHtml.join("")}`;

        const currentBookingsContainer = document.querySelector(".currentBookings");
        const currentBookHtml = currentBookings.map(
            ({ Kitchen: { name, imgPath }, kitchenId, isConfirmed, id }) => {
                if(isConfirmed){
                    return `
                <div class="current-booking" id="booking-${id}">
                    <div class="current-booking-kitchen-name"> ${name} </div>
                    <div class="current-booking-confirmed"> Confirmed! </div>
                    <a class="details-booking-${id}" href="/bookings/${id}">Details</a>
                </div>
                `
                } else {
                    return `
                <div class="current-booking" id="booking-${id}">
                    <div class="current-booking-kitchen-name"> ${name} </div>
                    <div class="current-booking-cancelled"> Cancelled! </div>
                    <a class="details-booking-${id}" href="/bookings/${id}">Details</a>
                </div>
                `
                }
                // Here is the code to add the image, once the images in the database makes sense: <img src="${imgPath[0]}">
            });
        currentBookingsContainer.innerHTML = `Current Bookings ${currentBookHtml.join("")}`;

    } catch (e) {
        console.error(e);
    }
});
