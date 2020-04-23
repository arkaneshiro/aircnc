//dont forget to set hostId in body to localStorage Id

//set up the form
window.addEventListener('DOMContentLoaded', async () => {
    const stateDropDown = document.getElementById('states');
    const cityDropDown = document.getElementById('cities');


    const states = await fetch('http://localhost:8080/tools/states');
    const statesData = await states.json();
    const cities = await fetch('http://localhost:8080/tools/cities');
    const citiesData = await cities.json();

    //populate state dropDown
    let stateListHTML = '';
    for (let i = 0; i < statesData.states.length; i++) {
        const state = statesData.states[i];
        stateListHTML += `<option value=${state.id}>${state.stateName}</option>`
    }
    stateDropDown.innerHTML = stateListHTML;

    //populate city drop down
    let citiesListHTML = '';
    for (let i = 0; i < citiesData.cities.length; i++) {
        const city = citiesData.cities[i];
        citiesListHTML += `<option value=${city.id}>${city.cityName}</option>`
    }
    cityDropDown.innerHTML = citiesListHTML;

    const kitchenForm = document.getElementById('kitchen-form');
    const fileInput = document.getElementById('img-upload');
    kitchenForm.addEventListener('submit', async (event) => {
        event.preventDefault();


        const secureUrlArray = [];
        const files = Array.from(fileInput.files);

        // map each file to an array of fetch requests
        let requests = files.map(file => {
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'ys16oj0w');
            return fetch('https://api.cloudinary.com/v1_1/aircncaa/image/upload', {
                method: "POST",
                body: data,
            });
        });

        //use promise.All to ensure all files are uploaded
        const promiseArray = await Promise.all(requests);
        // map results of promises
        const promiseData = promiseArray.map(async result => await result.json());
        // promiseData are resolved/unresolved promises
        const responses = await Promise.all(promiseData);
        //push each url of responses to array
        responses.forEach(ele => secureUrlArray.push(ele.secure_url));
        console.log(responses);
        console.log(secureUrlArray);

        // after image uploading start sending data to back end
        const formData = new FormData(kitchenForm);
        const kitchenBody = {
            name: formData.get('name'),
            stateId: formData.get('states'),
            cityId: formData.get('cities'),
            address: formData.get('address'),
            description: formData.get('description'),
            hostId: 2, // change for future
            imgPath: secureUrlArray
        }

        const createKitchen = await fetch('http://localhost:8080/tools/states', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(kitchenBody)
        });

        console.log(createKitchen);

    });


});


// // window.Dropzone.options.myAwesomeDropzone = {
// //     addRemoveLinks: false,
// //     uploadMultiple: true,
// //     autoProcessQueue: false
// // };

// const kitchenForm = document.getElementById('kitchen-form');
// const fileInput = document.getElementById('img-upload');
// kitchenForm.addEventListener('submit', async (event) => {
//     event.preventDefault();


//     const secureUrlArray = [];
//     const files = Array.from(fileInput.files);

//     // map each file to an array of fetch requests
//     let requests = files.map(file => {
//         const data = new FormData();
//         data.append('file', file);
//         data.append('upload_preset', 'ys16oj0w');
//         return fetch('https://api.cloudinary.com/v1_1/aircncaa/image/upload', {
//             method: "POST",
//             body: data,
//         });
//     });

//     //use promise.All to ensure all files are uploaded
//     const promiseArray = await Promise.all(requests);
//     // map results of promises
//     const promiseData = promiseArray.map(async result => await result.json());
//     // promiseData are resolved/unresolved promises
//     const responses = await Promise.all(promiseData);
//     //push each url of responses to array
//     responses.forEach(ele => secureUrlArray.push(ele.secure_url));
//     console.log(responses);
//     console.log(secureUrlArray);

//     // after image uploading start sending data to back end
//     const formData = new FormData(kitchenForm);

// });
