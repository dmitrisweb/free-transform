/*!
 * jsMorph JavaScript Library v0.4.0
 * http://jsMorph.com/
 *
 * Copyright 2011, Peter Dematté
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jsMorph.com/license
 *
 * Date: Mon Oct 24 14:12:28 2011 -0100
 */
 var jsMorph = function (obj, prop, params, ease, onMorphInit, onMorph, onMorphEnd) {
	var getInitProp = (function (obj, prop, duration, speed, onMorphInit, jsMorph) {
		var initProp = {}, dims, cS, fS, objStyle = obj.style, font, tmpStyle, moz, maxVal = 0, help, outside, pad = [], //  m = 0,is m++ plus reading from Array faster than reading from object (in anim()) ???
			// getDim = function (obj) {var dim = obj.getBoundingClientRect(); return [dim.right-dim.left,dim.bottom-dim.top,obj.offsetLeft,obj.offsetTop]},
			getDim = function (obj) {return [obj.offsetWidth, obj.offsetHeight, obj.offsetLeft, obj.offsetTop]},
			
			getStyle = function () {
				if (document.body.currentStyle) return function (obj, prop) {return obj.currentStyle[prop.replace(/\-(\w)/g, function(){return arguments[1].toUpperCase()})]}
				else return function (obj, prop) {return document.defaultView.getComputedStyle(obj,null).getPropertyValue(prop)}
			}(),
			
			units = function (obj) { // this usualy only happens with IE and OPERA
				var units = {}, oD, objStyle = obj.style, sniff = document.createElement('div'), sniffStyle = sniff.style;
				// unit sniffer -> get all units to px inside object
				sniffStyle.cssText = 'position:absolute;left:0;top:-10ex;width:10em;height:72pt;';
				obj.appendChild(sniff);
				oD = getDim(sniff).concat(getDim(obj));
				units = {em:oD[0]/10,pt:oD[1]/72, pc:oD[1]/6, 'in':oD[1], cm:oD[1]/2.54, mm:oD[1]/25.4, ex:Math.abs(oD[3])/10, '%font': oD[0]/1000, '%line': oD[0]/1000} // units as object is easyer to read out than array!! // , '%width':oD[4]/100, '%height':oD[5]/100
				
				// extra: sniff ex if font bigger in end state ... could be in extra function and only called if really needed
				sniffStyle.cssText += ';font-size:'+prop['font-size']+(prop['font-family'] ? ';font-family:'+prop['font-family'] : '')+';';
				oD = getDim(sniff);
				obj.removeChild(sniff);
				units['exn'] = Math.abs(oD[3]/10);
				
				// outer percentage meter ... could be in extra function and only called if really needed
				tmpStyle = objStyle.cssText;
				objStyle.cssText += ';position:absolute;left:0%;top:0%;';
				oD = getDim(obj);
				objStyle.cssText += ';left:-100%;top:-100%;'; // to avoid scrollbars
				oD = oD.concat(getDim(obj));
				objStyle.cssText = tmpStyle;
				units['%outX'] = (oD[2]-oD[6])/100;
				units['%outY'] = (oD[3]-oD[7])/100;
				return units;
			},
			
			unit2px = function (xS, n, dims) {
				if (xS[2] != 'px' && xS[2] != '') {
					if (xS[2] != '%') xS[1] *= dims[xS[2]];
					else if (!n.match(/^(font)/)) xS[1] *= n.match(/width|left|right|padding|margin|text-ind/) ? dims['%outX'] : dims['%outY']; // padding ?????
					else xS[1] *= dims['%'+n.split('-')[0]];
				}
			};
			
		obj.initStyle = obj.style.cssText; // original start state
		
		if (prop['font-size']) font = /([\-0-9\.]+)([a-z%]+)(!*)/.exec(prop['font-size']);
		
		for (var n in prop) { // faster if only px
			if (!(n.replace(/\-(\w)/g, function(){return arguments[1].toUpperCase()}) in objStyle)) {delete(prop[n]);continue} // take everything out that can't be rendered anyhow.. // how long does this take? Is it worth it?
			fS = /([\-0-9\.]+)([a-z%]*)(\s*!*)/.exec(prop[n]) || []; // future Style
			prop[n] = prop[n].toString().replace('!', ''); // put it back to normal
			cS = /([\-0-9\.]+)(\D*)/.exec(getStyle(obj, n.match(/^(padding|margin)$/) ? n+'-left' : n.match(/^(border-width)$/) ? 'border-left-width' : n.match(/(border-radius)$/) ? (moz = (n.match(/^(\-\w+\-)/)||['',''])[1])+'border-'+(moz == '-moz-' ? 'radius-topleft' : 'top-left-radius') : n)) || ['0px',0,'px']; // current style
			if (!cS[1] && n.match(/^(height|width)/)) { // IE and OPERA  // the following code has to go different %&§#*?uuaaaaahhhh
				objStyle.zoom = 1; // IE and OPERA doesn't react on obj.clientWidth/Height if auto or not set
				pad[0] = /([\-0-9\.]+)([a-z%]*)/.exec(getStyle(obj, 'padding-'+(n == 'width' ? 'left' : 'top')));
				pad[1] = /([\-0-9\.]+)([a-z%]*)/.exec(getStyle(obj, 'padding-'+(n == 'width' ? 'right' : 'bottom')));
				if((pad[0] && pad[0][2] != 'px') || (pad[1] && pad[1][2] != 'px')) {
					unit2px (pad[0], 'padding', dims || (dims = units(obj)));
					unit2px (pad[1], 'padding', dims);
				}
				cS = ['', (n=='width' ? obj.clientWidth : obj.clientHeight)-pad[0][n=='width' ? 0 : 1]-pad[1][n=='width' ? 0 : 1], 'px'];
			}
			
			if ((cS[2] && cS[2] != 'px') || (cS[2] != fS[2])) { // convert units... only if ...
				unit2px (cS, n, dims || (dims = units(obj)));
				unit2px (fS, n, dims);
				if (font && n != 'font-size') {
					if (fS[2] == 'em') fS[1] *= font[1]/(font[2] != 'em' ? dims['em'] : 1);
					if (fS[2] == 'ex') fS[1] *= dims['exn']/dims['ex'];
				}
			}
			cS[1] = parseFloat(cS[1]);
			help = parseFloat(fS[1]) - cS[1];
			if (maxVal < Math.abs(help)) maxVal = help;
			initProp[n] = {full:cS[1], delta:help, unit: fS[2] == '' ? '' : 'px'}; // make it faster using an array
		}

		maxVal = 12+Math.abs(duration/maxVal*(!speed && speed != 0 ? 1 : speed));
		if (jsMorph.speed && maxVal > jsMorph.speed) ; else jsMorph.speed = maxVal;
		initProp.speed = maxVal;
		if (onMorphInit) onMorphInit(initProp, dims);
		return initProp;
	}),
		
	timer = function(res) { // as function it's faster than as an object
		if (!res) return new Date().getTime()-timer.sT||0;  // timer() = get Δtime
		else { // timer(true) = start timer
			timer.sT = new Date().getTime();
			return 0;
		}
	},
	
	anim = function (time, timer, backwards, frames, initProps, objs, jsMorph) {
		// change: iPs.obj.backwards
		// change: jsMorph.timer ... maybe through function arguments
		
		// change: params = iPs.params; ...
		// change: prop = iPs.prop; ...
		// change: initProp = iPs.initProp; ...
		var tmpCSS, ease, cont = false, iPs, tmpTime, rewind, params, prop, initProp;
		for (var m = initProps.length; m--;) {
			iPs = initProps[m]; params = iPs.params; prop = iPs.prop; initProp = iPs.initProp;
			tmpTime = time-(iPs.newTime || 0)-params.delay;
			if (objs && !objs[m] && !iPs.newTime) continue; // what if time elapsed
			tmpCSS = '';
			if (tmpTime > 0) { // delayed?
				rewind = (backwards || iPs.obj.backwards);
				ease = iPs.ease(tmpTime/params.duration);
				if (tmpTime < params.duration) { // still in time?
					cont = true;
					iPs.done = null;
					for (var n in prop) tmpCSS += ';'+n+':'+(initProp[n].full+(!rewind ? ease : 1-ease)*initProp[n].delta)+initProp[n].unit;
					iPs.objStyle.cssText += tmpCSS; // here we render,... only one time ;o) all things at the same time
				} else if (!iPs.done) { // end of time for this object
					// if (iPs.params.doEnd || iPs.params.doEnd == undefined) { // do the end state
					if (params.doEnd) { // do the end state
						if (!rewind) {
							for (var n in prop) tmpCSS += ';'+n+':'+prop[n];
							iPs.objStyle.cssText += tmpCSS;
						}	else iPs.objStyle.cssText = iPs.obj.initStyle;
					} else { // otherwhise stick with calculated position
						for (var n in prop) tmpCSS += ';'+n+':'+(initProp[n].full+(!rewind ? initProp[n].delta : 0))+initProp[n].unit;
						iPs.objStyle.cssText += tmpCSS;
					}
					if (iPs.onMorphEnd) iPs.onMorphEnd(iPs.obj, timer(), frames, initProp.speed, jsMorph.speed, iPs.objStyle.cssText); // this object's end of sequence callback
					iPs.done = true;
					iPs.newTime = null;
				}
				if (iPs.onMorph) iPs.onMorph(iPs.obj, iPs.objStyle, time, frames+1, initProp.speed, jsMorph.speed, ease, iPs.objStyle.cssText);
			} else cont = true;
		}
		if (cont) jsMorph.timer = window.setTimeout(function(){anim(timer(), timer, backwards, ++frames, initProps, objs, jsMorph)}, jsMorph.speed);
		else {
			jsMorph.timer = null;
			if (m<=0 && jsMorph.onMorphEnd) jsMorph.onMorphEnd(objs, timer(), frames, jsMorph.speed); // the jsMorph's end of sequence callback
		}
	},
	
	initProp = [];
	
	this.reset = function (obj, prop, params, ease, onMorphInit, onMorph, onMorphEnd) {
		// does this help with garbage collection?? win vista, chrome, yes!$&%? // or better initProp = []
		for (var n=initProp.length; n--;) {for (var m in initProp[n]) m = null; initProp[n] = null; initProp.pop()}
		if (obj) this.concat(obj, prop, params, ease, onMorphInit, onMorph, onMorphEnd);
		return this;
	};
	
	this.init = function (last) { // also get the cssText straight if necessary!!
		var len = initProp.length, objStyle, tmpStyle;
		for (var n = last ? len-1 : 0, m = len; n < m; n++) {
			if (initProp[n].obj.initStyle != undefined && last == undefined) {
				objStyle = initProp[n].obj.style;
				tmpStyle = objStyle.cssText;
				if (initProp[n].obj.initStyle != tmpStyle) { // more code but faster
					objStyle.cssText = initProp[n].obj.initStyle;
				} else tmpStyle = null;
			}
			initProp[n]['initProp'] = getInitProp (initProp[n].obj, initProp[n].prop, initProp[n].params.duration, initProp[n].params.speed, initProp[n].onMorphInit, this);
			if (tmpStyle && last == undefined) objStyle.cssText = tmpStyle;
		}
		return this;
	};
	
	this.concat = function (obj, prop, params, ease, onMorphInit, onMorph, onMorphEnd) {
		if (!obj.pop && !obj.item) obj = [obj];
		if (!params) params = {};
		for (var n = obj.length; n--;) {// make it faster feeding initProp with an array??
			if (typeof obj[n] == 'string') obj[n] = document.getElementById(obj[n]);
			initProp[initProp.length] = {obj:obj[n], objStyle:obj[n].style, prop:prop, params:{duration : params.duration || 500, delay : params.delay || 0, speed: params.speed != undefined ? params.speed : 1, doEnd : params.doEnd != undefined ? params.doEnd : true}, ease:ease || function(n) {return n}, onMorphInit:onMorphInit, onMorph:onMorph, onMorphEnd:onMorphEnd};
			this.init(true);
		}
		return this;
	};
	if (obj) this.concat (obj, prop, params, ease, onMorphInit, onMorph, onMorphEnd);
	
	this.stop = function (obj) {window.clearTimeout(this.timer)};
	
	this.start = function (obj) { // do arguments[0] also be an Array or collection !!
		var time = timer();
		if (obj && (obj.pop || obj.item)) arguments = obj; // !!!! new before Amsterdam,... to be checked
		for (var objs = [], n = arguments.length; n--;)
			for (var m = initProp.length; m--;)
				if (initProp[m].obj == arguments[n]) {
					initProp[m].newTime = this.timer ? time : .1;
					objs[m] = true;
				}
		window.clearTimeout(this.timer);
		anim(this.timer ? time : timer(true), timer, this.backwards, 1, initProp, objs.length ? objs : null, this);
		return this;
	}
}