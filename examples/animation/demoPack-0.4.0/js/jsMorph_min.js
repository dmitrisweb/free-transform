/*! jsMorph v0.4.0 http://jsMorph.com/ | http://jsMorph.com/license */var jsMorph=function(g,a,e,f,j,i,c){var k=(function(y,p,l,E,v,u){var o={},A,H,I,m=y.style,z,q,x,w=0,D,G,F=[],s=function(n){return[n.offsetWidth,n.offsetHeight,n.offsetLeft,n.offsetTop]},r=function(){if(document.body.currentStyle){return function(n,J){return n.currentStyle[J.replace(/\-(\w)/g,function(){return arguments[1].toUpperCase()})]}}else{return function(n,J){return document.defaultView.getComputedStyle(n,null).getPropertyValue(J)}}}(),C=function(M){var K={},N,n=M.style,L=document.createElement("div"),J=L.style;J.cssText="position:absolute;left:0;top:-10ex;width:10em;height:72pt;";M.appendChild(L);N=s(L).concat(s(M));K={em:N[0]/10,pt:N[1]/72,pc:N[1]/6,"in":N[1],cm:N[1]/2.54,mm:N[1]/25.4,ex:Math.abs(N[3])/10,"%font":N[0]/1000,"%line":N[0]/1000};J.cssText+=";font-size:"+p["font-size"]+(p["font-family"]?";font-family:"+p["font-family"]:"")+";";N=s(L);M.removeChild(L);K.exn=Math.abs(N[3]/10);q=n.cssText;n.cssText+=";position:absolute;left:0%;top:0%;";N=s(M);n.cssText+=";left:-100%;top:-100%;";N=N.concat(s(M));n.cssText=q;K["%outX"]=(N[2]-N[6])/100;K["%outY"]=(N[3]-N[7])/100;return K},t=function(J,L,K){if(J[2]!="px"&&J[2]!=""){if(J[2]!="%"){J[1]*=K[J[2]]}else{if(!L.match(/^(font)/)){J[1]*=L.match(/width|left|right|padding|margin|text-ind/)?K["%outX"]:K["%outY"]}else{J[1]*=K["%"+L.split("-")[0]]}}}};y.initStyle=y.style.cssText;if(p["font-size"]){z=/([\-0-9\.]+)([a-z%]+)(!*)/.exec(p["font-size"])}for(var B in p){if(!(B.replace(/\-(\w)/g,function(){return arguments[1].toUpperCase()}) in m)){delete (p[B]);continue}I=/([\-0-9\.]+)([a-z%]*)(\s*!*)/.exec(p[B])||[];p[B]=p[B].toString().replace("!","");H=/([\-0-9\.]+)(\D*)/.exec(r(y,B.match(/^(padding|margin)$/)?B+"-left":B.match(/^(border-width)$/)?"border-left-width":B.match(/(border-radius)$/)?(x=(B.match(/^(\-\w+\-)/)||["",""])[1])+"border-"+(x=="-moz-"?"radius-topleft":"top-left-radius"):B))||["0px",0,"px"];if(!H[1]&&B.match(/^(height|width)/)){m.zoom=1;F[0]=/([\-0-9\.]+)([a-z%]*)/.exec(r(y,"padding-"+(B=="width"?"left":"top")));F[1]=/([\-0-9\.]+)([a-z%]*)/.exec(r(y,"padding-"+(B=="width"?"right":"bottom")));if((F[0]&&F[0][2]!="px")||(F[1]&&F[1][2]!="px")){t(F[0],"padding",A||(A=C(y)));t(F[1],"padding",A)}H=["",(B=="width"?y.clientWidth:y.clientHeight)-F[0][B=="width"?0:1]-F[1][B=="width"?0:1],"px"]}if((H[2]&&H[2]!="px")||(H[2]!=I[2])){t(H,B,A||(A=C(y)));t(I,B,A);if(z&&B!="font-size"){if(I[2]=="em"){I[1]*=z[1]/(z[2]!="em"?A.em:1)}if(I[2]=="ex"){I[1]*=A.exn/A.ex}}}H[1]=parseFloat(H[1]);D=parseFloat(I[1])-H[1];if(w<Math.abs(D)){w=D}o[B]={full:H[1],delta:D,unit:I[2]==""?"":"px"}}w=12+Math.abs(l/w*(!E&&E!=0?1:E));if(u.speed&&w>u.speed){}else{u.speed=w}o.speed=w;if(v){v(o,A)}return o}),b=function(l){if(!l){return new Date().getTime()-b.sT||0}else{b.sT=new Date().getTime();return 0}},d=function(r,u,B,v,C,s,q){var A,z,l=false,D,w,t,E,p,o;for(var y=C.length;y--;){D=C[y];E=D.params;p=D.prop;o=D.initProp;w=r-(D.newTime||0)-E.delay;if(s&&!s[y]&&!D.newTime){continue}A="";if(w>0){t=(B||D.obj.backwards);z=D.ease(w/E.duration);if(w<E.duration){l=true;D.done=null;for(var x in p){A+=";"+x+":"+(o[x].full+(!t?z:1-z)*o[x].delta)+o[x].unit}D.objStyle.cssText+=A}else{if(!D.done){if(E.doEnd){if(!t){for(var x in p){A+=";"+x+":"+p[x]}D.objStyle.cssText+=A}else{D.objStyle.cssText=D.obj.initStyle}}else{for(var x in p){A+=";"+x+":"+(o[x].full+(!t?o[x].delta:0))+o[x].unit}D.objStyle.cssText+=A}if(D.onMorphEnd){D.onMorphEnd(D.obj,u(),v,o.speed,q.speed,D.objStyle.cssText)}D.done=true;D.newTime=null}}if(D.onMorph){D.onMorph(D.obj,D.objStyle,r,v+1,o.speed,q.speed,z,D.objStyle.cssText)}}else{l=true}}if(l){q.timer=window.setTimeout(function(){d(u(),u,B,++v,C,s,q)},q.speed)}else{q.timer=null;if(y<=0&&q.onMorphEnd){q.onMorphEnd(s,u(),v,q.speed)}}},h=[];this.reset=function(t,l,r,s,v,u,o){for(var p=h.length;p--;){for(var q in h[p]){q=null}h[p]=null;h.pop()}if(t){this.concat(t,l,r,s,v,u,o)}return this};this.init=function(r){var q=h.length,p,o;for(var s=r?q-1:0,l=q;s<l;s++){if(h[s].obj.initStyle!=undefined&&r==undefined){p=h[s].obj.style;o=p.cssText;if(h[s].obj.initStyle!=o){p.cssText=h[s].obj.initStyle}else{o=null}}h[s]["initProp"]=k(h[s].obj,h[s].prop,h[s].params.duration,h[s].params.speed,h[s].onMorphInit,this);if(o&&r==undefined){p.cssText=o}}return this};this.concat=function(o,t,r,q,m,p,l){if(!o.pop&&!o.item){o=[o]}if(!r){r={}}for(var s=o.length;s--;){if(typeof o[s]=="string"){o[s]=document.getElementById(o[s])}h[h.length]={obj:o[s],objStyle:o[s].style,prop:t,params:{duration:r.duration||500,delay:r.delay||0,speed:r.speed!=undefined?r.speed:1,doEnd:r.doEnd!=undefined?r.doEnd:true},ease:q||function(u){return u},onMorphInit:m,onMorph:p,onMorphEnd:l};this.init(true)}return this};if(g){this.concat(g,a,e,f,j,i,c)}this.stop=function(l){window.clearTimeout(this.timer)};this.start=function(p){var o=b();if(p&&(p.pop||p.item)){arguments=p}for(var q=[],r=arguments.length;r--;){for(var l=h.length;l--;){if(h[l].obj==arguments[r]){h[l].newTime=this.timer?o:0.1;q[l]=true}}}window.clearTimeout(this.timer);d(this.timer?o:b(true),b,this.backwards,1,h,q.length?q:null,this);return this}};

