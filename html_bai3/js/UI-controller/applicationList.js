import { allApplications } from "../data/application.js";
import { deleteApply } from "../service/applications.js";
import { openFormEditApplication } from "./applicationForm.js";
import { getCurrentPages } from "../service/applications.js";
const cart = document.getElementById("list-items-apply");
export function showListApplication() {
  cart.innerHTML = "";
  const currentPage = getCurrentPages();
  allApplications[currentPage]?.forEach((apply) => {
    cart.innerHTML += `
        <div class="items-apply" edit = "${apply.id}">
        <button class="btn-del" apply_id = "${apply.id}"  >-</button>
        <img  src="${apply.image}" alt="">
        <span>${apply.name}</span>
    </div>
        `;
  });

  initializeDeleteButtonsEvent();
  editApplicationEvent();
}

function handleDeleteButtonClick(delUngdung) {
  let applyId = parseInt(delUngdung.getAttribute("apply_id"));
  deleteApply(applyId);
  showListApplication();
}

function initializeDeleteButtonsEvent() {
  const deleteBtn = document.querySelectorAll(".btn-del");
  deleteBtn.forEach((delUngdung) => {
    delUngdung.addEventListener("click", () => {
      handleDeleteButtonClick(delUngdung);
    });
  });
}

export let newData = {
  id: "",
  name: "",
  element: "",
};

function editApplicationEvent() {
  let itemsApplyElements = document.querySelectorAll(".items-apply");
  const editedNameIconInput = document.getElementById("edited_name_icon");
  const editedUploadedImage = document.getElementById("edited_uploadedImage");
  const edited_file = document.querySelector("#edited_file");

  itemsApplyElements.forEach((element, index) => {
    element?.addEventListener("click", () => {
      handleEditApp(element);
    });
  });

  const handleEditApp = (element) => {
    const idCurrentEdit = parseInt(element.getAttribute("edit"));
    allApplications.forEach((data, i) => {
      data.forEach((item, index) => {
        if (item.id === idCurrentEdit) {
          editedUploadedImage.style.display = "block";
          editedNameIconInput.value = item.name;
          editedUploadedImage.src = item.image;

          newData = {
            id: idCurrentEdit,
            name: item.name,
            image: item.image,
            element: element,
          };

          openFormEditApplication();
        }
      });
    });
    editedNameIconInput.addEventListener("change", (e) => {
      newData.name = e.target.value;
    });
    edited_file.addEventListener("change", (e) => {
      newData.image = URL.createObjectURL(e.target.file[0]);
    });
  };
}
