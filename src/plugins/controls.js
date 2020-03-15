import { dragDrop } from '../libs/utils';

export class Controls {
  constructor(freeTransform) {
    this.freeTransform = freeTransform;
  }

  addControls () {
    let i = 0;
    let s = '';
    let top;
    let left;
    const t = [0, 1, 2, 2, 2, 1, 0, 0];
    let point;
    const offset = 5;

    this.controls = document.createElement('div');
    this.controls.className = 'ft-controls';

    // build html for controls
    for (; i < 8; i++) {
      top = (t[i] * this.freeTransform.height) / 2 + this.freeTransform.top;
      left = (t[(i + 6) % 8] * this.freeTransform.width) / 2 + this.freeTransform.left;

      s += '<div class="ft-' + i + '" draggable="false" style="top: ' +
        (top - offset) + 'px; left: ' +
        (left - offset) + 'px" title="' + i + '"></div>';
    }

    this.controls.innerHTML = s;
    this.freeTransform.el.parentNode.insertBefore(this.controls, this.freeTransform.el);
    this.points = this.controls.childNodes;


    for (i = 0; i < 8; i++) {
      point = this.points[i];

      // Set initial offset of controls
      point.setAttributeNS(null, 'iLeft', point.offsetLeft);
      point.setAttributeNS(null, 'iTop', point.offsetTop);

      // Enable dnd
      dragDrop.initElement(this.points[i]);
    }
  };


  addEvents () {
    const events = {
      dragstart2: this.handleDragStart.bind(this),
      drag2: this.handleDrag.bind(this)
    };

    const handler = (event) => {
      const el = event.target;
      const index = parseInt(el.className.substring(3), 10);
      events[event.type](event, el, index);
    };

    this.controls.addEventListener('dragstart2', handler, false);
    this.controls.addEventListener('drag2', handler, false);
  };


  handleDragStart (e, el, index) {
    const getPoint = (i) => {
      const v = this.points[(index + i) % 8];
      return [v, v.offsetLeft, v.offsetTop];
    };

    this.dragPoints = {
      oneBefore: getPoint(7),
      oneAfter: getPoint(1),
      twoBefore: getPoint(6),
      twoAfter: getPoint(2),
      threeBefore: getPoint(5),
      threeAfter: getPoint(3),
    };
  };


  handleDrag (e, el, index) {

    if (e.preventDefault) e.preventDefault();
    if (e.stopPropogation) e.stopPropogation();

    let point;
    let newPoints = [];
    const points = this.points;
    let i = 0;
    const len = points.length / 2;
    let s;

    const setVal = (el, b, c) => {
      el.style.top = parseInt(((b.offsetTop + c.offsetTop) / 2), 10) + 'px';
      el.style.left = parseInt(((b.offsetLeft + c.offsetLeft) / 2), 10) + 'px';
    };

    var oneBefore = points[(index + 7) % 8],
      oneAfter = points[(index + 1) % 8],
      twoBefore = points[(index + 6) % 8],
      twoAfter = points[(index + 2) % 8],
      threeBefore = points[(index + 5) % 8],
      threeAfter = points[(index + 3) % 8];

    if (index % 2 === 0) {
      // drag corner

      setVal(oneBefore, twoBefore, el);
      setVal(oneAfter, twoAfter, el);

    } else {
      // drag side

      this.setCornerPosition(this.dragPoints.oneBefore, e.data.dY, e.data.dX);
      this.setCornerPosition(this.dragPoints.oneAfter, e.data.dY, e.data.dX);

      setVal(twoBefore, oneBefore, threeBefore);
      setVal(twoAfter, oneAfter, threeAfter);
    }


    // put new coordinates
    for (; i < len; i++) {
      point = points[i * 2];
      newPoints.push([
        point.offsetLeft - point.getAttributeNS(null, 'iLeft'),
        point.offsetTop - point.getAttributeNS(null, 'iTop')
      ]);
    }

    s = this.freeTransform.to(newPoints);
    if (this.params.el) this.params.el.innerHTML = s;
    return true;
  };


  setCornerPosition (arr, t, l) {
    const el = arr[0];
    const left = arr[1];
    const top = arr[2];

    el.style.top = (top + t) + 'px';
    el.style.left = (left + l) + 'px';
  };


  // extend FreeTransform
  init (params) {
    if (!this.freeTransform.el || this.freeTransform.el && this.freeTransform.el.parentNode.querySelector('.ft-controls')) return;
    this.params = params;

    this.addControls();
    this.addEvents();

    return this;
  };

  // TODO: removeControls
  reset () {

  }
}



