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
/* harmony export */   "processFilterAndSortOrder": () => (/* binding */ processFilterAndSortOrder),
/* harmony export */   "processWorkOrder": () => (/* binding */ processWorkOrder),
/* harmony export */   "statusEnums": () => (/* binding */ statusEnums),
/* harmony export */   "toggleWorkOrderForm": () => (/* binding */ toggleWorkOrderForm),
/* harmony export */   "workOrderData": () => (/* binding */ workOrderData)
/* harmony export */ });
var _require = __webpack_require__(/*! ../renders/render_work_order */ "./src/renders/render_work_order.js"),
    renderWorkOrder = _require.renderWorkOrder;

var workOrderData = [];
var statusEnums = Object.freeze({
  ADDDATE: true,
  ALL: true,
  DATE: true,
  DUEDATE: true,
  ACTIVE: "active",
  COMPLETE: "complete",
  INACTIVE: "inactive"
});
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
  workOrderData = props;
  renderWorkOrder(workOrderData);
};
var processFilterAndSortOrder = function processFilterAndSortOrder(e) {
  var targetID = e.target.getAttribute("data-id");
  var targetValue = e.target.value;
  var targetSort = e.target.getAttribute("data-sort");

  if (targetID === "filter-lists") {
    var filteredList = filterOrder(targetValue);
    console.log(filteredList);
  }

  if (targetID === "sort-lists") {
    var _filteredList = sortOrder(targetSort, targetValue);

    console.log(_filteredList);
  }
};

var filterOrder = function filterOrder(targetValue) {
  if (targetValue === "ALL") {
    return workOrderData;
  }

  if (targetValue === "DATE") {
    return workOrderData.filter(function (list) {
      return list.end_date.length !== 0;
    });
  }

  return workOrderData.filter(function (list) {
    return list.status === statusEnums[targetValue];
  });
};

