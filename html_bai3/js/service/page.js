import { state } from "../global/state.js";
import { delPage } from "../api/pagesFetch.js";

export function findPageById(pageId) {
  return state.pageState.find((page) => page.id === pageId);
}

export function findPageByIndex( pageToDelete) {
  return state.pageState.findIndex((page) => page.id === pageToDelete.id);
}

export async function deletePage(pageToDelete) {
  const deleteSuccess = await delPage(pageToDelete.id);

  if (deleteSuccess) {
    const pageIndexToDelete = findPageByIndex(pageToDelete);

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
  }
}

export function setCurrentPage(newPageId) {
  state.current = newPageId;
}
