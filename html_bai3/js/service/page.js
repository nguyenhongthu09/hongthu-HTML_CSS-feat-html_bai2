import { state } from "../global/state.js";
import { delPage } from "../api/pagesFetch.js";

export function getPageState() {
  return state.pageState;
}

export function getIdUrl() {
  return state.idUrl;
}

export function findPageById(pageId) {
  return state.pageState.find((page) => page.id === pageId);
}

export function findPageByIndex(pageToDelete) {
  return state.pageState.findIndex((page) => page.id === pageToDelete.id);
}

export async function deletePage(pageToDelete) {
  const pageState = getPageState();
  const deleteSuccess = await delPage(pageToDelete.id);

  if (deleteSuccess) {
    const pageIndexToDelete = findPageByIndex(pageToDelete);

    if (pageIndexToDelete !== -1) {
      pageState.splice(pageIndexToDelete, 1);
    }

    let newPageToShow;

    if (pageIndexToDelete === pageState.length) {
      newPageToShow = pageState[pageIndexToDelete - 1];
    } else {
      newPageToShow = pageState[pageIndexToDelete];
    }

    if (newPageToShow) {
      state.idUrl = newPageToShow.id;
      console.log(state.idUrl, "current sau khi xoa");
    } else {
      if (pageIndexToDelete > 0) {
        newPageToShow = pageState[pageIndexToDelete - 1];
        state.idUrl = newPageToShow.id;
        console.log(state.idUrl, "current sau khi xoa");
      }
    }
    const event = new CustomEvent("pageDeleted", {
      detail: { newCurrentPage: state.idUrl },
    });
    document.dispatchEvent(event);
  }
}

export function setCurrentPage(newPageId) {
  state.idUrl = newPageId;
}

export function getPageIndexById(pageId) {
  const index = state.pageState.findIndex((page) => page.id === pageId);
  console.log(pageId, "pageid");
  return index;
}