/* demoButton start-page */
var button = document.getElementById('button');
if (button) {
	var myButton = new jsMorph(button,{width:'151px', height:'151px', right:'-82px', top:'45px'},{delay: 1000},function(n) {return --n*n*((2.7)*n+1.7)+1}).start();
	button.onclick = myButton.start;
}

/* accordeon demo start-page */
var accordeon = function (accordeon, duration, head, body) {
	var heads = accordeon.getElementsByTagName(head ||'h2'),
			content = accordeon.getElementsByTagName(body ||'span'),
			myMorph = new jsMorph();
	
	for (var n=heads.length; n--;) {
		// content[n].style.cssText = 'height:auto; display: block';
		myMorph.concat(
			content[n],
			{'height': '0px'},
			{duration : duration},
			function(n) {return --n*n*n*n*n+1},
			null,
			null,
			function (obj) {obj.backwards = obj.backwards ? false : true}
		);
		heads[n].me = n;
		if (n) {
			content[n].backwards = true;
			content[n].style.height = '0px';
		} else accordeon.current = n;
	}
	
	accordeon.onclick = function(e) { // event delegation
		var e = e || window.event, obj = e.target || e.srcElement;
		if (obj.tagName.toLowerCase() == (head ||'h2') && obj.me != accordeon.current && !myMorph.timer) {
			myMorph.start(content[obj.me], content[accordeon.current]);
			accordeon.current = obj.me;
		}
		// return false;
	};
};

