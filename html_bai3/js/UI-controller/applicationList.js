import { allApplications } from "../data/application.js";
import { openFormEditApplication } from "./applicationForm.js";
import { updateQueryParam } from "../service/applications.js";
import {
  changePage,
  deleteApply,
  delPage,
  addNewPage,
  getCurrentPageFromQueryParams,
  fetchPages,
  currentPagee,
} from "../service/applications.js";
import { pageState, applicationState } from "../global/state.js";
const cart = document.getElementById("list-items-apply");

export async function showListApplication() {
  cart.innerHTML = "";
  const currentPageData = pageState.find((page) => page.id === currentPagee);

  if (currentPageData) {
    const filteredApplications = applicationState.filter(
      (apply) => apply.pageIndex === currentPageData.id
    );
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
  const delPageButton = document.querySelector(".del-page");
  addPageButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await addNewPage();
    showListApplication();
  });

  delPageButton.addEventListener("click", async () => {
    const currentPageId = getCurrentPageFromQueryParams();
    const deleted = await delPage(currentPageId);

    if (deleted) {
      let nextPageId = null;

      const deletedPageIndex = pageState.findIndex(
        (page) => page.id === currentPageId
      );

      if (deletedPageIndex !== -1) {
        pageState.splice(deletedPageIndex, 1);

        if (pageState.length > 0) {
          if (deletedPageIndex > 0) {
            nextPageId = pageState[deletedPageIndex - 1].id;
          } else {
            nextPageId = pageState[1].id;
          }
        }

        showListApplication(nextPageId);
      }
    }
  });
}
function deletePageFromUI(pageId) {
  const deletedPageIndex = pageState.findIndex((page) => page.id === pageId);
  if (deletedPageIndex !== -1) {
    pageState.splice(deletedPageIndex, 1);
  }
}
export function setPageButtonEvent() {
  const btnNext = document.getElementById("next-slider");
  const btnPrev = document.getElementById("prev-slider");

  btnNext.addEventListener("click", async () => {
    await changePage("increment");
    showListApplication();
    // await updateNumberFooter();
  });

  btnPrev.addEventListener("click", async () => {
    await changePage("decrement");
    showListApplication();
    // await updateNumberFooter();
  });
}

export async function updateNumberFooter() {
  const currentPagee = getCurrentPageFromQueryParams();

  const data = await fetchPages();
  console.log("currentPage:", currentPagee);
  if (data.pages && data.pages.length > 0) {
    const pageIndex = data.pages.findIndex((page) => page.id === currentPagee);

    if (pageIndex !== -1) {
      const currentPageNumber = pageIndex + 1; 
      const currentPageElement = document.getElementById("current-page");

      if (currentPageElement) {
        currentPageElement.textContent = currentPageNumber.toString();
      }

      return currentPageNumber; 
    }
  }

  return -1;
}

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
