const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const formData = new FormData(signUpForm);
  const body = {};
  for (let data of formData.entries()) {
    const [key, value] = data;
    body[key] = value;
  }

  try {
    const res = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw res
    }
    // if (res.status === 401) {
    //   window.location.href = "/signup"
    //   return;
    // }

    const {
      token,
      user: { id }
    } = await res.json();

    localStorage.setItem("TWITTER_LITE_ACCESS_TOKEN", token);
    localStorage.setItem("TWITTER_LITE_CURRENT_USER_ID", id);

    if (roleId === 1) {
      window.location.href = '/dashboard'
    } else {
      window.location.href = '/listings'
    }
  } catch (err) {
    //   if (err.status >= 400 && err.status < 600) {
    //     const errorJSON = await err.json();
    //     const errorsContainer = document.querySelector(".errors-container");
    //     // TODO: Generate and render errors
    //     let errorsHtml = [
    //       `<div class="alert alert-danger">
    //           Something went wrong. Please try again.
    //         </div>`,
    //     ];

    //     if (errors && Array.isArray(errors)) {
    //       errorsHtml = errors.map(
    //         (message) => `
    //           <div class="alert alert-danger">
    //               ${message}
    //           </div>
    //         `
    //       );
    //       errorsContainer.innerHTML = errorsHtml.join("");
    //     } else {
    //       // TODO: Alert user about bad internet connection
    //       alert("Something went wrong. Please check your internet connection and try again!");
    //     }
    //   }
    console.error(err);
  }

});