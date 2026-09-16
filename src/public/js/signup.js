console.log("MotoLab Signup Frontend Logic Loaded");

$(function () {
  // 1. File Upload & Image Preview Handler
  const fileInput = $(".upload-hidden-input");

  fileInput.on("change", function () {
    if (window.FileReader && this.files[0]) {
      const uploadFile = this.files[0];
      const fileType = uploadFile["type"];
      const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];

      if (!validImageTypes.includes(fileType)) {
        alert("Please upload a valid image file (.jpg, .jpeg, or .png)");
        $(this).val(""); // Clear input
        return;
      }

      // Update image preview frame
      $(".upload-img-frame").attr("src", URL.createObjectURL(uploadFile));
      $(".upload-name-display").val(uploadFile.name);
    }
  });

  // 2. Interactive Password Visibility Toggle
  $(".password-toggle-btn").on("click", function () {
    const passwordInput = $(".member-password");
    const isPassword = passwordInput.attr("type") === "password";

    passwordInput.attr("type", isPassword ? "text" : "password");
    $(this).text(isPassword ? "🙈" : "👁️");
  });

  // 3. Dynamic Real-Time Password Strength Gauge
  $(".member-password").on("input", function () {
    const val = $(this).val();
    const fill = $(".strength-fill");
    const label = $(".strength-label");

    let score = 0;
    if (val.length >= 6) score += 25;
    if (val.length >= 10) score += 25;
    if (/[A-Z]/.test(val)) score += 25;
    if (/[0-9!@#$%^&*]/.test(val)) score += 25;

    fill.css("width", score + "%");

    if (score <= 25) {
      fill.css("background-color", "#ff4d4d");
      label.text("Weak");
    } else if (score <= 50) {
      fill.css("background-color", "#ffaa00");
      label.text("Fair");
    } else if (score <= 75) {
      fill.css("background-color", "#00f0ff");
      label.text("Good");
    } else {
      fill.css("background-color", "#00ff88");
      label.text("Strong");
    }
  });
});

// 4. Form Submission Validation Guard
function validateSignupForm() {
  const memberNick = $(".member-nick").val().trim();
  const memberPhone = $(".member-phone").val().trim();
  const memberPassword = $(".member-password").val().trim();
  const confirmPassword = $(".confirm-password").val().trim();
  const termsChecked = $("#termsCheck").is(":checked");

  if (!memberNick || !memberPhone || !memberPassword || !confirmPassword) {
    alert("Please complete all required fields!");
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Passwords do not match. Please verify and try again!");
    return false;
  }

  const fileInputElement = $(".member-image").get(0);
  if (!fileInputElement || !fileInputElement.files.length) {
    alert("Please upload a profile or identity verification image!");
    return false;
  }

  if (!termsChecked) {
    alert("Please agree to MotoLab Terms of Service!");
    return false;
  }

  return true;
}
