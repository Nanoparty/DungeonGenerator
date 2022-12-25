//import tile1 from "./tile1.png";

const Tile = {
  Wall: 0,
  Floor: 1,
  Void: 2,
};

var Map = [];

var img1 = new Image();
img1.src = "tile1.png";
// const LionImage = () => {
//   const [image] = useImage("https://konvajs.org/assets/lion.png");
//   return <Image image={image} />;
// };

function CreateMap(rows, cols, size) {
  console.log("Creating Random Placement Dungeon");
  // var img1 = new Image();
  // img1.src = "tile1.png";

  // img1.onload = function () {
  //   console.log("Image loaded");
  //   var canvas = document.getElementById("myCanvas");
  //   var ctx = canvas.getContext("2d");
  //   ctx.drawImage(img1, 0, 0, 100, 100);
  //   console.log(img1);
  // };

  Map = [];
  //   var minRooms = parseInt(document.getElementById("min_rooms").value);
  //   var maxRooms = parseInt(document.getElementById("max_rooms").value);
  //   var minWidth = parseInt(document.getElementById("min_width").value);
  //   var maxWidth = parseInt(document.getElementById("max_width").value);
  //   var minHeight = parseInt(document.getElementById("min_height").value);
  //   var maxHeight = parseInt(document.getElementById("max_height").value);

  var minRooms = 5;
  var maxRooms = 10;
  var minWidth = 5;
  var maxWidth = 10;
  var minHeight = 5;
  var maxHeight = 10;

  console.log(
    `${minRooms}-${maxRooms}-${minWidth}-${maxWidth}-${minHeight}-${maxHeight}`
  );

  // Fill Map with void tiles
  for (var r = 0; r < rows; r++) {
    Map.push([]);
    for (var c = 0; c < cols; c++) {
      Map[r].push(Tile.Void);
    }
  }

  //console.log(Map);

  var width = cols * size;
  var height = rows * size;
  drawGrid(width, height, "myCanvas", size);

  Generate(
    rows,
    cols,
    size,
    minRooms,
    maxRooms,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight
  );
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

async function Generate(
  rows,
  cols,
  size,
  minRooms,
  maxRooms,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight
) {
  console.log(`Gen minWidth:${minWidth} maxWidth:${maxWidth}`);
  var roomCount = Math.floor(Math.random() * (maxRooms - minRooms)) + minRooms;
  var rooms = [];

  for (let i = 0; i < roomCount; i++) {
    var roomWidth =
      Math.floor(Math.random() * (maxWidth - minWidth)) + minWidth;
    console.log(`Gen minWidth:${minHeight} maxWidth:${maxHeight}`);
    var roomHeight =
      Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
    console.log("ROOM HEIGHT " + roomHeight);
    var col = Math.floor(Math.random() * (cols - roomWidth));
    var row = Math.floor(Math.random() * (rows - roomHeight));

    rooms.push({
      width: roomWidth,
      height: roomHeight,
      col: col,
      row: row,
    });

    drawRoom(row, col, roomWidth, roomHeight, size, "#000000");
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  GenerateHallways(rooms, size, "#000000");
}

function drawRoom(row, col, width, height, size, color) {
  for (let c = col + 1; c < col + width - 1; c++) {
    for (let r = row + 1; r < row + height - 1; r++) {
      Map[r][c] = Tile.Floor;
      drawRect(r, c, size, color);
    }
  }
  // Room Borders
  for (let r = row; r < row + height; r++) {
    if (Map[r][col] === Tile.Void) {
      Map[r][col] = Tile.Wall;
      drawRect(r, col, size, "#FFFFFF");
    }
    if (Map[r][col + width - 1] === Tile.Void) {
      Map[r][col + width - 1] = Tile.Wall;
      drawRect(r, col + width - 1, size, "#FFFFFF");
    }
  }
  for (let c = col; c < col + width; c++) {
    if (Map[row][c] === Tile.Void) {
      Map[row][c] = Tile.Wall;
      drawRect(row, c, size, "#FFFFFF");
    }
    if (Map[row + height - 1][c] == Tile.Void) {
      Map[row + height - 1][c] = Tile.Wall;
      drawRect(row + height - 1, c, size, "#FFFFFF");
    }
  }
}

async function GenerateHallways(rooms, size, color) {
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
          Map[r][startingCol] = Tile.Floor;
          drawRect(r, startingCol, size, color);
          HallwayWalls(r, startingCol, "verticle", size);
          finishRow = r;
        }
        HallwayWalls(finishRow + 1, startingCol, "verticle", size);
      } else {
        console.log("Going Down");
        for (var r = startingRow; r > startingRow - vDis; r--) {
          Map[r][startingCol] = Tile.Floor;
          drawRect(r, startingCol, size, color);
          HallwayWalls(r, startingCol, "verticle", size);
          finishRow = r;
        }
        HallwayWalls(finishRow - 1, startingCol, "verticle", size);
      }

      // Calculate Horizontal Hallway
      if (startingCol < endingCol) {
        console.log("Going Right");
        for (var c = startingCol; c < startingCol + hDis; c++) {
          Map[finishRow][c] = Tile.Floor;
          drawRect(finishRow, c, size, color);
          HallwayWalls(finishRow, c, "horizontal", size);
        }
      } else {
        console.log("Going Left");
        for (var c = startingCol; c > startingCol - hDis; c--) {
          Map[finishRow][c] = Tile.Floor;
          drawRect(finishRow, c, size, color);
          HallwayWalls(finishRow, c, "horizontal", size);
        }
      }
    } else {
      console.log("Horizontal First");
      // Calculate Horizontal Hallway
      var finishCol;
      if (startingCol < endingCol) {
        for (var c = startingCol; c < startingCol + hDis; c++) {
          Map[startingRow][c] = Tile.Floor;
          drawRect(startingRow, c, size, color);
          HallwayWalls(startingRow, c, "horizontal", size);
          finishCol = c;
        }
        HallwayWalls(startingRow, finishCol + 1, "horizontal", size);
      } else {
        for (var c = startingCol; c > startingCol - hDis; c--) {
          Map[startingRow][c] = Tile.Floor;
          drawRect(startingRow, c, size, color);
          HallwayWalls(startingRow, c, "horizontal", size);
          finishCol = c;
        }
        HallwayWalls(startingRow, finishCol - 1, "horizontal", size);
      }

      // Calculate Verticle Hallway
      if (startingRow < endingRow) {
        for (var r = startingRow; r < startingRow + vDis; r++) {
          Map[r][finishCol] = Tile.Floor;
          drawRect(r, finishCol, size, color);
          HallwayWalls(r, finishCol, "verticle", size);
        }
      } else {
        for (var r = startingRow; r > startingRow - vDis; r--) {
          Map[r][finishCol] = Tile.Floor;
          drawRect(r, finishCol, size, color);
          HallwayWalls(r, finishCol, "verticle", size);
        }
      }
    }

    startingRow = endingRow;
    startingCol = endingCol;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

