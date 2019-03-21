document.getElementById('minify').onclick = () => {
  let a, b, c, d;
  const input = document.getElementById('input').value.replace(/#/g, '||').replace(/&/g, '&&');

  document.getElementById('log').innerText = '';
  document.getElementById('log').append('LOG\ndcba Z ID\n');

  try {
    for (let i = 0; i < 16; i++) {
      const currentBinary = (i >>> 0).toString(2);
      // fill binary number with leading zeros until it is 4 digits long
      const filledBinary = currentBinary.length >= 4 ? currentBinary : new Array(4 - currentBinary.length + 1).join('0') + currentBinary;
      a = filledBinary[3] === '1';
      b = filledBinary[2] === '1';
      c = filledBinary[1] === '1';
      d = filledBinary[0] === '1';
      document.getElementById('log').append(`${filledBinary} ${eval(input) ? '1' : '0'} ${document.getElementById(i + 1).getAttribute('data-id')}\n`);
      document.getElementById(i + 1).innerText = eval(input) ? '1' : '0';
    }
  } catch (err) {
    console.error(err);
    alert('Oh, da ist wohl was schiefgelaufen, bitte probieren Sie es noch einmal :)');
  }
};
