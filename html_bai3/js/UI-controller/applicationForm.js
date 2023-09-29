import { addApplycation, getCurrentPages } from "../service/applications.js";
import { showListApplication } from "./applicationList.js";
function getDOMForms() {
  const overlay = document.querySelector(".overlay");
  const boxItems = document.getElementById("boxItems");
  const boxItem = document.querySelector(".form-add-ungdung");
  var nameError = document.getElementById("name_error");
  const uploadedImage = document.getElementById("uploadedImage");
  return {
    overlay,
    boxItems,
    boxItem,
    nameError,
    uploadedImage,
  };
}

export function initializeFormActions() {
  const addButton = document.querySelector(".icon-btn-add");
  const cancelButton = document.getElementById("btn-cancel");

  addButton.addEventListener("click", () => {
    const { boxItem, overlay } = getDOMForms();
    boxItem.style.display = "block";
    overlay.style.display = "block";
  });
  btnSubmit.addEventListener("click", () => {
    var nameInput = document.getElementById("name_icon");
    const uploadedImage = document.getElementById("uploadedImage");
    if (!nameInput.value) {
      openFormAddApplication();
    } else {
      closeFormAddApplication();
    }

    const name = nameInput.value;
    const hinh = uploadedImage.src;

    if (nameInput.value !== "") {
      addApplycation(
        {
          name: name,
          image: hinh,
        },
        getCurrentPages()
      );
    }
    showListApplication();
    nameInput.value = "";
    nameInput.form.reset();
    uploadedImage.src = "";
    uploadedImage.style.display = "none";
  });

  cancelButton.addEventListener("click", () => {
    const { boxItem, overlay, uploadedImage } = getDOMForms();
    boxItem.style.display = "none";
    overlay.style.display = "none";
    uploadedImage.style.display = "none";
    boxItem.reset();
  });
  uploadFileImg();
}

export function uploadFileImg() {
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

export function uploadedImageEdit() {
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

export function closeFormEditApplication() {
  const { boxItems, overlay } = getDOMForms();
  boxItems.style.display = "none";
  overlay.style.display = "none";
}

import { newData } from "./applicationList.js";
import { updateData } from "../service/applications.js";

export function openFormEditApplication() {
  const { boxItems, overlay } = getDOMForms();
  boxItems.style.display = "block";
  overlay.style.display = "block";
  uploadedImageEdit();

  btnEditSubmit.addEventListener("click", () => {
    let element = newData.element;
    element.children[element.children.length - 1].innerText = newData.name;
    element.children[element.children.length - 2].src = newData.image;
    updateData(newData.id, newData.name, newData.image);

    newData.id = "";
    newData.name = "";
    newData.element = "";

    closeFormEditApplication();
  });

  btnEditCancel.addEventListener("click", () => {
    closeFormEditApplication();
  });
}
export function openFormAddApplication() {
  const { boxItem, overlay, nameError } = getDOMForms();
  nameError.style.display = "block";
  boxItem.style.display = "block";
  overlay.style.display = "block";
}
export function closeFormAddApplication() {
  const { boxItem, overlay, nameError } = getDOMForms();
  nameError.style.display = "none";
  boxItem.style.display = "none";
  overlay.style.display = "none";
}
