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


(function(Matrix){
    'use strict';

    /* getVendorPrefix by http://davidwalsh.name/vendor-prefix */

    var prefix = (function () {
        var styles = window.getComputedStyle(document.documentElement, ''),
            pre = (Array.prototype.slice
                .call(styles)
                .join('')
                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
            )[1],
            dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
        return {
            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };
    })();


/*----------------------------------------------------------------*/
/* Constructor
/*----------------------------------------------------------------*/

    var FreeTransform = function (el){

        if(el && el.offsetWidth) {
            var t = el.offsetTop,
                l = el.offsetLeft,
                w = el.offsetWidth,
                h = el.offsetHeight;

            this.el = el;
            this.width = w;
            this.height = h;
            this.left = l;
            this.top = t;
            this.startPoints = [[0, 0], [0, h], [w, h], [w, 0]];

            this.prefix = prefix.js;
            this.el.style[this.prefix + 'TransformOrigin'] = '0 0';
            this.el.style[this.prefix + 'Perspective'] = '0';

            return this;
        }
    };

    var FT = FreeTransform.prototype;


/*----------------------------------------------------------------*/
/* Private
/*----------------------------------------------------------------*/

    var getValues = function(points, startPoints){
        var i = 0,
            len = points.length;
        for (; i < len ; i++) {
            points[i] = [
                points[i][0] + startPoints[i][0],
                points[i][1] + startPoints[i][1]
            ];
        }

        return points;
    };



/*----------------------------------------------------------------*/
/* Public
/*----------------------------------------------------------------*/

    FT.prefix = prefix;

    FT.getTransformationMatrix = function(points){
        var m1 = this.startPoints,
            i = 0, len = 4,
            aM = [], aL = [],
            M, Mi, X,
            m2 = getValues(points, this.startPoints);

        // do magic
        for(;i<len;i++){
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


    FT.getMatrixValues = function(points){
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


    FT.getCssValue = function(m){

        if(!(m && m.length)) return;

        // normalize values for CSS
        m = m.map(function(val){
            return parseFloat(val.toFixed(6)).toString();
        });

        return 'matrix3d(' + (m.join(', ')) + ')';
    };


    FT.to = function(points){
        var m = this.getMatrixValues(points),
            s = this.getCssValue(m);

        this.el.style[this.prefix + 'Transform'] = s;
        return s;
    };


    FT.reset = function(){
        this.el.style[this.prefix + 'Transform'] = null;
    };


    window.FreeTransform = FreeTransform;

})(window.$M);

