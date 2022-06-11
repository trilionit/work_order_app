const { renderWorkOrder } = require("../renders/render_work_order");
export let workOrderData = [];
export let statusEnums = Object.freeze({
  ADDDATE: true,
  ALL: true,
  DATE: true,
  DUEDATE: true,
  ACTIVE: "active",
  COMPLETE: "complete",
  INACTIVE: "inactive",
});

export const toggleWorkOrderForm = (e) => {
  e.preventDefault();
  const targetID = e.target.getAttribute("data-id");
  const showComponent = document.getElementById(`${targetID}`);
  const datePicker = document.getElementById("datepicker");
  const validate_class = "validate-input";

  showComponent.style.display =
    showComponent.style.display === "block" ? "none" : "block";

  if (showComponent.style.display === "block") {
    datePicker.classList.add(validate_class);
  } else {
    datePicker.classList.remove(validate_class);
    datePicker.value = "";
  }
};

export const processWorkOrder = (props) => {
  workOrderData = props;
  renderWorkOrder(workOrderData);
};

export const processFilterAndSortOrder = (e) => {
  let targetID = e.target.getAttribute("data-id");
  let targetValue = e.target.value;
  let targetSort = e.target.getAttribute("data-sort");
  if (targetID === "filter-lists") {
    let filteredList = filterOrder(targetValue);
    console.log(filteredList);
  }
  if (targetID === "sort-lists") {
    let filteredList = sortOrder(targetSort, targetValue);
    console.log(filteredList);
  }
};

const filterOrder = (targetValue) => {
  if (targetValue === "ALL") {
    return workOrderData;
  }
  if (targetValue === "DATE") {
    return workOrderData.filter((list) => list.end_date.length !== 0);
  }
  return workOrderData.filter(
    (list) => list.status === statusEnums[targetValue]
  );
};

const sortOrder = (targetSort, targetValue) => {
  switch (targetSort) {
    case "ascending":
      return workOrderData.sort((a, b) => {
        console.log(new Date(a[targetValue]));
        new Date(a[targetValue]) - new Date(b[workOrderData]);
      });
    case "descending":
      return workOrderData.sort((a, b) => {
        console.log(new Date(b[targetValue]));
        new Date(b[targetValue]) - new Date(a[workOrderData]);
      });
  }
};