var accordeonDemo = document.getElementById('demoBox');
if (accordeonDemo) accordeon(accordeonDemo, 300, null, 'div');

/* tutorial1 'Simple horizontal slide demo' tutorial-page */
var demoCount = 0, myMorph = [],
		demo = document.getElementById('demo_'+(++demoCount));
if (demo) {
	myMorph[demoCount] = new jsMorph(demo,{left:'200px'}).start();
	demo.onclick = myMorph[demoCount].start;
}
/* tutorial2 'Simple horizontal slide demo with some more parameters' tutorial-page */
demo = document.getElementById('demo_'+(++demoCount));
if (demo) {
	myMorph[demoCount] = new jsMorph(demo,{left:'200px'},{duration: 650},function(n) {return --n*n*n+1});
	demo.onclick = myMorph[demoCount].start;
}
/* tutorial3 'More complex slide demo & backwards' tutorial-page */
demo = document.getElementById('demo_'+(++demoCount));
if (demo) {
	myMorph[demoCount] = new jsMorph(
		demo,
		{left:'350px', height:'40px', width:'80px', 'border-width':'6px'},
		{duration: 600},
		function(n) {var s=1.70158; return (n=n-1)*n*((s+1)*n+s)+1},
		null,
		null,
		function(obj){obj.backwards = obj.backwards ? false : true}
	);
	demo.onclick = myMorph[demoCount].start;
}
/* tutorial4 'Queueing demo & unit change' tutorial-page */
demo = document.getElementById('demo_'+(++demoCount));
if (demo) {
	myMorph[demoCount] = new jsMorph(demo,
		{left:'50%', height:'7em', width:'280px', 'border-width':'6px', 'margin-left':'-140px'},
		{duration: 600},
		function(n) {return --n*n*n+1}
	).concat(demo,
		{top:'95px'},
		{delay: 220},
		function(n) {if ((n/=1)<(1/2.75)) return 7.5625*n*n; else if (n<(2/2.75)) return 7.5625*(n-=(1.5/2.75))*n+0.75; else if (n<(2.5/2.75)) return 7.5625*(n-=(2.25/2.75))*n+0.9375; else return 7.5625*(n-=(2.625/2.75))*n+0.984375},
		null,
		null,
		function(obj) {obj.backwards = obj.backwards ? false : true}
	);
	demo.onclick = myMorph[demoCount].start;
	window.onresize = function() {myMorph[demoCount].init()};
}
/* tutorial5 'Multy element queueing demo with unique triggers & onMorph callback' tutorial-page */
demo = document.getElementById('demoWrap');
if (demo) {
	demo = demo.getElementsByTagName('div');
	myMorph[++demoCount] = new jsMorph(demo,
		{bottom: '-44px', height:'100px', 'border-top-width':'8px'},
		{duration: 150},
		function(n) {return --n*n*n+1},
		null,
		function(obj, objStyle, time, frames, objSpeed, morphSpeed, ease, cssText) {obj.firstChild.data = time},
		function(obj) {obj.backwards = obj.backwards ? false : true}
	).concat(demo[demo.length-1],
		{left:'100px'},
		{duration: 150},
		function(n) {return --n*n*n+1}
	);
	for (var n=demo.length; n--;) demo[n].onclick = function() {myMorph[demoCount].start(this)}
}
/* tutorial6 'Recycling, resetting & speed reducing jsMorph ('green' mode)' tutorial-page */
var demo = document.getElementById('demo_9'), fps = document.getElementById('fps'),
		recycle = function (myMorph, demo, width) {
			myMorph.reset(demo,
				{width : width+'px'},
				{duration: 450, speed : 3},
				function(n) {return --n*n*n+1},
				function(initProp) {fps.firstChild.data = (1000/initProp.speed).toFixed(2)+' fps '}
			).start();
		};
