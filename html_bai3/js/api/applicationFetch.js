import { API_URL } from "../constans/apiUrl.js";
import {
  calculateCurrentId,
  findApplicationByIndex,
  getApplicationState,
} from "../service/applications.js";

//DELETE
export function deleteApply(applyId) {
  fetch(`${API_URL}/applications/${applyId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        const appIndex = findApplicationByIndex(applyId);
        const applicationState = getApplicationState();
        if (appIndex !== -1) {
          applicationState.splice(appIndex, 1);
        }
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
    const applicationState = getApplicationState();
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
      const applicationState = getApplicationState();
      const appIndex = findApplicationByIndex(id);
      if (appIndex !== -1) {
        applicationState[appIndex].name = newName;
        applicationState[appIndex].image = newImage;
        applicationState[appIndex].pageIndex = pageIndex;
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
