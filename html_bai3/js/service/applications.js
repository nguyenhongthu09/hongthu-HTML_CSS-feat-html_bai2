import { API_URL } from "../data/api.js";
import { state } from "../global/state.js";

export function deleteApply(applyId) {
  fetch(`${API_URL}/applications/${applyId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        const appIndex = state.applicationState.findIndex(
          (app) => app.id === applyId
        );
        if (appIndex !== -1) {
          state.applicationState.splice(appIndex, 1);
        }
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
  for (const apply of state.applicationState) {
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

    state.applicationState.push(newApplication);

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
  return fetch(`${API_URL}/applications/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName, image: newImage, pageIndex }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Cập nhật ứng dụng không thành công.");
        throw new Error("Cập nhật không thành công");
      }
    })
    .then(() => {
      const appIndex = state.applicationState.findIndex((app) => app.id === id);
      if (appIndex !== -1) {
        state.applicationState[appIndex].name = newName;
        state.applicationState[appIndex].image = newImage;
        state.applicationState[appIndex].pageIndex = pageIndex;
      }
    })
    .catch((error) => {
      console.error("Lỗi kết nối đến API: " + error);
    });
}


//CHANGE PAGE

export let currentPagee = getCurrentPageFromQueryParams();
// let currentpage = getCurrentPageFromQueryParams();
// export async function changePage() {
//   const maxPage = (await fetchPages()).length;
//   let current = getCurrentPageFromQueryParams();
//   if (current > maxPage) {
//     current = maxPage;
//   }
//   if (current < 1) {
//     current = 1;
//   }
//   currentpage = current;
// }

export function updateQueryParam(pageId) {
  const url = new URL(window.location.href);
  const pageExists = state.pageState.some(page => page.id === pageId );
  if(pageExists){
  url.searchParams.set("pages", pageId);
  window.history.replaceState({}, "", url);
  }
}

export function getCurrentPageFromQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentPagee = urlParams.get("pages");
  return currentPagee;
}

//ADD PAGE
export function updateCurrentPage(newPage) {
  currentPagee = newPage;
  console.log(currentPagee, "current khi add page");
  updateQueryParam(currentPagee);
}

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

export async function delPage(pageId) {
  await fetch(`${API_URL}/pages/${pageId}`, {
    method: "DELETE",
  });
  return pageId;
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
