export function initializeFormActions() {
  const boxItems = document.querySelector(".form-add-ungdung");
  const addButton = document.querySelector(".icon-btn-add");
  const cancelButton = document.getElementById("btn-cancel");
  const overlay = document.querySelector(".overlay");
  const uploadedImage = document.getElementById("uploadedImage");
  addButton.addEventListener("click", () => {
    boxItems.style.display = "block";
    overlay.style.display = "block";
  });

  cancelButton.addEventListener("click", () => {
    boxItems.style.display = "none";
    overlay.style.display = "none";
    uploadedImage.style.display = "none";
    boxItems.reset();
  });
}

export function uploadfileimg() {
  var selectedImage = null;
  document.getElementById("file").onchange = function (e) {
    var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    reader.onload = function () {
      document.getElementById("uploadedImage").src = reader.result;
      selectedImage = reader.result;
      console.log(selectedImage);
      document.getElementById("uploadedImage").style.display = "block";
    };
    reader.readAsDataURL(file);
  };
}

initializeFormActions();
