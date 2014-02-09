window.utils = (function(){
	//'use strict';

    /* Simple event listeners by @PPK */
    var addEventSimple = function (obj,evt,fn) {
        if (obj.addEventListener)
            obj.addEventListener(evt,fn,false);
        else if (obj.attachEvent)
            obj.attachEvent('on'+evt,fn);
    };


    var removeEventSimple = function (obj,evt,fn) {
        if (obj.removeEventListener)
            obj.removeEventListener(evt,fn,false);
        else if (obj.detachEvent)
            obj.detachEvent('on'+evt,fn);
    };


	var createMouseEvent = function(e, type){
		var target = e.data && e.data.target || e.target;

		if(document.createEvent) {
			var o = document.createEvent('MouseEvents');
			o.initMouseEvent( 
				type, true, true, e.view,  // e.canBubble, e.cancelable, e.view, 
				e.detail, e.screenX, e.screenY, e.clientX, e.clientY, 
				e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 
				e.button, e.relatedTarget
			);
			
			//console.log(e.data);
			o.data = e.data;
			target.dispatchEvent(o);

		} else {
			if(document.createEventObject){ // IE event
				var o = document.createEventObject();
				o.detail = e.detail;
				o.screenX = e.screenX;
				o.screenY = e.screenY;
				o.clientX = e.clientX;
				o.clientY = e.clientY;
				o.ctrlKey = e.ctrlKey;
				o.altKey = e.altKey;
				o.shiftKey = e.shiftKey;
				o.metaKey = e.metaKey;
				o.button = e.button;
				o.relatedTarget = e.relatedTarget;

				o.data = e.data;
				
				target.fireEvent(type, o);
			}
		}
	};


	/* DND by @PPK */
	var dragDrop = {
		keyHTML: '<a href="#" class="keyLink"></a>',
		keySpeed: 10, // pixels per keypress event
		initialMouseX: undefined,
		initialMouseY: undefined,
		startX: undefined,
		startY: undefined,
		dXKeys: undefined,
		dYKeys: undefined,
		draggedObject: undefined,
		initElement: function (element) {
			if (typeof element == 'string')
				element = document.getElementById(element);
			element.onmousedown = dragDrop.startDragMouse;
			element.innerHTML += dragDrop.keyHTML;
			var links = element.getElementsByTagName('a');
			var lastLink = links[links.length-1];
			lastLink.relatedElement = element;
			lastLink.onclick = dragDrop.startDragKeys;
		},
		startDragMouse: function (e) {
			dragDrop.startDrag(this);
			var evt = e || window.event;
			
			createMouseEvent(e, 'dragstart2');
			
			//console.log(e);
			
			dragDrop.initialMouseX = evt.clientX;
			dragDrop.initialMouseY = evt.clientY;
			dragDrop.dragstartEvent = e;
			
			addEventSimple(document,'mousemove',dragDrop.dragMouse);
			addEventSimple(document,'mouseup',dragDrop.releaseElement);
			return false;
		},
		startDragKeys: function () {
			dragDrop.startDrag(this.relatedElement);
			dragDrop.dXKeys = dragDrop.dYKeys = 0;
			addEventSimple(document,'keydown',dragDrop.dragKeys);
			addEventSimple(document,'keypress',dragDrop.switchKeyEvents);
			this.blur();
			return false;
		},
		startDrag: function (obj) {
			if (dragDrop.draggedObject)
				dragDrop.releaseElement();
			dragDrop.startX = obj.offsetLeft;
			dragDrop.startY = obj.offsetTop;
			dragDrop.draggedObject = obj;
			obj.className += ' dragged';
		},
		dragMouse: function (e) {
			var evt = e || window.event;
			
			
			e.data = {
				startX: dragDrop.startX,
				startY: dragDrop.startY,
				target: dragDrop.draggedObject,
				dX: evt.clientX - dragDrop.initialMouseX,
				dY: evt.clientY - dragDrop.initialMouseY
			};
			


			
			var dX = evt.clientX - dragDrop.initialMouseX;
			var dY = evt.clientY - dragDrop.initialMouseY;
			dragDrop.setPosition(dX,dY);

			createMouseEvent(e, 'drag2');
			return false;
		},
		dragKeys: function(e) {
			var evt = e || window.event;
			var key = evt.keyCode;
			switch (key) {
				case 37:	// left
				case 63234:
					dragDrop.dXKeys -= dragDrop.keySpeed;
					break;
				case 38:	// up
				case 63232:
					dragDrop.dYKeys -= dragDrop.keySpeed;
					break;
				case 39:	// right
				case 63235:
					dragDrop.dXKeys += dragDrop.keySpeed;
					break;
				case 40:	// down
				case 63233:
					dragDrop.dYKeys += dragDrop.keySpeed;
					break;
				case 13: 	// enter
				case 27: 	// escape
					dragDrop.releaseElement();
					return false;
				default:
					return true;
			}
			dragDrop.setPosition(dragDrop.dXKeys,dragDrop.dYKeys);
			if (evt.preventDefault)
				evt.preventDefault();
			return false;
		},
		setPosition: function (dx,dy) {
			dragDrop.draggedObject.style.left = dragDrop.startX + dx + 'px';
			dragDrop.draggedObject.style.top = dragDrop.startY + dy + 'px';
		},
		switchKeyEvents: function () {
			// for Opera and Safari 1.3
			removeEventSimple(document,'keydown',dragDrop.dragKeys);
			removeEventSimple(document,'keypress',dragDrop.switchKeyEvents);
			addEventSimple(document,'keypress',dragDrop.dragKeys);
		},
		releaseElement: function() {
			removeEventSimple(document,'mousemove',dragDrop.dragMouse);
			removeEventSimple(document,'mouseup',dragDrop.releaseElement);
			removeEventSimple(document,'keypress',dragDrop.dragKeys);
			removeEventSimple(document,'keypress',dragDrop.switchKeyEvents);
			removeEventSimple(document,'keydown',dragDrop.dragKeys);
			dragDrop.draggedObject.className = dragDrop.draggedObject.className.replace(/dragged/,'');
			dragDrop.draggedObject = null;
		}
	};
	
	return {
		addEventSimple: addEventSimple,
		removeEventSimple: removeEventSimple,
		dnd: dragDrop
	}

})();


