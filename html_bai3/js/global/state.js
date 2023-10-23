import { fetchApplicationsss, fetchPages } from "../service/applications.js";
import { showListApplication } from "../UI-controller/applicationList.js";
// export let applicationState = [];
export const  state = {
  pageState: [],
  applicationState: []
}
export async function initializeState() {
  try {
    const pagesData = await fetchPages();
    const applicationsData = await fetchApplicationsss();

    state.pageState = pagesData;
    state.applicationState = applicationsData;
    showListApplication();
    
  } catch (error) {
    console.error('Lỗi khi khởi tạo trạng thái:', error);
  }
}