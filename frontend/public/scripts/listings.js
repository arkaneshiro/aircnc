<<<<<<< HEAD
// function getCookie(cname) {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

function initMap(lat, lng) {
  // const lat = parseInt(getCookie("lat"));
  // const lng = parseInt(getCookie("lng"));
  // const lat = 37.4213117;
  // const lng = -122.0839677;
  if (lat && lng) {
    const map = new google.maps.Map(
      document.getElementById('map'), {
      zoom: 12,
      center: { lat, lng }
    });

    new google.maps.Marker({
      position: { lat, lng },
      map,
      label: "$100"
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

        const { kitchens, lat, lng } = await res.json();
        // let map = await fetch("https://maps.googleapis.com/maps/api/js?key=AIzaSyC0YJylly9ZmkoIGcZLPO5xVNZMyuyo78c", {
        //   headers: {
        //     "Content-Type": "application/json"
        //   }
        // });
        // res.cookie("lat", lat, { domain: "localhost:4000", path: "/listings", httpOnly: true });
        // res.cookie("lng", lng, { domain: "localhost:4000", path: "/listings", httpOnly: true });
        console.log(lat, lng);
        initMap(parseInt(lat), parseInt(lng));
        console.log(map);
        const kitchenListings = document.getElementById("kitchenListings");
        const kitchensHTML = kitchens.map(kitchen => {
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
        </div>`;
        });

        kitchenListings.innerHTML = kitchensHTML.join("");
      } catch (err) {
        console.error(err);
      }
    });
=======
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
      let features = obj.kitchenFeature;
      
      
      return `
        <div class="kitchenListing">
          <div class="kitchenListing__img">
            <img src="../images/${i+1}.jpeg">
          </div>
          <div class="kitchenListing__userInfo">
            ${obj.user.userName} ${obj.user.firstName} ${obj.user.lastName}
          </div>
          <div class="kitchenListing__location">
            ${obj.streetAddress} ${obj.city.cityName} ${obj.state.stateName}
          </div>
          <div class="kitchenListing__features">
            
          </div>
          <div class="kitchenListing__description">
            ${obj.description}
          </div>
        </div>`;
    });

    console.log(kitchensHTML);
    kitchenListings.innerHTML = kitchensHTML.join("");
  } catch (err) {
    console.error(err);
  }
>>>>>>> master
});