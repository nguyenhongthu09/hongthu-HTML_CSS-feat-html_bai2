import { openFormEditApplication } from "./applicationForm.js";
import {
  deleteApply,
  delPage,
  addNewPage,
  getCurrentPageFromQueryParams,
  currentPagee,
  updateQueryParam,
} from "../service/applications.js";
import { state, initializeState } from "../global/state.js";
const cart = document.getElementById("list-items-apply");

export async function showListApplication(pageIndex) {
  const currentPageId = pageIndex || getCurrentPageFromQueryParams();
  // console.log(currentPageId, " current id");

  const currentPageData = state.pageState.find(
    (page) => page.id === currentPageId
  );
  // console.log(currentPageData, " currentpagedata");
  if (currentPageData) {
    const currentPageIndex = state.pageState.indexOf(currentPageData) + 1;

    const filteredApplications = state.applicationState.filter(
      (apply) => apply.pageIndex === currentPageData.id
    );

    cart.innerHTML = filteredApplications
      .map((apply) => {
        return `
     <div class="items-apply" edit="${apply.id}">
       <button class="btn-del" apply_id="${apply.id}">-</button>
       <img src="${apply.image}" alt="">
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
}

export function handlePageButtonClick() {
  const addPageButton = document.querySelector(".add-page");
  const delPageButton = document.getElementById("xoapage");
  addPageButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await addNewPage();

    initializeStateAndPageNumber();
    showListApplication();
  });

  delPageButton.addEventListener("click", async () => {
    let currentPage = getCurrentPageFromQueryParams();
    const pageToDelete = state.pageState.find(
      (page) => page.id === currentPage
    );
    if (!pageToDelete) {
      console.error("Không tìm thấy trang để xóa.");
      return;
    }
    if (state.pageState.length === 1) {
      return;
    }
    const deleteSuccess = await delPage(pageToDelete.id);

    if (deleteSuccess) {
      const pageIndexToDelete = state.pageState.findIndex(
        (page) => page.id === pageToDelete.id
      );
      console.log(pageIndexToDelete, "chi muc trang vua xoa");
      if (pageIndexToDelete !== -1) {
        state.pageState.splice(pageIndexToDelete, 1);
        console.log("xoa trang thanh cong", state.pageState);
      }

      let newPage = currentPage;
      if (pageIndexToDelete === state.pageState.length) {
        newPage = currentPage - 1;
      } else {
        newPage = currentPage + 1;
      }

      updateQueryParam(newPage);
      showListApplication(newPage);
      initializeStateAndPageNumber();
    } else {
      console.error("Lỗi xóa trang.");
    }
  });
}

export function setPageButtonEvent() {
  const btnNext = document.getElementById("next-slider");
  const btnPrev = document.getElementById("prev-slider");
  let current = getCurrentPageFromQueryParams();
  btnNext.addEventListener("click", async () => {
    if (current >= state.pageState.length) {
      return;
    }
    current += 1;
    updateQueryParam(current);
    console.log(current, "page tt");
    showListApplication(current);
    initializeStateAndPageNumber();
  });

  btnPrev.addEventListener("click", async () => {
    if (current <= 1) {
      return;
    }
    current -= 1;
    updateQueryParam(current);
    console.log(current, "page phia truoc");
    showListApplication(current);
    initializeStateAndPageNumber();
  });
}

function updateCurrentPageNumber() {
  const currentPageElement = document.getElementById("current-page");
  const currentPage = getCurrentPageFromQueryParams();
  const pageIndex = state.pageState.findIndex(
    (page) => page.id === currentPage
  );

  if (pageIndex !== -1) {
    const pageNumber = pageIndex + 1;
    currentPageElement.innerText = pageNumber;
  }
}

function initializeStateAndPageNumber() {
  initializeState();
  updateCurrentPageNumber();
}

document.addEventListener("DOMContentLoaded", initializeStateAndPageNumber);

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
  pageIndex: null,
};
const handleEditApp = (element) => {
  const editedNameIconInput = document.getElementById("edited_name_icon");
  const editedUploadedImage = document.getElementById("edited_uploadedImage");
  const edited_file = document.querySelector("#edited_file");
  const idCurrentEdit = parseInt(element.getAttribute("edit"));
  const appToEdit = state.applicationState.find(
    (app) => app.id === idCurrentEdit
  );
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
