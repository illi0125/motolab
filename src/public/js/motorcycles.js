console.log("Products frontend javascript file loaded");

$(function () {
  $(".product-collection").on("change", () => {
    const selectedValue = $(".product-collection").val();
    if (selectedValue === "CRUISER") {
      $("#product-collection").hide();
      $("#product-volume").show();
    } else {
      $("#product-volume").hide();
      $("#product-collection").show();
    }
  });

  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(400);
    $("#process-btn").css("display", "none");
  });

  $("#cancel-btn").on("click", (e) => {
    e.preventDefault(); // Prevents accidental form submission
    $(".dish-container").slideToggle(200);
    $("#process-btn").css("display", "inline-flex");
  });

  $(".new-product-status").on("change", async function (e) {
    const id = e.target.id;
    const productStatus = $(`#${id}.new-product-status`).val();

    try {
      const response = await axios.post(`/admin/motorcycle/${id}`, {
        motorcycleStatus: productStatus,
      });
      console.log("response:", response);
      const result = response.data;
      if (result.data) {
        $(".new-product-status").blur();
      } else alert("Product update failed");
    } catch (err) {
      console.log(err);
      alert("Product update failed");
    }
  });
});

function validateForm() {
  const productName = $(".product-name").val();
  const productPrice = $(".product-price").val();
  const productLeftCount = $(".product-left-count").val();
  const productCollection = $(".product-collection").val();
  const productDesc = $(".product-desc").val();
  const productStatus = $(".product-status").val();

  if (
    productName === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCollection === "" ||
    productDesc === "" ||
    productStatus === ""
  ) {
    alert("Please insert all details!");
    return false;
  }
  return true;
}

function previewFileHandler(input, order) {
  const file = input.files[0];
  if (!file) return;

  const fileType = file["type"];
  const validImageType = ["image/jpg", "image/jpeg", "image/png"];

  if (!validImageType.includes(fileType)) {
    alert("Please insert only jpeg, jpg and png!");
  } else {
    const reader = new FileReader();
    reader.onload = function () {
      $(`#image-section-${order}`).attr("src", reader.result);
    };
    reader.readAsDataURL(file);
  }
}
