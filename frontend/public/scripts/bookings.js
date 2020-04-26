const url = window.location.pathname;
const bookingId = url.substring(url.lastIndexOf('/') + 1);

if (localStorage.getItem("AIRCNC_ACCESS_TOKEN") === null) {
    window.location.href = "/";
}

// cancels booking when DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {

    try {
        const res = await fetch(`http://localhost:8080/bookings/${bookingId}`, {
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
});
