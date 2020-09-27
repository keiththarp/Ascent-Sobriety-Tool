$(document).ready(() => {
  // When the signup button is clicked, we validate the email and password are not blank
  $("#signUpBtn").on("click", event => {
    event.preventDefault();
    const userData = {
      name: $("#name")
        .val()
        .trim(),
      email: $("#email")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim(),
      soberSince: $("#soberDate").val()
    };
    console.log(userData);
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, email, password, soberDate) {
    $.post("/api/signup", {
      name: name,
      email: email,
      password: password,
      soberSince: soberDate
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
