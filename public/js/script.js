$(document).ready(() => {
  const signIn = $("#signIn");
  const register = $("#register");

  signIn.on("click", event => {
    event.preventDefault();
    window.location.replace("/login");
  });
  register.on("click", event => {
    event.preventDefault();
    window.location.replace("/signup");
  });
});
