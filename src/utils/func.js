"use strict";
export const PostFormApi = (url, data) => {
  let req = $.ajax({
    type: "POST",
    url: url,
    data: data,
    dataType: "JSON",
  });
  return req;
};

export const getURLParams = (parameter) => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  return params.get(parameter);
};

const isEmail = (email) => {
  var regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email.value.trim()).toLowerCase());
};

export const showAlert = (input) => {
  let name = input.getAttribute("name");
  let invalidField = document.getElementById(`invalid-${name}`);
  invalidField.setAttribute("style", "display: block");
  input.setAttribute("style", "border: 1px solid #dc3545");
};

export const hideAlert = (input) => {
  let name = input.getAttribute("name");
  let invalidField = document.getElementById(`invalid-${name}`);
  invalidField.removeAttribute("style");
  input.removeAttribute("style");
};

export const validateInputField = (input) => {
  if (
    input.getAttribute("type") == "email" ||
    input.getAttribute("name") == "email"
  ) {
    if (!isEmail(input)) {
      showAlert(input);
      return 1;
    } else {
      hideAlert(input);
      return 0;
    }
  } else {
    if (input.value.length == 0) {
      showAlert(input);
      return 1;
    } else {
      hideAlert(input);
      return 0;
    }
  }
};

export const validateSelectField = (option) => {
  let value = option.options[option.selectedIndex].value;
  if (value === 0) {
    showAlert(option);
    return 1;
  } else {
    hideAlert(option);
    return 0;
  }
};

export const showListAlert = (input) => {
  console.log(speakerArray);
  let errorContainer = document.querySelectorAll(".queryLabel");
  showAlert(input);
  errorContainer.forEach((div) => {
    div.setAttribute("style", "background-color: #e8a001");
  });
  return 1;
};
