
import { API_URL } from "../data/api.js";
import { pageState, applicationState } from "../global/state.js";
import { showListApplication } from "../UI-controller/applicationList.js";


export  function deleteApply(applyId) {
    fetch(`${API_URL}/applications/${applyId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
      
        showListApplication();
      } else {
        
        console.error("Xóa ứng dụng không thành công.");
      }
    })
    .catch((error) => {
      console.error("Lỗi kết nối đến API: " + error);
    });
}




function calculateCurrentId() {
  let maxId = 0;
  for (const apply of applicationState) {
    if (apply.id > maxId) {
      maxId = apply.id;
    }
  }
  return maxId;
}

export async function addApplicationToCustomPage(application, pageIndex) {
  try {
    const newApplication = {
      id: calculateCurrentId() + 1,
      name: application.name,
      image: application.image,
      pageIndex: pageIndex,
    };

    applicationState.push(newApplication);

    const response = await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newApplication),
    });

    if (response.status === 201) {
      const createdApplicationData = await response.json();
      console.log("Thêm ứng dụng thành công:", createdApplicationData);
    } else {
      console.error("Lỗi khi thêm ứng dụng:", response.statusText);
    }
  } catch (error) {
    console.error("Lỗi khi gửi POST request:", error);
  }
}

/// UPDATE


export function updateData(id, newName, newImage, pageIndex) {
  fetch(`${API_URL}/applications/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName, image: newImage, pageIndex}),
  })
    .then((response) => {
      if (response.ok) {
        // Cập nhật trạng thái cục bộ của ứng dụng với dữ liệu mới từ API
        return response.json();
      } else {
        console.error("Cập nhật ứng dụng không thành công.");
        throw new Error("Cập nhật không thành công");
      }
    })
    .then((updatedData) => {
      // Cập nhật trạng thái cục bộ của ứng dụng với dữ liệu mới từ API
      const appIndex = applicationState.findIndex((app) => app.id === id);
      if (appIndex !== -1) {

        applicationState[appIndex].name = updateData.name;
        applicationState[appIndex].image = updateData.image;
        applicationState[appIndex].pageIndex = pageIndex;
        // Cập nhật giao diện
        showListApplication();
      }
    })
    .catch((error) => {
      console.error("Lỗi kết nối đến API: " + error);
    });
}







export function updateCurrentPage(newPage) {
  currentPagee = newPage;
  updateQueryParam(currentPagee);
}

//CHANGE PAGE

export let currentPagee = getCurrentPageFromQueryParams();

export async function changePage(action) {
  const maxPage = (await fetchPages()).length;
  if (action === "increment") {
    if (currentPagee < maxPage) {
      currentPagee++;
    }
  } else if (action === "decrement") {
    if (currentPagee > 1) {
      currentPagee--;
    }
  }

  updateQueryParam(currentPagee);
}

export function updateQueryParam(page) {
  const url = new URL(window.location.href);
  url.searchParams.set("pages", page);
  window.history.replaceState({}, "", url);
}
export function getCurrentPageFromQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentPagee = urlParams.get("pages");
  return parseInt(currentPagee, 10) || 1;
}

//ADD PAGE

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

      if ("name" in createdPageData) {
        createdPageData.name = createdPageData.name;
      } else {
        createdPageData.name = createdPageData.id.toString();
      }

      pageState.push(createdPageData);
      updateCurrentPage(createdPageData.id);
      return createdPageData;
    }
  } catch (error) {
    console.error("Lỗi khi gửi POST request:", error);
    return null;
  }
}

export async function delPage(pageId) {
  try {
    const response = await fetch(`${API_URL}/pages/${pageId}`, {
      method: "DELETE",
    });
    if (response.status === 204) {
      // Xóa trang thành công từ API
      const deletedPageIndex = pageState.findIndex((page) => page.id === pageId);
      if (deletedPageIndex !== -1) {
        pageState.splice(deletedPageIndex, 1);
      }

      // Cập nhật giao diện
      showListApplication();

      return true;
    }
  } catch (error) {
    console.error("Lỗi khi gửi DELETE request:", error);
  }
  return false;
}

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

export async function fetchApplicationsss() {
  try {
    const response = await fetch(`${API_URL}/applications`, {
      method: "GET",
    });
    if (response.status === 200) {
      const applicationsData = await response.json();

      return applicationsData;
    }
  } catch (error) {
    console.error("Lỗi khi gửi GET request cho Applications:", error);
  }
}
