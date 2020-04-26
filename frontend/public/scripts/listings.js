function initMap(latLngRate) {
  if (latLngRate) {
    const map = new google.maps.Map(
      document.getElementById('map'), {
      zoom: 12,
      center: { lat: latLngRate[0][0], lng: latLngRate[0][1] }
    });

    latLngRate.forEach(([lat, lng, rate]) => {
      new google.maps.Marker({
        position: { lat, lng },
        map,
        label: `$${rate}`
      });
    });
  }
}

const getListings = async (search) => {
  try {
    // const userId = localStorage.getItem("AIRCNC_USER_ID");
    // console.log(search);
    // change fetch to search and query on search params
    const res = await fetch("http://localhost:8080/kitchens/search",
      {
        method: "POST",
        headers: {
          "authorization": `Bearer ${localStorage.getItem('AIRCNC_ACCESS_TOKEN')}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ search })
      }
    );

    if (res.status === 401) {
      window.location.href = "/log-in";
      return;
    }

    if (!res.ok) {
      throw res;
    }

    if (res.status === 401) {
      window.location.href = "/log-in";
      return;
    }

    if (!res.ok) {
      throw res;
    }

    const { kitchens } = await res.json();
    console.log(kitchens);
    const kitchenListings = document.getElementById("kitchenListings");
    const latLngRate = [];
    const kitchensHTML = kitchens.map((obj, i) => {
      latLngRate.push([parseFloat(obj.lat), parseFloat(obj.lng), obj.rate.toString()]);

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

      let starRatings = obj.kitchenReview;
      console.log(starRatings);
      let avgStarRating = 0;
      let willRentAgain = 0;
      if (starRatings) {
        starRatings.forEach(rating => {
          avgStarRating += rating.starRating;
          if (rating.wouldRentAgain) {
            willRentAgain++;
          }
        });
      }
      console.log(obj.imgPath[0]);
      // star rating
      // <span> Star Rating (${avgStarRating / starRatings.length ? avgStarRating / starRatings.length : 0})</span>
      // would rent again
      // ${willRentAgain} people would rent again
      return `
        <div class="kitchenListing">
          <div class="kitchenListing__img">
            <img src="${obj.imgPath[0]}">
          </div>
          <div class="listing-info-container">
            <div class="kitchenListing__topLine">
              <div class="kitchenListing__userInfo">
                <a class="kitchenListing__userInfo-link" href="/listings/${obj.id}">${obj.name}</a>
              </div>
                <div class="kitchenListing__starRating"> Star Rating (${Math.floor(Math.random() * (5)) + 1})</div> 
            </div>
            <div class="kitchenListing__location">
              ${obj.streetAddress} ${obj.city.cityName} ${obj.state.stateName}
            </div>
            <div class="kitchenListing__features">
              ${features}
            </div>
            <div class="kitchenListing__bottomLine">
              <div class="kitchenListing__wouldRentAgain">
                ${Math.floor(Math.random() * (100))} people would rent again 
              </div>
              <div class="kitchenListing__rate">
                $${obj.rate}
              </div>
            </div>
          </div>
        </div>`;
    });
    initMap(latLngRate);
    kitchenListings.innerHTML = kitchensHTML.join("");
  } catch (err) {
    console.error(err);
  }
};

window.addEventListener("load", () => {
  getListings('San Francisco');
});

document.addEventListener("DOMContentLoaded", async () => {
  let search;
  // document.querySelector("form")
  document.getElementById("searchInput")
    .addEventListener("keypress", async ev => {

      if (ev.key === 'Enter') {
        ev.preventDefault()
        search = document.getElementById("searchInput").value;
      } else {
        return;
      }

      getListings(search);
    });
});
