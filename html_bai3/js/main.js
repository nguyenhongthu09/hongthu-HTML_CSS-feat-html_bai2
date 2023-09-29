import { showListApplication } from "./UI-controller/applicationList.js";
import { initializeFormActions } from "./UI-controller/applicationForm.js";
import { changePage } from "./service/applications.js";
function main() {
  showListApplication();
  initializeFormActions();
  const btnNext = document.getElementById("next-slider");
  const btnPrev = document.getElementById("prev-slider");

  btnNext.addEventListener("click", () => {
    changePage("increment");
    showListApplication();
  });

  btnPrev.addEventListener("click", () => {
    changePage("decrement");
    showListApplication();
  });
}
main();
