// import {Sylvester} from 'sylvester';

window.addEventListener('DOMContentLoaded', () => {

  const cssVal = document.getElementById('cssVal');
  // const bar = document.getElementById('bar');
  // const area = document.getElementById('area');
  // const test = document.getElementsByClassName('ft-test')[0];

  const el = document.querySelector('.freeTransform');

  console.log('freeTransform', el, cssVal);

  const ft = new FreeTransform(el);
  // ft.enableControls({el:cssVal});

  ft.to([[0,0], [100, -100], [40, 0], [0, 0]]);
  //ft.reset();

  //console.log(ft);

});

