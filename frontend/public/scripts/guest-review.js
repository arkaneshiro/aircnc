const guestReview = document.querySelector(".guest-review-form");

guestReview.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const formData = new FormData(guestReview);
  const starRating = formData.get("starRating");
  const comment = formData.get("comment");
  const guestId = getCookie("id"); // change
  const authorId = localStorage.getItem("AIRCNC_CURRENT_USER_ID");
  const wouldHostAgain = document.getElementById("wouldHostAgain");
  const body = {
    guestId,
    starRating,
    comment,
    authorId,
    wouldHostAgain: `${wouldHostAgain.checked ? true : false}`
  };

  const bearerToken = localStorage.getItem("AIRCNC_ACCESS_TOKEN");
  try {
    let res = await fetch(`http://localhost:8080/users/${guestId}/reviews`, {
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
    window.location.href = "/listings";
  } catch (err) {
    console.error(err);
  }
});