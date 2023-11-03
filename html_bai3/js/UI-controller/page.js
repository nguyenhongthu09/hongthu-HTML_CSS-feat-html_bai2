import { addNewPage } from "../api/pagesFetch.js";
import {
  findPageById,
  deletePage,
  setCurrentPage,
  findPageByIndex,
} from "../service/page.js";
import { showListApplication } from "./applicationList.js";
import { getPageState } from "../service/page.js";
import { loading } from "./common.js";

export const handlePageButtonClick = () => {
  const addPageButton = document.querySelector(".add-page");
  const delPageButton = document.getElementById("xoapage");
  const pageState = getPageState();
  addPageButton.addEventListener("click", async () => {
    loading([["loader__addpage", "spin"]], { status: true });
    const newPage = await addNewPage();
    if (newPage) {
      const newIndex = pageState.length - 1;
      updateQueryParam(newPage.id);
      showListApplication(newPage.id);
      updateCurrentPageNumber();
      setCurrentPage(newPage.id, newIndex);
    }
    loading([["loader__addpage", "spin"]], { status: false });
  });
  delPageButton.addEventListener("click", async () => {
    const currentPage = getCurrentPageFromQueryParams();
    const pageToDelete = findPageById(currentPage);

    if (!pageToDelete) {
      console.error("Không tìm thấy trang để xóa.");
      return;
    }

    const pageIndexToDelete = findPageByIndex(pageToDelete);

    if (pageIndexToDelete === -1) {
      console.error("Không tìm thấy trang để xóa.");
      return;
    }
    loading([["loader__delpage", "spin"]], { status: true });
    const newPageIndex =
      pageIndexToDelete === 0 ? pageIndexToDelete + 1 : pageIndexToDelete - 1;
    const newPageId = pageState[newPageIndex].id;

    await deletePage(pageToDelete);
    loading([["loader__delpage", "spin"]], { status: false });

    updateQueryParam(newPageId);
  });
  document.addEventListener("pageDeleted", (event) => {
    const newCurrentPage = event.detail.newCurrentPage;
    showListApplication(newCurrentPage);
  });
};

const updateCurrentPageNumber = () => {
  const currentPageElement = document.getElementById("current-page");
  const currentPage = getCurrentPageFromQueryParams();
  const pageIndex = findPageByIndex(currentPage);

  if (pageIndex !== -1) {
    const pageNumber = pageIndex + 1;
    currentPageElement.innerText = pageNumber;
  }
};
export const updateQueryParam = (pageId) => {
  const url = new URL(window.location.href);
  url.searchParams.set("pages", pageId);
  window.history.replaceState({}, "", url);
};

export const getCurrentPageFromQueryParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentPagee = urlParams.get("pages");
  return currentPagee;
};
export const updateCurrentPage = (newPage) => {
  const currentPagee = newPage;
  console.log(currentPagee, "current khi add page");
  updateQueryParam(currentPagee);
};
