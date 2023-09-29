import { showListApplication } from "./UI-controller/applicationList.js";
import { initializeFormActions } from "./UI-controller/applicationForm.js";
import { changePage } from "./service/applcations.js";
export let getCurrentPages = 0;
function main() {
  showListApplication();
  initializeFormActions();
  const btnNext = document.getElementById("next-slider");
  const btnPrev = document.getElementById("prev-slider");

btnNext.addEventListener("click", () => {
  getCurrentPages = changePage("increment", getCurrentPages);
  showListApplication();
});

btnPrev.addEventListener("click", () => {
  getCurrentPages = changePage("decrement", getCurrentPages);
  showListApplication();
});
}
main();
