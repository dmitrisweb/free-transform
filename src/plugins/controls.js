(function (Utils) {
  'use strict';

  if (!this || !Utils) return;

  /*----------------------------------------------------------------*/
  /* Private
  /*----------------------------------------------------------------*/

  var This, oParams = {};

  var addControls = function () {
    var i = 0,
      s = '',
      top, left,
      t = [0, 1, 2, 2, 2, 1, 0, 0],
      point,
      offset = 5;

    This.controls = document.createElement('div');
    This.controls.className = 'ft-controls';

    // build html for controls
    for (; i < 8; i++) {
      top = (t[i] * This.height) / 2 + This.top;
      left = (t[(i + 6) % 8] * This.width) / 2 + This.left;

      s += '<div class="ft-' + i + '" draggable="false" style="top: ' +
        (top - offset) + 'px; left: ' +
        (left - offset) + 'px" title="' + i + '"></div>';
    }

    This.controls.innerHTML = s;
    This.el.parentNode.insertBefore(This.controls, This.el);
    This.points = This.controls.childNodes;


    for (i = 0; i < 8; i++) {
      point = This.points[i];

      // Set initial offset of controls
      point.setAttributeNS(null, 'iLeft', point.offsetLeft);
      point.setAttributeNS(null, 'iTop', point.offsetTop);

      // Enable dnd
      Utils.dnd.initElement(This.points[i]);
    }
  };


  var addEvents = function () {
    var events = {
        dragstart2: handleDragStart,
        drag2: handleDrag
      },

      handler = function (e) {
        var el = e.target;
        var index = parseInt(el.className.substring(3), 10);
        events[e.type](e, el, index);
      };

    This.controls.addEventListener('dragstart2', handler, false);
    This.controls.addEventListener('drag2', handler, false);

  };


  var handleDragStart = function (e, el, index) {

    var points = This.points,
      getPoint = function (i) {
        var v = points[(index + i) % 8];
        return [v, v.offsetLeft, v.offsetTop];
      };

    This.dragPoints = {
      oneBefore: getPoint(7),
      oneAfter: getPoint(1),
      twoBefore: getPoint(6),
      twoAfter: getPoint(2),
      threeBefore: getPoint(5),
      threeAfter: getPoint(3)
    };
  };


  var handleDrag = function (e, el, index) {

    if (e.preventDefault) e.preventDefault();
    if (e.stopPropogation) e.stopPropogation();

    var point,
      newPoints = [],
      points = This.points,
      i = 0,
      len = points.length / 2,
      s;

    var setVal = function (el, b, c) {
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

      setCornerPosition(This.dragPoints.oneBefore, e.data.dY, e.data.dX);
      setCornerPosition(This.dragPoints.oneAfter, e.data.dY, e.data.dX);

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

    s = This.to(newPoints);
    if (oParams.el) oParams.el.innerHTML = s;
    return true;
  };


  var setCornerPosition = function (arr, t, l) {
    var el = arr[0],
      left = arr[1],
      top = arr[2];

    el.style.top = (top + t) + 'px';
    el.style.left = (left + l) + 'px';
  };




  /*----------------------------------------------------------------*/
  /* Public
  /*----------------------------------------------------------------*/

  // extend FreeTransform
  this.prototype.enableControls = function (params) {
    if (!this.el || this.el && this.el.parentNode.querySelector('.ft-controls')) return;
    This = this;
    oParams = params;
    addControls();
    addEvents();

    return this;
  };

  // TODO: removeControls
  this.prototype.removeControls = function () {

  }


}).call(window.FreeTransform, window.utils);
