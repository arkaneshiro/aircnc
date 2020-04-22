const loginButton = document.querySelector(".loginButton");
const signupButton = document.querySelector(".signupButton")
const hiddenForm = document.querySelector(".formContainer")

loginButton.addEventListener('click', () => {
    hiddenForm.classList.remove("hidden");
})

signupButton.addEventListener('click', () => {
    hiddenForm.classList.remove("hidden");
})

// removes login pop up when anywhere but the .formContainer
document.body.addEventListener('click', ev => {
    if (ev.target.tagName === 'BODY' || ev.target.tagName === 'DIV') {
        hiddenForm.classList.add("hidden");
    }
});
// hiddenForm.addEventListener('mouseleave', () => {
//     if (!mouseleave) {
//         hiddenForm.classList.add("hidden")
//     } else {
//         hiddenForm.classList.remove("hidden")
//     }
// })