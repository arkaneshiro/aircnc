


// window.Dropzone.options.myAwesomeDropzone = {
//     addRemoveLinks: false,
//     uploadMultiple: true,
//     autoProcessQueue: false
// };

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

});
