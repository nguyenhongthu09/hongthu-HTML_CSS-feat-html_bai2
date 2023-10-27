import { fetchApplicationsss, fetchPages } from "../service/applications.js";
import { showListApplication } from "../UI-controller/applicationList.js";
import { updateQueryParam } from "../service/applications.js";
export const state = {
  pageState: [],
  applicationState: [],
};

function getPageIdURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const pageIdFromURL = urlParams.get("pages");

  if (pageIdFromURL) {
    return pageIdFromURL;
  } else if (state.pageState.length > 0) {
    return state.pageState[0].id;
  }
}
export async function initializeState() {
  try {
    const pagesData = await fetchPages();
    const applicationsData = await fetchApplicationsss();

    state.pageState = pagesData;
    state.applicationState = applicationsData;

    const pageIdURl = getPageIdURL();
    updateQueryParam(pageIdURl);
    showListApplication();
  } catch (error) {
    console.error("Lỗi khi khởi tạo trạng thái:", error);
  }
}
