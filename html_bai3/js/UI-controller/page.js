import { addNewPage } from "../api/pagesFetch.js";
import { getDeleteById, updateQueryParam } from "../service/page.js";
import { showListApplication } from "./applicationList.js";
import { state } from "../global/state.js";
import {
  getCurrentPageFromQueryParams,
  setCurrentPage,
} from "../service/page.js";
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
      updateCurrentPageNumber();
      setCurrentPage(newPage.id, newIndex);
    }
  });
  delPageButton.addEventListener("click", getDeleteById);
  document.addEventListener("pageDeleted", (event) => {
    const newCurrentPage = event.detail.newCurrentPage;
    showListApplication(newCurrentPage);
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
