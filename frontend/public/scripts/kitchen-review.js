const guestReview = document.querySelector(".kitchen-review-form");

const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

guestReview.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const formData = new FormData(guestReview);
  const starRating = formData.get("starRating");
  const comment = formData.get("comment");
  const guestId = getCookie("id"); // change
  const authorId = 1; //localStorage.getItem("AIRCNC_CURRENT_USER_ID");
  const wouldHostAgain = document.getElementById("wouldHostAgain");
  const body = {
    guestId,
    starRating,
    comment,
    authorId,
    wouldHostAgain: `${wouldHostAgain.checked ? true : false}`
  };

  try {
    const createReview = await fetch(`http://localhost:8080/users/${guestId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw res
    }

    const res = res.json();
    window.href.location = "/listings";
  } catch (err) {
    console.error(err);
  }
});