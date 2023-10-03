import {
  showListApplication,
  setPageButtonEvent,handlePageButtonClick,loadedWeb,
} from "./UI-controller/applicationList.js";
import { initializeFormActions } from "./UI-controller/applicationForm.js";

function main() {
  showListApplication();
  loadedWeb();
  handlePageButtonClick();
  initializeFormActions();
  setPageButtonEvent();
  
}

main();
