import { API_URL } from "../constans/apiUrl.js";
import { state } from "../global/state.js";
import { updateCurrentPage } from "../service/page.js";

//CREAT
export async function addNewPage() {
  try {
    const response = await fetch(`${API_URL}/pages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (response.status === 201) {
      const createdPageData = await response.json();
      if (!("name" in createdPageData)) {
        createdPageData.name = createdPageData.id.toString();
      }

      state.pageState.push(createdPageData);
      updateCurrentPage(createdPageData.id);
      console.log(createdPageData, "trang vua them moi");
      return createdPageData;
    }
  } catch (error) {
    console.error("Lỗi khi gửi POST request:", error);
    return null;
  }
}

//DELETE
export async function delPage(pageId) {
  await fetch(`${API_URL}/pages/${pageId}`, {
    method: "DELETE",
  });
  return pageId;
}

//GET
export async function fetchPages() {
  try {
    const response = await fetch(`${API_URL}/pages`, {
      method: "GET",
    });
    if (response.status === 200) {
      const pagesData = await response.json();

      return pagesData;
    }
  } catch (error) {
    console.error("Lỗi khi gửi GET request cho Pages:", error);
  }
}
