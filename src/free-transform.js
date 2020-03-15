/*
 *  ----------------------------------------------------------------
 *  Version 0.1.0
 *  Author : Dmitry Smirnov <dmitri.smirnov@gmail.com> (http://smirnovz.com)
 *  Filename : free-transform.js
 * ----------------------------------------------------------------
 *  Title
 * ----------------------------------------------------------------
 *  Description:
 *
 * ----------------------------------------------------------------
 *
 * Usage :
 *
 *  initialization          : ft = new FreeTransform(HTMLElement)
 *  apply transformation    : ft.to();
 *  reset transformation    : ft.reset();
 *
 */

const Matrix = window.$M;
import { vendorPrefix as prefix } from './libs/vendor-prefix';


export class FreeTransform {

  constructor (el) {
    if (!el || !el.offsetWidth) return;

    this.el = el;
    this.width = el.offsetWidth;
    this.height = el.offsetHeight;
    this.left = el.offsetLeft;
    this.top = el.offsetTop;
    this.startPoints = [
      [0, 0],
      [0, this.height],
      [this.width, this.height],
      [this.width, 0]
    ];

    this.prefix = prefix.js;
    this.el.style[this.prefix + 'TransformOrigin'] = '0 0';
    this.el.style[this.prefix + 'Perspective'] = '0';
    this.el.classList.add('ft-enabled');
  }

  getValues (points, startPoints) {
    let i = 0;
    const len = points.length;

    for (; i < len; i++) {
      points[i] = [
        points[i][0] + startPoints[i][0],
        points[i][1] + startPoints[i][1]
      ];
    }
    return points;
  };


  getTransformationMatrix (points) {
    var m1 = this.startPoints,
      i = 0,
      len = 4,
      aM = [],
      aL = [],
      M, Mi, X,
      m2 = this.getValues(points, this.startPoints);

    // do magic
    for (; i < len; i++) {
      aM.push([m1[i][0], m1[i][1], 1, 0, 0, 0, -m1[i][0] * m2[i][0], -m1[i][1] * m2[i][0]]);
      aM.push([0, 0, 0, m1[i][0], m1[i][1], 1, -m1[i][0] * m2[i][1], -m1[i][1] * m2[i][1]]);
      aL.push([m2[i][0]]);
      aL.push([m2[i][1]]);
    }

    // create matrix
    M = new Matrix(aM);

    // inverse matrix
    Mi = M.inverse();

    // multiply
    X = Mi ? Mi.multiply(new Matrix(aL)) : null;

    return X;
  };


  getMatrixValues (points) {
    var tM = this.getTransformationMatrix(points),
      t = function (i) {
        var val = tM ? tM.e(i, 1) : 0;
        return val;
      },
      m = [
        t(1), t(4), 0, t(7),
        t(2), t(5), 0, t(8),
        0, 0, 1, 0,
        t(3), t(6), 0, 1
      ];
    return m;
  };


  getCssValue (m) {
    if (!(m && m.length)) return;

    // normalize values for CSS
    m = m.map(function (val) {
      return parseFloat(val.toFixed(6)).toString();
    });

    return 'matrix3d(' + (m.join(', ')) + ')';
  };


  to (points) {
    const m = this.getMatrixValues(points);
    const s = this.getCssValue(m);

    this.el.style[this.prefix + 'Transform'] = s;
    return s;
  };


  reset () {
    this.el.style[this.prefix + 'Transform'] = null;
    this.el.classList.remove('ft-enabled');
  };

};


window.FreeTransform = FreeTransform;

