// declare button event
document.getElementById('input').onkeyup = () => {
  // declare variables
  let a, b, c, d;
  const matrix = [[], [], [], []];

  // replace input so it matches js boolean operators
  const input = document.getElementById('input').value.replace(/#/g, '||').replace(/&/g, '&&');

  // some logging..
  document.getElementById('log').innerText = '';
  document.getElementById('log').append('Wahrheitstabelle\n');
  document.getElementById('log').append('----------------\n');
  document.getElementById('log').append('d c b a | Z | ID\n');
  document.getElementById('log').append('----------------\n');

  try {
    // fill kv diagram
    for (let i = 0; i < 16; i++) {
      const currentBinary = (i >>> 0).toString(2);
      // fill binary number with leading zeros until it is 4 digits long
      const filledBinary = currentBinary.length >= 4 ? currentBinary : new Array(4 - currentBinary.length + 1).join('0') + currentBinary;
      a = filledBinary[3] === '1';
      b = filledBinary[2] === '1';
      c = filledBinary[1] === '1';
      d = filledBinary[0] === '1';
      document.getElementById('log').append(`${filledBinary.split('').join(' ')} | ${eval(input) ? '1' : '0'} | ${document.getElementById(i + 1).getAttribute('data-id')}\n`);
      document.getElementById(i + 1).innerText = eval(input) ? '1' : '0';
    }

    // merge grid with matrix (2D array)
    document.querySelectorAll('[data-id]').forEach(element => {
      element.style.background = 'white';
      let rowNumber = (element.getAttribute('data-id') / 4 - 0.1).toString();
      rowNumber = rowNumber.substring(0, rowNumber.indexOf('.'));
      matrix[rowNumber].push(parseInt(element.innerText, 2));
    });

    // algorithm for finding truthy matrix neighbours
    // inspired by https://stackoverflow.com/a/652123
    const matrixMarks = [];
    matrix.forEach((columns, i) => {
      columns.forEach((items, j) => {
        const rowLimit = matrix.length - 1;
        const columnLimit = matrix[0].length - 1;
        for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
          for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
            if ((x !== i || y !== j) && matrix[x][y] !== 0 && matrix[i][j] !== 0) {
              console.log(`Truthy neighbour of ${i}|${j} is ${x}|${y}`);
              matrixMarks[`${x}|${y}`] = matrixMarks[`${x}|${y}`] ? matrixMarks[`${x}|${y}`] + 1 : 1;
            }
          }
        }
      })
    });

    // mark the truthy grid numbers according to the calculated percentage
    for (let coordinates in matrixMarks) {
      const x = parseInt(coordinates.substring(0, coordinates.indexOf("|")), 10);
      const y = parseInt(coordinates.split('|').pop(), 10);
      // to ensure that max opacity is used
      const opacity = (matrixMarks[coordinates] / 10 + (1 - Math.max.apply(null, Object.values(matrixMarks)) / 10));
      console.log('------');
      console.log(`Coordinates: x: ${x} y: ${y}`);
      console.log(`Opacity of element: ${opacity}`);
      console.log(`Element id: ${x * 4 + y + 1}`);
      console.log(`KV-based id: ${document.querySelector(`[data-id="${x * 4 + y + 1}"]`).getAttribute('id')}`);
      document.querySelector(`[data-id="${x * 4 + y + 1}"]`).style.background = `rgba(0, 100, 0, ${opacity})`;
    }

    console.log(matrixMarks);
    console.log(matrix);
  } catch (err) {
    console.error(err);
    //alert('Oh, da ist wohl was schiefgelaufen, bitte probieren Sie es noch einmal :)');
  }
};
