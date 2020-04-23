const loginButton = document.querySelector(".loginButton");
const signupButton = document.querySelector(".signupButton");
const hostSignupButton = document.querySelector(".hostSignupButton");
const hiddenForm = document.querySelector(".formContainer");
const hiddenButton = document.querySelector('.hiddenButton');
const logInForm = document.querySelector(".login-form");


loginButton.addEventListener('click', () => {
  hiddenForm.classList.remove("hidden");
})

signupButton.addEventListener('click', () => {
  window.location.href = "/sign-up";
  localStorage.setItem("AIRCNC_CURRENT_USER_ROLE", "2");
})

hostSignupButton.addEventListener('click', () => {
  window.location.href = "/sign-up";
  localStorage.setItem("AIRCNC_CURRENT_USER_ROLE", "1");
})

document.body.addEventListener('click', ev => {
    if (ev.target.tagName === 'BODY' || ev.target.tagName === 'DIV') {
        hiddenForm.classList.add("hidden");
    }
});

logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(logInForm);
  const userName = formData.get("username");
  const password = formData.get("password");
  const body = { userName, password }
  // console.log(username);

  try {
    const res = await fetch("http://localhost:8080/users/token", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw res;
    }
    const {
      token,
      user: { id },

    } = await res.json();

    // storage access_token in localStorage:
    localStorage.setItem("AIRCNC_ACCESS_TOKEN", token);
    localStorage.setItem("AIRCNC_CURRENT_USER_ID", id);
    // localStorage.setItem("AIRCNC_CURRENT_USER_ROLE", role);

    // redirect to /kitchens for guests, dashboard for hosts:
    window.location.href = "/kitchens";


  } catch (err) {
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json();
      //   const errorsContainer = document.querySelector(".errors-container");
      //   let errorsHtml = [
      //     `
      //     <div class="alert alert-danger">
      //         Something went wrong. Please try again.
      //     </div>
      //   `,
      //   ];
      const { errors } = errorJSON;
      if (errors && Array.isArray(errors)) {
        // errorsHtml = errors.map(
        //   (message) => `
        //   <div class="alert alert-danger">
        //       ${message}
        //   </div>
        // `
        // );

      }
      console.log(errors)
      //   errorsContainer.innerHTML = errorsHtml.join("");
    } else {
      alert(
        "Something went wrong. Please check your internet connection and try again!"
      );
    }
  }
});
