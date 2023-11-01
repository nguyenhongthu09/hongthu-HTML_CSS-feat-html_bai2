import { openFormEditApplication } from "./applicationForm.js";
import { getCurrentPageFromQueryParams } from "../UI-controller/page.js";
import { deleteApply } from "../api/applicationFetch.js";
import {
  changPages,
  findApplicationById,
  findApplicationByFilter,
  removeApplicationById,
} from "../service/applications.js";
import { findPageById, getPageState } from "../service/page.js";
import { loading } from "./common.js";

export const showListApplication = (pageId) => {
  const cart = document.getElementById("list-items-apply");
  const pageid = pageId || getCurrentPageFromQueryParams();
  const currentPageId = findPageById(pageid);
  const pageState = getPageState();
  if (currentPageId) {
    const currentPageIndex = pageState.indexOf(currentPageId) + 1;
    const filteredApplications = findApplicationByFilter(currentPageId.id);

    cart.innerHTML = filteredApplications
      .map((apply, index) => {
        return `
       <div class="items-apply" edit="${apply.id}">
       <button class="btn-del" apply_id="${apply.id}" data-delete="true">-</button>
       
       <img class="img-app" src="${apply.image}" alt="">
       <div class="loader  loader__deltapp-${index} loadingg loader-hidden"></div>
       <span>${apply.name}</span>
     </div>
     
   `;
      })
      .join(" ");

    const currentPageElement = document.getElementById("current-page");
    currentPageElement.innerText = currentPageIndex;
  }
  initializeDeleteButtonsEvent();
  editApplicationEvent();
};

export const setPageButtonEvent = () => {
  const btnNext = document.getElementById("next-slider");
  const btnPrev = document.getElementById("prev-slider");
  btnNext.addEventListener("click", () => {
    changPages("next");
    showListApplication();
  });

  btnPrev.addEventListener("click", () => {
    changPages("prev");
    showListApplication();
  });
};

const initializeDeleteButtonsEvent = () => {
  const deleteBtn = document.querySelectorAll(".btn-del");
  deleteBtn.forEach((delUngdung, i) => {
    delUngdung.addEventListener("click", async () => {
      const id = parseInt(delUngdung.getAttribute("apply_id"));

      loading([[`loader__deltapp-${i}`, `spin`]], { status: true });
      await deleteApply(id);

      removeApplicationById(id);
      showListApplication();
      loading([[`loader__deltapp-${i}`, `spin`]], { status: false });
    });
  });
};

const handleEditApp = (element) => {
  const editedNameIconInput = document.getElementById("edited_name_icon");
  const editedUploadedImage = document.getElementById("edited_uploadedImage");
  const edited_file = document.querySelector("#edited_file");
  const idCurrentEdit = parseInt(element.getAttribute("edit"));
  const appToEdit = findApplicationById(idCurrentEdit);
  if (appToEdit) {
    editedUploadedImage.style.display = "block";
    editedNameIconInput.value = appToEdit.name;
    editedUploadedImage.src = appToEdit.image;

    window.newData = {
      id: idCurrentEdit,
      name: appToEdit.name,
      image: appToEdit.image,
      element: element,
      pageIndex: appToEdit.pageIndex,
    };
    openFormEditApplication();
  }
  editedNameIconInput.addEventListener("change", (e) => {
    newData.name = e.target.value;
  });
  edited_file.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      newData.image = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
};

const editApplicationEvent = () => {
  let itemsApplyElements = document.querySelectorAll(".items-apply");
  itemsApplyElements.forEach((element) => {
    element?.addEventListener("click", () => {
      handleEditApp(element);
    });
  });
};
