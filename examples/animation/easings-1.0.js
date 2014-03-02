var linearEaseNone = function(n) {return n},
	
	quadraticEaseIn = function(n) {return n*n},
	quadraticEaseOut = function(n) {return -n*(n-2)},
	quadraticEaseInOut = function(n) {if ((n*=2)<1) return 0.5*n*n; return -0.5*(--n*(n-2)-1)},
	
	cubicEaseIn = function(n) {return n*n*n},
	cubicEaseOut = function(n) {return --n*n*n+1},
	cubicEaseInOut = function(n) {if ((n*=2)<1) return 0.5*n*n*n; return 0.5*((n-=2)*n*n+2)},
	
	quarticEaseIn = function(n) {return n*n*n*n},
	quarticEaseOut = function(n) {return -(--n*n*n*n-1)},
	quarticEaseInOut = function(n) {if ((n*=2)<1) return 0.5*n*n*n*n; return -0.5*((n-=2)*n*n*n-2)},
	
	quinticEaseIn = function(n) {return n*n*n*n*n},
	quinticEaseOut = function(n) {return (n=n-1)*n*n*n*n+1},
	quinticEaseInOut = function(n) {if ((n*=2)<1) return 0.5*n*n*n*n*n; return 0.5*((n-=2)*n*n*n*n+2)},
	
	sinusoidalEaseIn = function(n) {return -Math.cos(n*Math.PI/2)+1},
	sinusoidalEaseOut = function(n) {return Math.sin(n*Math.PI/2)},
	sinusoidalEaseInOut = function(n) {return -0.5*(Math.cos(Math.PI*n)-1)},
	
	exponentialEaseIn = function(n) {return n==0 ? 0 : Math.pow(2, 10*(n-1))},
	exponentialEaseOut = function(n) {return n==1 ? 1 : -Math.pow(2, -10*n)+1},
	exponentialEaseInOut = function(n) {if (n==0) return 0; if (n==1) return 1; if ((n*=2)<1) return 0.5*Math.pow(2, 10*(n-1)); return 0.5*(-Math.pow(2, -10*(n-1))+2)},
	
	circularEaseIn = function(n) {return -(Math.sqrt(1-n*n)-1)},
	circularEaseOut = function(n) {return Math.sqrt(1- --n*n)},
	circularEaseInOut = function(n) {if ((n/=0.5)<1) return -0.5*(Math.sqrt(1-n*n)-1); return 0.5*(Math.sqrt(1-(n-=2)*n)+1)},
	
	elasticEaseIn = function(n) {var s, a=0.1, p=0.4; if (n==0) return 0; if (n==1) return 1; if (!p) p=0.3; if (!a||a<1) {a=1; s=p/4} else s=p/(2*Math.PI)*Math.asin(1/a); return -(a*Math.pow(2, 10*(n-=1))*Math.sin((n-s)*(2*Math.PI)/p))},
	elasticEaseOut = function(n) {var s, a=0.1, p=0.4;	if (n==0) return 0; if (n==1) return 1; if (!p) p=0.3; if (!a||a<1) {a=1; s=p/4} else s=p/(2*Math.PI)*Math.asin(1/a); return (a*Math.pow(2, -10*n)*Math.sin((n-s)*(2*Math.PI)/p)+1)},
	elasticEaseInOut = function(n) {var s, a=0.1, p=0.4; if (n==0) return 0; if (n==1) return 1; if (!p) p=0.3; if (!a||a<1) {a=1; s=p/4} else s=p/(2*Math.PI)*Math.asin(1/a); if ((n*=2)<1) return -0.5*(a*Math.pow(2, 10*(n-=1))*Math.sin((n-s)*(2*Math.PI)/p)); return a*Math.pow(2, -10*(n-=1))*Math.sin((n-s)*(2*Math.PI)/p)*0.5+1},
	
	backEaseIn = function(n) {var s=1.70158; return n*n*((s+1)*n-s)},
	backEaseOut = function(n) {var s=1.70158; return (n=n-1)*n*((s+1)*n+s)+1},
	backEaseInOut = function(n) {var s=1.70158*1.525; if ((n*=2)<1) return 0.5*(n*n*((s+1)*n-s)); return 0.5*((n-=2)*n*((s+1)*n+s)+2)},
	
	bounceEaseIn = function(n) {return 1-bounceEaseOut(1-n)},
	bounceEaseOut = function(n) {if ((n/=1)<(1/2.75)) return 7.5625*n*n; else if (n<(2/2.75)) return 7.5625*(n-=(1.5/2.75))*n+0.75; else if (n<(2.5/2.75)) return 7.5625*(n-=(2.25/2.75))*n+0.9375; else return 7.5625*(n-=(2.625/2.75))*n+0.984375},
	bounceEaseInOut = function(n) {if (n<0.5) return bounceEaseIn(n*2)*0.5; return bounceEaseOut(n*2-1)*0.5+0.5};