function HallwayWalls(row, col, dir, size) {
  if (dir === "verticle") {
    var leftRow = row;
    var leftCol = col - 1;
    var rightRow = row;
    var rightCol = col + 1;

    if (Map[leftRow][leftCol] === Tile.Void) {
      Map[leftRow][leftCol] = Tile.Wall;
      drawRect(leftRow, leftCol, size, "#FFFFFF");
    }
    if (Map[rightRow][rightCol] === Tile.Void) {
      Map[rightRow][rightCol] = Tile.Wall;
      drawRect(rightRow, rightCol, size, "#FFFFFF");
    }
  } else if (dir === "horizontal") {
    var topRow = row - 1;
    var topCol = col;
    var bottomRow = row + 1;
    var bottomCol = col;

    if (Map[topRow][topCol] === Tile.Void) {
      Map[topRow][topCol] = Tile.Wall;
      drawRect(topRow, topCol, size, "#FFFFFF");
    }
    if (Map[bottomRow][bottomCol] === Tile.Void) {
      Map[bottomRow][bottomCol] = Tile.Wall;
      drawRect(bottomRow, bottomCol, size, "#FFFFFF");
    }
  }
}

function drawRect(row, col, size, color) {
  const canvas = document.getElementById("myCanvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    var x = col * size;
    var y = row * size;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    DrawImage(x, y, size, size);
  }
}

function DrawImage(x, y, width, height) {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img1, x, y, width, height);
}

function ImageLoad(img, x, y, width, height) {}

export default CreateMap;
