import { allApplycations } from "../data/applycation.js";
import { initializeFormActions } from "./showApplycation.js";
import {
  deleteApply,
  getItemsApplycation,
  addApplycation,
} from "../service/applycations.js";
import { uploadfileimg, uploadedImageEdit } from "./showApplycation.js";
import { editSubmit } from "../service/applycations.js";
import { closeTag , openTag , closeTagAddApply , openTagAddApply } from "./showApplycation.js";
const btnNext = document.getElementById("next-slider");
const btnPrev = document.getElementById("prev-slider");
const cart = document.getElementById("list-items-apply");
const cartItems = getItemsApplycation();
let perPage = 5;
let current = 1;
let start = 0;
let end = perPage;
let currentPage = 0;
let itemsPerPage = 5;
const applysByPage = [[]];
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
  }

  showUI(mang);
});
btnPrev.addEventListener("click", () => {
  if (current > 1) {
    // Chỉ giảm current nếu không ở trang đầu tiên
    current--;
    start = (current - 1) * perPage;
    end = current * perPage;
    showUI(mang);
  }
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


const btnSubmit = document.getElementById("btnSubmit");

// btnSubmit.addEventListener("click", () => {
//   var nameInput = document.getElementById("name_icon");
 
//   const uploadedImage = document.getElementById("uploadedImage");
//   if (!nameInput.value) {
//    openTagAddApply();
//   } else {
//    closeTagAddApply();
//   }

//   const name = nameInput.value;
//   const hinh = uploadedImage.src;

//   if (nameInput.value !== "") {
//     addApplycation({
//       id: allApplycations[allApplycations.length - 1].id + 1,
//       name: name,
//       image: hinh,
//     });
//   }

 
//   showUI(mang);
//   nameInput.value = "";
//   nameInput.form.reset();
//   uploadedImage.src = "";
//   uploadedImage.style.display = "none";
// });

function addItemToCurrentPage(item) {
  // const currentPageItems = applysByPage[currentPage];
  const startIndex = currentPage * itemsPerPage;
  console.log(startIndex);
  const endIndex = startIndex + itemsPerPage;
  console.log(endIndex);
  // Kiểm tra xem trang hiện tại đã đầy chưa
  if (endIndex < allApplycations.length) {
    // Nếu trang hiện tại chưa đầy, thêm mục vào sau mục cuối cùng
    allApplycations.splice(endIndex, startIndex - 2, item);
    // const thu = allApplycations.concat(applysByPage);
    console.log(allApplycations);
  } else {
    // Nếu trang hiện tại đã đầy hoặc là trang cuối cùng, thêm mục vào cuối mảng
    allApplycations.push(item);
  }
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
    const newApply = {
      id: allApplycations[applysByPage.length - 1].id  ,
      name: name,
      image: hinh,
    };

    addItemToCurrentPage( newApply);
  
    showUI(allApplycations);
  
  }
  nameInput.value = "";
  nameInput.form.reset();
  uploadedImage.src = "";
  uploadedImage.style.display = "none";
});





function edit() {
  let selectedApply = null;
  
  const itemsApplyElements = document.querySelectorAll(".items-apply");
  const editedNameIconInput = document.getElementById("edited_name_icon");
  const editedUploadedImage = document.getElementById("edited_uploadedImage");

  itemsApplyElements.forEach((element, index) => {
    element?.addEventListener("click", () => {
      allApplycations.forEach((itemss)  =>{
            if(itemss.id === parseInt( element.getAttribute("edit"))){
              selectedApply = {
                id: itemss.id, 
                name: element.querySelector("span").textContent,
                image: element.querySelector("img").src,
                // index: index,
              };
              console.log(selectedApply);
            }
      });
     
        // console.log(selectedApply);
      editedNameIconInput.value = selectedApply.name;
      editedUploadedImage.src= selectedApply.image;
      openTag();
    });
  });
  

  const btnEditSubmit = document.getElementById("btnEditSubmit");
 
  btnEditSubmit.addEventListener("click", () => {
    if (selectedApply) {
      const newname = editedNameIconInput.value;
      const newimg = editedUploadedImage.src;
      editSubmit(selectedApply, allApplycations,newname, newimg);

      const selectedElement = itemsApplyElements[selectedApply.id];
      selectedElement.querySelector("span").textContent = newname;
      selectedElement.querySelector("img").src = newimg;

      showUI(allApplycations);
      editedNameIconInput.value = ""; 
      editedUploadedImage.src = "#";
      selectedApply = null;
        closeTag();
    }
  
  });

  const btnEditCancel = document.getElementById("btnEditCancel");
  btnEditCancel.addEventListener("click", () => {
    closeTag();
  });
}
edit();
