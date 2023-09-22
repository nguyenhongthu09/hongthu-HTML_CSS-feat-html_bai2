import { allApplycations } from "../data/applycation.js";
import { mang } from "../UI-controller/applycationItems.js";
export let itemsApplyInCart = [];

export function getItemsApplycation() {
  return itemsApplyInCart;
}

export function addApplycation(data) {
  allApplycations.push(data);
}
let applyToDelete = null;
export function deleteApply(applyId) {
  //   let icondel = [];
  //   icondel.push(applyId);
  //   itemsApplyInCart = mang.filter((apply) => !icondel.includes(apply.id));
  //   return itemsApplyInCart;

  for (let i = 0; i < mang.length; i++) {
    if (mang[i].id === applyId) {
      applyToDelete = mang[i];
      break; // Thoát khỏi vòng lặp sau khi tìm thấy phần tử
    }
  }

  // Nếu phần tử cần xóa đã được đánh dấu, loại bỏ nó khỏi mảng
  if (applyToDelete) {
    const index = mang.indexOf(applyToDelete);
    if (index !== -1) {
      mang.splice(index, 1);
    }
  }

  return mang;

 
}
