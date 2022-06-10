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
  console.log(props.length);
  if (props.length > 0) {
    let mappedProps = props
      .map((tasks) => {
        let div = `
        <li key="${tasks.id}" class="list-group-item border-0 bg-transparent">
        <div class="row">
          <div class="col list">
            <div class="form-check">
              <input 
                class="form-check-input form-check-box" 
                type="checkbox" 
                id=""
                aria-label="..." />
                <span class="text-darker">
                  ${tasks.task}
                </span> 
            </div>
          </div>
          <div class="col text-end edit-list">
            <div class="row">
              <div class="col-12">
                <a href="#!" 
                  class="text-info" 
                  data-mdb-toggle="tooltip" 
                  title="Edit todo"
                  >
                  <i class="fas fa-pencil-alt me-3"></i>
                </a>
                <a href="#!" 
                  class="text-danger" 
                  data-mdb-toggle="tooltip" 
                  title="Delete todo">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </div>
              <div class="col-12">
                <a href="#!" class="text-muted" data-mdb-toggle="tooltip" title="Created date">
                  <p class="small mb-0">
                  <i class="fas fa-info-circle me-2"></i>
                  ${tasks.created_at}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>
      `;
        return div;
      })
      .join("");
    let taskContainer = document.getElementById("list-tasks");
    taskContainer.innerHTML = "";
    taskContainer.innerHTML = mappedProps;
  } else {
    console.log("nothing to load");
  }
};