if (demo) {
	myMorph[7] = new jsMorph();
	demo.onclick = function() {
		window.setInterval(function(){recycle(myMorph[7], demo, Math.random()*600); }, 1000);
		this.onclick = null;
	}
}
/* tutorial8 'Conversion of units' tutorial-page */
if (document.getElementById('unitDemo'))	{
	var myDemoMorph = new jsMorph('unitDemo',
		{width: '1px', height: '1px', 'border-width': '1px', padding: '1px', 'margin-left': '1px'},
		null,
		null,
		function(initProp, dims){
			var cons = document.getElementById('demo-console');
			for (n in initProp) if (n != 'speed') cons.innerHTML += n + ': ' + initProp[n].full+'px<br />';
		}
	);
}

/* demo1 'Transition' demo-page */
if (document.getElementById('slide')) {
	var scewSlide = function(myMorph, img, src, ease, peaces, duration, delayExtension, mode, mSplit, sSplit, horiz) {
				var imgLayer = [], params, pos, delay, m = mode%2, delta, gapper, wrapper = img.parentNode;
				peaces = peaces || 10;
				delayExtension = typeof delayExtension != undefined ? delayExtension : 40;
				duration = (duration || 800) - ((peaces-1)*delayExtension);
				delta = (horiz ? img.offsetWidth : img.offsetHeight) / peaces;
				gapper = delta*peaces % peaces ? 1 : 0;
				
				for (var n=0; n<peaces; n++) {
					if (!scewSlide.slizes || scewSlide.slizes < n) { // make shure to recycle
						scewSlide.slizes = n;
						wrapper.appendChild(imgLayer[n] = document.createElement('div'));
					} else imgLayer[n] = wrapper.children[n+1];
					delay = (m ? peaces-n : n);
					if (mSplit) delay = (n<= peaces/2) ? Math.round(peaces-delay-(!m ? peaces/2 : 0))-1 : Math.round(delay-(!m ? peaces/2 : 0));
					imgLayer[n].style.cssText = !(horiz%2) ? 'position:absolute;left:0px;top:'+(delta*n)+'px;height:'+(delta+gapper)+'px;width:100%;background: url('+img.src+') no-repeat 0 -'+(delta*n)+'px;':
						'position:absolute;top:0px;left:'+(delta*n)+'px;width:'+(delta+gapper)+'px;height:100%;background: url('+img.src+') no-repeat -'+(delta*n)+'px 0;';
					params = {duration :duration, delay : delay*delayExtension};
					pos = horiz && !(horiz<2) ? {top: mode%4 < 2 ? '100%' : '-100%'} : {left: mode%4 < 2 ? '100%' : '-100%'};
					if (sSplit) pos = horiz && !(horiz<2) ? {top: n%2 ? '100%' : '-100%'} : {left: n%2 ? '100%' : '-100%'};
					myMorph.concat(imgLayer[n], pos, params, ease);
				}
				img.src = null; img.src = src;
			},
			
			img = document.getElementById('slide').children[0], myMorhp, timer,
			cubicEaseIn = function(n) {return n*n*n},
			backEaseIn = function(n) {var s=1.70158; return n*n*((s+1)*n-s)},
			images = ['Garten.jpg', 'Wald.jpg', 'Wasserfall.jpg', 'Frangipani.jpg'],
			current = 0, ease = cubicEaseIn, counter = 1;
	
			
	window.onload = function() {
		var myMorph = new jsMorph(),
		onMorphEnd = function(objs, time, frames, speed) {
			var n1 = Math.floor(Math.random()*2), n3 = Math.floor(Math.random()*4), n4 = Math.floor(Math.random()*5);
			myMorph.reset();
			if (counter > 30)  counter = 0;
			if (!counter++) {
				current %= 4;
				scewSlide(myMorph, img, 'demos/'+images[current++], ease, 1, 600, 35, n4,  n1, n1, n3);
			} else {
				if ((current %= 4)) ease = ease == backEaseIn ? cubicEaseIn : backEaseIn;
				scewSlide(myMorph, img, 'demos/'+images[current++], ease, 25, 1300, 35, n4,  n1, n1, n3);
			}
		};
		
		img.onload = function() {myMorph.start()};
		document.onclick = function() {
			if (myMorph.onMorphEnd) myMorph.onMorphEnd = null;
			else {myMorph.onMorphEnd = onMorphEnd; myMorph.start();}
		}
		myMorph.onMorphEnd = onMorphEnd;
		scewSlide(myMorph, img, 'demos/'+images[current++], ease, 1, 600, 35, Math.floor(Math.random()*5),  Math.floor(Math.random()*2),   Math.floor(Math.random()*2),  Math.floor(Math.random()*4));
	}
}

