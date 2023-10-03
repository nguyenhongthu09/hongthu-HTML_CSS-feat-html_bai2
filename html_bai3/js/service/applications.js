import { allApplications } from "../data/application.js";
let currentId = calculateCurrentId();
export let currentPageIndex = 0;
export let currentPages = 0;

export function getCurrentPages() {
  return currentPages;
}
export function setCurrentPages(newPage) {
  currentPages = newPage;
}
export function getItemsApplycation() {
  return allApplications;
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
export let totalPages = allApplications.length;
export function changePage(action) {
  const maxPage = allApplications.length - 1;
  if (action === "increment") {
    if (currentPages < maxPage) {
      currentPages = currentPages + 1;
    } else if (currentPages === maxPage) {
      totalPages = totalPages + 1;
    }
  } else if (action === "decrement") {
    if (currentPages > 0) {
      currentPages = currentPages - 1;
    }
  }
}

//ADD PAGE

export function addNewPage() {
  const newPage = [];
  allApplications.push(newPage);
  currentPages = allApplications.length - 1;
}

export function delPage() {
  if (allApplications.length > 1) {
    allApplications.splice(currentPages, 1);
    if (currentPages === 0) {
      currentPages = 0;
    } else {
      currentPages--;
    }
  }
}
