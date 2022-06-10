/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/events/general.js":
/*!*******************************!*\
  !*** ./src/events/general.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "processWorkOrder": () => (/* binding */ processWorkOrder),
/* harmony export */   "toggleWorkOrderForm": () => (/* binding */ toggleWorkOrderForm)
/* harmony export */ });
var toggleWorkOrderForm = function toggleWorkOrderForm(e) {
  e.preventDefault();
  var targetID = e.target.getAttribute("data-id");
  var showComponent = document.getElementById("".concat(targetID));
  var datePicker = document.getElementById("datepicker");
  var validate_class = "validate-input";
  showComponent.style.display = showComponent.style.display === "block" ? "none" : "block";

  if (showComponent.style.display === "block") {
    datePicker.classList.add(validate_class);
  } else {
    datePicker.classList.remove(validate_class);
    datePicker.value = "";
  }
};
var processWorkOrder = function processWorkOrder(props) {
  console.log(props.length);

  if (props.length > 0) {
    var mappedProps = props.map(function (tasks) {
      var div = "\n        <li key=\"".concat(tasks.id, "\" class=\"list-group-item border-0 bg-transparent\">\n        <div class=\"row\">\n          <div class=\"col list\">\n            <div class=\"form-check\">\n              <input \n                class=\"form-check-input form-check-box\" \n                type=\"checkbox\" \n                id=\"\"\n                aria-label=\"...\" />\n                <span class=\"text-darker\">\n                  ").concat(tasks.task, "\n                </span> \n            </div>\n          </div>\n          <div class=\"col text-end edit-list\">\n            <div class=\"row\">\n              <div class=\"col-12\">\n                <a href=\"#!\" \n                  class=\"text-info\" \n                  data-mdb-toggle=\"tooltip\" \n                  title=\"Edit todo\"\n                  >\n                  <i class=\"fas fa-pencil-alt me-3\"></i>\n                </a>\n                <a href=\"#!\" \n                  class=\"text-danger\" \n                  data-mdb-toggle=\"tooltip\" \n                  title=\"Delete todo\">\n                  <i class=\"fas fa-trash-alt\"></i>\n                </a>\n              </div>\n              <div class=\"col-12\">\n                <a href=\"#!\" class=\"text-muted\" data-mdb-toggle=\"tooltip\" title=\"Created date\">\n                  <p class=\"small mb-0\">\n                  <i class=\"fas fa-info-circle me-2\"></i>\n                  ").concat(tasks.created_at, "\n                  </p>\n                </a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </li>\n      ");
      return div;
    }).join("");
    var taskContainer = document.getElementById("list-tasks");
    taskContainer.innerHTML = "";
    taskContainer.innerHTML = mappedProps;
  } else {
    console.log("nothing to load");
  }
};

/***/ }),

/***/ "./src/events/get_work_order.js":
/*!**************************************!*\
  !*** ./src/events/get_work_order.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWorkOrder": () => (/* binding */ getWorkOrder)
/* harmony export */ });
var _require = __webpack_require__(/*! ./general */ "./src/events/general.js"),
    processWorkOrder = _require.processWorkOrder;

var getWorkOrder = function getWorkOrder() {
  fetch("/api/get/schedule").then(function (response) {
    return response.json();
  }).then(function (res) {
    console.log(res.data);
    processWorkOrder(res.data);
  })["catch"](function () {
    return console.log("Error while downloading data");
  });
};

/***/ }),

/***/ "./src/forms/work_order.js":
/*!*********************************!*\
  !*** ./src/forms/work_order.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "processAddWorkOrderForm": () => (/* binding */ processAddWorkOrderForm)
/* harmony export */ });
var _require = __webpack_require__(/*! ../utils/func */ "./src/utils/func.js"),
    validateInputField = _require.validateInputField;

