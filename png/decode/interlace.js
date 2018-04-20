// Adam 7
//   0 1 2 3 4 5 6 7
// 0 1 6 4 6 2 6 4 6
// 1 7 7 7 7 7 7 7 7
// 2 5 6 5 6 5 6 5 6
// 3 7 7 7 7 7 7 7 7
// 4 3 6 4 6 3 6 4 6
// 5 7 7 7 7 7 7 7 7
// 6 5 6 5 6 5 6 5 6
// 7 7 7 7 7 7 7 7 7

const imagePasses = [
  { // pass 1 - 1px
    x: [0],
    y: [0],
  },
  { // pass 2 - 1px
    x: [4],
    y: [0],
  },
  { // pass 3 - 2px
    x: [0, 4],
    y: [4],
  },
  { // pass 4 - 4px
    x: [2, 6],
    y: [0, 4],
  },
  { // pass 5 - 8px
    x: [0, 2, 4, 6],
    y: [2, 6],
  },
  { // pass 6 - 16px
    x: [1, 3, 5, 7],
    y: [0, 2, 4, 6],
  },
  { // pass 7 - 32px
    x: [0, 1, 2, 3, 4, 5, 6, 7],
    y: [1, 3, 5, 7],
  },
];

exports.getImagePasses = function(width, height) {
  const images = [];
  const xLeftOver = width % 8;
  const yLeftOver = height % 8;
  const xRepeats = (width - xLeftOver) / 8;
  const yRepeats = (height - yLeftOver) / 8;
  for (let i = 0; i < imagePasses.length; i++) {
    const pass = imagePasses[i];
    let passWidth = xRepeats * pass.x.length;
    let passHeight = yRepeats * pass.y.length;
    for (let j = 0; j < pass.x.length; j++) {
      if (pass.x[j] < xLeftOver) {
        passWidth++;
      } else {
        break;
      }
    }
    for (let j = 0; j < pass.y.length; j++) {
      if (pass.y[j] < yLeftOver) {
        passHeight++;
      } else {
        break;
      }
    }
    if (passWidth > 0 && passHeight > 0) {
      images.push({ width: passWidth, height: passHeight, index: i });
    }
  }
  return images;
};

exports.getInterlaceIterator = function(width) {
  return function(x, y, pass) {
    const outerXLeftOver = x % imagePasses[pass].x.length;
    const outerX = (((x - outerXLeftOver) / imagePasses[pass].x.length) * 8) + imagePasses[pass].x[outerXLeftOver];
    const outerYLeftOver = y % imagePasses[pass].y.length;
    const outerY = (((y - outerYLeftOver) / imagePasses[pass].y.length) * 8) + imagePasses[pass].y[outerYLeftOver];
    return (outerX * 4) + (outerY * width * 4);
  };
};
