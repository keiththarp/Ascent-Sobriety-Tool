$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("#signUpBtn");
  const nameInput = $("#name");
  const emailInput = $("#email");
  const passwordInput = $("#password");
  const soberDateInput = $("#soberDate");
  const backBtn = $("#backBtn");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("click", event => {
    event.preventDefault();
    const userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      soberSince: soberDateInput.val()
    };
    console.log(userData);
    if (!userData.email || !userData.password) {
      return;
    }

    const { name, email, password, soberSince } = userData;

    // calculating the total sober days to start

    const start = moment(soberSince);
    const today = moment();
    const stars = today.diff(start, "days");

    // If we have an email and password, run the signUpUser function
    signUpUser(name, email, password, soberSince, stars);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, email, password, soberDate, stars) {
    $.post("/api/signup", {
      name: name,
      email: email,
      password: password,
      soberSince: soberDate,
      stars: stars
    })
      .then(() => {
        window.location.replace("/daily");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  backBtn.on("click", event => {
    event.preventDefault();
    window.location.replace("/");
  });
});
