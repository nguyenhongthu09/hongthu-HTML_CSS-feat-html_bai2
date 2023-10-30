import { state } from "../global/state.js";
import { delPage } from "../api/pagesFetch.js";

export let currentPagee = getCurrentPageFromQueryParams();

export function updateQueryParam(pageId) {
  const url = new URL(window.location.href);
  const pageExists = state.pageState.find((page) => page.id === pageId);
  if (pageExists) {
    url.searchParams.set("pages", pageId);
  } else if (state.pageState.length > 0) {
    url.searchParams.set("pages", state.pageState[0].id);
  }
  window.history.replaceState({}, "", url);
}

export function getCurrentPageFromQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentPagee = urlParams.get("pages");

  return currentPagee;
}

export function updateCurrentPage(newPage) {
  currentPagee = newPage;
  console.log(currentPagee, "current khi add page");
  updateQueryParam(currentPagee);
}

export async function deletePage(pageToDelete) {
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
    } else {
      if (pageIndexToDelete > 0) {
        newPageToShow = state.pageState[pageIndexToDelete - 1];
        state.current = newPageToShow.id;
        console.log(state.current, "current sau khi xoa");
      }
    }
    const event = new CustomEvent("pageDeleted", {
      detail: { newCurrentPage: state.current },
    });
    document.dispatchEvent(event);
    updateQueryParam(state.current);
  }
}
export function getDeleteById() {
  const currentPage = getCurrentPageFromQueryParams();
  const pageToDelete = state.pageState.find((page) => page.id === currentPage);

  if (!pageToDelete) {
    console.error("Không tìm thấy trang để xóa.");
    return;
  }

  if (state.pageState.length === 1) {
    return;
  }

  deletePage(pageToDelete);
}

export function setCurrentPage(newPageId) {
  state.current = newPageId;
  updateQueryParam(newPageId);
}
