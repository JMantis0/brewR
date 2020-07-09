$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      usertype: $("input[name=signUpUserType]:checked", ".signUpUserType").val()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.usertype);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, usertype) {
    $.post("/api/signup", {
      email: email,
      password: password,
      usertype: usertype
    })
      .then((userInfo) => {
        //  if user is a brewery then go to /brewer-page
        let isABrewery = (userInfo.usertype === "brewRy");
        if(isABrewery) {
          window.location.replace("/brewer-page")
        }
        //  else direct user to /members
        else {
          window.location.replace("/members");
        }
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
