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
