import { allApplications } from "../data/application.js";
import { showListApplication } from "../UI-controller/applicationList.js";
let itemsApplyInCart = [];
let currentId = calculateCurrentId();
let currentPages = 0;

export function getCurrentPages() {
  return currentPages;
}
export function setCurrentPages(newPage) {
  currentPages = newPage;
}
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
export function addApplycation(apply, currentPages) {
  currentId++;
  apply.id = currentId;
  allApplications[currentPages].push(apply);

  showListApplication();
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

export function changePage(action, currentPages) {
  const maxPage = allApplications.length - 1;
  if (action === "increment") {
    if (currentPages < maxPage) {
      return currentPages + 1;
    }
  } else if (action === "decrement") {
    if (currentPages > 0) {
      return currentPages - 1;
    }
  }

  return currentPages;
}
