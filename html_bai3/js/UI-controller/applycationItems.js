import { allApplycations } from "../data/applycation.js";
import { initializeFormActions } from "./addItems.js";
import { deleteApply ,getItemsApplycation } from "../service/crud.js";
const btnNext = document.getElementById("next-slider");
const btnPrev = document.getElementById("prev-slider");
const cart = document.getElementById("list-items-apply");
const cartItems = getItemsApplycation();
let perPage = 10;
let current = 1;
let start = 0;
let end = perPage;
 export let mang = allApplycations ;
console.log(mang);
export function showUI(applys) {
  cart.innerHTML = "";
  applys?.forEach((apply , index) => {
    if (index >= start && index < end) {
      cart.innerHTML += `
        <div class="items-apply" >
        <button class="btn-del" apply_id = "${apply.id}"  >-</button>
        <img src="${apply.image}" alt="">
        <span>${apply.name}</span>
    </div>
        `;
    }
  });
  initializeFormActions();

  initializeDeleteButtonsEvent(document.querySelectorAll(".btn-del"));
  
}
showUI(mang);
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

 const overlay = document.querySelector(".overlay");
 const boxItems = document.querySelector(".form-add-ungdung");
const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", () => {
  var nameInput = document.getElementById("name_icon");
  var nameError = document.getElementById("name_error");
   
      if(!nameInput.value){
        nameError.style.display="block";
        boxItems.style.display = "block";
      }
      else {
        nameError.style.display = "none"; 
        boxItems.style.display = "none";
        overlay.style.display = "none";
    }
     
  const name = nameInput.value;
  const itemsApplycation = document.querySelector(".iems-applycation");

  const newItemHTML = `
    <div class="items-apply">
        <button class="btn-del">-</button>
        <img src="./img/gg.png" alt="">
        <span>${name}</span>
    </div>
`;
    console.log(name);
  itemsApplycation.innerHTML += newItemHTML;

  nameInput.value = "";
 
});


