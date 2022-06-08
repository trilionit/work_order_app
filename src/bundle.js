const setDueDateButton = document.getElementById("set-due-date-button");

if (typeof setDueDateButton !== "undefined" && setDueDateButton !== null) {
  setDueDateButton.addEventListener("click", (e) => {
    e.preventDefault();
    const targetID = e.target.getAttribute("data-id");
    const containerID = document.getElementById("new-component");
    let div = document.createElement("div");
    let classesToAdd = ["col"];
    div.classList.add(...classesToAdd);
    div.setAttribute("id", "datepicker");
    let datepickerCtn = document.createElement("input");
    datepickerCtn.classList;
    div.appendChild("In the beginning");
    containerID.appendChild(div);
    console.log(div);
  });
}
