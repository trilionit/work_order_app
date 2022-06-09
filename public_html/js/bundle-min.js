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

      $.ajax({
        type: "POST",
        url: "/api/schedule",
        data: payload,
        dataType: "JSON"
      }).then(function (res) {
        console.log(res);
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
/* harmony export */   "formatDate": () => (/* binding */ formatDate),
/* harmony export */   "formatDateTimeZone": () => (/* binding */ formatDateTimeZone),
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
var formatDate = function formatDate(date, format) {
  var this_date = new Date(date);
  var this_time = this_date.getTime();
  var format_date;

  if (this_time == 0 || this_time == NaN) {
    format_date = "";
  } else {
    format_date = moment(date).format(format);
  }

  return format_date;
};
var formatDateTimeZone = function formatDateTimeZone(object) {
  var date = new Date(object.date);
  var time = date.getTime();
  var format;

  if (time == 0 || time == NaN) {
    format = "";
  } else {
    format = moment(date).tz(object.timezone).format(object.format);
  }

  return format;
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

var setDueDateButton = document.getElementById("set-due-date-button");
var addWorkOrderForm = document.getElementById("add-work-order-form");

if (typeof setDueDateButton !== "undefined" && setDueDateButton !== null) {
  setDueDateButton.addEventListener("click", toggleWorkOrderForm);
}

if (typeof addWorkOrderForm !== "undefined" && addWorkOrderForm !== null) {
  addWorkOrderForm.addEventListener("submit", processAddWorkOrderForm);
} // Datetime picker


new tempusDominus.TempusDominus(document.getElementById("datetime"));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Z0IsS0FBSyxJQUFwRSxFQUEwRTtFQUN4RUEsZ0JBQWdCLENBQUNFLGdCQUFqQixDQUFrQyxPQUFsQyxFQUEyQzdGLG1CQUEzQztBQUNEOztBQUVELElBQUksT0FBTzRGLGdCQUFQLEtBQTRCLFdBQTVCLElBQTJDQSxnQkFBZ0IsS0FBSyxJQUFwRSxFQUEwRTtFQUN4RUEsZ0JBQWdCLENBQUNDLGdCQUFqQixDQUFrQyxRQUFsQyxFQUE0QzFFLHVCQUE1QztBQUNELEVBQ0Q7OztBQUNBLElBQUkyRSxhQUFhLENBQUNDLGFBQWxCLENBQWdDeEYsUUFBUSxDQUFDQyxjQUFULENBQXdCLFVBQXhCLENBQWhDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93b3JrX29yZGVyX2FwcC8uL3NyYy9ldmVudHMvZ2VuZXJhbC5qcyIsIndlYnBhY2s6Ly93b3JrX29yZGVyX2FwcC8uL3NyYy9mb3Jtcy93b3JrX29yZGVyLmpzIiwid2VicGFjazovL3dvcmtfb3JkZXJfYXBwLy4vc3JjL3V0aWxzL2Z1bmMuanMiLCJ3ZWJwYWNrOi8vd29ya19vcmRlcl9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd29ya19vcmRlcl9hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dvcmtfb3JkZXJfYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd29ya19vcmRlcl9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93b3JrX29yZGVyX2FwcC8uL3NyYy9idW5kbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHRvZ2dsZVdvcmtPcmRlckZvcm0gPSAoZSkgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBjb25zdCB0YXJnZXRJRCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XHJcbiAgY29uc3Qgc2hvd0NvbXBvbmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RhcmdldElEfWApO1xyXG4gIGNvbnN0IGRhdGVQaWNrZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGVwaWNrZXJcIik7XHJcbiAgY29uc3QgdmFsaWRhdGVfY2xhc3MgPSBcInZhbGlkYXRlLWlucHV0XCI7XHJcblxyXG4gIHNob3dDb21wb25lbnQuc3R5bGUuZGlzcGxheSA9XHJcbiAgICBzaG93Q29tcG9uZW50LnN0eWxlLmRpc3BsYXkgPT09IFwiYmxvY2tcIiA/IFwibm9uZVwiIDogXCJibG9ja1wiO1xyXG5cclxuICBpZiAoc2hvd0NvbXBvbmVudC5zdHlsZS5kaXNwbGF5ID09PSBcImJsb2NrXCIpIHtcclxuICAgIGRhdGVQaWNrZXIuY2xhc3NMaXN0LmFkZCh2YWxpZGF0ZV9jbGFzcyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGRhdGVQaWNrZXIuY2xhc3NMaXN0LnJlbW92ZSh2YWxpZGF0ZV9jbGFzcyk7XHJcbiAgICBkYXRlUGlja2VyLnZhbHVlID0gXCJcIjtcclxuICB9XHJcbn07XHJcbiIsImNvbnN0IHsgdmFsaWRhdGVJbnB1dEZpZWxkIH0gPSByZXF1aXJlKFwiLi4vdXRpbHMvZnVuY1wiKTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcm9jZXNzQWRkV29ya09yZGVyRm9ybSA9IChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGxldCB2YWxpZGF0ZUZvcm1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmFsaWRhdGUtaW5wdXRcIik7XHJcbiAgbGV0IGZvcm1WYWx1ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZvcm0taW5wdXRcIik7XHJcblxyXG4gIGxldCB2YWxpZGF0ZSA9IFtdO1xyXG5cclxuICB2YWxpZGF0ZUZvcm1JbnB1dC5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgdmFsaWRhdGUucHVzaCh2YWxpZGF0ZUlucHV0RmllbGQoaW5wdXQpKTtcclxuICB9KTtcclxuXHJcbiAgaWYgKHZhbGlkYXRlLmxlbmd0aCA9PSAwIHx8IHZhbGlkYXRlLmluZGV4T2YoMSkgPT0gLTEpIHtcclxuICAgIGdyZWNhcHRjaGFcclxuICAgICAgLmV4ZWN1dGUoXCI2TGQ0Tl93WkFBQUFBTUNlMEdTSkNNQ0dqa0gxRThPRUJBNGtjZ19OXCIsIHtcclxuICAgICAgICBhY3Rpb246IFwiYWRkX25ld193b3JrX29yZGVyXCIsXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCh0b2tlbikgPT4ge1xyXG4gICAgICAgIGxldCBwYXlsb2FkID0ge307XHJcbiAgICAgICAgZm9ybVZhbHVlcy5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgICAgICAgbGV0IHZhbHVlID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgICBsZXQgbmFtZSA9IGlucHV0LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XHJcbiAgICAgICAgICBwYXlsb2FkW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGF5bG9hZC50b2tlbiA9IHRva2VuO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBheWxvYWQpO1xyXG4gICAgICAgIC8vIFRPRE86IEZpZ3VyZSBvdXQgYXN5bmMgZmV0Y2ggcG9zdCBkYXRhIGlzbid0IHRyYW5zZmVycmluZyBwYXlsb2FkIHRvIGJhY2tlbmRcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICB1cmw6IFwiL2FwaS9zY2hlZHVsZVwiLFxyXG4gICAgICAgICAgZGF0YTogcGF5bG9hZCxcclxuICAgICAgICAgIGRhdGFUeXBlOiBcIkpTT05cIixcclxuICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydCBjb25zdCBQb3N0Rm9ybUFwaSA9ICh1cmwsIGRhdGEpID0+IHtcclxuICBsZXQgcmVxID0gJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgdXJsOiB1cmwsXHJcbiAgICBkYXRhOiBkYXRhLFxyXG4gICAgZGF0YVR5cGU6IFwiSlNPTlwiLFxyXG4gIH0pO1xyXG4gIHJldHVybiByZXE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VVJMUGFyYW1zID0gKHBhcmFtZXRlcikgPT4ge1xyXG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcclxuICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5U3RyaW5nKTtcclxuICByZXR1cm4gcGFyYW1zLmdldChwYXJhbWV0ZXIpO1xyXG59O1xyXG5cclxuY29uc3QgaXNFbWFpbCA9IChlbWFpbCkgPT4ge1xyXG4gIHZhciByZWdleCA9XHJcbiAgICAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG4gIHJldHVybiByZWdleC50ZXN0KFN0cmluZyhlbWFpbC52YWx1ZS50cmltKCkpLnRvTG93ZXJDYXNlKCkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNob3dBbGVydCA9IChpbnB1dCkgPT4ge1xyXG4gIGxldCBuYW1lID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcclxuICBsZXQgaW52YWxpZEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGludmFsaWQtJHtuYW1lfWApO1xyXG4gIGludmFsaWRGaWVsZC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6IGJsb2NrXCIpO1xyXG4gIGlucHV0LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiYm9yZGVyOiAxcHggc29saWQgI2RjMzU0NVwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoaWRlQWxlcnQgPSAoaW5wdXQpID0+IHtcclxuICBsZXQgbmFtZSA9IGlucHV0LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XHJcbiAgbGV0IGludmFsaWRGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpbnZhbGlkLSR7bmFtZX1gKTtcclxuICBpbnZhbGlkRmllbGQucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XHJcbiAgaW5wdXQucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdmFsaWRhdGVJbnB1dEZpZWxkID0gKGlucHV0KSA9PiB7XHJcbiAgaWYgKFxyXG4gICAgaW5wdXQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSA9PSBcImVtYWlsXCIgfHxcclxuICAgIGlucHV0LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJlbWFpbFwiXHJcbiAgKSB7XHJcbiAgICBpZiAoIWlzRW1haWwoaW5wdXQpKSB7XHJcbiAgICAgIHNob3dBbGVydChpbnB1dCk7XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGlkZUFsZXJ0KGlucHV0KTtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmIChpbnB1dC52YWx1ZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICBzaG93QWxlcnQoaW5wdXQpO1xyXG4gICAgICByZXR1cm4gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhpZGVBbGVydChpbnB1dCk7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVNlbGVjdEZpZWxkID0gKG9wdGlvbikgPT4ge1xyXG4gIGxldCB2YWx1ZSA9IG9wdGlvbi5vcHRpb25zW29wdGlvbi5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuICBpZiAodmFsdWUgPT09IDApIHtcclxuICAgIHNob3dBbGVydChvcHRpb24pO1xyXG4gICAgcmV0dXJuIDE7XHJcbiAgfSBlbHNlIHtcclxuICAgIGhpZGVBbGVydChvcHRpb24pO1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNob3dMaXN0QWxlcnQgPSAoaW5wdXQpID0+IHtcclxuICBjb25zb2xlLmxvZyhzcGVha2VyQXJyYXkpO1xyXG4gIGxldCBlcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucXVlcnlMYWJlbFwiKTtcclxuICBzaG93QWxlcnQoaW5wdXQpO1xyXG4gIGVycm9yQ29udGFpbmVyLmZvckVhY2goKGRpdikgPT4ge1xyXG4gICAgZGl2LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiYmFja2dyb3VuZC1jb2xvcjogI2U4YTAwMVwiKTtcclxuICB9KTtcclxuICByZXR1cm4gMTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlID0gKGRhdGUsIGZvcm1hdCkgPT4ge1xyXG4gIGxldCB0aGlzX2RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICBsZXQgdGhpc190aW1lID0gdGhpc19kYXRlLmdldFRpbWUoKTtcclxuICBsZXQgZm9ybWF0X2RhdGU7XHJcbiAgaWYgKHRoaXNfdGltZSA9PSAwIHx8IHRoaXNfdGltZSA9PSBOYU4pIHtcclxuICAgIGZvcm1hdF9kYXRlID0gXCJcIjtcclxuICB9IGVsc2Uge1xyXG4gICAgZm9ybWF0X2RhdGUgPSBtb21lbnQoZGF0ZSkuZm9ybWF0KGZvcm1hdCk7XHJcbiAgfVxyXG4gIHJldHVybiBmb3JtYXRfZGF0ZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlVGltZVpvbmUgPSAob2JqZWN0KSA9PiB7XHJcbiAgbGV0IGRhdGUgPSBuZXcgRGF0ZShvYmplY3QuZGF0ZSk7XHJcbiAgbGV0IHRpbWUgPSBkYXRlLmdldFRpbWUoKTtcclxuXHJcbiAgbGV0IGZvcm1hdDtcclxuICBpZiAodGltZSA9PSAwIHx8IHRpbWUgPT0gTmFOKSB7XHJcbiAgICBmb3JtYXQgPSBcIlwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtYXQgPSBtb21lbnQoZGF0ZSkudHoob2JqZWN0LnRpbWV6b25lKS5mb3JtYXQob2JqZWN0LmZvcm1hdCk7XHJcbiAgfVxyXG4gIHJldHVybiBmb3JtYXQ7XHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgeyB0b2dnbGVXb3JrT3JkZXJGb3JtIH0gPSByZXF1aXJlKFwiLi9ldmVudHMvZ2VuZXJhbFwiKTtcclxuY29uc3QgeyBwcm9jZXNzQWRkV29ya09yZGVyRm9ybSB9ID0gcmVxdWlyZShcIi4vZm9ybXMvd29ya19vcmRlclwiKTtcclxuXHJcbmNvbnN0IHNldER1ZURhdGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNldC1kdWUtZGF0ZS1idXR0b25cIik7XHJcbmNvbnN0IGFkZFdvcmtPcmRlckZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC13b3JrLW9yZGVyLWZvcm1cIik7XHJcblxyXG5pZiAodHlwZW9mIHNldER1ZURhdGVCdXR0b24gIT09IFwidW5kZWZpbmVkXCIgJiYgc2V0RHVlRGF0ZUJ1dHRvbiAhPT0gbnVsbCkge1xyXG4gIHNldER1ZURhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZVdvcmtPcmRlckZvcm0pO1xyXG59XHJcblxyXG5pZiAodHlwZW9mIGFkZFdvcmtPcmRlckZvcm0gIT09IFwidW5kZWZpbmVkXCIgJiYgYWRkV29ya09yZGVyRm9ybSAhPT0gbnVsbCkge1xyXG4gIGFkZFdvcmtPcmRlckZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBwcm9jZXNzQWRkV29ya09yZGVyRm9ybSk7XHJcbn1cclxuLy8gRGF0ZXRpbWUgcGlja2VyXHJcbm5ldyB0ZW1wdXNEb21pbnVzLlRlbXB1c0RvbWludXMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRldGltZVwiKSk7XHJcbiJdLCJuYW1lcyI6WyJ0b2dnbGVXb3JrT3JkZXJGb3JtIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0SUQiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJzaG93Q29tcG9uZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImRhdGVQaWNrZXIiLCJ2YWxpZGF0ZV9jbGFzcyIsInN0eWxlIiwiZGlzcGxheSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInZhbHVlIiwicmVxdWlyZSIsInZhbGlkYXRlSW5wdXRGaWVsZCIsInByb2Nlc3NBZGRXb3JrT3JkZXJGb3JtIiwidmFsaWRhdGVGb3JtSW5wdXQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9ybVZhbHVlcyIsInZhbGlkYXRlIiwiZm9yRWFjaCIsImlucHV0IiwicHVzaCIsImxlbmd0aCIsImluZGV4T2YiLCJncmVjYXB0Y2hhIiwiZXhlY3V0ZSIsImFjdGlvbiIsInRoZW4iLCJ0b2tlbiIsInBheWxvYWQiLCJuYW1lIiwiY29uc29sZSIsImxvZyIsIiQiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGEiLCJkYXRhVHlwZSIsInJlcyIsIlBvc3RGb3JtQXBpIiwicmVxIiwiZ2V0VVJMUGFyYW1zIiwicGFyYW1ldGVyIiwicXVlcnlTdHJpbmciLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNlYXJjaCIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImdldCIsImlzRW1haWwiLCJlbWFpbCIsInJlZ2V4IiwidGVzdCIsIlN0cmluZyIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsInNob3dBbGVydCIsImludmFsaWRGaWVsZCIsInNldEF0dHJpYnV0ZSIsImhpZGVBbGVydCIsInJlbW92ZUF0dHJpYnV0ZSIsInZhbGlkYXRlU2VsZWN0RmllbGQiLCJvcHRpb24iLCJvcHRpb25zIiwic2VsZWN0ZWRJbmRleCIsInNob3dMaXN0QWxlcnQiLCJzcGVha2VyQXJyYXkiLCJlcnJvckNvbnRhaW5lciIsImRpdiIsImZvcm1hdERhdGUiLCJkYXRlIiwiZm9ybWF0IiwidGhpc19kYXRlIiwiRGF0ZSIsInRoaXNfdGltZSIsImdldFRpbWUiLCJmb3JtYXRfZGF0ZSIsIk5hTiIsIm1vbWVudCIsImZvcm1hdERhdGVUaW1lWm9uZSIsIm9iamVjdCIsInRpbWUiLCJ0eiIsInRpbWV6b25lIiwic2V0RHVlRGF0ZUJ1dHRvbiIsImFkZFdvcmtPcmRlckZvcm0iLCJhZGRFdmVudExpc3RlbmVyIiwidGVtcHVzRG9taW51cyIsIlRlbXB1c0RvbWludXMiXSwic291cmNlUm9vdCI6IiJ9