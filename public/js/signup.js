// const { use } = require("chai");

$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("#signUpBtn");
  const nameInput = $("#name");
  const emailInput = $("#email");
  const passwordInput = $("#password");
  const soberSinceInput = $("#soberSince");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("click", event => {
    event.preventDefault();
    const userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      soberSince: soberSinceInput.val()
    };
    console.log(userData);
    if (!userData.email || !userData.password) {
      return;
    }
    const { name, email, password, soberSince } = userData;
    signUpUser(name, email, password, soberSince);
    // If we have an email and password, run the signUpUser function
    // signUpUser(userData.email, userData.password);
    // emailInput.val("");
    // passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, email, password, soberSince) {
    $.post("api/signup", {
      name: name,
      email: email,
      password: password,
      soberSince: soberSince
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