var sortOrder = function sortOrder(targetSort, targetValue) {
  switch (targetSort) {
    case "ascending":
      return workOrderData.sort(function (a, b) {
        console.log(new Date(a[targetValue]));
        new Date(a[targetValue]) - new Date(b[workOrderData]);
      });

    case "descending":
      return workOrderData.sort(function (a, b) {
        console.log(new Date(b[targetValue]));
        new Date(b[targetValue]) - new Date(a[workOrderData]);
      });
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

/***/ "./src/renders/render_work_order.js":
/*!******************************************!*\
  !*** ./src/renders/render_work_order.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderWorkOrder": () => (/* binding */ renderWorkOrder)
/* harmony export */ });
var renderWorkOrder = function renderWorkOrder(props) {
  var taskContainer = document.getElementById("list-tasks");

  if (props.length > 0) {
    var mappedProps = props.map(function (tasks) {
      var div = "\n        <li key=\"".concat(tasks.id, "\" class=\"list-group-item border-0 bg-transparent\">\n        <div class=\"row\">\n          <div class=\"col list\">\n            <div class=\"form-check\">\n              <input \n                class=\"form-check-input form-check-box\" \n                type=\"checkbox\" \n                id=\"\"\n                aria-label=\"...\" />\n                <span class=\"text-darker\">\n                  ").concat(tasks.task, "\n                </span> \n            </div>\n          </div>\n          <div class=\"col text-end edit-list\">\n            <div class=\"row\">\n              <div class=\"col-12\">\n                <a href=\"#!\" \n                  class=\"text-info\" \n                  data-mdb-toggle=\"tooltip\" \n                  title=\"Edit todo\"\n                  >\n                  <i class=\"fas fa-pencil-alt me-3\"></i>\n                </a>\n                <a href=\"#!\" \n                  class=\"text-danger\" \n                  data-mdb-toggle=\"tooltip\" \n                  title=\"Delete todo\">\n                  <i class=\"fas fa-trash-alt\"></i>\n                </a>\n              </div>\n              <div class=\"col-12\">\n                <a href=\"#!\" class=\"text-muted\" data-mdb-toggle=\"tooltip\" title=\"Created date\">\n                  <p class=\"small mb-0\">\n                  <i class=\"fas fa-info-circle me-2\"></i>\n                  ").concat(tasks.created_at, "\n                  </p>\n                </a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </li>\n      ");
      return div;
    }).join("");
    taskContainer.innerHTML = "";
    taskContainer.innerHTML = mappedProps;
  } else {
    taskContainer.innerHTML = "";
    taskContainer.innerHTML = "<li class=\"list-group-item border-0 bg-transparent\">\n     No Work Orders at this time</li>";
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
    toggleWorkOrderForm = _require.toggleWorkOrderForm,
    processFilterAndSortOrder = _require.processFilterAndSortOrder;

var _require2 = __webpack_require__(/*! ./forms/work_order */ "./src/forms/work_order.js"),
    processAddWorkOrderForm = _require2.processAddWorkOrderForm;

var _require3 = __webpack_require__(/*! ./events/get_work_order */ "./src/events/get_work_order.js"),
    getWorkOrder = _require3.getWorkOrder;

var setDueDateButton = document.getElementById("set-due-date-button");
var addWorkOrderForm = document.getElementById("add-work-order-form");
var filterLists = document.querySelectorAll(".filter-sort-lists");

if (typeof setDueDateButton !== "undefined" && setDueDateButton !== null) {
  setDueDateButton.addEventListener("click", toggleWorkOrderForm);
}

if (typeof addWorkOrderForm !== "undefined" && addWorkOrderForm !== null) {
  addWorkOrderForm.addEventListener("submit", processAddWorkOrderForm);
}

if (typeof filterLists !== "undefined" && filterLists !== null) {
  filterLists.forEach(function (list) {
    list.addEventListener("change", processFilterAndSortOrder);
  });
}

document.addEventListener("DOMContentLoaded", getWorkOrder); // Datetime picker

new tempusDominus.TempusDominus(document.getElementById("datetime"));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixRQUF0QixFQUFnQzVGLHlCQUFoQztFQUNELENBRkQ7QUFHRDs7QUFFRFosUUFBUSxDQUFDd0csZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDM0UsWUFBOUMsR0FDQTs7QUFDQSxJQUFJNEUsYUFBYSxDQUFDQyxhQUFsQixDQUFnQzFHLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixVQUF4QixDQUFoQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd29ya19vcmRlcl9hcHAvLi9zcmMvZXZlbnRzL2dlbmVyYWwuanMiLCJ3ZWJwYWNrOi8vd29ya19vcmRlcl9hcHAvLi9zcmMvZXZlbnRzL2dldF93b3JrX29yZGVyLmpzIiwid2VicGFjazovL3dvcmtfb3JkZXJfYXBwLy4vc3JjL2Zvcm1zL3dvcmtfb3JkZXIuanMiLCJ3ZWJwYWNrOi8vd29ya19vcmRlcl9hcHAvLi9zcmMvcmVuZGVycy9yZW5kZXJfd29ya19vcmRlci5qcyIsIndlYnBhY2s6Ly93b3JrX29yZGVyX2FwcC8uL3NyYy91dGlscy9mdW5jLmpzIiwid2VicGFjazovL3dvcmtfb3JkZXJfYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dvcmtfb3JkZXJfYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93b3JrX29yZGVyX2FwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dvcmtfb3JkZXJfYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd29ya19vcmRlcl9hcHAvLi9zcmMvYnVuZGxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgcmVuZGVyV29ya09yZGVyIH0gPSByZXF1aXJlKFwiLi4vcmVuZGVycy9yZW5kZXJfd29ya19vcmRlclwiKTtcclxuZXhwb3J0IGxldCB3b3JrT3JkZXJEYXRhID0gW107XHJcbmV4cG9ydCBsZXQgc3RhdHVzRW51bXMgPSBPYmplY3QuZnJlZXplKHtcclxuICBBREREQVRFOiB0cnVlLFxyXG4gIEFMTDogdHJ1ZSxcclxuICBEQVRFOiB0cnVlLFxyXG4gIERVRURBVEU6IHRydWUsXHJcbiAgQUNUSVZFOiBcImFjdGl2ZVwiLFxyXG4gIENPTVBMRVRFOiBcImNvbXBsZXRlXCIsXHJcbiAgSU5BQ1RJVkU6IFwiaW5hY3RpdmVcIixcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgdG9nZ2xlV29ya09yZGVyRm9ybSA9IChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGNvbnN0IHRhcmdldElEID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuICBjb25zdCBzaG93Q29tcG9uZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGFyZ2V0SUR9YCk7XHJcbiAgY29uc3QgZGF0ZVBpY2tlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0ZXBpY2tlclwiKTtcclxuICBjb25zdCB2YWxpZGF0ZV9jbGFzcyA9IFwidmFsaWRhdGUtaW5wdXRcIjtcclxuXHJcbiAgc2hvd0NvbXBvbmVudC5zdHlsZS5kaXNwbGF5ID1cclxuICAgIHNob3dDb21wb25lbnQuc3R5bGUuZGlzcGxheSA9PT0gXCJibG9ja1wiID8gXCJub25lXCIgOiBcImJsb2NrXCI7XHJcblxyXG4gIGlmIChzaG93Q29tcG9uZW50LnN0eWxlLmRpc3BsYXkgPT09IFwiYmxvY2tcIikge1xyXG4gICAgZGF0ZVBpY2tlci5jbGFzc0xpc3QuYWRkKHZhbGlkYXRlX2NsYXNzKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZGF0ZVBpY2tlci5jbGFzc0xpc3QucmVtb3ZlKHZhbGlkYXRlX2NsYXNzKTtcclxuICAgIGRhdGVQaWNrZXIudmFsdWUgPSBcIlwiO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcm9jZXNzV29ya09yZGVyID0gKHByb3BzKSA9PiB7XHJcbiAgd29ya09yZGVyRGF0YSA9IHByb3BzO1xyXG4gIHJlbmRlcldvcmtPcmRlcih3b3JrT3JkZXJEYXRhKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcm9jZXNzRmlsdGVyQW5kU29ydE9yZGVyID0gKGUpID0+IHtcclxuICBsZXQgdGFyZ2V0SUQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xyXG4gIGxldCB0YXJnZXRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gIGxldCB0YXJnZXRTb3J0ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1zb3J0XCIpO1xyXG4gIGlmICh0YXJnZXRJRCA9PT0gXCJmaWx0ZXItbGlzdHNcIikge1xyXG4gICAgbGV0IGZpbHRlcmVkTGlzdCA9IGZpbHRlck9yZGVyKHRhcmdldFZhbHVlKTtcclxuICAgIGNvbnNvbGUubG9nKGZpbHRlcmVkTGlzdCk7XHJcbiAgfVxyXG4gIGlmICh0YXJnZXRJRCA9PT0gXCJzb3J0LWxpc3RzXCIpIHtcclxuICAgIGxldCBmaWx0ZXJlZExpc3QgPSBzb3J0T3JkZXIodGFyZ2V0U29ydCwgdGFyZ2V0VmFsdWUpO1xyXG4gICAgY29uc29sZS5sb2coZmlsdGVyZWRMaXN0KTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBmaWx0ZXJPcmRlciA9ICh0YXJnZXRWYWx1ZSkgPT4ge1xyXG4gIGlmICh0YXJnZXRWYWx1ZSA9PT0gXCJBTExcIikge1xyXG4gICAgcmV0dXJuIHdvcmtPcmRlckRhdGE7XHJcbiAgfVxyXG4gIGlmICh0YXJnZXRWYWx1ZSA9PT0gXCJEQVRFXCIpIHtcclxuICAgIHJldHVybiB3b3JrT3JkZXJEYXRhLmZpbHRlcigobGlzdCkgPT4gbGlzdC5lbmRfZGF0ZS5sZW5ndGggIT09IDApO1xyXG4gIH1cclxuICByZXR1cm4gd29ya09yZGVyRGF0YS5maWx0ZXIoXHJcbiAgICAobGlzdCkgPT4gbGlzdC5zdGF0dXMgPT09IHN0YXR1c0VudW1zW3RhcmdldFZhbHVlXVxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBzb3J0T3JkZXIgPSAodGFyZ2V0U29ydCwgdGFyZ2V0VmFsdWUpID0+IHtcclxuICBzd2l0Y2ggKHRhcmdldFNvcnQpIHtcclxuICAgIGNhc2UgXCJhc2NlbmRpbmdcIjpcclxuICAgICAgcmV0dXJuIHdvcmtPcmRlckRhdGEuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ldyBEYXRlKGFbdGFyZ2V0VmFsdWVdKSk7XHJcbiAgICAgICAgbmV3IERhdGUoYVt0YXJnZXRWYWx1ZV0pIC0gbmV3IERhdGUoYlt3b3JrT3JkZXJEYXRhXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgY2FzZSBcImRlc2NlbmRpbmdcIjpcclxuICAgICAgcmV0dXJuIHdvcmtPcmRlckRhdGEuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ldyBEYXRlKGJbdGFyZ2V0VmFsdWVdKSk7XHJcbiAgICAgICAgbmV3IERhdGUoYlt0YXJnZXRWYWx1ZV0pIC0gbmV3IERhdGUoYVt3b3JrT3JkZXJEYXRhXSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufTtcclxuIiwiY29uc3QgeyBwcm9jZXNzV29ya09yZGVyIH0gPSByZXF1aXJlKFwiLi9nZW5lcmFsXCIpO1xyXG5leHBvcnQgY29uc3QgZ2V0V29ya09yZGVyID0gKCkgPT4ge1xyXG4gIGZldGNoKFwiL2FwaS9nZXQvc2NoZWR1bGVcIilcclxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgIHByb2Nlc3NXb3JrT3JkZXIocmVzLmRhdGEpO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoKSA9PiBjb25zb2xlLmxvZyhcIkVycm9yIHdoaWxlIGRvd25sb2FkaW5nIGRhdGFcIikpO1xyXG59O1xyXG4iLCJjb25zdCB7IHZhbGlkYXRlSW5wdXRGaWVsZCB9ID0gcmVxdWlyZShcIi4uL3V0aWxzL2Z1bmNcIik7XHJcblxyXG5leHBvcnQgY29uc3QgcHJvY2Vzc0FkZFdvcmtPcmRlckZvcm0gPSAoZSkgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBsZXQgdmFsaWRhdGVGb3JtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZhbGlkYXRlLWlucHV0XCIpO1xyXG4gIGxldCBmb3JtVmFsdWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mb3JtLWlucHV0XCIpO1xyXG5cclxuICBsZXQgdmFsaWRhdGUgPSBbXTtcclxuXHJcbiAgdmFsaWRhdGVGb3JtSW5wdXQuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgIHZhbGlkYXRlLnB1c2godmFsaWRhdGVJbnB1dEZpZWxkKGlucHV0KSk7XHJcbiAgfSk7XHJcblxyXG4gIGlmICh2YWxpZGF0ZS5sZW5ndGggPT0gMCB8fCB2YWxpZGF0ZS5pbmRleE9mKDEpID09IC0xKSB7XHJcbiAgICBncmVjYXB0Y2hhXHJcbiAgICAgIC5leGVjdXRlKFwiNkxkNE5fd1pBQUFBQU1DZTBHU0pDTUNHamtIMUU4T0VCQTRrY2dfTlwiLCB7XHJcbiAgICAgICAgYWN0aW9uOiBcImFkZF9uZXdfd29ya19vcmRlclwiLFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigodG9rZW4pID0+IHtcclxuICAgICAgICBsZXQgcGF5bG9hZCA9IHt9O1xyXG4gICAgICAgIGZvcm1WYWx1ZXMuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgICAgICAgIGxldCB2YWx1ZSA9IGlucHV0LnZhbHVlO1xyXG4gICAgICAgICAgbGV0IG5hbWUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpO1xyXG4gICAgICAgICAgcGF5bG9hZFtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBheWxvYWQudG9rZW4gPSB0b2tlbjtcclxuICAgICAgICBjb25zb2xlLmxvZyhwYXlsb2FkKTtcclxuICAgICAgICAvLyBUT0RPOiBGaWd1cmUgb3V0IGFzeW5jIGZldGNoIHBvc3QgZGF0YSBpc24ndCB0cmFuc2ZlcnJpbmcgcGF5bG9hZCB0byBiYWNrZW5kXHJcbiAgICAgICAgLy8gJC5hamF4KHtcclxuICAgICAgICAvLyAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgIC8vICAgdXJsOiBcIi9hcGkvc2NoZWR1bGVcIixcclxuICAgICAgICAvLyAgIGRhdGE6IHBheWxvYWQsXHJcbiAgICAgICAgLy8gICBkYXRhVHlwZTogXCJKU09OXCIsXHJcbiAgICAgICAgLy8gfSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoXCIvYXBpL3NjaGVkdWxlXCIsIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICBib2R5OiBwYXlsb2FkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZldGNoKHJlcXVlc3QpLnRoZW4oKHJlcykgPT4gY29uc29sZS5sb2cocmVzKSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufTtcclxuIiwiZXhwb3J0IGNvbnN0IHJlbmRlcldvcmtPcmRlciA9IChwcm9wcykgPT4ge1xyXG4gIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0LXRhc2tzXCIpO1xyXG4gIGlmIChwcm9wcy5sZW5ndGggPiAwKSB7XHJcbiAgICBsZXQgbWFwcGVkUHJvcHMgPSBwcm9wc1xyXG4gICAgICAubWFwKCh0YXNrcykgPT4ge1xyXG4gICAgICAgIGxldCBkaXYgPSBgXHJcbiAgICAgICAgPGxpIGtleT1cIiR7dGFza3MuaWR9XCIgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gYm9yZGVyLTAgYmctdHJhbnNwYXJlbnRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIGxpc3RcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tY2hlY2tcIj5cclxuICAgICAgICAgICAgICA8aW5wdXQgXHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY2hlY2staW5wdXQgZm9ybS1jaGVjay1ib3hcIiBcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiIFxyXG4gICAgICAgICAgICAgICAgaWQ9XCJcIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIi4uLlwiIC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFya2VyXCI+XHJcbiAgICAgICAgICAgICAgICAgICR7dGFza3MudGFza31cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj4gXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtZW5kIGVkaXQtbGlzdFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMlwiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiMhXCIgXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1pbmZvXCIgXHJcbiAgICAgICAgICAgICAgICAgIGRhdGEtbWRiLXRvZ2dsZT1cInRvb2x0aXBcIiBcclxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJFZGl0IHRvZG9cIlxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlbmNpbC1hbHQgbWUtM1wiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjIVwiIFxyXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInRleHQtZGFuZ2VyXCIgXHJcbiAgICAgICAgICAgICAgICAgIGRhdGEtbWRiLXRvZ2dsZT1cInRvb2x0aXBcIiBcclxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJEZWxldGUgdG9kb1wiPlxyXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10cmFzaC1hbHRcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMlwiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiMhXCIgY2xhc3M9XCJ0ZXh0LW11dGVkXCIgZGF0YS1tZGItdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiQ3JlYXRlZCBkYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic21hbGwgbWItMFwiPlxyXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1pbmZvLWNpcmNsZSBtZS0yXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAke3Rhc2tzLmNyZWF0ZWRfYXR9XHJcbiAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9saT5cclxuICAgICAgYDtcclxuICAgICAgICByZXR1cm4gZGl2O1xyXG4gICAgICB9KVxyXG4gICAgICAuam9pbihcIlwiKTtcclxuXHJcbiAgICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IG1hcHBlZFByb3BzO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IGA8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gYm9yZGVyLTAgYmctdHJhbnNwYXJlbnRcIj5cclxuICAgICBObyBXb3JrIE9yZGVycyBhdCB0aGlzIHRpbWU8L2xpPmA7XHJcbiAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0IGNvbnN0IFBvc3RGb3JtQXBpID0gKHVybCwgZGF0YSkgPT4ge1xyXG4gIGxldCByZXEgPSAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICB1cmw6IHVybCxcclxuICAgIGRhdGE6IGRhdGEsXHJcbiAgICBkYXRhVHlwZTogXCJKU09OXCIsXHJcbiAgfSk7XHJcbiAgcmV0dXJuIHJlcTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRVUkxQYXJhbXMgPSAocGFyYW1ldGVyKSA9PiB7XHJcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xyXG4gIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocXVlcnlTdHJpbmcpO1xyXG4gIHJldHVybiBwYXJhbXMuZ2V0KHBhcmFtZXRlcik7XHJcbn07XHJcblxyXG5jb25zdCBpc0VtYWlsID0gKGVtYWlsKSA9PiB7XHJcbiAgdmFyIHJlZ2V4ID1cclxuICAgIC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgcmV0dXJuIHJlZ2V4LnRlc3QoU3RyaW5nKGVtYWlsLnZhbHVlLnRyaW0oKSkudG9Mb3dlckNhc2UoKSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2hvd0FsZXJ0ID0gKGlucHV0KSA9PiB7XHJcbiAgbGV0IG5hbWUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpO1xyXG4gIGxldCBpbnZhbGlkRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaW52YWxpZC0ke25hbWV9YCk7XHJcbiAgaW52YWxpZEZpZWxkLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTogYmxvY2tcIik7XHJcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJib3JkZXI6IDFweCBzb2xpZCAjZGMzNTQ1XCIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhpZGVBbGVydCA9IChpbnB1dCkgPT4ge1xyXG4gIGxldCBuYW1lID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcclxuICBsZXQgaW52YWxpZEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGludmFsaWQtJHtuYW1lfWApO1xyXG4gIGludmFsaWRGaWVsZC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxuICBpbnB1dC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUlucHV0RmllbGQgPSAoaW5wdXQpID0+IHtcclxuICBpZiAoXHJcbiAgICBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpID09IFwiZW1haWxcIiB8fFxyXG4gICAgaW5wdXQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcImVtYWlsXCJcclxuICApIHtcclxuICAgIGlmICghaXNFbWFpbChpbnB1dCkpIHtcclxuICAgICAgc2hvd0FsZXJ0KGlucHV0KTtcclxuICAgICAgcmV0dXJuIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBoaWRlQWxlcnQoaW5wdXQpO1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGlucHV0LnZhbHVlLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHNob3dBbGVydChpbnB1dCk7XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGlkZUFsZXJ0KGlucHV0KTtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlU2VsZWN0RmllbGQgPSAob3B0aW9uKSA9PiB7XHJcbiAgbGV0IHZhbHVlID0gb3B0aW9uLm9wdGlvbnNbb3B0aW9uLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG4gIGlmICh2YWx1ZSA9PT0gMCkge1xyXG4gICAgc2hvd0FsZXJ0KG9wdGlvbik7XHJcbiAgICByZXR1cm4gMTtcclxuICB9IGVsc2Uge1xyXG4gICAgaGlkZUFsZXJ0KG9wdGlvbik7XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2hvd0xpc3RBbGVydCA9IChpbnB1dCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKHNwZWFrZXJBcnJheSk7XHJcbiAgbGV0IGVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5xdWVyeUxhYmVsXCIpO1xyXG4gIHNob3dBbGVydChpbnB1dCk7XHJcbiAgZXJyb3JDb250YWluZXIuZm9yRWFjaCgoZGl2KSA9PiB7XHJcbiAgICBkaXYuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yOiAjZThhMDAxXCIpO1xyXG4gIH0pO1xyXG4gIHJldHVybiAxO1xyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IHtcclxuICB0b2dnbGVXb3JrT3JkZXJGb3JtLFxyXG4gIHByb2Nlc3NGaWx0ZXJBbmRTb3J0T3JkZXIsXHJcbn0gPSByZXF1aXJlKFwiLi9ldmVudHMvZ2VuZXJhbFwiKTtcclxuY29uc3QgeyBwcm9jZXNzQWRkV29ya09yZGVyRm9ybSB9ID0gcmVxdWlyZShcIi4vZm9ybXMvd29ya19vcmRlclwiKTtcclxuY29uc3QgeyBnZXRXb3JrT3JkZXIgfSA9IHJlcXVpcmUoXCIuL2V2ZW50cy9nZXRfd29ya19vcmRlclwiKTtcclxuXHJcbmNvbnN0IHNldER1ZURhdGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNldC1kdWUtZGF0ZS1idXR0b25cIik7XHJcbmNvbnN0IGFkZFdvcmtPcmRlckZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC13b3JrLW9yZGVyLWZvcm1cIik7XHJcbmNvbnN0IGZpbHRlckxpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItc29ydC1saXN0c1wiKTtcclxuXHJcbmlmICh0eXBlb2Ygc2V0RHVlRGF0ZUJ1dHRvbiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZXREdWVEYXRlQnV0dG9uICE9PSBudWxsKSB7XHJcbiAgc2V0RHVlRGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlV29ya09yZGVyRm9ybSk7XHJcbn1cclxuXHJcbmlmICh0eXBlb2YgYWRkV29ya09yZGVyRm9ybSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhZGRXb3JrT3JkZXJGb3JtICE9PSBudWxsKSB7XHJcbiAgYWRkV29ya09yZGVyRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHByb2Nlc3NBZGRXb3JrT3JkZXJGb3JtKTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBmaWx0ZXJMaXN0cyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBmaWx0ZXJMaXN0cyAhPT0gbnVsbCkge1xyXG4gIGZpbHRlckxpc3RzLmZvckVhY2goKGxpc3QpID0+IHtcclxuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBwcm9jZXNzRmlsdGVyQW5kU29ydE9yZGVyKTtcclxuICB9KTtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZ2V0V29ya09yZGVyKTtcclxuLy8gRGF0ZXRpbWUgcGlja2VyXHJcbm5ldyB0ZW1wdXNEb21pbnVzLlRlbXB1c0RvbWludXMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRldGltZVwiKSk7XHJcbiJdLCJuYW1lcyI6WyJyZXF1aXJlIiwicmVuZGVyV29ya09yZGVyIiwid29ya09yZGVyRGF0YSIsInN0YXR1c0VudW1zIiwiT2JqZWN0IiwiZnJlZXplIiwiQUREREFURSIsIkFMTCIsIkRBVEUiLCJEVUVEQVRFIiwiQUNUSVZFIiwiQ09NUExFVEUiLCJJTkFDVElWRSIsInRvZ2dsZVdvcmtPcmRlckZvcm0iLCJlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXRJRCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsInNob3dDb21wb25lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZGF0ZVBpY2tlciIsInZhbGlkYXRlX2NsYXNzIiwic3R5bGUiLCJkaXNwbGF5IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwidmFsdWUiLCJwcm9jZXNzV29ya09yZGVyIiwicHJvcHMiLCJwcm9jZXNzRmlsdGVyQW5kU29ydE9yZGVyIiwidGFyZ2V0VmFsdWUiLCJ0YXJnZXRTb3J0IiwiZmlsdGVyZWRMaXN0IiwiZmlsdGVyT3JkZXIiLCJjb25zb2xlIiwibG9nIiwic29ydE9yZGVyIiwiZmlsdGVyIiwibGlzdCIsImVuZF9kYXRlIiwibGVuZ3RoIiwic3RhdHVzIiwic29ydCIsImEiLCJiIiwiRGF0ZSIsImdldFdvcmtPcmRlciIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInJlcyIsImRhdGEiLCJ2YWxpZGF0ZUlucHV0RmllbGQiLCJwcm9jZXNzQWRkV29ya09yZGVyRm9ybSIsInZhbGlkYXRlRm9ybUlucHV0IiwicXVlcnlTZWxlY3RvckFsbCIsImZvcm1WYWx1ZXMiLCJ2YWxpZGF0ZSIsImZvckVhY2giLCJpbnB1dCIsInB1c2giLCJpbmRleE9mIiwiZ3JlY2FwdGNoYSIsImV4ZWN1dGUiLCJhY3Rpb24iLCJ0b2tlbiIsInBheWxvYWQiLCJuYW1lIiwicmVxdWVzdCIsIlJlcXVlc3QiLCJtZXRob2QiLCJib2R5IiwidGFza0NvbnRhaW5lciIsIm1hcHBlZFByb3BzIiwibWFwIiwidGFza3MiLCJkaXYiLCJpZCIsInRhc2siLCJjcmVhdGVkX2F0Iiwiam9pbiIsImlubmVySFRNTCIsIlBvc3RGb3JtQXBpIiwidXJsIiwicmVxIiwiJCIsImFqYXgiLCJ0eXBlIiwiZGF0YVR5cGUiLCJnZXRVUkxQYXJhbXMiLCJwYXJhbWV0ZXIiLCJxdWVyeVN0cmluZyIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwicGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiZ2V0IiwiaXNFbWFpbCIsImVtYWlsIiwicmVnZXgiLCJ0ZXN0IiwiU3RyaW5nIiwidHJpbSIsInRvTG93ZXJDYXNlIiwic2hvd0FsZXJ0IiwiaW52YWxpZEZpZWxkIiwic2V0QXR0cmlidXRlIiwiaGlkZUFsZXJ0IiwicmVtb3ZlQXR0cmlidXRlIiwidmFsaWRhdGVTZWxlY3RGaWVsZCIsIm9wdGlvbiIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4Iiwic2hvd0xpc3RBbGVydCIsInNwZWFrZXJBcnJheSIsImVycm9yQ29udGFpbmVyIiwic2V0RHVlRGF0ZUJ1dHRvbiIsImFkZFdvcmtPcmRlckZvcm0iLCJmaWx0ZXJMaXN0cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0ZW1wdXNEb21pbnVzIiwiVGVtcHVzRG9taW51cyJdLCJzb3VyY2VSb290IjoiIn0=