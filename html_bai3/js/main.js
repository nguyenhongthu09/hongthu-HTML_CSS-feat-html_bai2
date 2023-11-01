import {
  showListApplication,
  setPageButtonEvent,
} from "./UI-controller/applicationList.js";
import { initializeFormActions } from "./UI-controller/applicationForm.js";
import { initializeState } from "./service/applications.js";
import { handlePageButtonClick } from "./UI-controller/page.js";
import { loading } from "./UI-controller/common.js";

async function main() {
  loading([['loader__page', 'spin']], { status: true });
  await initializeState();
  loading([['loader__page', 'spin']], { status: false });
  showListApplication();
  handlePageButtonClick();
  initializeFormActions();
  setPageButtonEvent();
}
main();