/* demo2 'Bounce demo' demo-page */
var bounce = document.getElementById('bounce')
if (bounce) {
	var myMorph = new jsMorph( // x-axis
				bounce,
				{left: '600px'},
				{duration :3000, delay : 0},
				function(n) {return --n*n*n+1}
			).concat( // y-axis
				bounce,
				{top: (bounce.parentNode.offsetHeight-bounce.offsetTop-51)+'px'},
				{duration :1500, delay : 0},
				function(n) {if ((n/=1)<(1/2.75)) return 7.5625*n*n; else if (n<(2/2.75)) return 7.5625*(n-=(1.5/2.75))*n+0.75; else if (n<(2.5/2.75)) return 7.5625*(n-=(2.25/2.75))*n+0.9375; else return 7.5625*(n-=(2.625/2.75))*n+0.984375}
			).concat( // first bounce
				bounce,
				{height: '37px', width: '64px', 'margin-top': '24px'},
				{duration :80, delay : 550}
			).concat( // first bounce over
				bounce,
				{height: '51px', width: '51px', 'margin-top': '0px'},
				{duration :100, delay : 650}
			).concat( // second bounce 
				bounce,
				{height: '41px', width: '59px', 'margin-top': '12px'},
				{duration :80, delay : 1020}
			).concat( // second bounce over
				bounce,
				{height: '51px', width: '51px', 'margin-top': '0px'},
				{duration :90, delay : 1090}
			);
	
	bounce.onclick = myMorph.start;
}

