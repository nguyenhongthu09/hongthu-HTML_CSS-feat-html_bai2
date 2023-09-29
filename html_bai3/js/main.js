import {
  showListApplication,
  setPageButtonEvent,
} from "./UI-controller/applicationList.js";
import { initializeFormActions } from "./UI-controller/applicationForm.js";

function main() {
  showListApplication();
  initializeFormActions();
  setPageButtonEvent();
}

main();
