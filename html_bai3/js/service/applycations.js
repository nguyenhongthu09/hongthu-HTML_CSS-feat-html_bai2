import { allApplycations } from "../data/applycation.js";
export let itemsApplyInCart = [];
export function getItemsApplycation() {
  return itemsApplyInCart;
}

//DELETE
export function deleteApply(applyId) {
  allApplycations.forEach((data, i) => {
    data.forEach((item, index) => {
      if (item.id === applyId) {
        allApplycations[i].splice(index, 1);
      }
    });
  });
}
