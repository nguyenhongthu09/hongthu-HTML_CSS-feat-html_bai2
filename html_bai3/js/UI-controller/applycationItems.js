import { allApplycations } from "../data/applycation.js";
import { initializeFormActions } from "./showApplycation.js";
import { deleteApply, getItemsApplycation } from "../service/applycations.js";
import { uploadfileimg, uploadedImageEdit } from "./showApplycation.js";
// import { editSubmit } from "../service/applycations.js";
import {
  closeTag,
  closeTagAddApply,
  openTagAddApply,
} from "./showApplycation.js";
const btnNext = document.getElementById("next-slider");
const btnPrev = document.getElementById("prev-slider");
const cart = document.getElementById("list-items-apply");
const cartItems = getItemsApplycation();
let perPage = 5;
let current = 1;
let start = 0;
let end = perPage;
let currentPage = 0;

// const itemsPerPage = 5; 
const allPages = []; 
for (let i = 0; i < allApplycations.length; i += perPage) {
  const page = allApplycations.slice(i, i + perPage);
  const pageObject = {
    index: allPages.length, 
    items: page,
  };

  allPages.push(pageObject);


}
console.log(allPages);


export let mang = allApplycations;
export function showUI(applys) {

  cart.innerHTML = "";
  applys?.forEach((apply, index) => {
    if (index >= start && index < end) {
      cart.innerHTML += `
        <div class="items-apply" edit = "${apply.id}">
        <button class="btn-del" apply_id = "${apply.id}"  >-</button>
        <img  src="${apply.image}" alt="">
        <span>${apply.name}</span>
    </div>
        `;
        
    }
    
  });

  initializeFormActions();
  uploadfileimg();
  uploadedImageEdit();
  initializeDeleteButtonsEvent(document.querySelectorAll(".btn-del"));
  edit();
}
showUI();

btnNext.addEventListener("click", () => {
  if (end < allApplycations.length) {
    // Chỉ tăng current nếu chưa đến trang cuối cùng
    current++;
    start = (current - 1) * perPage;
    end = current * perPage;
    currentPage++;
  }

  showUI(mang);
 
});
btnPrev.addEventListener("click", () => {
  if (current > 1) {
    // Chỉ giảm current nếu không ở trang đầu tiên
    current--;
    start = (current - 1) * perPage;
    end = current * perPage;
  currentPage--;
   
  }
  showUI(mang);
});

function addApplycation(apply) {
  allApplycations.push(apply);
  const currentPageIndex = currentPage;
  if (currentPageIndex < allPages.length) {
   
     allPages[currentPageIndex].items.push(apply);
        
            
  }  else {
    // currentPageIndex++;
    const newPage = { index: currentPageIndex, items: [apply] };
    allPages.push(newPage);
  }

  showUI(allPages[currentPageIndex].items);
}


btnSubmit.addEventListener("click", () => {
  var nameInput = document.getElementById("name_icon");

  const uploadedImage = document.getElementById("uploadedImage");
  if (!nameInput.value) {
    openTagAddApply();
  } else {
    closeTagAddApply();
  }

  const name = nameInput.value;
  const hinh = uploadedImage.src;

  if (nameInput.value !== "") {
    addApplycation({
      id: allApplycations[allApplycations.length - 1].id + 1,
      name: name,
      image: hinh,
    });
  }
 
  showUI(mang);
  nameInput.value = "";
  nameInput.form.reset();
  uploadedImage.src = "";
  uploadedImage.style.display = "none";
});
function handleDeleteButtonClick(delUngdung) {
  let applyId = parseInt(delUngdung.getAttribute("apply_id"));
  const xoa = deleteApply(applyId);
  // deleteApply(applyId);
  showUI(xoa);
}

function initializeDeleteButtonsEvent(deleteBtn) {
  deleteBtn.forEach((delUngdung) => {
    delUngdung.addEventListener("click", () => {
      handleDeleteButtonClick(delUngdung);
    });
  });
}

// function addItemToCurrentPage(item) {
//   // const currentPageItems = applysByPage[currentPage];
//   const startIndex = currentPage * itemsPerPage;
//   console.log(startIndex);
//   const endIndex = startIndex + itemsPerPage;
//   console.log(endIndex);
//   // Kiểm tra xem trang hiện tại đã đầy chưa
//   if (endIndex < allApplycations.length) {
//     // Nếu trang hiện tại chưa đầy, thêm mục vào sau mục cuối cùng
//     allApplycations.splice(endIndex, startIndex - 2, item);
//     // const thu = allApplycations.concat(applysByPage);
//     console.log(allApplycations);
//   } else {
//     // Nếu trang hiện tại đã đầy hoặc là trang cuối cùng, thêm mục vào cuối mảng
//     allApplycations.push(item);
//   }
// }

// btnSubmit.addEventListener("click", () => {
//   var nameInput = document.getElementById("name_icon");
//   const uploadedImage = document.getElementById("uploadedImage");

//   if (!nameInput.value) {
//     openTagAddApply();
//   } else {
//     closeTagAddApply();
//   }

//   const name = nameInput.value;
//   const hinh = uploadedImage.src;

//   if (nameInput.value !== "") {
//     const newApply = {
//       id: allApplycations[applysByPage.length - 1].id,
//       name: name,
//       image: hinh,
//     };

//     addItemToCurrentPage(newApply);

//     showUI(allApplycations);
//   }
//   nameInput.value = "";
//   nameInput.form.reset();
//   uploadedImage.src = "";
//   uploadedImage.style.display = "none";
// });
let newData = {
  id: "",
  name: "",
  element: "",
};
function edit() {
  const overlay = document.querySelector(".overlay");
  const boxItems = document.getElementById("boxItems");
  let itemsApplyElements = document.querySelectorAll(".items-apply");
  const editedNameIconInput = document.getElementById("edited_name_icon");
  const editedUploadedImage = document.getElementById("edited_uploadedImage");
  const edited_file = document.querySelector("#edited_file");

  itemsApplyElements.forEach((element, index) => {
    element?.addEventListener("click", () => {
      handleEditApp(element);
    });
  });

  const handleEditApp = (element) => {
    const idCurrentEdit = parseInt(element.getAttribute("edit"));
    allApplycations.forEach((data) => {
      if (data.id === idCurrentEdit) {
        editedUploadedImage.style.display = "block";
        editedNameIconInput.value = data.name;
        editedUploadedImage.src = data.image;
        boxItems.style.display = "block";
        overlay.style.display = "block";
        newData = {
          id: idCurrentEdit,
          name: data.name,
          image: data.image,
          element: element,
        };
      }
    });
    editedNameIconInput.addEventListener("change", (e) => {
      newData.name = e.target.value;
    });
    edited_file.addEventListener("change", (e) => {
      newData.image = URL.createObjectURL(e.target.file[0]);
    });
  };
}
const btnEditSubmit = document.getElementById("btnEditSubmit");

btnEditSubmit.addEventListener("click", () => {
  let element = newData.element;
  element.children[element.children.length - 1].innerText = newData.name;
  element.children[element.children.length - 2].src = newData.image;
  allApplycations.forEach((item) => {
    if (item.id === newData.id) {
      item.name = newData.name;
      item.image = newData.image;
    }
  });
  newData = {
    id: "",
    name: "",
    element: "",
  };
  closeTag();
});

const btnEditCancel = document.getElementById("btnEditCancel");
btnEditCancel.addEventListener("click", () => {
  closeTag();
});
