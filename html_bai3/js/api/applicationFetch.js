import { API_URL } from "../constans/apiUrl.js";
import { state } from "../global/state.js";
import { calculateCurrentId } from "../service/applications.js";

//DELETE
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

//CREAT
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

//UPDATE
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

//GET
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
