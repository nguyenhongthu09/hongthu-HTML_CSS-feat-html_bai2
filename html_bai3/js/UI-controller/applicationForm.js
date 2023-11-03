import { getCurrentPageFromQueryParams } from "../UI-controller/page.js";
import { showListApplication } from "./applicationList.js";
import {
  addApplicationToCustomPage,
  updateData,
} from "../api/applicationFetch.js";
import { findApplicationById } from "../service/applications.js";

const getDOMForms = () => {
  const overlay = document.querySelector(".overlay");
  const boxItems = document.getElementById("form_edit_ud");
  var nameError = document.getElementById("name_error");
  const uploadedImage = document.getElementById("uploadedImage");
  const submitForm = document.getElementById("form_add_ud");
  return {
    overlay,
    boxItems,
    submitForm,
    nameError,
    uploadedImage,
  };
};

export const initializeFormActions = () => {
  const addButton = document.querySelector(".icon-btn-add");
  const cancelButton = document.getElementById("btn-cancel");
  const btnAdd = document.getElementById("btnSubmit");
  const load = document.getElementById("load");
  const submitForm = document.getElementById("form_add_ud");
  const btn = document.querySelector("btn");
  addButton.addEventListener("click", () => {
    const { overlay } = getDOMForms();
    submitForm.style.display = "block";
    overlay.style.display = "block";
    load.style.display = "none";
    btnAdd.style.display = "block";
  });
  btnAdd.addEventListener("click", async () => {
    load.style.display = "block";
    btnAdd.style.display = "none";
    var nameInput = document.getElementById("name_icon");
    const uploadedImage = document.getElementById("uploadedImage");

    const name = nameInput.value;
    const image = uploadedImage.src;
    const pageIndex = getCurrentPageFromQueryParams();
    if (nameInput.value !== "") {
      const newApplication = {
        name: name,
        image: image,
      };
      await addApplicationToCustomPage(newApplication, pageIndex);
      showListApplication();
    }
    if (!nameInput.value) {
      openFormAddApplication();
    } else {
      closeFormAddApplication();
    }
    nameInput.value = "";
    nameInput.form.reset();
    uploadedImage.src = "";
    uploadedImage.style.display = "none";
  });

  cancelButton.addEventListener("click", () => {
    const { overlay, uploadedImage } = getDOMForms();
    submitForm.style.display = "none";
    overlay.style.display = "none";
    uploadedImage.style.display = "none";
    submitForm.reset();
  });
  uploadFileImg();
};

const uploadFileImg = () => {
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
};

const uploadedImageEdit = () => {
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
};

export const closeFormEditApplication = () => {
  const { boxItems, overlay } = getDOMForms();
  boxItems.style.display = "none";
  overlay.style.display = "none";
};

export const openFormEditApplication = () => {
  const { boxItems, overlay } = getDOMForms();
  const btnSub = document.getElementById("btnEditSubmit");
  const editedUploadedImage = document.getElementById("edited_uploadedImage");
  const btnLoad = document.getElementById("loadd");
  boxItems.style.display = "block";
  overlay.style.display = "block";
  uploadedImageEdit();

  btnSub.addEventListener("click", async () => {
    btnSub.style.display = "none";
    btnLoad.style.display = "block";
    const updatedData = window.newData;
    if (updatedData.id) {
      const appToUpdate = findApplicationById(updatedData.id);

      if (appToUpdate) {
        appToUpdate.name = updatedData.name;
        appToUpdate.image = updatedData.image;

        updatedData.element.children[
          updatedData.element.children.length - 1
        ].innerText = updatedData.name;
        updatedData.element.children[
          updatedData.element.children.length - 3
        ].src = updatedData.image;
      }

      await updateData(
        updatedData.id,
        updatedData.name,
        updatedData.image,
        updatedData.pageIndex
      );

      updatedData.id = "";
      updatedData.name = "";
      updatedData.image = "";
      updatedData.element = "";
      updatedData.pageIndex = null;
      closeFormEditApplication();
    }
  });

  btnEditCancel.addEventListener("click", () => {
    closeFormEditApplication();
  });
};
export const openFormAddApplication = () => {
  const { submitForm, overlay, nameError } = getDOMForms();
  nameError.style.display = "block";
  submitForm.style.display = "block";
  overlay.style.display = "block";
};
export const closeFormAddApplication = () => {
  const { submitForm, overlay, nameError } = getDOMForms();
  nameError.style.display = "none";
  submitForm.style.display = "none";
  overlay.style.display = "none";
};
