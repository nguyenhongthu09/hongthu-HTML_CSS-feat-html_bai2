import { state } from "../global/state.js";
import { fetchApplicationsss } from "../api/applicationFetch.js";
import { fetchPages } from "../api/pagesFetch.js";
import { updateQueryParam } from "../UI-controller/page.js";
import { getPageState, getPageIndexById } from "./page.js";

export const getApplicationState = () => state.applicationState;

export const findApplicationById = (appId) =>
  state.applicationState.find((app) => app.id === appId);

export const calculateCurrentId = () => {
  let maxId = 0;
  for (const apply of getApplicationState()) {
    if (apply.id > maxId) {
      maxId = apply.id;
    }
  }
  return maxId;
};

const getPageIdURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pageIdFromURL = urlParams.get("pages");
  const pageState = getPageState();
  if (pageIdFromURL) {
    return pageIdFromURL;
  } else if (pageState.length > 0 && pageState[0]) {
    return pageState[0].id;
  }
};

export const initializeState = async () => {
  try {
    const pagesData = await fetchPages();
    const applicationsData = await fetchApplicationsss();
    state.pageState = pagesData;
    state.applicationState = applicationsData;
    const pageIdURL = getPageIdURL();

    if (pageIdURL) {
      const pageCurrent = state.pageState.some((page) => page.id === pageIdURL);

      if (pageCurrent) {
        state.idUrl = pageIdURL;
        updateQueryParam(pageIdURL);
      } else {
        state.idUrl = state.pageState[0].id;
        updateQueryParam(state.idUrl);
      }
    } else {
      if (state.pageState.length > 0) {
        state.idUrl = state.pageState[0].id;
        updateQueryParam(state.idUrl);
      }
    }

    return true;
  } catch (error) {
    console.error("Lỗi khi khởi tạo trạng thái:", error);
    return false;
  }
};

export const changPages = (direction) => {
  const currentIndex = getPageIndexById(state.idUrl);
  const pageState = getPageState();
  console.log(currentIndex, "currentindex cua trang");

  if (direction === "next" && currentIndex < pageState.length - 1) {
    state.idUrl = pageState[currentIndex + 1].id;
  } else if (direction === "prev" && currentIndex > 0) {
    state.idUrl = pageState[currentIndex - 1].id;
  }

  if (state.idUrl !== pageState[currentIndex].id) {
    updateQueryParam(state.idUrl);
  }
};

export const findApplicationByIndex = (appId) =>
  state.applicationState.findIndex((app) => app.id === appId);

export const findApplicationByFilter = (pageIndex) =>
  state.applicationState.filter((app) => app.pageIndex === pageIndex);

export const removeApplicationById = (id) => {
  const appstate = getApplicationState();
  const index = appstate.findIndex((app) => app.id === id);
  if (index !== -1) {
    appstate.splice(index, 1);
  }
};
