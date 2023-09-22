// import { handleShowStore } from "./applycationItems.js";
export function initializeFormActions() {
  const boxItems = document.querySelector(".form-add-ungdung");
  const addButton = document.querySelector(".icon-btn-add");
  const cancelButton = document.getElementById("btn-cancel");
  const overlay = document.querySelector(".overlay");
  const uploadedImage = document.getElementById("uploadedImage");
  const btnAdd = document.getElementById("btnSubmit");
  addButton.addEventListener("click", () => {
    boxItems.style.display = "block";
    overlay.style.display = "block";
    // handleShowStore();
  });

  cancelButton.addEventListener("click", () => {
    boxItems.style.display = "none";
    overlay.style.display = "none";
    uploadedImage.style.display = "none";
    boxItems.reset();
  });
}

  // document.getElementById("file").addEventListener("change", function () {
  //   if (this.files[0]) {
  //     var picture = new FileReader();
  //     picture.readAsDataURL(this.files[0]);
  //     picture.addEventListener("load", function (event) {
  //       document
  //         .getElementById("uploadedImage")
  //         .setAttribute("src", event.target.result);
  //       document.getElementById("uploadedImage").style.display = "block";
  //     });
  //   }
  // });
 // Định nghĩa hàm dataURLtoBlob


 
 export function uploadfileimg(){
  var selectedImage = null;
  document.getElementById("file").onchange = function(e) {
    var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    reader.onload = function() {
      // console.log(reader.result);
      document.getElementById("uploadedImage").src = reader.result;
      selectedImage = reader.result ;
      console.log(selectedImage);
      document.getElementById("uploadedImage").style.display = "block";
      // image editing
      // ...
      // var blob = window.dataURLtoBlob(reader.result);
      // console.log(blob, new File([blob], "image.png", {
      //   type: "image/png"
      // }));
    };
    reader.readAsDataURL(file);
  };
 }



 
  

// Gọi hàm để khởi tạo các sự kiện khi tải trang
initializeFormActions();
