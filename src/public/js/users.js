console.log("Users frontend javascript file loaded");

$(function () {
  $(".member-status").on("change", function (e) {
    const selectElement = $(this);
    const id = e.target.id;
    const memberStatus = selectElement.val();

    axios
      .post("/admin/user/edit", {
        _id: id,
        memberStatus: memberStatus,
      })
      .then((response) => {
        console.log("response:", response);
        const result = response.data;

        if (result.data) {
          // Update data-status attribute to trigger color styling updates
          selectElement.attr("data-status", memberStatus);
          selectElement.blur();
        } else {
          alert("User status update failed!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("User status update failed!");
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutModal = document.getElementById("logoutModal");
  const cancelLogout = document.getElementById("cancelLogout");

  // Intercept default navigation click
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    logoutModal.classList.add("active");
  });

  // Close modal on cancel click
  cancelLogout.addEventListener("click", () => {
    logoutModal.classList.remove("active");
  });

  // Close modal when clicking outside the card
  logoutModal.addEventListener("click", (e) => {
    if (e.target === logoutModal) {
      logoutModal.classList.remove("active");
    }
  });
});
