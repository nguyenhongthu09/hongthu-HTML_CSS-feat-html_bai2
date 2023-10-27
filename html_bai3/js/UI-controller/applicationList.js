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

export async function showListApplication(pageId) {
  const pageid = pageId || getCurrentPageFromQueryParams();
  const currentPageId = state.pageState.find((page) => page.id === pageid);

  if (currentPageId) {
    const currentPageIndex = state.pageState.indexOf(currentPageId) + 1;
    const filteredApplications = state.applicationState.filter(
      (apply) => apply.pageIndex === currentPageId.id
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
    const newPage = await addNewPage();
    if (newPage) {
      const newIndex = state.pageState.length - 1;
      updateQueryParam(newPage.id);
      showListApplication(newPage.id);
      initializeStateAndPageNumber();
      setCurrentPage(newPage.id, newIndex);
    }
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
      if (pageIndexToDelete !== -1) {
        state.pageState.splice(pageIndexToDelete, 1);
      }

      let newPageToShow;
      if (pageIndexToDelete === state.pageState.length) {
        newPageToShow = state.pageState[pageIndexToDelete - 1];
      } else {
        newPageToShow = state.pageState[pageIndexToDelete];
      }

      if (newPageToShow) {
        state.current = newPageToShow.id;
        console.log(state.current, "current sau khi xoa");
        showListApplication(state.current);
      } else {
        if (pageIndexToDelete > 0) {
          newPageToShow = state.pageState[pageIndexToDelete - 1];
          state.current = newPageToShow.id;
          console.log(state.current, "current sau khi xoa");
          showListApplication(state.current);
        } else {
        }
      }

      updateQueryParam(state.current);
    } else {
      console.error("Lỗi xóa trang.");
    }
  });
}

function getPageIndexById(pageId) {
  for (let i = 0; i <= state.pageState.length; i++) {
    if (state.pageState[i].id === pageId) {
      console.log(pageId, "pageid");
      return i;
    }
  }
}

function setCurrentPage(newPageId, newIndex) {
  state.current = newPageId;
  updateQueryParam(newPageId);
  showListApplication(newPageId);
  // const btnNext = document.getElementById("next-slider");
  const btnPrev = document.getElementById("prev-slider");
  // btnNext.disabled = newIndex === state.pageState.length - 1;
  btnPrev.disabled = newIndex === 0;
}

export function setPageButtonEvent() {
  const btnNext = document.getElementById("next-slider");
  const btnPrev = document.getElementById("prev-slider");

  btnNext.addEventListener("click", async () => {
    console.log("okok");
    const currentIndex = getPageIndexById(state.current);
    console.log(currentIndex, " currentindex cua trang");
    if (currentIndex < state.pageState.length - 1) {
      state.current = state.pageState[currentIndex + 1].id;
      updateQueryParam(state.current);
      showListApplication(state.current);
    }
  });

  btnPrev.addEventListener("click", async () => {
    console.log("lui lai");
    const currentIndex = getPageIndexById(state.current);
    console.log(currentIndex, " currentindex cuar trang");
    if (currentIndex > 0) {
      state.current = state.pageState[currentIndex - 1].id;
      updateQueryParam(state.current);
      showListApplication(state.current);
    }
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
