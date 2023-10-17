import { openFormEditApplication } from "./applicationForm.js";
import {
  changePage,
  deleteApply,
  delPage,
  addNewPage,
  getCurrentPageFromQueryParams,
  fetchPages,
  currentPagee,
  updateQueryParam,updateCurrentPage,
} from "../service/applications.js";
import { pageState, applicationState, initializeState } from "../global/state.js";
const cart = document.getElementById("list-items-apply");

export async function showListApplication() {
  cart.innerHTML = "";
  const currentPageData = pageState.find((page) => page.id === currentPagee && page.isDelete === false);

  if (currentPageData) {
    const filteredApplications = applicationState.filter(
      (apply) => apply.pageIndex === currentPageData.id);
    filteredApplications.forEach((apply) => {
      cart.innerHTML += `
        <div class="items-apply" edit="${apply.id}">
          <button class="btn-del" apply_id="${apply.id}">-</button>
          <img src="${apply.image}" alt="">
          <span>${apply.name}</span>
        </div>
      `;
    });
  }
  initializeDeleteButtonsEvent();
  editApplicationEvent();
}

export function handlePageButtonClick() {
  const addPageButton = document.querySelector(".add-page");
  const delPageButton = document.getElementById("xoapage");
  addPageButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await addNewPage();
    updatePageNumberOnFooter();
    showListApplication();
  });

  delPageButton.addEventListener("click", async () => {
    const currentPage = getCurrentPageFromQueryParams();
    const pageToDelete = pageState.find((page) => page.id === currentPage);
  
    if (!pageToDelete) {
      console.error("Không tìm thấy trang để xóa.");
      return;
    }
  
    const deleteSuccess = await delPage(pageToDelete.id, currentPage);
  
    if (deleteSuccess) {
      // Cập nhật URL và giao diện với trang mới
      updateQueryParam(deleteSuccess);
      showListApplication(deleteSuccess);
    }
  });

}




export function setPageButtonEvent() {
  const btnNext = document.getElementById("next-slider");
  const btnPrev = document.getElementById("prev-slider");

  btnNext.addEventListener("click", async () => {
    await changePage("increment");
    showListApplication();
    updatePageNumberOnFooter();
  });

  btnPrev.addEventListener("click", async () => {
    await changePage("decrement");
    showListApplication();
    updatePageNumberOnFooter();
  });
}

function updatePageNumberOnFooter() {
  const currentPageElement = document.getElementById("current-page");
  const currentPage = getCurrentPageFromQueryParams();
  if (currentPageElement !== null && !isNaN(currentPage)) {
    currentPageElement.textContent = currentPage.toString();
  }
}
updatePageNumberOnFooter();


function handleDeleteButtonClick(delUngdung) {
  let applyId = parseInt(delUngdung.getAttribute("apply_id"));
  deleteApply(applyId);
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
  pageIndex: null,
};
const handleEditApp = (element) => {
  const editedNameIconInput = document.getElementById("edited_name_icon");
  const editedUploadedImage = document.getElementById("edited_uploadedImage");
  const edited_file = document.querySelector("#edited_file");
  const idCurrentEdit = parseInt(element.getAttribute("edit"));
  const appToEdit = applicationState.find((app) => app.id === idCurrentEdit);
  if (appToEdit) {
    editedUploadedImage.style.display = "block";
    editedNameIconInput.value = appToEdit.name;
    editedUploadedImage.src = appToEdit.image;

    newData = {
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
    newData.image = URL.createObjectURL(e.target.file[0]);
  });
};
function editApplicationEvent() {
  let itemsApplyElements = document.querySelectorAll(".items-apply");
  itemsApplyElements.forEach((element, index) => {
    element?.addEventListener("click", () => {
      handleEditApp(element);
    });
  });
}
