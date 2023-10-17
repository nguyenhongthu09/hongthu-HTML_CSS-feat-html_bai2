import {
  showListApplication,
  setPageButtonEvent,handlePageButtonClick,
} from "./UI-controller/applicationList.js";
import { initializeFormActions } from "./UI-controller/applicationForm.js";
import { initializeState } from "./global/state.js";

function main() {
  initializeState();
  showListApplication();
  handlePageButtonClick();
  initializeFormActions();
  setPageButtonEvent();
  
}

main();