var processAddWorkOrderForm = function processAddWorkOrderForm(e) {
  e.preventDefault();
  var validateFormInput = document.querySelectorAll(".validate-input");
  var formValues = document.querySelectorAll(".form-input");
  var validate = [];
  validateFormInput.forEach(function (input) {
    validate.push(validateInputField(input));
  });

  if (validate.length == 0 || validate.indexOf(1) == -1) {
    grecaptcha.execute("6Ld4N_wZAAAAAMCe0GSJCMCGjkH1E8OEBA4kcg_N", {
      action: "add_new_work_order"
    }).then(function (token) {
      var payload = {};
      formValues.forEach(function (input) {
        var value = input.value;
        var name = input.getAttribute("name");
        payload[name] = value;
      });
      payload.token = token;
      console.log(payload); // TODO: Figure out async fetch post data isn't transferring payload to backend
      // $.ajax({
      //   type: "POST",
      //   url: "/api/schedule",
      //   data: payload,
      //   dataType: "JSON",
      // }).then((res) => {
      //   console.log(res);
      // });

      var request = new Request("/api/schedule", {
        method: "POST",
        body: payload
      });
      fetch(request).then(function (res) {
        return console.log(res);
      });
    });
  }
};

/***/ }),

/***/ "./src/utils/func.js":
/*!***************************!*\
  !*** ./src/utils/func.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostFormApi": () => (/* binding */ PostFormApi),
/* harmony export */   "getURLParams": () => (/* binding */ getURLParams),
/* harmony export */   "hideAlert": () => (/* binding */ hideAlert),
/* harmony export */   "showAlert": () => (/* binding */ showAlert),
/* harmony export */   "showListAlert": () => (/* binding */ showListAlert),
/* harmony export */   "validateInputField": () => (/* binding */ validateInputField),
/* harmony export */   "validateSelectField": () => (/* binding */ validateSelectField)
/* harmony export */ });


var PostFormApi = function PostFormApi(url, data) {
  var req = $.ajax({
    type: "POST",
    url: url,
    data: data,
    dataType: "JSON"
  });
  return req;
};
var getURLParams = function getURLParams(parameter) {
  var queryString = window.location.search;
  var params = new URLSearchParams(queryString);
  return params.get(parameter);
};

var isEmail = function isEmail(email) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email.value.trim()).toLowerCase());
};

