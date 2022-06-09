const setDueDateButton = document.getElementById("set-due-date-button");

if (typeof setDueDateButton !== "undefined" && setDueDateButton !== null) {
  setDueDateButton.addEventListener("click", (e) => {
    e.preventDefault();
    const targetID = e.target.getAttribute("data-id");
    const showComponent = document.getElementById(`${targetID}`);
    const datePicker = document.getElementById("datepicker");
    const validate_class = "validate-input";

    showComponent.style.display =
      showComponent.style.display === "block" ? "none" : "block";

    showComponent.style.display === "block"
      ? datePicker.classList.add(validate_class)
      : datePicker.classList.remove(validate_class);
  });
}
// Datetime picker
new tempusDominus.TempusDominus(document.getElementById("datetime"));
