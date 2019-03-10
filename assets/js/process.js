/**
 * Fill the diagram with 1s and 0s (animated)
 */
document.getElementById('fill').onclick = () => {
  document.getElementById('combine').style.display = 'block';
  const elements = document.getElementsByClassName('output');

  // reset diagram
  for (let i = 0; i < elements.length; i++) {
    document.getElementById(i + 1).innerText = '';
  }

  // fill diagram
  for (let i = 0; i < elements.length; i++) {
    ((ind) => { // awesome animation
      setTimeout(() => {
        document.getElementById(i + 1).innerText = elements[i].classList.contains('true') ? '1' : '0';
      }, 150 * ind)
    })(i)
  }
};

/**
 * Combining fields to blocks (animated)
 */
document.getElementById('combine').onclick = () => {
  document.getElementById('fill').style.display = 'none';
  document.getElementById('combine').innerText = 'Weiter';
  const steps = document.getElementById('steps');
  const elements = document.getElementsByClassName('grid-child');

  // mark truthy values
  steps.insertAdjacentHTML('beforeend', '<li>Finden von wahren Werten (grün markiert)</li>');
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].getAttribute('id') !== null && elements[i].innerText === '1') {
      elements[i].style.background = 'lightgreen'
    }
  }

  // combine fields - stage 1
  document.getElementById('combine').onclick = () => {
    steps.insertAdjacentHTML('beforeend', '<li>Felder zu Blöcken zusammenfassen <ul id="field_dnf"></ul></li>');
    const fieldDnf = document.getElementById('field_dnf');

    // reset field color
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.background = 'white'
    }

    document.getElementById('3').style.background = 'green';
    document.getElementById('4').style.background = 'green';
    document.getElementById('11').style.background = 'green';
    document.getElementById('12').style.background = 'green';

    fieldDnf.insertAdjacentHTML('beforeend', '<li data-contrast style="color: green">(E<sub>2</sub>&and;<span class="not">E<sub>3</sub></span>)</li>');

    // combine fields - stage 2
    document.getElementById('combine').onclick = () => {
      document.getElementById('11').style.background = 'linear-gradient(to top right, blue, green)';
      document.getElementById('15').style.background = 'blue';

      fieldDnf.insertAdjacentHTML('beforeend', '<li data-contrast style="color: blue">(<span class="not">E<sub>1</sub></span>&and;E<sub>2</sub>&and;E<sub>4</sub>)</li>');

      // combine fields - stage 3
      document.getElementById('combine').onclick = () => {
        document.getElementById('6').style.background = 'orange';

        fieldDnf.insertAdjacentHTML('beforeend',
          '<li data-contrast style="color: orange">(E<sub>1</sub>&and;<span class="not">E<sub>2</sub></span>&and;E<sub>3</sub><span class="not">E<sub>4</sub></span>)</li>');

        document.getElementById('combine').style.display = "none";
      }
    };
  };
};

/**
 * Scroll up magic
 */
const button = document.getElementById('up');
const options = {top: 0, left: 0, behavior: 'smooth'};
button.addEventListener('click', () => {
  window.scroll(options)
});
