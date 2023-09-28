import { allApplycations } from "../data/applycation.js";
import { initializeFormActions } from "./showApplycation.js";
import { deleteApply } from "../service/applycations.js";
import { uploadfileimg, uploadedImageEdit } from "./showApplycation.js";

import {
  closeTag,
  closeTagAddApply,
  openTagAddApply,
  openTag,
} from "./showApplycation.js";
const btnNext = document.getElementById("next-slider");
const btnPrev = document.getElementById("prev-slider");
const cart = document.getElementById("list-items-apply");
let currentPage = 0;
let currentId = calculateCurrentId(); 
export function showUI() {
  cart.innerHTML = "";
  allApplycations[currentPage]?.forEach((apply) => {
    cart.innerHTML += `
        <div class="items-apply" edit = "${apply.id}">
        <button class="btn-del" apply_id = "${apply.id}"  >-</button>
        <img  src="${apply.image}" alt="">
        <span>${apply.name}</span>
    </div>
        `;
  });

  initializeFormActions();
  uploadfileimg();
  uploadedImageEdit();
  initializeDeleteButtonsEvent(document.querySelectorAll(".btn-del"));
  edit();
}
showUI();

btnNext.addEventListener("click", () => {
  currentPage++;
  if (currentPage > allApplycations.length - 1) {
    currentPage = allApplycations.length - 1;
  }

  showUI();
});
btnPrev.addEventListener("click", () => {
  currentPage--;
  if (currentPage < 0) {
    currentPage = 0;
  }
  showUI();
});

function addApplycation(apply, currentPage) {
  // allApplycations[currentPage].push(apply);
  currentId++; 
  apply.id = currentId; 
  allApplycations[currentPage].push(apply);

  showUI();
}
function calculateCurrentId() {
  let maxId = 0;
  for (const page of allApplycations) {
    for (const apply of page) {
      if (apply.id > maxId) {
        maxId = apply.id;
      }
    }
  }
  return maxId;
}
btnSubmit.addEventListener("click", () => {
  var nameInput = document.getElementById("name_icon");

  const uploadedImage = document.getElementById("uploadedImage");
  if (!nameInput.value) {
    openTagAddApply();
  } else {
    closeTagAddApply();
  }

  const name = nameInput.value;
  const hinh = uploadedImage.src;

  if (nameInput.value !== "") {
    addApplycation({
      // id: allApplycations[allApplycations.length - 1].id + 1,
      name: name,
      image: hinh,
    }, currentPage);
  }
  showUI();
  nameInput.value = "";
  nameInput.form.reset();
  uploadedImage.src = "";
  uploadedImage.style.display = "none";
});
function handleDeleteButtonClick(delUngdung) {
  let applyId = parseInt(delUngdung.getAttribute("apply_id"));
  const xoa = deleteApply(applyId);
  showUI(xoa);
}

function initializeDeleteButtonsEvent(deleteBtn) {
  deleteBtn.forEach((delUngdung) => {
    delUngdung.addEventListener("click", () => {
      handleDeleteButtonClick(delUngdung);
    });
  });
}

let newData = {
  id: "",
  name: "",
  element: "",
};
function edit() {
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
    allApplycations.forEach((data, i) => {
      data.forEach((item, index) => {
        if (item.id === idCurrentEdit) {
          editedUploadedImage.style.display = "block";
          editedNameIconInput.value = item.name;
          editedUploadedImage.src = item.image;
          openTag();
          newData = {
            id: idCurrentEdit,
            name: item.name,
            image: item.image,
            element: element,
          };
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
const btnEditSubmit = document.getElementById("btnEditSubmit");

btnEditSubmit.addEventListener("click", () => {
  let element = newData.element;
  element.children[element.children.length - 1].innerText = newData.name;
  element.children[element.children.length - 2].src = newData.image;
  allApplycations.forEach((data) => {
    data.forEach((item) => {
      if (item.id === newData.id) {
        item.name = newData.name;
        item.image = newData.image;
      }
    });
  });
  newData = {
    id: "",
    name: "",
    element: "",
  };
  closeTag();
});

const btnEditCancel = document.getElementById("btnEditCancel");
btnEditCancel.addEventListener("click", () => {
  closeTag();
});
