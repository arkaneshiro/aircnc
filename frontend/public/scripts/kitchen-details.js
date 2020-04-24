document.addEventListener("DOMContentLoaded", async () => {
  // const kitchenId = localStorage.getItem("AIRCNC_KITCHEN_ID");
  const kitchenId = 2;
  try {
    let res = await fetch(`http://localhost:8080/kitchens/${kitchenId}`, {
      headers: {
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
    document.querySelector(".kitchenDetails__info").innerHTML = `
      <div class="kitchenDetails__info__name">
        ${kitchen.name}
      </div>
      <div class="kitchenDetails__info__star-rating">
        ${starRating}
      </div>
      <div class="kitchenDetails__info__rate">
        ${kitchen.rate}
      </div>
    `;


    document.querySelector(".kitchenDetails__staticMap").innerHTML = `
      <img src="http://maps.googleapis.com/maps/api/staticmap?center=${kitchen.lat},${kitchen.lng}&zoom=12&size=375x350&key=AIzaSyC0YJylly9ZmkoIGcZLPO5xVNZMyuyo78c"> 
    `;

    let imgs = "";
    kitchen.imgPath.forEach(img => {
      imgs += `<img src="${img}>`
    });

    document.querySelector(".kitchenDetails__images").innerHTML = imgs;

    let features = "";
    kitchenFeatures.forEach(({ feature }) => {
      features += `
      <div class="kitchenDetails__feature">
        ${feature.feature}
      </div>
      `
    });

    document.querySelector(".kitchenDetails__features").innerHTML = features;

    let kitchenReviewHTML = "";
    kitchenReviews.forEach(kitchenReview => {
      kitchenReviewHTML += `
      <div class="kitchenDetails__review">
        ${kitchenReview.comment}
      </div>`
    });

    document.querySelector(".kitchenDetails__reviews").innerHTML = kitchenReviewHTML;

  } catch (err) {
    console.error(err);
  }
});