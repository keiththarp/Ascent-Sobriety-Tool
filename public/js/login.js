$(document).ready(() => {
  // Getting references to our form and inputs

  const loginForm = $("#signInBtn");
  const emailInput = $("#email");
  const passwordInput = $("#password");
  const backBtn = $("#backBtn");
  const rmCheck = document.getElementById("rememberMe");

  if (localStorage.checkbox && localStorage.checkbox !== "") {
    rmCheck.setAttribute("checked", "checked");
    emailInput.value = localStorage.username;
  } else {
    rmCheck.removeAttribute("checked");
    emailInput.value = "";
  }

  function isRememberMe() {
    if (rmCheck.checked && emailInput.value !== "") {
      localStorage.username = emailInput.value;
      localStorage.checkbox = rmCheck.value;
    } else {
      localStorage.username = "";
      localStorage.checkbox = "";
    }
  }

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("click", event => {
    event.preventDefault();
    isRememberMe();

    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        const timeStamp = localStorage.getItem("timeStamp");
        const current = moment().format("L");

        if (timeStamp !== current) {
          window.location.replace("/daily");
        } else {
          window.location.replace("/counter");
        }
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
  backBtn.on("click", event => {
    event.preventDefault();
    window.location.replace("/");
  });
});
