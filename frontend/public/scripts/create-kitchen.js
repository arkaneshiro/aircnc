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

    //display features to choose from
    const featuresDiv = document.getElementById('features');
    const features = await fetch('http://localhost:8080/tools/features')
    const featuresData = await features.json();
    //eleminates whitespace in feature for use in name attribute
    const featureNames = featuresData.features.map(feature => {
        return feature.feature.split(" ").join("");
    });




    let featuresHTML = ``;
    for (let i = 0; i < featuresData.features.length; i++) {
        const feature = featuresData.features[i]
        featuresHTML += `<div class='features__feature'>
                            <div class='features__left'>
                                <div class='features__img features__img-${featureNames[i]}'>
                                    <img src="" alt=${featureNames[i]}>
                                </div>
                            </div>
                            <div class='features__middle'>
                                <div class='features__text features__text-${featureNames[i]}'>
                                    <label for=${featureNames[i]}>${feature.feature}</label>
                                </div>
                            </div>
                            <div class='features__right'>
                                <div class='features__checkbox features__checkbox-${featureNames[i]}'>
                                    <input type="checkbox" id=${featureNames[i]} name=${featureNames[i]} value=${feature.id}>
                                </div>
                            </div>
                        </div>
                        `
    }

    featuresDiv.innerHTML = featuresHTML;






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

        // after image uploading start sending data to back end
        const formData = new FormData(kitchenForm);
        const kitchenBody = {
            name: formData.get('name'),
            stateId: parseInt(formData.get('state'), 10),
            cityId: parseInt(formData.get('city'), 10),
            streetAddress: formData.get('address'),
            description: formData.get('description'),
            hostId: parseInt(localStorage.getItem('AIRCNC_CURRENT_USER_ID'), 10), // change for future
            imgPath: secureUrlArray,
            rate: parseInt(formData.get('rate'), 10)
        }

        console.log(kitchenBody.name);
        console.log(kitchenBody.stateId);
        console.log(kitchenBody.cityId);
        console.log(kitchenBody.streetAddress);
        console.log(kitchenBody.description);
        console.log(kitchenBody.hostId);
        console.log(kitchenBody.imgPath);
        console.log(kitchenBody.rate);

        const createKitchen = await fetch('http://localhost:8080/kitchens', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('AIRCNC_ACCESS_TOKEN')}`
            },
            method: 'POST',
            body: JSON.stringify(kitchenBody)
        });
        const createKitchenInfo = await createKitchen.json();
        const kitchenId = createKitchenInfo.kitchen.id;
        console.log(kitchenId);

        console.log('feature Names', featureNames);
        //logic to check if check boxes have beeen checked
        for (let i = 0; i < featureNames.length; i++) {
            let checkBox = document.getElementById(featureNames[i]);
            console.log('in main for');
            if (checkBox.checked) {
                console.log('in if statement');
                const featureBody = {
                    kitchenId,
                    featureId: parseInt(formData.get(featureNames[i]))
                }

                const feature = await fetch('http://localhost:8080/kitchenfeatures', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(featureBody)
                });
                const featureResponse = await feature.json();
            }
        }

        // window.location.href = 'http://localhost:4000/dashboard'
    });


});
