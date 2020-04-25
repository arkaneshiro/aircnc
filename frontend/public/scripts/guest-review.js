const guestReview = document.querySelector(".guest-review-form");

guestReview.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const id = getCookie("id");
  const formData = new FormData(guestReview);
  const starRating = formData.get("starRating");
  const comment = formData.get("comment");
  const wouldHostAgain = document.getElementById("wouldHostAgain");
  const bearerToken = localStorage.getItem("AIRCNC_ACCESS_TOKEN");

  try {
    let res = await fetch(`http://localhost:8080/bookings/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      throw res
    }

    const { booking } = await res.json();
    // console.log("*************************", booking);

    // console.log(booking.renterId);
    // console.log(localStorage.getItem("AIRCNC_CURRENT_USER_ID"));
    const body = {
      guestId: booking.renterId,
      starRating,
      comment,
      authorId: localStorage.getItem("AIRCNC_CURRENT_USER_ID"),
      wouldHostAgain: `${wouldHostAgain.checked ? true : false}`
    };

    res = await fetch(`http://localhost:8080/users/${booking.renterId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearerToken}`
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw res
    }
    res = await res.json();
    // console.log(res);
    window.location.href = "/listings";
  } catch (err) {
    console.error(err);
  }

});