import { showListApplication } from "./UI-controller/applicationList.js";
import { initializeFormActions } from "./UI-controller/applicationForm.js";
import {
  changePage,
  getCurrentPages,
  setCurrentPages,
} from "./service/applications.js";
function main() {
  showListApplication();
  initializeFormActions();
  const btnNext = document.getElementById("next-slider");
  const btnPrev = document.getElementById("prev-slider");

  btnNext.addEventListener("click", () => {
    const currentPage = getCurrentPages();
    const nextPage = changePage("increment", currentPage);
    setCurrentPages(nextPage);
    showListApplication();
  });

  btnPrev.addEventListener("click", () => {
    const currentPage = getCurrentPages();
    const prevPage = changePage("decrement", currentPage);
    setCurrentPages(prevPage);
    showListApplication();
  });
}
main();
