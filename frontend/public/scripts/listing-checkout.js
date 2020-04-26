document.addEventListener('DOMContentLoaded', async () => {

    //redirect if user is host? or not logged in or booking id DNE

    //get start and end date from calendar (for josh)
    const startMonth = 1;
    const startDay = 2;
    const startYear = 3;
    const endMonth = 1;
    const endDay = 2;
    const endYear = 3;

    const startDate = startYear + startMonth + startDay;
    const endDate = endYear + endMonth + startDay;

    //find kitchen Id from URL
    const currentURL = window.location.href;
    const kitchenId = currentURL.match(/\d+/g)[1];
    console.log(kitchenId)

    //get kitchen for picture
    const kitchenData = await fetch(`http://localhost:8080/kitchens/${kitchenId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('AIRCNC_ACCESS_TOKEN')}`,
            "Content-Type": "application/json"
        }
    });

    const { kitchen } = await kitchenData.json();
    const imgDiv = document.getElementById('bookings-form__img');
    console.log(imgDiv)
    imgDiv.innerHTML = `<img href="${kitchen.imgPath[0]}" alt="Picture of ${kitchen.name}">`

    document.getElementById('bookings-form').addEventListener('submit', async (ev) => {
        const body = {
            startDate,
            endDate,
        }

        const createBookingData = await fetch(`http://localhost:8080/kitchens/${kitchenId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('AIRCNC_ACCESS_TOKEN')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    })

    //create booking

})
