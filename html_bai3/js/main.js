import {
  showListApplication,
  setPageButtonEvent,
} from "./UI-controller/applicationList.js";
import { initializeFormActions } from "./UI-controller/applicationForm.js";
import { initializeState } from "./service/applications.js";
import { handlePageButtonClick } from "./UI-controller/page.js";
async function main() {
await  initializeState();
  showListApplication();
  handlePageButtonClick();
  initializeFormActions();
  setPageButtonEvent();
  
}

main();
