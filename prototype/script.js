import { createMap } from "./random_placement.js";

document.getElementById("generation_config").onsubmit = function () {
  event.preventDefault();

  var rows = parseInt(document.getElementById("rows").value);
  var cols = parseInt(document.getElementById("cols").value);
  var size = parseInt(document.getElementById("size").value);
  createMap(rows, cols, size);
};
