import { jsMorph } from './jsMorph-0.4.0';
import { elasticEaseOut } from './easings-1.0';


var cssVal = document.getElementById('cssVal'),
    el = document.getElementsByClassName('ft-js-morph')[0],
    ft = new FreeTransform(el),
    onMorphInit = function(){

    },
    onMorph = function(obj, objStyle, time, frames, objSpeed, jsMorphSspeed, easeingFunction, objCssText){
        var tl = [parseInt(objStyle.top, 10),
                  parseInt(objStyle.left, 10)];
        // console.log(tl);
        ft.to([[0,0], [0,0], [0, 0], tl]);

    },
    onMorphEnd = function(){

    };


// ft.to([[0,0], [100, -100], [40, 0], [0, 0]]);


var myMorph = new jsMorph(el,
  {'top': '-100px', 'left': '100px'},
  {duration : 600},
  elasticEaseOut,
  onMorphInit,
  onMorph,
  onMorphEnd
);

el.onmouseout = el.onmouseover = function(e){
    el.backwards = (e.type == 'mouseout') ? true : false;
    myMorph.start(el);
}

console.log(myMorph);



