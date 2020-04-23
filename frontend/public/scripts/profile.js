const logout = document.querySelector(".logoutButton")

if (localStorage.getItem("AIRCNC_ACCESS_TOKEN") === null) {
    window.location.href = "/";
}

logout.addEventListener("click", () => {
    localStorage.removeItem("AIRCNC_ACCESS_TOKEN");
    localStorage.removeItem("AIRCNC_CURRENT_USER_ID");
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
            ({ kitchenId, isConfirmed, id }) => `
            <div class="past-booking" id="booking-${id}">
                <div class="past-booking-kitchen"> kitchen ${kitchenId} </div>
                <div class="past-booking-confirmation"> Confirmation: ${isConfirmed} </div>
                <a class="details-booking-${id}" href="/bookings/${id}">Details</a>
            </div>
          `
        );
        pastBookingsContainer.innerHTML = `Past Bookings ${pastBookHtml.join("")}`;

        const currentBookingsContainer = document.querySelector(".currentBookings");
        const currentBookHtml = currentBookings.map(
            ({ kitchenId, isConfirmed, id }) => `
            <div class="current-booking" id="booking-${id}">
                <div class="current-booking-kitchen"> kitchen ${kitchenId} </div>
                <div class="current-booking-confirmation"> Confirmation: ${isConfirmed} </div>
                <a class="details-booking-${id}" href="/bookings/${id}">Details</a>
            </div>
          `
        );
        currentBookingsContainer.innerHTML = `Current Bookings ${currentBookHtml.join("")}`;

    } catch (e) {
        console.error(e);
    }
});
