import { allApplications } from "../data/application.js";
import { showListApplication } from "../UI-controller/applicationList.js";
export let itemsApplyInCart = [];
export function getItemsApplycation() {
  return itemsApplyInCart;
}

//DELETE
export function deleteApply(applyId) {
  allApplications.forEach((data, i) => {
    data.forEach((item, index) => {
      if (item.id === applyId) {
        allApplications[i].splice(index, 1);
      }
    });
  });
}

//CREAT
let currentId = calculateCurrentId();

export function addApplycation(apply, getCurrentPages) {
  currentId++;
  apply.id = currentId;
  allApplications[getCurrentPages].push(apply);

  showListApplication();
}
function calculateCurrentId() {
  let maxId = 0;
  for (const page of allApplications) {
    for (const apply of page) {
      if (apply.id > maxId) {
        maxId = apply.id;
      }
    }
  }
  return maxId;
}
/// UPDATE

export function updateData(id, name, image) {
  allApplications.forEach((data) => {
    data.forEach((item) => {
      if (item.id === id) {
        item.name = name;
        item.image = image;
      }
    });
  });
}

//CHANGE PAGE
const maxPage = allApplications.length - 1;
export function changePage(action, getCurrentPages) {
  if (action === "increment") {
    if (getCurrentPages < maxPage) {
      return getCurrentPages + 1;
    }
  } else if (action === "decrement") {
    if (getCurrentPages > 0) {
      return getCurrentPages - 1;
    }
  }

  return getCurrentPages;
}
