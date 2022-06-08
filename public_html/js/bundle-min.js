/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/bundle.js ***!
  \***********************/
var setDueDateButton = document.getElementById("set-due-date-button");

if (typeof setDueDateButton !== "undefined" && setDueDateButton !== null) {
  setDueDateButton.addEventListener("click", function (e) {
    var _div$classList;

    e.preventDefault();
    var targetID = e.target.getAttribute("data-id");
    var containerID = document.getElementById("new-component");
    var div = document.createElement("div");
    var classesToAdd = ["col"];

    (_div$classList = div.classList).add.apply(_div$classList, classesToAdd);

    div.setAttribute("id", "datepicker");
    var datepickerCtn = document.createElement("input");
    datepickerCtn.classList;
    div.appendChild("In the beginning");
    containerID.appendChild(div);
    console.log(div);
  });
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLW1pbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU1BLGdCQUFnQixHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IscUJBQXhCLENBQXpCOztBQUVBLElBQUksT0FBT0YsZ0JBQVAsS0FBNEIsV0FBNUIsSUFBMkNBLGdCQUFnQixLQUFLLElBQXBFLEVBQTBFO0VBQ3hFQSxnQkFBZ0IsQ0FBQ0csZ0JBQWpCLENBQWtDLE9BQWxDLEVBQTJDLFVBQUNDLENBQUQsRUFBTztJQUFBOztJQUNoREEsQ0FBQyxDQUFDQyxjQUFGO0lBQ0EsSUFBTUMsUUFBUSxHQUFHRixDQUFDLENBQUNHLE1BQUYsQ0FBU0MsWUFBVCxDQUFzQixTQUF0QixDQUFqQjtJQUNBLElBQU1DLFdBQVcsR0FBR1IsUUFBUSxDQUFDQyxjQUFULENBQXdCLGVBQXhCLENBQXBCO0lBQ0EsSUFBSVEsR0FBRyxHQUFHVCxRQUFRLENBQUNVLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVjtJQUNBLElBQUlDLFlBQVksR0FBRyxDQUFDLEtBQUQsQ0FBbkI7O0lBQ0Esa0JBQUFGLEdBQUcsQ0FBQ0csU0FBSixFQUFjQyxHQUFkLHVCQUFxQkYsWUFBckI7O0lBQ0FGLEdBQUcsQ0FBQ0ssWUFBSixDQUFpQixJQUFqQixFQUF1QixZQUF2QjtJQUNBLElBQUlDLGFBQWEsR0FBR2YsUUFBUSxDQUFDVSxhQUFULENBQXVCLE9BQXZCLENBQXBCO0lBQ0FLLGFBQWEsQ0FBQ0gsU0FBZDtJQUNBSCxHQUFHLENBQUNPLFdBQUosQ0FBZ0Isa0JBQWhCO0lBQ0FSLFdBQVcsQ0FBQ1EsV0FBWixDQUF3QlAsR0FBeEI7SUFDQVEsT0FBTyxDQUFDQyxHQUFSLENBQVlULEdBQVo7RUFDRCxDQWJEO0FBY0QsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dvcmtfb3JkZXJfYXBwLy4vc3JjL2J1bmRsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZXREdWVEYXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZXQtZHVlLWRhdGUtYnV0dG9uXCIpO1xyXG5cclxuaWYgKHR5cGVvZiBzZXREdWVEYXRlQnV0dG9uICE9PSBcInVuZGVmaW5lZFwiICYmIHNldER1ZURhdGVCdXR0b24gIT09IG51bGwpIHtcclxuICBzZXREdWVEYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgdGFyZ2V0SUQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xyXG4gICAgY29uc3QgY29udGFpbmVySUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1jb21wb25lbnRcIik7XHJcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGxldCBjbGFzc2VzVG9BZGQgPSBbXCJjb2xcIl07XHJcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzVG9BZGQpO1xyXG4gICAgZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZGF0ZXBpY2tlclwiKTtcclxuICAgIGxldCBkYXRlcGlja2VyQ3RuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgZGF0ZXBpY2tlckN0bi5jbGFzc0xpc3Q7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQoXCJJbiB0aGUgYmVnaW5uaW5nXCIpO1xyXG4gICAgY29udGFpbmVySUQuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIGNvbnNvbGUubG9nKGRpdik7XHJcbiAgfSk7XHJcbn1cclxuIl0sIm5hbWVzIjpbInNldER1ZURhdGVCdXR0b24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldElEIiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwiY29udGFpbmVySUQiLCJkaXYiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3Nlc1RvQWRkIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwiZGF0ZXBpY2tlckN0biIsImFwcGVuZENoaWxkIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=