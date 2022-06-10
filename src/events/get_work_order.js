const { processWorkOrder } = require("./general");
export const getWorkOrder = () => {
  fetch("/api/get/schedule")
    .then((response) => response.json())
    .then((res) => {
      console.log(res.data);
      processWorkOrder(res.data);
    })
    .catch(() => console.log("Error while downloading data"));
};
