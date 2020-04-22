const loginButton = document.querySelector(".loginButton");
const signupButton = document.querySelector(".signupButton")
const hiddenForm = document.querySelector(".formContainer")

loginButton.addEventListener('click', () => {
    hiddenForm.classList.remove("hidden");
})
signupButton.addEventListener('click', () => {
    hiddenForm.classList.remove("hidden");
})

// hiddenForm.addEventListener('mouseleave', () => {
//     if (!mouseleave) {
//         hiddenForm.classList.add("hidden")
//     } else {
//         hiddenForm.classList.remove("hidden")
//     }
// })