console.log("MotoLab Login Frontend Script Loaded");

$(function () {
  // Password Visibility Toggle
  $(".password-toggle-btn").on("click", function () {
    const passwordInput = $(".member-password");
    const isPassword = passwordInput.attr("type") === "password";

    passwordInput.attr("type", isPassword ? "text" : "password");
    $(this).text(isPassword ? "🙈" : "👁️");
  });
});
