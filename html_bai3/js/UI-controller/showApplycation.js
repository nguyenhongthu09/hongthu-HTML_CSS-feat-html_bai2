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
     
      document.getElementById("uploadedImage").style.display = "block";
     
    };
    reader.readAsDataURL(file);
  };
}

export function uploadedImageEdit(){
  var selectedImages = null;
  document.getElementById("edited_file").onchange = function (e) {
    var file = document.getElementById("edited_file").files[0];
    var reader = new FileReader();
    reader.onload = function () {
      document.getElementById("edited_uploadedImage").src = reader.result;
      
      selectedImages = reader.result;
     
     
      document.getElementById("edited_uploadedImage").style.display = "block";
     
    };
    reader.readAsDataURL(file);
  };
}


initializeFormActions();


const overlay = document.querySelector(".overlay");
const boxItems = document.getElementById("boxItems"); 
const boxItem = document.querySelector(".form-add-ungdung");
var nameError = document.getElementById("name_error");
export function closeTag(){
 
  boxItems.style.display = "none";
  overlay.style.display = "none";
}
// export function openTag(){
//   boxItems.style.display = "block";
//   overlay.style.display = "block";
// }
export function openTagAddApply(){
  nameError.style.display = "block";
  boxItem.style.display = "block";
  overlay.style.display = "block";
}
export function closeTagAddApply(){
  nameError.style.display = "none";
  boxItem.style.display = "none";
  overlay.style.display = "none";
}