/* demo3 'Menu demo' demo-page */
var  menu = document.getElementById('menu');
if (menu) {
	var links = menu.getElementsByTagName('a'),
			myMorph = new jsMorph(
				links,
				{height: '35px', 'border-bottom-width' : '18px', 'border-top-width' : '10px', 'margin-bottom' : '-18px', 'margin-top' : '-10px', 'padding-top' : '24px'},
				{duration :300, delay : 0, speed : 1, doEnd : true},
				function(n) {return --n*n*n*n*n+1}
				// function(n) {return n}
			);
	
	/*for (var n=links.length; n--;) {
		links[n].onmouseover = function() {
			this.backwards = false;
			myMorph.start(this);
		};
		links[n].onmouseout = function() {
			this.backwards = true;
			myMorph.start(this);
		};
	}*/
	
	menu.onmouseout = menu.onmouseover = function(e) { // event delegation
		var e = e || window.event, obj = e.target || e.srcElement;
		if (obj.tagName.toLowerCase() == 'a') {
			obj.backwards = e.type == 'mouseover' ? false : true;
			myMorph.start(obj);
		}
	};
}

/* demo4 'Accordeon demo' demo-page */
// See accordeon demo start-page (above)

/* demo5 'Chart bars demo' demo-page */
var chart = document.getElementById('chart');
if (chart) {
	var bars = chart.getElementsByTagName('div'),
			delay = document.getElementById('delay'),
			bouncer = document.getElementById('bouncer'),
			myMorph = new jsMorph(),
			update = function (myMorph, bars, data, height, duration, delay, bouncer) {
				myMorph.reset();
				for(var n = bars.length; n--;) {
					myMorph.concat(
						bars[n],
						{'margin-top': (data ? data[n]*(height || 1) : (Math.random()*(height || 1)))+'px'},
						{duration : (duration != undefined ? duration : 800), delay : n*(delay || 0)},
						!bouncer ? function(n) {return --n*n*n*n*n+1} : function(n) {if ((n/=1)<(1/2.75)) return 7.5625*n*n; else if (n<(2/2.75)) return 7.5625*(n-=(1.5/2.75))*n+0.75; else if (n<(2.5/2.75)) return 7.5625*(n-=(2.25/2.75))*n+0.9375; else return 7.5625*(n-=(2.625/2.75))*n+0.984375}
						// null,
						// function(obj, objStyle){obj.firstChild.data = Math.floor((200-parseInt(objStyle.marginTop))/2)}
					);
				}
				myMorph.start();
			},
			adjBars = function () {
				var m = bars.length, tmpChild;
				for (var n = Math.abs(this.value - m); n--;)
					if (this.value < m) chart.removeChild(bars[n]);
					else chart.insertBefore(document.createElement('div'),bars[0]);
			}
	
	document.getElementById('amount').onchange = adjBars;
	update(myMorph, bars, null, 200, 800, delay.checked ? 100 : 0, bouncer.checked);
	window.setInterval(function() {update(myMorph, bars, null, 200, 800, delay.checked ? 100 : 0, bouncer.checked)}, 3500); 
}
/* demo6 'Loading spinner demo' demo-page */
var loadSpinner = document.getElementById('loadSpinner');
if (loadSpinner) {
	var createSpin = function (obj, num, d, bg) {
		var newDiv = '', r = (obj.offsetHeight-d)/2;
		for (var n=num; n--;) newDiv += '<div style="position:absolute;left:'+(r*Math.sin(n*2*Math.PI/num)+r)+'px;top:'+(r*Math.cos(n*2*Math.PI/num)+r)+'px;height:'+d+'px;width:'+d+'px;background-color:'+bg+';border-radius:'+d+'px;-moz-border-radius:'+d+'px;-o-border-radius:'+d+'px;line-height:0;overflow:hidden;">&nbsp;</div>';
		obj.innerHTML = newDiv;
	}(loadSpinner, 12, 12, '#91B39F'),
	circles = loadSpinner.childNodes, cN = circles.length, count = 0,
	myMorph = new jsMorph(circles, {opacity:0, width:'1px', height: '1px'}, {duration:1000});
	
	window.setInterval(function() {myMorph.start(circles[count++]); if (count >= cN) count=0}, 70);
}

