document.addEventListener("DOMContentLoaded", async () => {

  try {
    // const userId = localStorage.getItem("AIRCNC_USER_ID");

    // change fetch to search and query on search params
    const res = await fetch("http://localhost:8080/kitchens", {
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (res.status === 401) {
      window.location.href = "/log-in";
      return;
    }

    if (!res.ok) {
      throw res;
    }

    const { kitchens } = await res.json();
    const kitchenListings = document.getElementById("kitchenListings");
    const kitchensHTML = kitchens.map((obj, i) => {
      let kitchenFeatures = obj.kitchenFeature;
      let features = "";
      if (kitchenFeatures) {
        kitchenFeatures.forEach(({ feature }, i) => {
          if (i === kitchenFeatures.length - 1) {
            features += `${feature.feature}`
          } else {
            features += `${feature.feature} •`
          }
        });
      }
      return `
        <div class="kitchenListing">
          <div class="kitchenListing__img">
            <img src="../images/${i+1}.jpeg">
          </div>
          <div class="listing-info-container">
            <div class="kitchenListing__userInfo">
              ${obj.user.userName} ${obj.user.firstName} ${obj.user.lastName}
            </div>
            <div class="kitchenListing__starRating">
              <span> Star Rating (${Math.floor(Math.random() * (5 + 2)) + 1})</span>
            </div>
            <div class="kitchenListing__location">
              ${obj.streetAddress} ${obj.city.cityName} ${obj.state.stateName}
            </div>
            <div class="kitchenListing__features">
              ${features}
            </div>
            <div class="kitchenListing__wouldRentAgain">
              ${Math.floor(Math.random() * (100))} people would rent again
            </div>
            <div class="kitchenListing__rate">
              $${obj.rate}
            </div>
          </div>
        </div>`;
    });

    console.log(kitchensHTML);
    kitchenListings.innerHTML = kitchensHTML.join("");
  } catch (err) {
    console.error(err);
  }
});