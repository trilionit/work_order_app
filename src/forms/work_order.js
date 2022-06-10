const { validateInputField } = require("../utils/func");

export const processAddWorkOrderForm = (e) => {
  e.preventDefault();
  let validateFormInput = document.querySelectorAll(".validate-input");
  let formValues = document.querySelectorAll(".form-input");

  let validate = [];

  validateFormInput.forEach((input) => {
    validate.push(validateInputField(input));
  });

  if (validate.length == 0 || validate.indexOf(1) == -1) {
    grecaptcha
      .execute("6Ld4N_wZAAAAAMCe0GSJCMCGjkH1E8OEBA4kcg_N", {
        action: "add_new_work_order",
      })
      .then((token) => {
        let payload = {};
        formValues.forEach((input) => {
          let value = input.value;
          let name = input.getAttribute("name");
          payload[name] = value;
        });
        payload.token = token;
        console.log(payload);
        // TODO: Figure out async fetch post data isn't transferring payload to backend
        // $.ajax({
        //   type: "POST",
        //   url: "/api/schedule",
        //   data: payload,
        //   dataType: "JSON",
        // }).then((res) => {
        //   console.log(res);
        // });

        const request = new Request("/api/schedule", {
          method: "POST",
          body: payload,
        });
        fetch(request).then((res) => console.log(res));
      });
  }
};
