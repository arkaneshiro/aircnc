const logout = document.querySelector(".logoutButton")

if (localStorage.getItem("AIRCNC_ACCESS_TOKEN") === null) {
    window.location.href = "/";
} else if (localStorage.getItem("AIRCNC_CURRENT_USER_ROLE") === 1) {
    window.location.href = "/dashboard";
}

logout.addEventListener("click", () => {
    event.preventDefault()
    localStorage.removeItem("AIRCNC_ACCESS_TOKEN");
    localStorage.removeItem("AIRCNC_CURRENT_USER_ID");
    localStorage.removeItem("AIRCNC_CURRENT_USER_ROLE");
    window.location.href = "/";
    return;
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
                pastBookings.push(booking)
            }


        });

        const pastBookingsContainer = document.querySelector(".pastBookings");
        const pastBookHtml = pastBookings.map(
            ({ Kitchen: { name, imgPath }, kitchenId, isConfirmed, id }) => {
                let confirmation = ''
                let cancelButton = ''

                if(isConfirmed){
                    confirmation = "Confirmed!"
                    cancelButton = `<a class="cancel-booking-button" href="/bookings/${id}">Cancel</a>`
                } else {
                    confirmation = "Cancelled!"
                }

                return `
                <div class="past-booking" id="booking-${id}">
                    <div class="past-booking-kitchen-name"> ${name} </div>
                    <div class="past-booking-confirmation"> ${confirmation} </div>
                    ${cancelButton}
                </div>
                `
                // Here is the code to add the image, once the images in the database makes sense: <img src="${imgPath[0]}">
            });
        pastBookingsContainer.innerHTML = `<div class="past-booking__header"> Past Bookings </div> ${pastBookHtml.join("")}`;

        const currentBookingsContainer = document.querySelector(".currentBookings");
        const currentBookHtml = currentBookings.map(
            ({ Kitchen: { name, imgPath }, kitchenId, isConfirmed, id }) => {
                let confirmation = ''

                if(isConfirmed){
                    confirmation = "Confirmed!"
                } else {
                    confirmation = "Cancelled!"
                }

                return `
                <div class="current-booking" id="booking-${id}">
                    <div class="current-booking-kitchen-name"> ${name} </div>
                    <div class="current-booking-confirmation"> ${confirmation} </div>
                    <a class="details-booking-${id}" href="/bookings/${id}">Details</a>
                </div>
                `
                // Here is the code to add the image, once the images in the database makes sense: <img src="${imgPath[0]}">
            });
        currentBookingsContainer.innerHTML = `<div class="current-booking__header"> Current Bookings </div> ${currentBookHtml.join("")}`;

    } catch (e) {
        console.error(e);
    }
});