var showAlert = function showAlert(input) {
  var name = input.getAttribute("name");
  var invalidField = document.getElementById("invalid-".concat(name));
  invalidField.setAttribute("style", "display: block");
  input.setAttribute("style", "border: 1px solid #dc3545");
};
var hideAlert = function hideAlert(input) {
  var name = input.getAttribute("name");
  var invalidField = document.getElementById("invalid-".concat(name));
  invalidField.removeAttribute("style");
  input.removeAttribute("style");
};
var validateInputField = function validateInputField(input) {
  if (input.getAttribute("type") == "email" || input.getAttribute("name") == "email") {
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
var validateSelectField = function validateSelectField(option) {
  var value = option.options[option.selectedIndex].value;

  if (value === 0) {
    showAlert(option);
    return 1;
  } else {
    hideAlert(option);
    return 0;
  }
};
var showListAlert = function showListAlert(input) {
  console.log(speakerArray);
  var errorContainer = document.querySelectorAll(".queryLabel");
  showAlert(input);
  errorContainer.forEach(function (div) {
    div.setAttribute("style", "background-color: #e8a001");
  });
  return 1;
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/bundle.js ***!
  \***********************/
var _require = __webpack_require__(/*! ./events/general */ "./src/events/general.js"),
    toggleWorkOrderForm = _require.toggleWorkOrderForm;

var _require2 = __webpack_require__(/*! ./forms/work_order */ "./src/forms/work_order.js"),
    processAddWorkOrderForm = _require2.processAddWorkOrderForm;

var _require3 = __webpack_require__(/*! ./events/get_work_order */ "./src/events/get_work_order.js"),
    getWorkOrder = _require3.getWorkOrder;

var setDueDateButton = document.getElementById("set-due-date-button");
var addWorkOrderForm = document.getElementById("add-work-order-form");

if (typeof setDueDateButton !== "undefined" && setDueDateButton !== null) {
  setDueDateButton.addEventListener("click", toggleWorkOrderForm);
}

if (typeof addWorkOrderForm !== "undefined" && addWorkOrderForm !== null) {
  addWorkOrderForm.addEventListener("submit", processAddWorkOrderForm);
}

document.addEventListener("DOMContentLoaded", getWorkOrder); // Datetime picker

new tempusDominus.TempusDominus(document.getElementById("datetime"));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLGlEQUFELENBQXZDO0FBQUEsSUFBUWhDLG1CQUFSLFlBQVFBLG1CQUFSOztBQUNBLGdCQUFvQ2dDLG1CQUFPLENBQUMscURBQUQsQ0FBM0M7QUFBQSxJQUFRUyx1QkFBUixhQUFRQSx1QkFBUjs7QUFDQSxnQkFBeUJULG1CQUFPLENBQUMsK0RBQUQsQ0FBaEM7QUFBQSxJQUFRQyxZQUFSLGFBQVFBLFlBQVI7O0FBRUEsSUFBTThELGdCQUFnQixHQUFHeEYsUUFBUSxDQUFDQyxjQUFULENBQXdCLHFCQUF4QixDQUF6QjtBQUNBLElBQU13RixnQkFBZ0IsR0FBR3pGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixxQkFBeEIsQ0FBekI7O0FBRUEsSUFBSSxPQUFPdUYsZ0JBQVAsS0FBNEIsV0FBNUIsSUFBMkNBLGdCQUFnQixLQUFLLElBQXBFLEVBQTBFO0VBQ3hFQSxnQkFBZ0IsQ0FBQ0UsZ0JBQWpCLENBQWtDLE9BQWxDLEVBQTJDakcsbUJBQTNDO0FBQ0Q7O0FBRUQsSUFBSSxPQUFPZ0csZ0JBQVAsS0FBNEIsV0FBNUIsSUFBMkNBLGdCQUFnQixLQUFLLElBQXBFLEVBQTBFO0VBQ3hFQSxnQkFBZ0IsQ0FBQ0MsZ0JBQWpCLENBQWtDLFFBQWxDLEVBQTRDeEQsdUJBQTVDO0FBQ0Q7O0FBRURsQyxRQUFRLENBQUMwRixnQkFBVCxDQUEwQixrQkFBMUIsRUFBOENoRSxZQUE5QyxHQUNBOztBQUNBLElBQUlpRSxhQUFhLENBQUNDLGFBQWxCLENBQWdDNUYsUUFBUSxDQUFDQyxjQUFULENBQXdCLFVBQXhCLENBQWhDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93b3JrX29yZGVyX2FwcC8uL3NyYy9ldmVudHMvZ2VuZXJhbC5qcyIsIndlYnBhY2s6Ly93b3JrX29yZGVyX2FwcC8uL3NyYy9ldmVudHMvZ2V0X3dvcmtfb3JkZXIuanMiLCJ3ZWJwYWNrOi8vd29ya19vcmRlcl9hcHAvLi9zcmMvZm9ybXMvd29ya19vcmRlci5qcyIsIndlYnBhY2s6Ly93b3JrX29yZGVyX2FwcC8uL3NyYy91dGlscy9mdW5jLmpzIiwid2VicGFjazovL3dvcmtfb3JkZXJfYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dvcmtfb3JkZXJfYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93b3JrX29yZGVyX2FwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dvcmtfb3JkZXJfYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd29ya19vcmRlcl9hcHAvLi9zcmMvYnVuZGxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCB0b2dnbGVXb3JrT3JkZXJGb3JtID0gKGUpID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY29uc3QgdGFyZ2V0SUQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xyXG4gIGNvbnN0IHNob3dDb21wb25lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0YXJnZXRJRH1gKTtcclxuICBjb25zdCBkYXRlUGlja2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlcGlja2VyXCIpO1xyXG4gIGNvbnN0IHZhbGlkYXRlX2NsYXNzID0gXCJ2YWxpZGF0ZS1pbnB1dFwiO1xyXG5cclxuICBzaG93Q29tcG9uZW50LnN0eWxlLmRpc3BsYXkgPVxyXG4gICAgc2hvd0NvbXBvbmVudC5zdHlsZS5kaXNwbGF5ID09PSBcImJsb2NrXCIgPyBcIm5vbmVcIiA6IFwiYmxvY2tcIjtcclxuXHJcbiAgaWYgKHNob3dDb21wb25lbnQuc3R5bGUuZGlzcGxheSA9PT0gXCJibG9ja1wiKSB7XHJcbiAgICBkYXRlUGlja2VyLmNsYXNzTGlzdC5hZGQodmFsaWRhdGVfY2xhc3MpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkYXRlUGlja2VyLmNsYXNzTGlzdC5yZW1vdmUodmFsaWRhdGVfY2xhc3MpO1xyXG4gICAgZGF0ZVBpY2tlci52YWx1ZSA9IFwiXCI7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHByb2Nlc3NXb3JrT3JkZXIgPSAocHJvcHMpID0+IHtcclxuICBjb25zb2xlLmxvZyhwcm9wcy5sZW5ndGgpO1xyXG4gIGlmIChwcm9wcy5sZW5ndGggPiAwKSB7XHJcbiAgICBsZXQgbWFwcGVkUHJvcHMgPSBwcm9wc1xyXG4gICAgICAubWFwKCh0YXNrcykgPT4ge1xyXG4gICAgICAgIGxldCBkaXYgPSBgXHJcbiAgICAgICAgPGxpIGtleT1cIiR7dGFza3MuaWR9XCIgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gYm9yZGVyLTAgYmctdHJhbnNwYXJlbnRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIGxpc3RcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tY2hlY2tcIj5cclxuICAgICAgICAgICAgICA8aW5wdXQgXHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY2hlY2staW5wdXQgZm9ybS1jaGVjay1ib3hcIiBcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiIFxyXG4gICAgICAgICAgICAgICAgaWQ9XCJcIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIi4uLlwiIC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFya2VyXCI+XHJcbiAgICAgICAgICAgICAgICAgICR7dGFza3MudGFza31cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj4gXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtZW5kIGVkaXQtbGlzdFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMlwiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiMhXCIgXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1pbmZvXCIgXHJcbiAgICAgICAgICAgICAgICAgIGRhdGEtbWRiLXRvZ2dsZT1cInRvb2x0aXBcIiBcclxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJFZGl0IHRvZG9cIlxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlbmNpbC1hbHQgbWUtM1wiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjIVwiIFxyXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInRleHQtZGFuZ2VyXCIgXHJcbiAgICAgICAgICAgICAgICAgIGRhdGEtbWRiLXRvZ2dsZT1cInRvb2x0aXBcIiBcclxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJEZWxldGUgdG9kb1wiPlxyXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10cmFzaC1hbHRcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMlwiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiMhXCIgY2xhc3M9XCJ0ZXh0LW11dGVkXCIgZGF0YS1tZGItdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiQ3JlYXRlZCBkYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic21hbGwgbWItMFwiPlxyXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1pbmZvLWNpcmNsZSBtZS0yXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAke3Rhc2tzLmNyZWF0ZWRfYXR9XHJcbiAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9saT5cclxuICAgICAgYDtcclxuICAgICAgICByZXR1cm4gZGl2O1xyXG4gICAgICB9KVxyXG4gICAgICAuam9pbihcIlwiKTtcclxuICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0LXRhc2tzXCIpO1xyXG4gICAgdGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgdGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBtYXBwZWRQcm9wcztcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coXCJub3RoaW5nIHRvIGxvYWRcIik7XHJcbiAgfVxyXG59O1xyXG4iLCJjb25zdCB7IHByb2Nlc3NXb3JrT3JkZXIgfSA9IHJlcXVpcmUoXCIuL2dlbmVyYWxcIik7XHJcbmV4cG9ydCBjb25zdCBnZXRXb3JrT3JkZXIgPSAoKSA9PiB7XHJcbiAgZmV0Y2goXCIvYXBpL2dldC9zY2hlZHVsZVwiKVxyXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgcHJvY2Vzc1dvcmtPcmRlcihyZXMuZGF0YSk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKCgpID0+IGNvbnNvbGUubG9nKFwiRXJyb3Igd2hpbGUgZG93bmxvYWRpbmcgZGF0YVwiKSk7XHJcbn07XHJcbiIsImNvbnN0IHsgdmFsaWRhdGVJbnB1dEZpZWxkIH0gPSByZXF1aXJlKFwiLi4vdXRpbHMvZnVuY1wiKTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcm9jZXNzQWRkV29ya09yZGVyRm9ybSA9IChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGxldCB2YWxpZGF0ZUZvcm1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmFsaWRhdGUtaW5wdXRcIik7XHJcbiAgbGV0IGZvcm1WYWx1ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZvcm0taW5wdXRcIik7XHJcblxyXG4gIGxldCB2YWxpZGF0ZSA9IFtdO1xyXG5cclxuICB2YWxpZGF0ZUZvcm1JbnB1dC5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgdmFsaWRhdGUucHVzaCh2YWxpZGF0ZUlucHV0RmllbGQoaW5wdXQpKTtcclxuICB9KTtcclxuXHJcbiAgaWYgKHZhbGlkYXRlLmxlbmd0aCA9PSAwIHx8IHZhbGlkYXRlLmluZGV4T2YoMSkgPT0gLTEpIHtcclxuICAgIGdyZWNhcHRjaGFcclxuICAgICAgLmV4ZWN1dGUoXCI2TGQ0Tl93WkFBQUFBTUNlMEdTSkNNQ0dqa0gxRThPRUJBNGtjZ19OXCIsIHtcclxuICAgICAgICBhY3Rpb246IFwiYWRkX25ld193b3JrX29yZGVyXCIsXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCh0b2tlbikgPT4ge1xyXG4gICAgICAgIGxldCBwYXlsb2FkID0ge307XHJcbiAgICAgICAgZm9ybVZhbHVlcy5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgICAgICAgbGV0IHZhbHVlID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgICBsZXQgbmFtZSA9IGlucHV0LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XHJcbiAgICAgICAgICBwYXlsb2FkW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGF5bG9hZC50b2tlbiA9IHRva2VuO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBheWxvYWQpO1xyXG4gICAgICAgIC8vIFRPRE86IEZpZ3VyZSBvdXQgYXN5bmMgZmV0Y2ggcG9zdCBkYXRhIGlzbid0IHRyYW5zZmVycmluZyBwYXlsb2FkIHRvIGJhY2tlbmRcclxuICAgICAgICAvLyAkLmFqYXgoe1xyXG4gICAgICAgIC8vICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgLy8gICB1cmw6IFwiL2FwaS9zY2hlZHVsZVwiLFxyXG4gICAgICAgIC8vICAgZGF0YTogcGF5bG9hZCxcclxuICAgICAgICAvLyAgIGRhdGFUeXBlOiBcIkpTT05cIixcclxuICAgICAgICAvLyB9KS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChcIi9hcGkvc2NoZWR1bGVcIiwge1xyXG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgIGJvZHk6IHBheWxvYWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZmV0Y2gocmVxdWVzdCkudGhlbigocmVzKSA9PiBjb25zb2xlLmxvZyhyZXMpKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0IGNvbnN0IFBvc3RGb3JtQXBpID0gKHVybCwgZGF0YSkgPT4ge1xyXG4gIGxldCByZXEgPSAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICB1cmw6IHVybCxcclxuICAgIGRhdGE6IGRhdGEsXHJcbiAgICBkYXRhVHlwZTogXCJKU09OXCIsXHJcbiAgfSk7XHJcbiAgcmV0dXJuIHJlcTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRVUkxQYXJhbXMgPSAocGFyYW1ldGVyKSA9PiB7XHJcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xyXG4gIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocXVlcnlTdHJpbmcpO1xyXG4gIHJldHVybiBwYXJhbXMuZ2V0KHBhcmFtZXRlcik7XHJcbn07XHJcblxyXG5jb25zdCBpc0VtYWlsID0gKGVtYWlsKSA9PiB7XHJcbiAgdmFyIHJlZ2V4ID1cclxuICAgIC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgcmV0dXJuIHJlZ2V4LnRlc3QoU3RyaW5nKGVtYWlsLnZhbHVlLnRyaW0oKSkudG9Mb3dlckNhc2UoKSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2hvd0FsZXJ0ID0gKGlucHV0KSA9PiB7XHJcbiAgbGV0IG5hbWUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpO1xyXG4gIGxldCBpbnZhbGlkRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaW52YWxpZC0ke25hbWV9YCk7XHJcbiAgaW52YWxpZEZpZWxkLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTogYmxvY2tcIik7XHJcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJib3JkZXI6IDFweCBzb2xpZCAjZGMzNTQ1XCIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhpZGVBbGVydCA9IChpbnB1dCkgPT4ge1xyXG4gIGxldCBuYW1lID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcclxuICBsZXQgaW52YWxpZEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGludmFsaWQtJHtuYW1lfWApO1xyXG4gIGludmFsaWRGaWVsZC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxuICBpbnB1dC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUlucHV0RmllbGQgPSAoaW5wdXQpID0+IHtcclxuICBpZiAoXHJcbiAgICBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpID09IFwiZW1haWxcIiB8fFxyXG4gICAgaW5wdXQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcImVtYWlsXCJcclxuICApIHtcclxuICAgIGlmICghaXNFbWFpbChpbnB1dCkpIHtcclxuICAgICAgc2hvd0FsZXJ0KGlucHV0KTtcclxuICAgICAgcmV0dXJuIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBoaWRlQWxlcnQoaW5wdXQpO1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGlucHV0LnZhbHVlLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHNob3dBbGVydChpbnB1dCk7XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGlkZUFsZXJ0KGlucHV0KTtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlU2VsZWN0RmllbGQgPSAob3B0aW9uKSA9PiB7XHJcbiAgbGV0IHZhbHVlID0gb3B0aW9uLm9wdGlvbnNbb3B0aW9uLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG4gIGlmICh2YWx1ZSA9PT0gMCkge1xyXG4gICAgc2hvd0FsZXJ0KG9wdGlvbik7XHJcbiAgICByZXR1cm4gMTtcclxuICB9IGVsc2Uge1xyXG4gICAgaGlkZUFsZXJ0KG9wdGlvbik7XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2hvd0xpc3RBbGVydCA9IChpbnB1dCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKHNwZWFrZXJBcnJheSk7XHJcbiAgbGV0IGVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5xdWVyeUxhYmVsXCIpO1xyXG4gIHNob3dBbGVydChpbnB1dCk7XHJcbiAgZXJyb3JDb250YWluZXIuZm9yRWFjaCgoZGl2KSA9PiB7XHJcbiAgICBkaXYuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yOiAjZThhMDAxXCIpO1xyXG4gIH0pO1xyXG4gIHJldHVybiAxO1xyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IHsgdG9nZ2xlV29ya09yZGVyRm9ybSB9ID0gcmVxdWlyZShcIi4vZXZlbnRzL2dlbmVyYWxcIik7XHJcbmNvbnN0IHsgcHJvY2Vzc0FkZFdvcmtPcmRlckZvcm0gfSA9IHJlcXVpcmUoXCIuL2Zvcm1zL3dvcmtfb3JkZXJcIik7XHJcbmNvbnN0IHsgZ2V0V29ya09yZGVyIH0gPSByZXF1aXJlKFwiLi9ldmVudHMvZ2V0X3dvcmtfb3JkZXJcIik7XHJcblxyXG5jb25zdCBzZXREdWVEYXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZXQtZHVlLWRhdGUtYnV0dG9uXCIpO1xyXG5jb25zdCBhZGRXb3JrT3JkZXJGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtd29yay1vcmRlci1mb3JtXCIpO1xyXG5cclxuaWYgKHR5cGVvZiBzZXREdWVEYXRlQnV0dG9uICE9PSBcInVuZGVmaW5lZFwiICYmIHNldER1ZURhdGVCdXR0b24gIT09IG51bGwpIHtcclxuICBzZXREdWVEYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVXb3JrT3JkZXJGb3JtKTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBhZGRXb3JrT3JkZXJGb3JtICE9PSBcInVuZGVmaW5lZFwiICYmIGFkZFdvcmtPcmRlckZvcm0gIT09IG51bGwpIHtcclxuICBhZGRXb3JrT3JkZXJGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgcHJvY2Vzc0FkZFdvcmtPcmRlckZvcm0pO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBnZXRXb3JrT3JkZXIpO1xyXG4vLyBEYXRldGltZSBwaWNrZXJcclxubmV3IHRlbXB1c0RvbWludXMuVGVtcHVzRG9taW51cyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGV0aW1lXCIpKTtcclxuIl0sIm5hbWVzIjpbInRvZ2dsZVdvcmtPcmRlckZvcm0iLCJlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXRJRCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsInNob3dDb21wb25lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZGF0ZVBpY2tlciIsInZhbGlkYXRlX2NsYXNzIiwic3R5bGUiLCJkaXNwbGF5IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwidmFsdWUiLCJwcm9jZXNzV29ya09yZGVyIiwicHJvcHMiLCJjb25zb2xlIiwibG9nIiwibGVuZ3RoIiwibWFwcGVkUHJvcHMiLCJtYXAiLCJ0YXNrcyIsImRpdiIsImlkIiwidGFzayIsImNyZWF0ZWRfYXQiLCJqb2luIiwidGFza0NvbnRhaW5lciIsImlubmVySFRNTCIsInJlcXVpcmUiLCJnZXRXb3JrT3JkZXIiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJyZXMiLCJkYXRhIiwidmFsaWRhdGVJbnB1dEZpZWxkIiwicHJvY2Vzc0FkZFdvcmtPcmRlckZvcm0iLCJ2YWxpZGF0ZUZvcm1JbnB1dCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtVmFsdWVzIiwidmFsaWRhdGUiLCJmb3JFYWNoIiwiaW5wdXQiLCJwdXNoIiwiaW5kZXhPZiIsImdyZWNhcHRjaGEiLCJleGVjdXRlIiwiYWN0aW9uIiwidG9rZW4iLCJwYXlsb2FkIiwibmFtZSIsInJlcXVlc3QiLCJSZXF1ZXN0IiwibWV0aG9kIiwiYm9keSIsIlBvc3RGb3JtQXBpIiwidXJsIiwicmVxIiwiJCIsImFqYXgiLCJ0eXBlIiwiZGF0YVR5cGUiLCJnZXRVUkxQYXJhbXMiLCJwYXJhbWV0ZXIiLCJxdWVyeVN0cmluZyIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwicGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiZ2V0IiwiaXNFbWFpbCIsImVtYWlsIiwicmVnZXgiLCJ0ZXN0IiwiU3RyaW5nIiwidHJpbSIsInRvTG93ZXJDYXNlIiwic2hvd0FsZXJ0IiwiaW52YWxpZEZpZWxkIiwic2V0QXR0cmlidXRlIiwiaGlkZUFsZXJ0IiwicmVtb3ZlQXR0cmlidXRlIiwidmFsaWRhdGVTZWxlY3RGaWVsZCIsIm9wdGlvbiIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4Iiwic2hvd0xpc3RBbGVydCIsInNwZWFrZXJBcnJheSIsImVycm9yQ29udGFpbmVyIiwic2V0RHVlRGF0ZUJ1dHRvbiIsImFkZFdvcmtPcmRlckZvcm0iLCJhZGRFdmVudExpc3RlbmVyIiwidGVtcHVzRG9taW51cyIsIlRlbXB1c0RvbWludXMiXSwic291cmNlUm9vdCI6IiJ9