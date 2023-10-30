import { state } from "../global/state.js";
import { fetchApplicationsss } from "../api/applicationFetch.js";
import { fetchPages } from "../api/pagesFetch.js";
import { updateQueryParam } from "./page.js";

export function calculateCurrentId() {
  let maxId = 0;
  for (const apply of state.applicationState) {
    if (apply.id > maxId) {
      maxId = apply.id;
    }
  }
  return maxId;
}

function getPageIdURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const pageIdFromURL = urlParams.get("pages");

  if (pageIdFromURL) {
    return pageIdFromURL;
  } else if (state.pageState.length > 0 && state.pageState[0]) {
    return state.pageState[0].id;
  }
}

export async function initializeState() {
  try {
    const pagesData = await fetchPages();
    const applicationsData = await fetchApplicationsss();

    state.pageState = pagesData;
    state.applicationState = applicationsData;
    const pageIdURL = getPageIdURL();

    if (pageIdURL) {
      const pageCurrent = state.pageState.some((page) => page.id === pageIdURL);

      if (pageCurrent) {
        state.current = pageIdURL;
        updateQueryParam(pageIdURL);
      } else {
        state.current = state.pageState[0].id;
        updateQueryParam(state.current);
      }
    } else {
      if (state.pageState.length > 0) {
        state.current = state.pageState[0].id;
        updateQueryParam(state.current);
      }
    }

    console.log("state.current", state.current);
  } catch (error) {
    console.error("Lỗi khi khởi tạo trạng thái:", error);
  }
}

function getPageIndexById(pageId) {
  const index = state.pageState.findIndex((page) => page.id === pageId);
  console.log(pageId, "pageid");
  return index;
}

export function changPages(direction) {
  const currentIndex = getPageIndexById(state.current);
  console.log(currentIndex, "currentindex cua trang");

  if (direction === "next" && currentIndex < state.pageState.length - 1) {
    state.current = state.pageState[currentIndex + 1].id;
  } else if (direction === "prev" && currentIndex > 0) {
    state.current = state.pageState[currentIndex - 1].id;
  }

  if (state.current !== state.pageState[currentIndex].id) {
    updateQueryParam(state.current);
  }
}