/* demo7 iPhone demo-page */
var iPhone = document.getElementById('iPhone');
if (iPhone) {
	var leftScreen = document.getElementById('leftScreen'),
			dets = leftScreen.getElementsByTagName('div'), detButtons = [],
			rightScreen = document.getElementById('rightScreen'),
			bottomScreen = document.getElementById('bottomScreen'),
			bk = function(obj) {obj.backwards = obj.backwards ? false : true},
			ease = function(n) {return -(--n*n*n*n-1)},
			props = {duration:300},
			myMorph = new jsMorph();
										 
	for (var n=dets.length, m=0; n--;) if (dets[n].className.match(/list$/)) detButtons[m++] = dets[n];
	myMorph.concat(bottomScreen,{top:'0%'},null,ease,null,null,bk).
					concat(rightScreen,{left:'0%'},props,ease,null,null,bk).
					concat(leftScreen,{left:'-100%'},props,ease,null,null,bk).
					concat(detButtons,{height:'0px'},{duration:250},ease,null,null,bk);
	
	
	iPhone.onclick = function(e) {
		var e = e || window.event, obj = e.target || e.srcElement;
		if (obj.id) {
			if (obj.id.match(/(edit|done)$/)) myMorph.start(bottomScreen);
			else if (obj.id.match(/doneRight/)) myMorph.start([leftScreen, rightScreen]);
			else if (obj.id.match(/filter/)) myMorph.start(detButtons);
		} else {
			if (obj.className.match(/det/) || obj.parentNode.className.match(/det/)) myMorph.start([leftScreen, rightScreen]);
		}
	}
}

/* demo8 image slider demo-page */
var slides = document.getElementById('slides');
if (slides) {
	var dots = document.getElementById('dots'),
			slideInit = function(frame, dotFrame) {
				var slides = frame.children,
						divs = dotFrame.children,
						sl = slides.length,
						dots = '';
						
				for(var n=sl; n--;) {
					slides[n].style.cssText += ';left:'+(n*100)+'%;';
					if (n) dots += '<div></div>';
				}
				frame.current = 0;
				dotFrame.innerHTML = '<div class="dots-high"></div>' + dots;
				for (var n=divs.length;n--;) divs[n].current = n+1;
			},
			slide = function(myMorph, frame, dotFrame, duration) {
				var slides = frame.children,
						dots = dotFrame.children;
						
				frame.current = frame.current >= slides.length-1 ? 0 : frame.current + 1;
				for (var n=dots.length; n--;) dots[n].className = frame.current == n ? 'dots-high' : ''; 
				myMorph.reset(slides,
					{'margin-left': '-'+(frame.current * 100)+'%'},
					{duration: duration, speed: 6},
					function(n) {if ((n*=2)<1) return 0.5*n*n*n*n*n; return 0.5*((n-=2)*n*n*n*n+2)} // quinticEaseInOut
				).start();
			},
			slideTime,
			initInterval = function() {
				slideTime = window.setInterval(function(){slide(myMorph, slides, dots, 900)}, 6000);
			},
			myMorph = new jsMorph();
	
	dots.onmouseout = dots.onclick = function(e) {
		var e = e || window.event, obj = e.target || e.srcElement;
		
		if (e.type == 'click') {
			if (!obj.current) return;
			window.clearInterval(slideTime);
			slideTime = null;
			slides.current = obj.current-2;
			slide(myMorph, slides, dots, 900);
			return false;
		} else if (!slideTime) initInterval();
	};
	
	slideInit(slides, dots);
	initInterval();
}