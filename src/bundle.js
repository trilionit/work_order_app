const {
  toggleWorkOrderForm,
  processFilterAndSortOrder,
} = require("./events/general");
const { processAddWorkOrderForm } = require("./forms/work_order");
const { getWorkOrder } = require("./events/get_work_order");

const setDueDateButton = document.getElementById("set-due-date-button");
const addWorkOrderForm = document.getElementById("add-work-order-form");
const filterLists = document.querySelectorAll(".filter-sort-lists");

if (typeof setDueDateButton !== "undefined" && setDueDateButton !== null) {
  setDueDateButton.addEventListener("click", toggleWorkOrderForm);
}

if (typeof addWorkOrderForm !== "undefined" && addWorkOrderForm !== null) {
  addWorkOrderForm.addEventListener("submit", processAddWorkOrderForm);
}

if (typeof filterLists !== "undefined" && filterLists !== null) {
  filterLists.forEach((list) => {
    list.addEventListener("change", processFilterAndSortOrder);
  });
}

document.addEventListener("DOMContentLoaded", getWorkOrder);
// Datetime picker
new tempusDominus.TempusDominus(document.getElementById("datetime"));
