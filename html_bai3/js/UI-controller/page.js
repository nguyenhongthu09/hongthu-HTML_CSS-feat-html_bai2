import { addNewPage } from "../api/pagesFetch.js";
import {
  findPageById,
  deletePage,
  setCurrentPage,
  findPageByIndex,
} from "../service/page.js";
import { showListApplication } from "./applicationList.js";
import { state } from "../global/state.js";

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
  delPageButton.addEventListener("click", () => {
    const currentPage = getCurrentPageFromQueryParams();
    const pageToDelete = findPageById(currentPage);

    if (!pageToDelete) {
      console.error("Không tìm thấy trang để xóa.");
      return;
    }

    if (state.pageState.length === 1) {
      return;
    }

    const pageIndexToDelete = findPageByIndex(pageToDelete);

    if (pageIndexToDelete === -1) {
      console.error("Không tìm thấy trang để xóa.");
      return;
    }

    const newPageIndex =
      pageIndexToDelete === 0 ? pageIndexToDelete + 1 : pageIndexToDelete - 1;
    const newPageId = state.pageState[newPageIndex].id;

    deletePage(pageToDelete);
    updateQueryParam(newPageId);
  });
  document.addEventListener("pageDeleted", (event) => {
    const newCurrentPage = event.detail.newCurrentPage;
    showListApplication(newCurrentPage);
  });
}

function updateCurrentPageNumber() {
  const currentPageElement = document.getElementById("current-page");
  const currentPage = getCurrentPageFromQueryParams();
  const pageIndex = findPageByIndex(currentPage);

  if (pageIndex !== -1) {
    const pageNumber = pageIndex + 1;
    currentPageElement.innerText = pageNumber;
  }
}
export function updateQueryParam(pageId) {
  const url = new URL(window.location.href);
  url.searchParams.set("pages", pageId);
  window.history.replaceState({}, "", url);
}

export function getCurrentPageFromQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentPagee = urlParams.get("pages");

  return currentPagee;
}
export function updateCurrentPage(newPage) {
  const currentPagee = newPage;
  console.log(currentPagee, "current khi add page");
  updateQueryParam(currentPagee);
}
