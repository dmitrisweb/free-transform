
/**
 * Returns routes array
 */
function getRoute() {
  let hash = document.location.hash;
  return (hash ? hash.replace('#', '') : '').split('/');
}

function setRoute() {
  const route = getRoute()[0];

  // reset active panel
  document.querySelectorAll('.router-panel').forEach(el =>
    el.classList.remove('current')
  );

  const selector = '.router-panel' + (route ? '.route-' + route : '');
  const panel = document.querySelector(selector);

  if (panel) {
    panel.classList.add('current');
    const element = panel.querySelector('.ft:not(.ft-enabled)');
    if (!element) return;

    const cssVal = document.getElementById('css-val');
    const ft = new FreeTransform(element);

    ft.enableControls({
      el: cssVal,
      onChange: (matrix, coordinates) => {
        console.log('onChange', matrix, coordinates);
      }
    });
    // ft.to([[0,0], [100, -100], [40, 0], [0, 0]]);
    // ft.reset();
  }
}

/// Set events
window.addEventListener('popstate', setRoute);
window.addEventListener('DOMContentLoaded', setRoute);
