document.addEventListener("DOMContentLoaded", async () => {
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
      window.location.href = "/log-in";
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

    document.querySelector(".kitchenDetails__row-1__info").innerHTML = `
      <div class="kitchenDetails__info__name">
        ${kitchen.name}
      </div>
      <div class="kitchenDetails__info__star-rating">
        ${starRating}
      </div>
      <div class="kitchenDetails__info__rate">
        ${kitchen.rate}
      </div>
      <div class="kitchenDetails__info__button">
        <button class="kitchenDetails__info_button-bookings">${roleId === '1' ? 'See All Bookings' : 'Book Now'}</button>
      </div>
    `;


    document.querySelector(".kitchenDetails__row-1__staticMap").innerHTML = `
      <img src="http://maps.googleapis.com/maps/api/staticmap?center=${kitchen.lat},${kitchen.lng}&zoom=12&size=375x350&key=AIzaSyC0YJylly9ZmkoIGcZLPO5xVNZMyuyo78c"> 
    `;

    let imgs = "";
    kitchen.imgPath.forEach((img, i) => {
      imgs += `<img class="kitchenDetails__images-${i + 1} src="${img}>`
    });

    document.querySelector(".kitchenDetails__row-2__images").innerHTML = imgs;

    let features = "";
    kitchenFeatures.forEach(({ feature }) => {
      features += `
      <div class="kitchenDetails__feature">
        ${feature.feature}
      </div>
      `
    });

    document.querySelector(".kitchenDetails__row-4__features").innerHTML = features;

    let kitchenReviewHTML = "";
    kitchenReviews.forEach(kitchenReview => {
      kitchenReviewHTML += `
      <div class="kitchenDetails__review">
        ${kitchenReview.comment}
      </div>`
    });

    document.querySelector(".kitchenDetails__row-5__reviews").innerHTML = kitchenReviewHTML;

  } catch (err) {
    console.error(err);
  }
});
