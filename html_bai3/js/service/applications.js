import { API_URL } from "../data/api.js";
import { pageState, applicationState } from "../global/state.js";
import { showListApplication } from "../UI-controller/applicationList.js";

export function deleteApply(applyId) {
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
    .then((updatedData) => {
      const appIndex = applicationState.findIndex((app) => app.id === id);
      if (appIndex !== -1) {
        applicationState[appIndex].name = updateData.name;
        applicationState[appIndex].image = updateData.image;
        applicationState[appIndex].pageIndex = pageIndex;

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
  showListApplication();
}

//CHANGE PAGE

export let currentPagee = getCurrentPageFromQueryParams();

// export async function changePage(action) {
//   const maxPage = (await fetchPages()).length;
//   if (action === "increment") {
//     if (currentPagee < maxPage) {
//       currentPagee++;
//     }
//   } else if (action === "decrement") {
//     if (currentPagee > 1) {
//       currentPagee--;
//     }
//   }

//   updateQueryParam(currentPagee);
// }

export async function changePage(action) {
  const maxPage = (await fetchPages()).length;
  let newPage = getCurrentPageFromQueryParams(); // Lấy trang hiện tại từ URL

  if (action === "increment") {
    if (newPage < maxPage) {
      newPage++;
    }
  } else if (action === "decrement") {
    if (newPage > 1) {
      newPage--;
    }
  }

  updateQueryParam(newPage); // Cập nhật tham số trên URL
  currentPagee = newPage; // Cập nhật biến currentPagee

  // Thực hiện các hành động cập nhật giao diện tại đây (nếu cần)
}


export function updateQueryParam(page) {
  const url = new URL(window.location.href);
  url.searchParams.set("pages", page);
  window.history.replaceState({}, "", url);
}

export function getCurrentPageFromQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentPagee = urlParams.get("pages");
  console.log(currentPagee, "currentpage");
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
  await fetch(`${API_URL}/pages/${pageId}`, {
    method: "DELETE",
  });
  return pageId;
}
// export async function delPage(pageId) {
//   const confirmed = confirm(`Bạn có chắc chắn muốn xóa trang "${pageId}" không?`);

//   if (confirmed) {
//     try {
//       const currentpage = pageState.find((page) => page.id === pageId)
//       const response = await fetch(`${API_URL}/pages/${pageId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({...currentpage,isDelete: true}),
//       });

//       if (response.ok) {
//         // Yêu cầu xóa thành công, cập nhật lại trạng thái
//         pageState = pageState.filter((page) => page.id !== pageId);
//         if (pageState.length > 0) {
//           const currentPageIndex = pageState.findIndex((page) => page.id === pageId);
//           if (currentPageIndex === 0) {
//             // Nếu trang đầu tiên được xóa, chọn trang thứ hai trong mảng
//             return pageState[1].id;
//           } else {
//             // Nếu không phải trang đầu tiên, chọn trang trước đó trong mảng
//             return pageState[currentPageIndex - 1].id;
//           }
//         } else {
//           // Nếu không còn trang nào, chuyển về trang mặc định (trang đầu tiên)
//           return 1;
//         }
//       } else {
//         console.error("Lỗi khi xóa trang. Không thể xóa.");
        
//         return ;
//       }
//     } catch (error) {
//       console.error("Lỗi khi xóa trang:", error);
//       return ;
//     }
//   } else {
//     return ; // Trả về false nếu người dùng hủy xóa
//   }
// }

// export async function delPage(pageId) {
//   const confirmed = confirm(`Bạn có chắc chắn muốn xóa trang "${pageId}" không?`);

//   if (confirmed) {
//     try {
//       // Tìm trang cần xóa trong danh sách
//       const currentPageIndex = pageState.findIndex((page) => page.id === pageId);
//       if (currentPageIndex === -1) {
//         console.error("Không tìm thấy trang để xóa.");
//         return;
//       }

//       // Cập nhật trạng thái xóa trang và gửi lên server
//       pageState[currentPageIndex].isDelete = true;
//       const response = await fetch(`${API_URL}/pages/${pageId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(pageState[currentPageIndex]),
//       });

//       if (response.ok) {
//         // Yêu cầu xóa thành công, loại bỏ trang khỏi danh sách
//         pageState = pageState.filter((page) => page.id !== pageId);
        
//         if (pageState.length > 0) {
//           // Nếu vẫn còn trang, chọn trang tiếp theo hoặc trang trước đó trong danh sách
//           const nextPageIndex = Math.min(currentPageIndex, pageState.length - 1);
//           return pageState[nextPageIndex].id;
//         } else {
//           // Nếu không còn trang nào, chuyển về trang mặc định (trang đầu tiên)
//           return 1;
//         }
//       } else {
//         console.error("Lỗi khi xóa trang. Không thể xóa.");
//         return;
//       }
//     } catch (error) {
//       console.error("Lỗi khi xóa trang:", error);
//       return;
//     }
//   } else {
//     return; // Trả về false nếu người dùng hủy xóa
//   }
// }


export async function fetchPages() {
  try {
    const response = await fetch(`${API_URL}/pages`, {
      method: "GET",
    });
    if (response.status === 200) {
      const pagesData = await response.json();
      const a = pagesData.filter(page => page.isDelete === false);
      // return pagesData.filter(page => page.isDelete === false);
      console.log("getpage", a);
      return a
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
          const b = applicationsData.filter(application => application.isDelete === false);
          console.log("getapplication",b);
          return b;
      // return applicationsData.filter(application => application.isDelete === false);
    }
  } catch (error) {
    console.error("Lỗi khi gửi GET request cho Applications:", error);
  }
}
