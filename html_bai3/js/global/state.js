import { fetchApplicationsss, fetchPages } from "../service/applications.js";
import { showListApplication } from "../UI-controller/applicationList.js";
export let applicationState = [];
export let pageState = [];
export async function initializeState() {
  try {
    const pagesData = await fetchPages();
    const applicationsData = await fetchApplicationsss();

    pageState = pagesData;
    applicationState = applicationsData;
    showListApplication();
    
  } catch (error) {
    console.error('Lỗi khi khởi tạo trạng thái:', error);
  }
}