const logout = document.querySelector(".logoutButton")

if (localStorage.getItem("AIRCNC_ACCESS_TOKEN") === null) {
    window.location.href = "/";
} else if (localStorage.getItem("AIRCNC_CURRENT_USER_ROLE") === 2) {
    window.location.href = "/listings";
}

logout.addEventListener("click", () => {
    localStorage.removeItem("AIRCNC_ACCESS_TOKEN");
    localStorage.removeItem("AIRCNC_CURRENT_USER_ID");
    localStorage.removeItem("AIRCNC_CURRENT_USER_ROLE");
})

document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("AIRCNC_CURRENT_USER_ID")
    try {
        const res = await fetch(`http://localhost:8080/users/${userId}/kitchens`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "AIRCNC_ACCESS_TOKEN"
                )}`,
                "Content-Type": "application/json",
            },
        });

        const resII = await fetch(`http://localhost:8080/users/${userId}/kitchens/bookings`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "AIRCNC_ACCESS_TOKEN"
                )}`,
            },
        });


        const { kitchens: hostKitchens } = await res.json();
        const { hostBookings } = await resII.json();

        const kitchensContainer = document.querySelector(".host-kitchens");
        const kitchenDetailHtml = hostKitchens.map(
            ({ imgPath, streetAddress, name, id: kitchenId, rate, kitchenFeature, city: { cityName }, state: { stateName } }) => {
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
                // Here is the code to add the image, once the images in the database makes sense: <img src="${imgPath[0]}">
            });
        kitchensContainer.innerHTML = `${kitchenDetailHtml.join("")}`;


        // this code creates divs for past and current bookings
        const pastBookings = [];
        const currentBookings = [];
        const today = new Date()
        hostBookings.forEach(booking => {
            if (Date.parse(booking.endDate) > Date.parse(today)) {
                currentBookings.push(booking)
            } else {
                pastBookings.push(booking)
            }


        });
        console.log(pastBookings)

        const pastBookingsContainer = document.querySelector(".pastBookings");
        const pastBookHtml = pastBookings.map(
            ({ Kitchen: { name, imgPath }, kitchenId, isConfirmed, id }) => {
                if(isConfirmed){
                    return `
                <div class="past-booking" id="booking-${id}">
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
        pastBookingsContainer.innerHTML = `<label class="booking-type-label past-bookings"> Past Bookings </label>${pastBookHtml.join("")}`;

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
        currentBookingsContainer.innerHTML = `<label class="booking-type-label current-bookings"> Current Bookings </label>${currentBookHtml.join("")}`;

    } catch (e) {
        console.error(e);
    }
});
