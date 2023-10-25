import { fetchApplicationsss, fetchPages } from "../service/applications.js";
import { showListApplication } from "../UI-controller/applicationList.js";
import { updateQueryParam } from "../service/applications.js";
export const  state = {
  pageState: [],
  applicationState: []
}
export async function initializeState() {
  try {
    const pagesData = await fetchPages();
    const applicationsData = await fetchApplicationsss();

    state.pageState = pagesData.map((page) => ({
      ...page,
      deleted: false // Đặt thuộc tính deleted mặc định là false
    }));

    state.applicationState = applicationsData;

    if (state.pageState.length > 0) {
      const firstPageId = state.pageState[0].id;
      updateQueryParam(firstPageId);
    }
    showListApplication();
  } catch (error) {
    console.error("Lỗi khi khởi tạo trạng thái:", error);
  }
}