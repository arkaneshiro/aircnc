import { logOut, isLoggedIn, goToListings, goToProfile  } from "./tools.js";

document.addEventListener("DOMContentLoaded", async () => {
  isLoggedIn();
  logOut();
  goToListings();
  goToProfile();
  // const kitchenId = localStorage.getItem("AIRCNC_KITCHEN_ID");
  const kitchenId = getCookie("kitchenId");
  try {
    let res = await fetch(`http://localhost:8080/kitchens/${kitchenId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('AIRCNC_ACCESS_TOKEN')}`,
        "Content-Type": "application/json"
      }
    });

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (!res.ok) {
      throw res;
    }

    const {
      kitchen,
      kitchenFeatures,
      starRating,
      kitchenReviews
    } = await res.json();

    /*********************************
     *  Contains
     *    - kitchen.name
     *    - kitchen.reviews.starRating
     *    - kitchen.rate
     *********************************/
    const roleId = localStorage.getItem("AIRCNC_CURRENT_USER_ROLE");
    // console.log(starRating);
    document.querySelector(".kitchenDetails__row-1__info").innerHTML = `
      <div class="kitchenDetails__info__name">
        ${kitchen.name}
      </div>
      <div class="kitchenDetails__info__star-rating">
        ${starRating} Star Rating
      </div>
      <div class="kitchenDetails__info__rate">
        Rate: $${kitchen.rate} / hour
      </div>
      <div class="kitchenDetails__info__button">
        <button id="kitchenDetails__info-button" class="kitchenDetails__info_button-bookings">${roleId === '1' ? 'See All Bookings' : 'Book Now'}</button>
      </div>
    `;


    document.querySelector(".kitchenDetails__row-1__staticMap").innerHTML = `
      <img class="card" src="http://maps.googleapis.com/maps/api/staticmap?center=${kitchen.lat},${kitchen.lng}&zoom=12&size=375x350&markers=color:red%7C${kitchen.lat},${kitchen.lng}&key=AIzaSyC0YJylly9ZmkoIGcZLPO5xVNZMyuyo78c">
    `;

    let imgs = "";
    kitchen.imgPath.forEach((img, i) => {
      // console.log(img);
      imgs += `
      <div class="kitchenDetails__kitchen-img">
        <img class="card-img kitchenDetails__images" src="${img}">
      </div>`
    });

    document.querySelector(".kitchenDetails__row-2__images").innerHTML = imgs;

    let features = "";
    kitchenFeatures.forEach(({ feature }) => {
      // console.log(feature.imgPath);
      features += `
      <div class="kitchenDetails__feature-container">
        <div class="kitchenDetails__feature-img">
          <img class="kitchenDetails__feature__img card-img-top" src="${feature.imgPath}">
        </div>
        <div class="kitchenDetails__feature">
          ${feature.feature}
        </div>
      </div>
      `
    });

    document.querySelector(".kitchenDetails__row-4__features").innerHTML = features;

    let kitchenReviewHTML = "";
    kitchenReviews.forEach(kitchenReview => {
      kitchenReviewHTML += `
      <div class="kitchenDetails__review card-text">
        <li class="list-group-item">${kitchenReview.comment}</li>
      </div>`
    });

    document.querySelector(".kitchenDetails__row-5__reviews").innerHTML = kitchenReviewHTML;

  } catch (err) {
    console.error(err);
  }


});

// window.onload = () => {
document.getElementById("kitchenDetails__info-button")
    addEventListener("click", (ev) => {
      if (ev.target.id === "kitchenDetails__info-button") {
        const currentURL = window.location.href;
        const kitchenId = currentURL.match(/\d+/g)[1];
        // console.log(kitchenId)
        window.location.href = `/listings/${kitchenId}/checkout`;
      } else {
        return;
      }
    });
// };
