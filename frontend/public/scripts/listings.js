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
        label: rate
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  let search;
  document.querySelector("form")
    .addEventListener("submit", async ev => {
      ev.preventDefault();
      search = document.getElementById("searchInput").value;

      console.log(search);

      try {
        // const userId = localStorage.getItem("AIRCNC_USER_ID");
        // console.log(search);
        // change fetch to search and query on search params
        const res = await fetch("http://localhost:8080/kitchens/search",
          {
            method: "POST",
            headers: {
              // "authorization": `Bearer ${userId}`,
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

        const { kitchens } = await res.json();

        const kitchenListings = document.getElementById("kitchenListings");
        const latLngRate = [];
        const kitchensHTML = kitchens.map(kitchen => {
          latLngRate.push([parseFloat(kitchen.lat), parseFloat(kitchen.lng), kitchen.rate.toString()]);
          const kitchenFeatures = kitchen.kitchenFeature;
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
            <img src="">
          </div>
          <div class="kitchenListing__name">
            ${kitchen.name}
          </div>
          <div class="kitchenListing__description">
            ${kitchen.description}
          </div>
          <div class="kitchenListing__location">
            ${kitchen.streetAddress} ${kitchen.city.cityName} ${kitchen.state.stateName}
          </div>
          <div class="kitchenListing__features">
            ${features}
          </div>
          <div class="kitchenListing__userInfo">
            ${kitchen.user.userName} ${kitchen.user.firstName} ${kitchen.user.lastName}
          </div>
          </div class"=kitchenListing__rate">
            ${kitchen.rate}
          </div>
        </div>`;
        });
        initMap(latLngRate);
        kitchenListings.innerHTML = kitchensHTML.join("");
      } catch (err) {
        console.error(err);
      }
    });
});
