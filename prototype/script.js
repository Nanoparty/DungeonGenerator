function createMap(rows, cols, size) {
  var width = cols * size;
  var height = rows * size;
  drawGrid(width, height, "myCanvas", size);
  Generate(rows, cols, size, 18, 20, 5, 15, 5, 15);
}

var drawGrid = function (w, h, id, size) {
  var canvas = document.getElementById(id);
  var ctx = canvas.getContext("2d");
  ctx.canvas.width = w;
  ctx.canvas.height = h;

  var data = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="smallGrid" width="${size}" height="${size}" patternUnits="userSpaceOnUse"> \
                <path d="M ${size} 0 L 0 0 0 ${size}" fill="none" stroke="gray" stroke-width="0.5" /> \
            </pattern> \
            <pattern id="grid" width="${size * 10}" height="${
    size * 10
  }" patternUnits="userSpaceOnUse"> \
                <rect width="${size * 10}" height="${
    size * 10
  }" fill="url(#smallGrid)" /> \
                <path d="M ${size * 10} 0 L 0 0 0 ${
    size * 10
  }" fill="none" stroke="gray" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#smallGrid)" /> \
    </svg>`;

  var DOMURL = window.URL || window.webkitURL || window;

  var img = new Image();
  var svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
  var url = DOMURL.createObjectURL(svg);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);
  };
  img.src = url;
};

function Generate(
  rows,
  cols,
  size,
  minRooms,
  maxRooms,
  minWidth,
  maxWidth,
  minHeight,
  maxheight
) {
  var roomCount = Math.floor(Math.random() * (maxRooms - minRooms)) + minRooms;
  var rooms = [];

  //console.log("Rooms:" + roomCount);
  //console.log("width:" + minWidth + ":" + maxWidth);

  for (let i = 0; i < roomCount; i++) {
    roomWidth = Math.floor(Math.random() * (maxWidth - minWidth)) + minWidth;
    roomHeight =
      Math.floor(Math.random() * (maxheight - minHeight)) + minHeight;
    col = Math.floor(Math.random() * (cols - roomWidth));
    row = Math.floor(Math.random() * (rows - roomHeight));

    rooms.push({
      width: roomWidth,
      height: roomHeight,
      col: col,
      row: row,
    });

    drawRoom(row, col, roomWidth, roomHeight, size, "#000000");
  }

  GenerateHallways(rooms, size, "#000000");
}

function drawRoom(row, col, width, height, size, color) {
  //console.log("Draw Room:" + row + ":" + col + ":" + width + ":" + height);
  //drawRect(row, col, size);
  for (let c = col; c < col + width; c++) {
    for (let r = row; r < row + height; r++) {
      drawRect(r, c, size, color);
    }
  }
}

function GenerateHallways(rooms, size, color) {
  //console.log("Generate Hallways. Rooms: " + rooms.length);
  var startingRow = rooms[0].row + Math.floor(rooms[0].height / 2);
  var startingCol = rooms[0].col + Math.floor(rooms[0].width / 2);

  for (let i = 1; i < rooms.length; i++) {
    var endingRow = rooms[i].row + Math.floor(rooms[i].height / 2);
    var endingCol = rooms[i].col + Math.floor(rooms[i].width / 2);

    var vDis = Math.abs(startingRow - endingRow);
    var hDis = Math.abs(startingCol - endingCol);

    console.log(
      `Hallway ${i}: from ${startingRow}:${startingCol} to ${endingRow}:${endingCol}`
    );

    if (vDis > hDis) {
      console.log("Verticle First");
      // Calculate Verticle Hallway
      var finishRow;
      if (startingRow < endingRow) {
        console.log("Going Up");
        for (var r = startingRow; r < startingRow + vDis; r++) {
          drawRect(r, startingCol, size, color);
          finishRow = r;
        }
      } else {
        console.log("Going Down");
        for (var r = startingRow; r > startingRow - vDis; r--) {
          drawRect(r, startingCol, size, color);
          finishRow = r;
        }
      }

      // Calculate Horizontal Hallway
      if (startingCol < endingCol) {
        console.log("Going Right");
        for (var c = startingCol; c < startingCol + hDis; c++) {
          drawRect(finishRow, c, size, color);
        }
      } else {
        console.log("Going Left");
        for (var c = startingCol; c > startingCol - hDis; c--) {
          drawRect(finishRow, c, size, color);
        }
      }
    } else {
      console.log("Horizontal First");
      // Calculate Horizontal Hallway
      var finishCol;
      if (startingCol < endingCol) {
        for (var c = startingCol; c < startingCol + hDis; c++) {
          drawRect(startingRow, c, size, color);
          finishCol = c;
        }
      } else {
        for (var c = startingCol; c > startingCol - hDis; c--) {
          drawRect(startingRow, c, size, color);
          finishCol = c;
        }
      }

      // Calculate Verticle Hallway
      if (startingRow < endingRow) {
        for (var r = startingRow; r < startingRow + vDis; r++) {
          drawRect(r, finishCol, size, color);
        }
      } else {
        for (var r = startingRow; r > startingRow - vDis; r--) {
          drawRect(r, finishCol, size, color);
        }
      }
    }

    startingRow = endingRow;
    startingCol = endingCol;
  }
}

function drawRect(row, col, size, color) {
  //console.log("Draw Rect:" + row + ":" + col);
  const canvas = document.getElementById("myCanvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    var x = col * size;
    var y = row * size;
    //console.log(y + ":" + x);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
  }
}

createMap(100, 100, 8);

//drawRect(0, 2, 16);
