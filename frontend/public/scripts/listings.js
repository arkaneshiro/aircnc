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
});
