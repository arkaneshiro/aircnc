const loginButton = document.querySelector(".loginButton");
const signupButton = document.querySelector(".signupButton")
const hiddenForm = document.querySelector(".formContainer")
const hiddenButton = document.querySelector('.hiddenButton')


loginButton.addEventListener('click', () => {
    hiddenForm.classList.remove("hidden");
})

signupButton.addEventListener('click', () => {
    hiddenForm.classList.remove("hidden");
})

document.body.addEventListener('click', ev => {
    if (ev.target.tagName === 'BODY' || ev.target.tagName === 'DIV') {
        hiddenForm.classList.add("hidden");
    }
});
